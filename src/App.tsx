import Navbar from "./components/header/Navbar";
import Footer from "./components/footer/Footer";
import Wishlist from "./components/pages/Wishlist";
import ProductDetail from "./components/pages/ProductDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { lazy, Suspense } from "react";
import Loader from "./components/general/Loader";
import "./assets/styles/home.css";
import AuthLayout from "./components/Layouts/AuthLayout";
import Login from "./components/auth/Login";

const HomePage = lazy(() => import("./components/pages/Home"));

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <Suspense fallback={<Loader />}>
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
          </Route>
          {/* <Route path="/add-product" element={<AddProduct />} />  Burada əlavə məhsul səhifəsini əlavə edə bilərsiniz */}
        </Routes>
        <Footer />
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
