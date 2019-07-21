import * as types from './action-type';
import Ajax from '../component/ajax';

export const getUser = (value) => ({
    type: types.getUsername,
    user: value
});

export const getLoginStatus = () => {
    return async dispatch => {
        try {
            let res = await Ajax.post('/getUser');
            if (res.data.msg === 200) {
                dispatch({
                    type: types.getLoginStatus,
                    user: {
                        username: res.data.data.username,
                        phone: res.data.data.phone,
                        birthday: res.data.data.birthday,
                        email: res.data.data.email,
                        myAvatar: res.data.data.myAvatar,
                        status: true
                    }
                });
            } else {
                dispatch({
                    type: types.getLoginStatus,
                    user: {
                        username: "",
                        phone: "",
                        birthday: "",
                        email: "",
                        myAvatar: "",
                        status: false
                    }
                });
            }
        } catch (err) {
            console.log(err);
        }
    }
};

export const publicPem = () => {
    return async dispatch => {
        try {
            let res = await Ajax.post('/getPublicDerStr');
            if (res.data.msg === 200) {
                dispatch({
                    type: types.PublicPem,
                    publicPem: res.data.data.publicDerStr
                });
            } else {
                console.warn(res.data.data);
            }
        } catch (err) {
            console.log(err);
        }
    }
}

export const Logout = (value) => ({
    type: types.Logout,
    user: value
})

export const uploadAvatar = (src) => ({
    type: types.UploadAvatar,
    uploadMyAvatar: src
})

export const UpdateUser = (value) => ({
    type: types.UpdateUser,
    user: value
})


export const LoadingBlog = (flag) => ({
    type: types.LoadingBlog,
    loadingBlog: !flag
})

export const GetBlog = (pageSize, currentPage, type,value) => {
    return async dispatch => {
        try {
            let res = await Ajax.post('/selectBlog', {
                pageSize,
                currentPage,
                type,
                searchValue:value?value:''
            });
            if (res.data.msg === 200) {
                if(res.data.data.length===0){
                    dispatch({
                        type: types.GetBlog,
                        blogData: res.data.data,
                        isADDBlog : false
                    });
                }else{
                    dispatch({
                        type: types.GetBlog,
                        blogData: res.data.data,
                        isADDBlog : true
                    });
                }
            } else {
                dispatch({
                    type: types.GetBlog,
                    blogData: [],
                    isADDBlog : false
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const ClearBlog = ()=>({
    type:types.ClearBlog
})

export const InitComment = (blogid) =>{
    return async dispatch=>{
        try {
            let res = await Ajax.post('/selectComment',{
                blogid
            });
            if(res.data.msg===200){
                dispatch({
                    type:types.CommentARR,
                    CommentARR:res.data.data
                });
            }else{
                dispatch({
                    type:types.CommentARR,
                    CommentARR:[]
                });
            }
        } catch (error) {  
            console.log(error);
        }

    }
}