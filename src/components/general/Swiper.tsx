import { Swiper, SwiperSlide } from "swiper/react";
import { Icon } from "@iconify/react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { Scrollbar } from "swiper/modules";
import { toast } from "sonner";
import { useAppDispatch } from "@/hooks/hooks";
import { deleteFavorite } from "../store/slice/FavoriteSlice";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import axios, { isAxiosError } from "axios";
import "swiper/css";
import "swiper/css/scrollbar";
import "../../assets/styles/swiper.css";
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

interface ShowProps {
  isVisible?: boolean;
}

const ProductSlider = ({
  productData,
  show,
  isFavorite,
  isLoading,
}: {
  productData: ProductDataType[] | null;
  show: ShowProps;
  isFavorite?: boolean;
  isLoading?: boolean;
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuth = sessionStorage.getItem("auth");

  const deleteFavoriteById = async (id: string) => {
    try {
      dispatch(deleteFavorite(id));
      toast.success("Favorite deleted successfully");
    } catch (error) {
      toast.error("Failed to delete favorite");
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
      } else {
        toast.error("Unauthorized access!");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  const addToCart = async (id: string) => {
    try {
      const res = await axios.post(
        "https://furniture-server-two.vercel.app/api/cart/add-cart",
        {
          items: [
            {
              productId: id,
              quantity: 1,
            },
          ],
        }
      );
      console.log(res);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  return (
    <section className="swiper-section">
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        scrollbar={{ draggable: true }}
        modules={[Scrollbar]}
        breakpoints={{
          480: { slidesPerView: 1 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1200: { slidesPerView: 5 },
        }}
      >
        {productData && productData.length > 0 ? (
          productData.map((product: ProductDataType) => (
            <SwiperSlide key={product._id}>
              <div
                className="slider-head"
                onClick={() =>
                  navigate({
                    pathname: "/product-detail",
                    search: `${createSearchParams({
                      id: product._id,
                    })}`,
                  })
                }
              >
                <img
                  src={product.images[0] || "/default-image.jpg"}
                  alt={product.name}
                />
              </div>
              <div className="slider-body">
                <div className="slider-heading">
                  <h4>{product.name}</h4>
                  {isFavorite ? (
                    <Icon
                      icon="mingcute:delete-fill"
                      width="24"
                      height="24"
                      style={{ color: "#B0BFC9", cursor: "pointer" }}
                      onClick={() => deleteFavoriteById(product._id)}
                    />
                  ) : (
                    <Icon
                      icon="mdi:heart"
                      width="24"
                      height="24"
                      style={{ color: "#B0BFC9", cursor: "pointer" }}
                      onClick={() => addFavorite(product._id)}
                    />
                  )}
                </div>
                <div className="color-box">
                  <p className="product-color-count">
                    {product.colors.length} Colors
                  </p>
                  {show?.isVisible &&
                    product.colors.map((color, index) => (
                      <span
                        key={index}
                        style={{
                          backgroundColor: color,
                          width: 20,
                          height: 20,
                          display: "inline-block",
                          marginRight: 5,
                          borderRadius: "50%",
                          border: "1px solid #333e47",
                          cursor: "pointer",
                        }}
                      ></span>
                    ))}
                </div>
                <div className="price-box">
                  <p className="product-price">
                    {product.isOnSale ? (
                      <>
                        <span
                          style={{
                            textDecoration: "line-through",
                            color: "#bd6969",
                            marginRight: "8px",
                          }}
                        >
                          ${product.price}
                        </span>
                        ${product.discountPrice}
                      </>
                    ) : (
                      `$${product.price}`
                    )}
                  </p>
                  <div className="icon-box">
                    <Icon
                      icon="mingcute:shopping-bag-2-line"
                      width="25"
                      height="25"
                      className="icon"
                      style={{
                        color: "#2C6272",
                      }}
                      onClick={() => addToCart(product._id)}
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))
        ) : isLoading === true ? (
          Array.from({ length: 5 }).map((_, index) => (
            <SwiperSlide key={index}>
              <Stack spacing={1}>
                <Skeleton variant="rounded" width={250} height={200} />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem" }}
                  width={200}
                />
                <Skeleton variant="text" width={150} />
                <Skeleton variant="rounded" width={100} height={20} />
              </Stack>
            </SwiperSlide>
          ))
        ) : (
          <p className="font-semibold text-3xl text-[#333e47]">
            Empty Favorite
          </p>
        )}
      </Swiper>
    </section>
  );
};

export default ProductSlider;
