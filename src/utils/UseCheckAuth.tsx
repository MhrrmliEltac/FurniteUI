import { useAppDispatch } from "@/hooks/hooks";
import { useEffect } from "react";
import { getProfileToken } from "../components/store/slice/UserSlice";

const UseCheckAuth = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = sessionStorage.getItem("auth");

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getProfileToken());
    }
  }, [dispatch]);
};

export default UseCheckAuth;
