import React, { FormEvent, useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/hooks";
import { Icon } from "@iconify/react";
import { getCountryCallingCode, parsePhoneNumber } from "libphonenumber-js/max";
import { Input } from "../ui/input";
import { FormControl, FormLabel } from "@mui/material";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import Loader from "../general/RoundedLoader";
import "../../assets/styles/profile.css";

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

  const changeFormData = async (e: FormEvent) => {
    e.preventDefault();
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
        <div className="profile-section-box lg:grid lg:grid-cols-12 flex flex-col transition-all duration-200 gap-16 w-[80%] max-w-[1560px]">
          <div className="lg:col-span-3 p-4 transition-all duration-200">
            <div className="flex lg:flex-col lg:items-center md:flex-nowrap flex-wrap gap-5 transition-all duration-200">
              <div className="lg:w-[320px] w-full user-picture shadow-md bg-white rounded-[20px] flex justify-center items-center flex-col gap-2 transition-all duration-200">
                <div className="rounded-full w-[200px] h-[200px] bg-blue-50 mx-auto mt-[-100px] flex items-center justify-center transition-all duration-200">
                  <Icon
                    icon="ri:user-fill"
                    width="105"
                    height="105"
                    style={{ color: "#000" }}
                  />
                </div>
                <h2 className="text-[#5900CA] text-3xl transition-all duration-200">
                  @{user.userName}
                </h2>
                <p className="text-[#888888] transition-all duration-200">
                  {user.email}
                </p>
              </div>
              <div className="lg:w-[320px] w-full user-info shadow-md bg-white rounded-[20px] flex justify-center items-center flex-col gap-3 text-[#000] font-bold transition-all duration-200">
                <h2 className="text-left w-[60%] text-[22px] transition-all duration-200">
                  Information
                </h2>
                <ul className="flex flex-col gap-2 transition-all duration-200">
                  <li className="flex justify-between transition-all duration-200">
                    Name:{" "}
                    <span className="w-1/2 font-medium transition-all duration-200">
                      {user.userName}
                    </span>
                  </li>
                  <li className="flex justify-between transition-all duration-200">
                    Email:{" "}
                    <span className="w-1/2 font-medium transition-all duration-200">
                      {user.email}
                    </span>
                  </li>
                  <li className="flex justify-between transition-all duration-200">
                    Tel:{" "}
                    <span className="font-medium text-right w-1/2 transition-all duration-200">
                      {countryCode}
                      {nationalNumber}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="lg:col-span-9 p-4 transition-all duration-200 bg-white shadow-md rounded-[20px] user-details">
            <h1 className="setting-heaading transition-all duration-200">
              User Settings
            </h1>
            <div className="flex flex-col gap-5 transition-all duration-200">
              <h2 className="font-bold text-[18px] transition-all duration-200">
                Details
              </h2>
              <form className="flex flex-col gap-5 transition-all duration-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 input-box transition-all duration-200">
                  <FormControl>
                    <FormLabel sx={{ color: "#000", fontSize: "18px" }}>
                      Name
                    </FormLabel>
                    <Input
                      placeholder={user.userName}
                      className="placeholder:text-xl w-full bg-[#B7B7B7] opacity-30 placeholder:text-[#000000] h-[45px] input transition-all duration-200"
                      type="text"
                      disabled
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel sx={{ color: "#000", fontSize: "18px" }}>
                      Email
                    </FormLabel>
                    <Input
                      placeholder={user.email}
                      disabled
                      className="placeholder:text-xl w-full bg-[#B7B7B7] opacity-30 placeholder:text-[#000000] h-[45px] input transition-all duration-200"
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
                        className="w-[20%] placeholder:text-xl bg-[#B7B7B7] opacity-30 placeholder:text-[#000000] col-span-2 h-[45px] justify-center items-center flex country-code input transition-all duration-200"
                        disabled
                      />
                      <Input
                        placeholder={nationalNumber}
                        className="placeholder:text-xl w-full bg-[#B7B7B7] opacity-30 placeholder:text-[#000000] col-span-2 h-[45px] input transition-all duration-200"
                        type="tel"
                        disabled
                      />
                    </div>
                  </FormControl>
                </div>
                <Button
                  className="btn cursor-pointer transition-all duration-200"
                  type="submit"
                  onClick={changeFormData}
                >
                  Save Changes
                </Button>
              </form>
              <h2 className="font-bold text-[18px] transition-all duration-200">
                Password
              </h2>
              <form className="flex flex-col gap-5 transition-all duration-200">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-5 input-box transition-all duration-200">
                  <FormControl>
                    <FormLabel
                      htmlFor="change-pass"
                      sx={{ color: "#000", fontSize: "18px" }}
                    >
                      Change password
                    </FormLabel>
                    <div className="flex gap-10 input-div transition-all duration-200">
                      <Input
                        placeholder="Put your password..."
                        className="placeholder:text-xl w-full bg-[#B7B7B7] opacity-30 placeholder:text-[#000000] h-[45px] input transition-all duration-200"
                        type="password"
                        id="change-pass"
                      />
                      <Input
                        placeholder="Confirm password..."
                        className="placeholder:text-xl w-full bg-[#B7B7B7] opacity-30 placeholder:text-[#000000] h-[45px] input transition-all duration-200"
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
                    <div className="flex gap-10 input-div transition-all duration-200">
                      <Input
                        placeholder="Put your new password..."
                        className="placeholder:text-xl w-full bg-[#B7B7B7] opacity-30 placeholder:text-[#000000] h-[45px] input transition-all duration-200"
                        type="password"
                        id="confirm-pass"
                      />
                      <Input
                        placeholder="Confirm new password..."
                        className="placeholder:text-xl w-full bg-[#B7B7B7] opacity-30 placeholder:text-[#000000] h-[45px] input transition-all duration-200"
                        type="password"
                      />
                    </div>
                  </FormControl>
                </div>

                <div className="flex gap-[54px] items-center flex-wrap transition-all duration-200">
                  <Button
                    className="btn cursor-pointer transition-all duration-200"
                    type="submit"
                    onClick={changeFormData}
                  >
                    Save Changes
                  </Button>
                  <Link
                    to="/"
                    className="font-semibold text-[18px] text-[#8A8A8A] link transition-all duration-200"
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
