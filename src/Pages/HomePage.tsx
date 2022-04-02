import React from "react";
import { useSelector } from "react-redux";
import { UserState } from "../Redux/Reducers/userReducer";
import { RootState } from "../Redux/store";

const HomePage = () => {
  //from combined redusers in store
  const userLogin = useSelector<RootState, UserState>(
    (state) => state.userLogin,
  );

  const { userInfo } = userLogin;
  const username = userInfo ? userInfo.username : "";
  return username ? (
    <h1>Welcome to the Home page {username}</h1>
  ) : (
    <h1>Welcome to the jungle</h1>
  );
};

export default HomePage;
