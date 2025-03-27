import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import ProductSlider from "../general/Swiper";
import IsSaleSwiper from "./IsSaleSwiper";
import Heading from "../general/Heading";
import { useAppSelector } from "@/hooks/hooks";

interface ProductDataType {
  _id: string;
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

const HomeSection = () => {
  const [productData, setProductData] = useState<ProductDataType[] | null>(
    null
  );
  const [isSaleProduct, setIsSaleProduct] = useState<ProductDataType[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const activeTab = useAppSelector((state) => state.productReducer.activeTab);

  const getProducts = async () => {
    setIsLoading(true);
    const response = await axios.get(
      `https://furniture-server-two.vercel.app/api/products/category?category=${activeTab}`
    );
    const product = await response.data;
    setProductData(product);
    setIsLoading(false);
  };

  const allProductData = async () => {
    const response = await axios.get(
      "https://furniture-server-two.vercel.app/api/products"
    );
    const allProduct = await response.data;
    const filteredData = allProduct.filter(
      (item: ProductDataType) => item.isOnSale === true
    );
    setIsSaleProduct(filteredData);
  };

  useEffect(() => {
    allProductData();
  }, []);

  useEffect(() => {
    getProducts();
  }, [activeTab]);

  return (
    <motion.section className="home-section">
      <Heading title="Popular Chairs" btnTitle="View All" />
      <ProductSlider
        isLoading={isLoading}
        productData={productData}
        show={{ isVisible: false }}
      />
      <Heading title="Products on Sale" btnTitle="View All" />
      <IsSaleSwiper productData={isSaleProduct} />
    </motion.section>
  );
};

export default HomeSection;
