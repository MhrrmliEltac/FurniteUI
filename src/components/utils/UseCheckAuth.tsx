import { useAppDispatch } from "@/hooks/hooks";
import { useEffect } from "react";
import { getProfileToken } from "../store/slice/UserSlice";

const UseCheckAuth = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = localStorage.getItem("auth");

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getProfileToken());
    }
  }, [dispatch]);
};

export default UseCheckAuth;
