import { createSlice } from "@reduxjs/toolkit";
import Storage from "../storage/Storage.js";

const initialState = {
    token: Storage.getToken(),
    userInfo: Storage.getUserInfo(),
    isRememberMe: Storage.isRememberMe(),
};

const userLoginSlice = createSlice({
    name: "userLoginInfo",
    initialState,
    reducers: {
        setUserLoginInfo: (state, action) => {
            state.userInfo = action.payload;
        },
        setTokenInfo: (state, action) => {
            state.token = action.payload;
        },
        setRememberMeInfo: (state, action) => {
            state.isRememberMe = action.payload;
        },
    },
});

export const { setUserLoginInfo, setTokenInfo, setRememberMeInfo } =
    userLoginSlice.actions;

export default userLoginSlice.reducer;

/** Selector **/
const userLoginInfoSelector = (state) => state.userLoginInfo;

export const selectToken = (state) => userLoginInfoSelector(state).token;
export const selectRememberMe = (state) => userLoginInfoSelector(state).isRememberMe;
export const selectUserInfo = (state) => userLoginInfoSelector(state).userInfo;

export const selectFullname = (state) => {
    const userInfo = selectUserInfo(state);
    return userInfo ? `${userInfo.firstname} ${userInfo.lastname}` : "";
};
