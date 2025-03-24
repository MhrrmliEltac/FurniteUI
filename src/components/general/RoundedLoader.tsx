import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div className="relative w-32 h-32">
          <div
            className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-r-[#5900CA] border-b-[#5900CA] animate-spin"
            style={{ animationDuration: "3s" }}
          ></div>
          <div
            className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-t-[#5900CA] animate-spin"
            style={{
              animationDuration: "2s",
              animationDirection: "reverse",
            }}
          ></div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-tr from-[#5900CA]/10 via-transparent to-[#5900CA]/5 animate-pulse rounded-full blur-sm"></div>
      </div>
    </div>
  );
};

export default Loader;
