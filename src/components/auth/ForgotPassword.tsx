import React, { ChangeEvent, FormEvent, useState } from "react";
import { FormControl, FormLabel } from "@mui/material";
import { Input } from "../ui/input";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { api } from "@/utils/Api";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import WaitLoader from "../general/WaitLoader";
import "../../assets/styles/forgotpass.css";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const emailRegex =
      /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (email.length === 0) {
      toast.error("Please enter your email address.");
      return;
    }
    try {
      setLoading(true);
      const res = await api.post(
        "/forgot-password",
        { email: email },
        {
          withCredentials: true,
        }
      );
      sessionStorage.setItem("resetToken", res.data.resetToken);
      navigate("/reset-password");
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="reset-password-section container"
    >
      <div className="flex justify-center items-center h-[60vh]">
        <div className="flex flex-col gap-5 justify-center items-start w-full max-w-md md:w-[410px] h-[364px] p-6 bg-white rounded-lg shadow-md form-box">
          <h2 className="font-semibold text-xl text-[#161C2D]">
            Reset Your Password
          </h2>
          <p className="text-[12px] text-[#A3A3A3]">
            Please enter your email address. You will receive a link to create a
            new password via email.
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
                Email Address
              </FormLabel>
              <div className="rounded-[4px] flex gap-5 relative w-full border-2 border-[#E5E7EB]">
                <Input
                  className="border-none outline-none focus:border-none focus:ring-0 focus:outline-none w-full input focus-visible:border-none focus-visible:ring-ring/0 focus-visible:ring-[0px]"
                  type="email"
                  name="email"
                  id="name"
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    changeEmail(e)
                  }
                  placeholder="Enter email address"
                />
                <Icon
                  icon="mdi-light:email"
                  width="24"
                  height="24"
                  style={{ color: "#A3A3A3" }}
                  className="absolute top-1/2 left-3 -translate-y-1/2 icon"
                />
              </div>
              <Button
                onClick={handleSubmit}
                className="bg-[#4F46E5] text-white btn cursor-pointer h-[45px] hover:bg-[#4338CA]"
              >
                {loading ? <WaitLoader /> : "Send Now"}
              </Button>
            </FormControl>
          </form>
        </div>
      </div>
    </motion.section>
  );
};

export default ForgotPassword;
