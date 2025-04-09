import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { FormControl, FormLabel } from "@mui/material";
import { Input } from "../ui/input";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import "../../assets/styles/resetpass.css";

const ResetPassword: React.FC = () => {
  const token = sessionStorage.getItem("resetToken");
  const navigate = useNavigate();

  if (token) {
    const decodedToken: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      sessionStorage.removeItem("resetToken");
      navigate("/forgot-password");
    }
  }

  useEffect(() => {
    if (!token) {
      navigate("/forgot-password");
    }
  }, [token]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center w-[80%] reset-pass-section"
    >
      <div className="flex justify-center items-center h-[60vh]">
        <div className="flex flex-col gap-5 justify-center items-start w-full max-w-md md:w-[410px] h-[364px] p-6 bg-white rounded-lg shadow-md form-box">
          <h2 className="font-semibold text-xl text-[#161C2D]">
            Reset Your Password
          </h2>
          <p className="text-[12px] text-[#A3A3A3]">
            Please enter your new password.
          </p>
          <form className="w-full">
            <FormControl
              sx={{
                width: "100%",
              }}
            >
              <FormLabel
                htmlFor="email"
                sx={{
                  fontWeight: 700,
                  fontSize: "16px",
                  color: "#161C2D",
                  lineHeight: "24px",
                  marginBottom: "10px",
                }}
              >
                Password
              </FormLabel>
              <div className="rounded-[4px] flex gap-5 relative w-full border-2 border-[#E5E7EB]">
                <Input
                  className="border-none outline-none focus:border-none focus:ring-0 focus:outline-none w-full input focus-visible:border-none focus-visible:ring-ring/0 focus-visible:ring-[0px]"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter password"
                />
                <Icon
                  icon="qlementine-icons:password-16"
                  width="24"
                  height="24"
                  style={{ color: "#A3A3A3" }}
                  className="absolute top-1/2 left-2 -translate-y-1/2 icon"
                />
              </div>
              <Button className="bg-[#4F46E5] text-white btn cursor-pointer h-[45px] hover:bg-[#4338CA]">
                Send Now
              </Button>
            </FormControl>
          </form>
        </div>
      </div>
    </motion.section>
  );
};

export default ResetPassword;
