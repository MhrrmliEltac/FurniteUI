import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/hooks";
import { Icon } from "@iconify/react";
import { getCountryCallingCode, parsePhoneNumber } from "libphonenumber-js/max";
import { Input } from "../ui/input";
import { FormControl, FormLabel } from "@mui/material";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import "../../assets/styles/profile.css";
import Loader from "../general/RoundedLoader";

const Profile: React.FC = () => {
  const loading = useAppSelector((state) => state.userReducer.loading);
  const user = useAppSelector((state) => state.userReducer.user);
  const [_, setPhoneNumber] = useState<string | undefined>("");
  const [countryCode, setCountryCode] = useState<string>("");
  const [nationalNumber, setNationalNumber] = useState<string>("");

  const handlePhoneChange = (value: string | undefined) => {
    setPhoneNumber(value);

    if (value) {
      try {
        const parsedNumber = parsePhoneNumber(value || "");
        if (parsedNumber) {
          setCountryCode(
            `+${getCountryCallingCode(parsedNumber.country || "US")}`
          );
          setNationalNumber(parsedNumber.nationalNumber || "");
        }
      } catch (error) {
        console.error("Invalid phone number", error);
      }
    }
  };

  useEffect(() => {
    if (user.phoneNumber) {
      handlePhoneChange(user.phoneNumber);
    }
  }, [user.phoneNumber]);

  return (
    <section className="profile">
      {loading ? (
        <Loader />
      ) : (
        <div className="profile-section-box grid grid-cols-12 gap-5 w-full max-w-[1560px]">
          <div className="col-span-3 p-4">
            <div className="flex flex-col items-center gap-5">
              <div className="w-[320px] user-picture shadow-md bg-white rounded-[20px] flex justify-center items-center flex-col gap-2">
                <div className="rounded-full w-[200px] h-[200px] bg-blue-50 mx-auto mt-[-100px] flex items-center justify-center">
                  <Icon
                    icon="ri:user-fill"
                    width="105"
                    height="105"
                    style={{ color: "#000" }}
                  />
                </div>
                <h2 className="text-[#5900CA] text-3xl">@{user.userName}</h2>
                <p className="text-[#888888]">{user.email}</p>
              </div>
              <div className="w-[320px] user-info shadow-md bg-white rounded-[20px] flex justify-center items-center flex-col gap-3 text-[#000] font-bold">
                <h2 className="text-left w-[60%] text-[22px]">Information</h2>
                <ul className="flex flex-col gap-2">
                  <li className="flex justify-between">
                    Name:{" "}
                    <span className="w-1/2 font-medium">{user.userName}</span>
                  </li>
                  <li className="flex justify-between">
                    Email:{" "}
                    <span className="w-1/2 font-medium">{user.email}</span>
                  </li>
                  <li className="flex justify-between">
                    Tel:{" "}
                    <span className="font-medium text-right w-1/2">
                      {countryCode}
                      {nationalNumber}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-span-9 p-4 w-[80%] bg-white shadow-md rounded-[20px] user-details">
            <h1 className="setting-heaading">User Settings</h1>
            <div className="flex flex-col gap-5">
              <h2 className="font-bold text-[18px]">Details</h2>
              <form className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 input-box">
                  <FormControl>
                    <FormLabel sx={{ color: "#000", fontSize: "18px" }}>
                      Name
                    </FormLabel>
                    <Input
                      placeholder="Enter your name"
                      className="placeholder:text-xl w-full bg-[#B7B7B7] opacity-30 placeholder:text-[#000000] h-[45px] input"
                      type="text"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel sx={{ color: "#000", fontSize: "18px" }}>
                      Email
                    </FormLabel>
                    <Input
                      placeholder="Enter your email"
                      className="placeholder:text-xl w-full bg-[#B7B7B7] opacity-30 placeholder:text-[#000000] h-[45px] input"
                      type="email"
                    />
                  </FormControl>
                  <FormControl>
                    <div className="flex gap-14">
                      <FormLabel sx={{ color: "#000", fontSize: "18px" }}>
                        Tel
                      </FormLabel>
                      <FormLabel sx={{ color: "#000", fontSize: "18px" }}>
                        Number
                      </FormLabel>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder={countryCode}
                        className="w-[20%] placeholder:text-xl bg-[#B7B7B7] opacity-30 placeholder:text-[#000000] col-span-2 h-[45px] justify-center items-center flex country-code input"
                      />
                      <Input
                        placeholder={nationalNumber}
                        className="placeholder:text-xl w-full bg-[#B7B7B7] opacity-30 placeholder:text-[#000000] col-span-2 h-[45px] input"
                        type="tel"
                      />
                    </div>
                  </FormControl>
                </div>
                <Button className="btn">Save Changes</Button>
              </form>
              <h2 className="font-bold text-[18px]">Password</h2>
              <form className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-5 input-box">
                  <FormControl>
                    <FormLabel
                      htmlFor="change-pass"
                      sx={{ color: "#000", fontSize: "18px" }}
                    >
                      Change password
                    </FormLabel>
                    <div className="flex gap-10 input-div">
                      <Input
                        placeholder="Put your password..."
                        className="placeholder:text-xl w-full bg-[#B7B7B7] opacity-30 placeholder:text-[#000000] h-[45px] input"
                        type="password"
                        id="change-pass"
                      />
                      <Input
                        placeholder="Confirm password..."
                        className="placeholder:text-xl w-full bg-[#B7B7B7] opacity-30 placeholder:text-[#000000] h-[45px] input"
                        type="password"
                      />
                    </div>
                  </FormControl>

                  <FormControl>
                    <FormLabel
                      htmlFor="confirm-pass"
                      sx={{ color: "#000", fontSize: "18px" }}
                    >
                      New password
                    </FormLabel>
                    <div className="flex gap-10 input-div">
                      <Input
                        placeholder="Put your new password..."
                        className="placeholder:text-xl w-full bg-[#B7B7B7] opacity-30 placeholder:text-[#000000] h-[45px] input"
                        type="password"
                        id="confirm-pass"
                      />
                      <Input
                        placeholder="Confirm new password..."
                        className="placeholder:text-xl w-full bg-[#B7B7B7] opacity-30 placeholder:text-[#000000] h-[45px] input"
                        type="password"
                      />
                    </div>
                  </FormControl>
                </div>

                <div className="flex gap-[54px] items-center flex-wrap">
                  <Button className="btn">Save Changes</Button>
                  <Link
                    to="/"
                    className="font-semibold text-[18px] text-[#8A8A8A] link"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Profile;
