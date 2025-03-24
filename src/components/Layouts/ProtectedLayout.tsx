import { Outlet } from "react-router-dom";
import Login from "../auth/Login";

export const ProtectedLayout = () => {
  const isAuth = sessionStorage.getItem("auth");

  return <section>{isAuth ? <Outlet /> : <Login />}</section>;
};
