import Wishlist from "./components/pages/Wishlist";
import ProductDetail from "./components/pages/ProductDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { lazy } from "react";
import AuthLayout from "./components/Layouts/AuthLayout";
import Login from "./components/auth/Login";
import SuspenseLayout from "./components/Layouts/SuspenseLayout";
import Register from "./components/auth/Register";
import useCheckAuth from "./components/utils/UseCheckAuth";
import "./assets/styles/home.css";

const HomePage = lazy(() => import("./components/pages/Home"));
const Navbar = lazy(() => import("./components/header/Navbar"));
const Footer = lazy(() => import("./components/footer/Footer"));

const App = () => {
  useCheckAuth();

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
          {/* <Route path="/add-product" element={<AddProduct />} />  Burada əlavə məhsul səhifəsini əlavə edə bilərsiniz */}
        </Routes>
        <Footer />
      </SuspenseLayout>
    </BrowserRouter>
  );
};

export default App;
