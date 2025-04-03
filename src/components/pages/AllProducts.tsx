import axios, { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import Loader from "../general/RoundedLoader";
import "../../assets/styles/allproduct.css";
import { ProductDataType } from "@/types/Type";

const AllProducts = () => {
  const [searchParams, _] = useSearchParams();
  const [categoryProduct, setCategoryProduct] = useState<
    ProductDataType[] | []
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const categoryName: string | null = searchParams.get("category");
  const isAuth = sessionStorage.getItem("auth");

  const getProductByCategory = async () => {
    setIsLoading(!isLoading);
    try {
      const response = await axios.get(
        `https://furniture-server-two.vercel.app/api/products/category?category=${categoryName}`
      );
      setCategoryProduct(response.data);
      setIsLoading(isLoading);
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  const addFavorite = async (id: string) => {
    try {
      if (isAuth) {
        const res = await axios.post(
          "https://furniture-server-two.vercel.app/api/favorite/add-favorite",
          {
            favorite: id,
          },
          {
            withCredentials: true,
          }
        );
        toast.success(res?.data.message);
        return;
      }
      toast.error("Unauthorized access!");
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  useEffect(() => {
    getProductByCategory();
  }, [categoryName]);

  return (
    <section className="products-section flex-col max-w-[1560px] h-full">
      <div className="category-name xl:w-[100%] w-[90%]">
        <p>Home / Category / {categoryName}</p>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center w-full  h-[50vh]">
          <Loader />
        </div>
      ) : (
        <div className="grid xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:w-[100%] w-[80%] gap-5">
          {categoryProduct && categoryProduct.length > 0 ? (
            categoryProduct?.map((item: ProductDataType, index: number) => (
              <motion.div
                initial={{ opacity: 0, translateX: -20, translateY: -20 }}
                animate={{
                  opacity: 1,
                  translateX: 0,
                  translateY: 0,
                  transition: { delay: 0.2 * index },
                }}
                key={item._id}
                className=" w-full"
              >
                <div className="w-full">
                  <img
                    src={item.images[0]}
                    alt=""
                    className="h-[260px] w-[260px] xl:w-full max-sm:w-full max-sm:h-full object-cover rounded-[24px]"
                  />
                </div>
                <div className="flex flex-col product-body gap-3">
                  <div className="flex justify-between">
                    <h2 className="font-bold">{item.name}</h2>
                    <Icon
                      icon="mdi:heart"
                      width="24"
                      height="24"
                      style={{ color: "#B0BFC9", cursor: "pointer" }}
                      onClick={() => addFavorite(item._id)}
                    />
                  </div>
                  {item.colors.map((color: string, index: number) => (
                    <motion.span
                      key={index}
                      style={{
                        backgroundColor: `${color}`,
                      }}
                      className={`w-5 h-5 rounded-full border-2 border-[#284155]`}
                    ></motion.span>
                  ))}
                  <span className="text-xl text-[#284551] font-semibold">
                    {item.price}
                  </span>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-lg text-black">Not found Product</div>
          )}
        </div>
      )}
    </section>
  );
};

export default AllProducts;
