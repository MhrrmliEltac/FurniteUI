import Wishlist from "./components/pages/Wishlist";
import ProductDetail from "./components/pages/ProductDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { lazy } from "react";
import AuthLayout from "./components/Layouts/AuthLayout";
import Login from "./components/auth/Login";
import SuspenseLayout from "./components/Layouts/SuspenseLayout";
import Register from "./components/auth/Register";
import "./assets/styles/home.css";
import Profile from "./components/pages/Profile";
import UseCheckAuth from "./utils/UseCheckAuth";
import { ProtectedLayout } from "./components/Layouts/ProtectedLayout";

const HomePage = lazy(() => import("./components/pages/Home"));
const Navbar = lazy(() => import("./components/header/Navbar"));
const Footer = lazy(() => import("./components/footer/Footer"));

const App = () => {
  UseCheckAuth();

  return (
    <BrowserRouter>
      <Toaster />
      <SuspenseLayout>
        <Navbar />
        <Routes>
          {/* Home səhifəsi üçün route */}
          <Route path="/" element={<HomePage />} />{" "}
          {/* Favorilər səhifəsi üçün route */}
          <Route path="/wishlist" element={<Wishlist />} />{" "}
          {/* Məhsul özəllikləri səhifəsi üçün route */}
          <Route path="/product-detail" element={<ProductDetail />} />
          {/* Məhsul özəllikləri səhifəsi üçün route */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          {/* Profile səhifəsi üçün route */}
          <Route element={<ProtectedLayout />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          {/* <Route path="/add-product" element={<AddProduct />} />  Burada əlavə məhsul səhifəsini əlavə edə bilərsiniz */}
        </Routes>
        <Footer />
      </SuspenseLayout>
    </BrowserRouter>
  );
};

export default App;
