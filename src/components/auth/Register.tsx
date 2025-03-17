import React, { ChangeEvent, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Box, Button, FormControl, FormGroup, FormLabel } from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { api } from "../utils/Api";
import AuthHeading from "./AuthHeading";
import RegisterImage from "../../assets/images/unsplash__HqHX3LBN18.svg";
import PhoneInput from "react-phone-number-input";
import "../../assets/styles/register.css";
import "react-phone-number-input/style.css";

const Register: React.FC = () => {
  const [formData, setFormData] = useState<{
    userName: string;
    phoneNumber: string | undefined;
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    userName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [show, setShow] = useState<{
    showPass: boolean;
    showconfirmPassword: boolean;
  }>({
    showPass: false,
    showconfirmPassword: false,
  });

  const sendForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password.length < 8) {
      toast.error("Password min 8 characters");
      return;
    }

    if (formData.confirmPassword !== formData.password) {
      toast.error("Password do not match");
      return;
    }

    if (!formData.email || !formData.password) {
      toast.error("Enter email or password");
      return;
    }

    try {
      const response = await api.post("/register", formData, {
        withCredentials: true,
      });

      if (response) {
        getData();
      }

      toast.success(response.data.message);
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  const getData = async () => {
    const response = await api.get("/profile");
    console.log(response);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section className="register-section">
      <AuthHeading />
      <div className="register">
        <div className="right-side">
          <img src={RegisterImage} alt="" />
          <div className="overlay">
            <h3 className="overlay-heading">
              Get creative Solution for your Space
            </h3>
            <p className="overlay-paragraph">
              Order furniture as you need to decorate your home, office or
              living{" "}
            </p>
          </div>
        </div>
        <div className="left-side" style={{ backgroundColor: "#DAF1F3" }}>
          <div className="login-heading">
            <h2>Create a New Account</h2>
            <p>Share some Information to get the Best Service!</p>
          </div>
          <div className="login-body">
            <form onSubmit={sendForm}>
              <FormGroup
                sx={{ display: "flex", gap: "30px", flexDirection: "column" }}
                className="form-group"
              >
                {/* userName */}
                <FormControl
                  sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
                >
                  <FormLabel htmlFor="userName" className="form-label">
                    Full Name
                  </FormLabel>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      border: "none",
                      padding: "16px 0px",
                      outline: "none",
                      backgroundColor: "#fff",
                      fontSize: "20px",
                      borderRadius: "8px",
                      gap: "10px",
                      paddingLeft: "20px",
                    }}
                  >
                    <Icon
                      icon="lets-icons:user-light"
                      width="28"
                      height="28"
                      style={{ color: "#B0BFC9" }}
                      className="icon"
                    />
                    <input
                      type="text"
                      name="userName"
                      id="userName"
                      placeholder="e.g. steve@email.com"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleInputChange(e)
                      }
                      value={formData.userName}
                    />
                  </Box>
                </FormControl>
                {/* email */}
                <FormControl
                  sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
                >
                  <FormLabel htmlFor="email" className="form-label">
                    Email address
                  </FormLabel>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      border: "none",
                      padding: "16px 0px",
                      outline: "none",
                      backgroundColor: "#fff",
                      fontSize: "20px",
                      borderRadius: "8px",
                      gap: "10px",
                      paddingLeft: "20px",
                    }}
                  >
                    <Icon
                      icon="formkit:email"
                      width="24"
                      height="24"
                      style={{ color: "#B0BFC9" }}
                      className="icon"
                    />
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="e.g. steve@email.com"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleInputChange(e)
                      }
                      value={formData.email}
                    />
                  </Box>
                </FormControl>
                {/* phone number */}
                <FormControl
                  sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
                >
                  <FormLabel htmlFor="userName" className="form-label">
                    Phone Number
                  </FormLabel>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      border: "none",
                      padding: "16px 0px",
                      outline: "none",
                      backgroundColor: "#fff",
                      fontSize: "20px",
                      borderRadius: "8px",
                      gap: "10px",
                      paddingLeft: "20px",
                    }}
                  >
                    <PhoneInput
                      placeholder="e.g. 0123456789"
                      value={formData.phoneNumber}
                      onChange={(e: string | undefined) =>
                        setFormData((prev) => ({ ...prev, phoneNumber: e }))
                      }
                    />
                  </Box>
                </FormControl>
                {/* password */}
                <FormControl
                  sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
                >
                  <FormLabel htmlFor="password" className="form-label">
                    Password
                  </FormLabel>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      border: "none",
                      padding: "16px 0px",
                      outline: "none",
                      backgroundColor: "#fff",
                      fontSize: "20px",
                      borderRadius: "8px",
                      gap: "10px",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                    }}
                  >
                    <Icon
                      icon="majesticons:lock-line"
                      width="24"
                      height="24"
                      style={{ color: "#B0BFC9" }}
                    />
                    <input
                      type={show.showPass ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="Minimum 8 Characters"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleInputChange(e)
                      }
                      value={formData.password}
                    />
                    <Icon
                      icon="iconamoon:eye-light"
                      width="28"
                      height="28"
                      style={{ color: "#B0BFC9", cursor: "pointer" }}
                      onClick={() =>
                        setShow((prev) => ({
                          ...prev,
                          showPass: !prev.showPass,
                        }))
                      }
                    />
                  </Box>
                </FormControl>
                {/* confirm password */}
                <FormControl
                  sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
                >
                  <FormLabel htmlFor="confirm-pass" className="form-label">
                    Confirm Password
                  </FormLabel>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      border: "none",
                      padding: "16px 0px",
                      outline: "none",
                      backgroundColor: "#fff",
                      fontSize: "20px",
                      borderRadius: "8px",
                      gap: "10px",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                    }}
                  >
                    <Icon
                      icon="majesticons:lock-line"
                      width="24"
                      height="24"
                      style={{ color: "#B0BFC9" }}
                    />
                    <input
                      type={show.showconfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      id="confirm-pass"
                      placeholder="Re write your password"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleInputChange(e)
                      }
                      value={formData.confirmPassword}
                    />
                    <Icon
                      icon="iconamoon:eye-light"
                      width="28"
                      height="28"
                      style={{ color: "#B0BFC9", cursor: "pointer" }}
                      onClick={() =>
                        setShow((prev) => ({
                          ...prev,
                          showconfirmPassword: !prev.showconfirmPassword,
                        }))
                      }
                    />
                  </Box>
                </FormControl>
                <span>Forgot password?</span>
              </FormGroup>
              <Button
                type="submit"
                sx={{
                  width: "100%",
                  backgroundColor: "#284551",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "16px 0px",
                  color: "#F9FAFB",
                  fontSize: "16px",
                  fontWeight: "500",
                  fontFamily: "McLaren",
                  borderRadius: "8px",
                }}
              >
                Create Your Account
              </Button>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "10px",
                  marginTop: "-30px",
                  transition: "all 0.5s ease",
                  flexWrap: "wrap",
                }}
              >
                <Button
                  sx={{
                    width: {
                      xs: "100%",
                      md: "45%",
                    },
                    backgroundColor: "#FFFFFF",
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "16px 0px",
                    fontSize: "16px",
                    fontWeight: "500",
                    fontFamily: "McLaren",
                    gap: "10px",
                    color: "#425462",
                    textTransform: "none",
                  }}
                  className="btn"
                >
                  <span> Continue with Google</span>
                  <Icon icon="flat-color-icons:google" width="24" height="24" />
                </Button>
                <Button
                  sx={{
                    width: {
                      xs: "100%",
                      md: "45%",
                    },
                    backgroundColor: "#FFFFFF",
                    borderRadius: "8px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "16px 0px",
                    fontSize: "16px",
                    fontWeight: "500",
                    fontFamily: "McLaren",
                    gap: "10px",
                    color: "#425462",
                    textTransform: "none",
                  }}
                  className="btn"
                >
                  <span> Continue with Apple</span>
                  <Icon
                    icon="ic:baseline-apple"
                    width="24"
                    height="24"
                    style={{ color: "#000" }}
                  />
                </Button>
              </Box>
            </form>
            <div className="create-account-navigate">
              Already have an account?
              <Link to="/login" className="navigate-link">
                Log in to Your Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
