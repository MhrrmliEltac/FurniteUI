import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <section style={{ marginTop: "12rem" }} className="auth-layout">
      <Outlet />
    </section>
  );
};

export default AuthLayout;
