import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import ProductSlider from "../general/Swiper";
import IsSaleSwiper from "./IsSaleSwiper";
import Heading from "../general/Heading";
import { useAppSelector } from "@/hooks/hooks";
import { ProductDataType } from "@/types/Type";

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
      <Heading title="Popular Chairs" btnTitle="View All" path="category" />
      <ProductSlider
        isLoading={isLoading}
        productData={productData}
        show={{ isVisible: false }}
      />
      <Heading title="Products on Sale" btnTitle="View All" path="sale" />
      <IsSaleSwiper productData={isSaleProduct} />
    </motion.section>
  );
};

export default HomeSection;
