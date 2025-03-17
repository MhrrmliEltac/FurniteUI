import { Suspense } from "react";
import Loader from "../general/Loader";

const SuspenseLayout = ({ children }: { children: React.ReactNode }) => {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
};

export default SuspenseLayout;
