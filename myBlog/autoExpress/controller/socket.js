
let users = {};
let socoketUser = {};

function handleSocket(io){
    io.on('connection', function(socket){
        socket.on('userConnect',function(data){
            users[data.username] = data;
            socoketUser[data.username] = socket;
            io.sockets.emit('userObj',users);
        });

        socket.on("privateChat",(data)=>{
            socoketUser[data.to].emit("to"+data.to,data);
            socoketUser[data.user.username].emit("to"+data.user.username,data);
        });

        socket.on("publicChat",(data)=>{
            io.sockets.emit("sendPublicChat",data);
        });

        socket.on('userDiscount',(data)=>{
            delete users[data];
            delete socoketUser[data];
            io.sockets.emit('userObj',users);
        });
        
        socket.on('disconnect', function(){
            console.log('a user disconnect');
        });

    });
}

module.exports = handleSocket;