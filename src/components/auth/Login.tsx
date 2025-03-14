import React, { ChangeEvent, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Box, Button, FormControl, FormGroup, FormLabel } from "@mui/material";
import LoginImage from "../../assets/images/login-rightt-image.svg";
import { Link } from "react-router-dom";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import "../../assets/styles/login.css";
import { api } from "../utils/Api";

const Login: React.FC = () => {
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    {
      email: "",
      password: "",
    }
  );

  const sendForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Enter email or password");
      return;
    }

    try {
      const response = await api.post("/login", formData, {
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
    <section className="login-section">
      <div className="login-section-header">
        <h1>Welcome! Lets Start to Decorate Your Space</h1>
      </div>
      <div className="login">
        <div className="left-side" style={{ backgroundColor: "#DAF1F3" }}>
          <div className="login-heading">
            <h2>Sign in to Your Account</h2>
            <p>Enter your Phone number and Password.</p>
          </div>
          <div className="login-body">
            <form onSubmit={sendForm}>
              <FormGroup
                sx={{ display: "flex", gap: "30px", flexDirection: "column" }}
                className="form-group"
              >
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
                      icon="mynaui:telephone"
                      width="24"
                      height="24"
                      style={{ color: "#B0BFC9" }}
                      className="icon"
                    />
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="e.g. 0123456789"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleInputChange(e)
                      }
                      value={formData.email}
                    />
                  </Box>
                </FormControl>
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
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter here"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleInputChange(e)
                      }
                      value={formData.password}
                    />
                    <Icon
                      icon="iconamoon:eye-light"
                      width="28"
                      height="28"
                      style={{ color: "#B0BFC9" }}
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
                Log in
              </Button>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "20px",
                  marginTop: "-30px",
                  transition: "all 0.5s ease",
                  flexWrap: "wrap",
                }}
              >
                <Button
                  sx={{
                    width: {
                      xs: "100%",
                      md: "40%",
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
                      md: "40%",
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
              Are you a New Member?{" "}
              <Link to="/register" className="navigate-link">
                Create an New Account
              </Link>
            </div>
          </div>
        </div>
        <div className="right-side">
          <img src={LoginImage} alt="" />
          <div className="overlay">
            <h3 className="overlay-heading">
              Create your space as your dreamed!
            </h3>
            <p className="overlay-paragraph">
              Simply Order and Get the Best Quality furniture at your doorsteps
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
