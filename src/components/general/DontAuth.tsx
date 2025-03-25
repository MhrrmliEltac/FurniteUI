import React from "react";
import { Button } from "../ui/button";
import ImageNotFound from "../../assets/images/Businessman searching for an answer.svg";
import { useNavigate } from "react-router-dom";

const DontAuth: React.FC = () => {
  const navigation = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-96">
      <h1 className="font-semibold text-2xl">OOPS!</h1>
      <img src={ImageNotFound} alt="" className="w-80 h-80" />
      <span className="text-[#514F4F] font-medium text-lg">
        There is no account found. Please click below to add your account
      </span>
      <Button
        onClick={() => navigation("/login")}
        className="bg-[#6083FF] px-10 py-5 text-xl btn cursor-pointer hover:bg-[#4F6EEC] hover:shadow-lg transition duration-200"
      >
        Add account
      </Button>
    </div>
  );
};

export default DontAuth;
