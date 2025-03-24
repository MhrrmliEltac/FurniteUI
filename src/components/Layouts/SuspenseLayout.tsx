import { Suspense } from "react";
import Loader from "../general/Loader";
import { useLocation } from "react-router-dom";

const SuspenseLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <Suspense fallback={<Loader />}>
      <div
        className={`${
          location.pathname === "/profile" ? "bg-[#f5f5f5]" : "bg-white"
        }`}
      >
        {children}
      </div>
    </Suspense>
  );
};

export default SuspenseLayout;
