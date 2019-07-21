const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const NodeRSA = require('node-rsa');
const fs = require('fs')
const session = require('express-session');
const logger = require('morgan');
const io = require('./controller/socket');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('short'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'upload')));
app.use(express.static(path.join(__dirname, 'build')));

app.use(session({
  secret: 'keyboard Sam',
  cookie: { maxAge: 60 * 60 * 4 * 1000 },
  resave: false,
  saveUninitialized: true,
  rolling: true
}));

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'views', 'index.html'));
});

app.use(indexRouter);
app.use(usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//生成公钥和密钥
// Generate new 512bit-length key
let key = new NodeRSA({ b: 512 });
key.setOptions({ encryptionScheme: 'pkcs1' });

let privatePem = key.exportKey('pkcs1-private-pem');
let publicDer = key.exportKey('pkcs8-public-der');
let publicDerStr = publicDer.toString('base64');

// 保存返回到前端的公钥
fs.writeFile('./pem/public.pem', publicDerStr, (err) => {
  if (err) { throw err }
  console.log('公钥已保存！');
})
// 保存私钥
fs.writeFile('./pem/private.pem', privatePem, (err) => {
  if (err) { throw err }
  console.log('私钥已保存！');
})

module.exports = app;
