import axios from "axios";
import { useEffect, useState } from "react";
import "../../assets/styles/wishlist.css";
import ProductSlider from "../general/Swiper";
import RecentlyViewed from "../general/RecentlyViewed";

interface item {
  _id: string;
  itemId: string;
  name: string;
  category: string;
  subCategory: string;
  brand: string;
  price: number;
  discountPrice: number;
  discountPercent: number;
  description: string;
  stock: number;
  colors: string[];
  structureColor: string[];
  material: string[];
  size: string[];
  images: string[];
  isPopular: boolean;
  isOnSale: boolean;
}

interface ProductDataType {
  _id: string;
  itemId: item;
  userId: string;
  viewedAt: string;
}

const Wishlist = () => {
  const [allProduct, setAllProduct] = useState<item[] | null>(null);
  const [viewed, setViewed] = useState<ProductDataType[] | null>(null);

  const getAllProducts = async () => {
    try {
      const response = await axios.get(
        "https://furniture-server-theta.vercel.app/api/products/category?category=Chair"
      );
      setAllProduct(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const getAllViewed = async () => {
    const response = await axios.get(
      "https://furniture-server-theta.vercel.app/api/viewed/recently-viewed/1234"
    );
    const product = response.data;
    setViewed(product);
  };

  useEffect(() => {
    getAllProducts();
    getAllViewed();
  }, []);

  return (
    <section className="wishlist-section" style={{ marginTop: "200px" }}>
      <div className="wishlist-box">
        <div className="wishlist-heading">
          <h3>Wishlist</h3>
        </div>
        <ProductSlider productData={allProduct} show={{ isVisible: true }} />
        <div className="viewed-heading">
          <h3>Recently Viewed</h3>
        </div>
        <RecentlyViewed productData={viewed} show={{ isVisible: false }} />
      </div>
    </section>
  );
};

export default Wishlist;
