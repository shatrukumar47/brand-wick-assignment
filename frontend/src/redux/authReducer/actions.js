import axios from "axios";
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../actionTypes";

export const userAPI = "https://brand-wick-backend.onrender.com/user"

//login
export const loginAction = (user) => (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    console.log(user)
    return axios
      .post(`${userAPI}/login`, user)
      .then((res) => {
        console.log(res)
        dispatch({ type: LOGIN_SUCCESS, payload: res?.data });
      })
      .catch((err) => {
        console.log(err);
        if(err?.response?.status === 400 && !err?.response?.data?.action){
            dispatch({ type: LOGIN_FAILURE , payload: err?.response?.data});
        }else{
            dispatch({ type: LOGIN_FAILURE , payload: {message: "Internal Server Error", action: false}});
        }
      });
};

//logout
export const logoutAction = () => (dispatch) => {
    dispatch({ type: LOGOUT_SUCCESS });
}