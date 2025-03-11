import "./assets/styles/home.css";
import { Toaster } from "sonner";
import Navbar from "./components/header/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./components/pages/Home";
import Wishlist from "./components/pages/Wishlist";
// import AddProduct from "./components/AddProduct";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home səhifəsi üçün route */}
        <Route path="/wishlist" element={<Wishlist />} />{" "}
        {/* <Route path="/add-product" element={<AddProduct />} />  Burada əlavə məhsul səhifəsini əlavə edə bilərsiniz */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
