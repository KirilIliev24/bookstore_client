import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from "../userConstants";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "../store";
import jwt from "jwt-decode";
import axiosSetup from "../../AxiosSetup";

//add password hashing!!!!!!!!!
export const login =
  (
    username: string,
    password: string,
  ): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
  async (
    dispatch: ThunkDispatch<RootState, unknown, AnyAction>,
  ): Promise<void> => {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    console.log(username);
    console.log(password);
    // fetch data from backend
    axiosSetup
      .post<string>("/users/login", {
        username: username,
        hashPassword: password,
      })
      .then((result) => {
        //const jwt = result.data
        const decodedJWT: any = jwt(result.data);
        console.log(decodedJWT);
        const name =
          decodedJWT[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
          ];

        const userData = { username: name, token: result.data };

        // pass data to reducer
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: userData,
        });
        localStorage.setItem("userInfo", JSON.stringify(userData));
      })
      .catch((error) => {
        if (error.response) {
          dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response.data,
          });
        }
      });
  };

export const logout =
  (): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
  async (
    dispatch: ThunkDispatch<RootState, unknown, AnyAction>,
  ): Promise<void> => {
    dispatch({
      type: USER_LOGOUT,
    });
    localStorage.removeItem("userInfo");
  };

export const register =
  (
    username: string,
    password: string,
  ): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
  async (
    dispatch: ThunkDispatch<RootState, unknown, AnyAction>,
  ): Promise<void> => {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    axiosSetup
      .post<string>("/users/register", {
        username: username,
        hashPassword: password,
      })
      .then((result) => {
        const userData = { username: result.data };

        // pass data to reducer
        dispatch({
          type: USER_REGISTER_SUCCESS,
          payload: userData,
        });
        localStorage.setItem("userInfo", JSON.stringify(userData));
      })
      .catch((error) => {
        if (error.response) {
          dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response.data,
          });
        }
      });
  };
