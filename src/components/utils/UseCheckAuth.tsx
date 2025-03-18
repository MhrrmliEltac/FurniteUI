import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { getProfileToken } from "../store/slice/UserSlice";

const useCheckAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProfileToken());
  }, [dispatch]);
};

export default useCheckAuth;
