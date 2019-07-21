import {fromJS} from 'immutable';
import * as types from './action-type';

const initState = {
    user: {
        username: "",
        phone: "",
        birthday: "",
        email: "",
        myAvatar: "",
        status: false,
    },
    publicPem: "",
    uploadMyAvatar: "",
    blogData: [],
    loadingBlog: true,
    isADDBlog: true,
    CommentARR : []
};

const reducer = (state = initState, action) => {
    let newList;
    switch (action.type) {
        case types.getUsername:
            newList = fromJS(state).setIn(['user'], fromJS(action.user), fromJS(action.myAvatar));
            return newList.toJS();
        case types.getLoginStatus:
            newList = fromJS(state).setIn(['user'], fromJS(action.user), fromJS(action.myAvatar));
            return newList.toJS();
        case types.Logout:
            newList = fromJS(state).setIn(['user'], fromJS(action.user), fromJS(action.myAvatar));
            return newList.toJS();
        case types.PublicPem:
            newList = fromJS(state).setIn(['publicPem'], fromJS(action.publicPem));
            return newList.toJS();
        case types.UploadAvatar:
            newList = fromJS(state).setIn(['uploadMyAvatar'], fromJS(action.uploadMyAvatar));
            return newList.toJS();
        case types.UpdateUser:
            newList = fromJS(state).setIn(['user'], fromJS(action.user));
            return newList.toJS();
        case types.GetBlog:
            newList = fromJS(state).set("blogData", fromJS(state).get("blogData").concat(action.blogData))
            .setIn(["isADDBlog"], fromJS(action.isADDBlog));
            return newList.toJS();
        case types.LoadingBlog:
            newList = fromJS(state).setIn(["loadingBlog"], fromJS(action.loadingBlog));
            return newList.toJS();
        case types.ClearBlog:
            newList = fromJS(state).set("blogData", fromJS(state).get("blogData").clear());
            return newList.toJS();
        case types.CommentARR:
            newList = fromJS(state).set("CommentARR",fromJS(action.CommentARR));
            return newList.toJS();
        default:
            return state;
    }
}

export default reducer;