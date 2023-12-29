import axios from "axios";
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../actionTypes";
import { getLSItem } from "../../utility/localStorage";

// export const userAPI = "https://brand-wick-backend.onrender.com/user"
export const userAPI = "http://localhost:8080/user"

//login
export const loginAction = (user) => (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    return axios
      .post(`${userAPI}/login`, user)
      .then((res) => {
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
    const token = getLSItem("brandwick")?.accessToken || "";
    axios.post(`${userAPI}/logout`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    }).then((res)=>{
      if(res.status === 200 && res.data.action){
        dispatch({ type: LOGOUT_SUCCESS });
      }
    }).catch((error)=>{
      console.log(error)
    })
}