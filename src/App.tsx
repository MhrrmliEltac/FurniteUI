import "./assets/styles/home.css";
import { Toaster } from "sonner";
import Navbar from "./components/header/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./components/pages/Home";
// import AddProduct from "./components/AddProduct";

const App = () => {
  return (
    <main>
      <Toaster />
      <Navbar />
      <Home />
      <Footer />
      {/* <AddProduct /> */}
    </main>
  );
};

export default App;
