import { deleteLSItem, getLSItem, setLSItem } from "../../utility/localStorage";
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../actionTypes";

const initialState = {
    isLoading: false,
    token: getLSItem("brandwick")?.accessToken,
    message: "",
    action: false,
    username: getLSItem("brandwick")?.username,
    isError: false
}


export const authReducer = (state = initialState, {type, payload})=>{
    switch (type) {
        case LOGIN_REQUEST:{
            return {...state, isLoading: true}
        }

        case LOGIN_SUCCESS:{
            if(payload?.action){
                let user = {
                    accessToken: payload?.accessToken,
                    username: payload?.username
                }
                setLSItem("brandwick", user)
            }
            return {...state, isLoading: false, token: getLSItem("brandwick")?.accessToken, message: payload?.message, action: payload?.action, username: getLSItem("brandwick")?.username , isError: false}
        }

        case LOGIN_FAILURE:{
            return {...state, isLoading: false, isError: true, message: payload?.message, action: payload?.action}
        }
        case LOGOUT_SUCCESS: {
            deleteLSItem("brandwick");
            return { ...initialState, isAuth: false, token: "" };
          }

        default:
            return initialState;
    }
}