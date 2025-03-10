import { Swiper, SwiperSlide } from "swiper/react";
import { Icon } from "@iconify/react";
import "swiper/css";
import "swiper/css/scrollbar";
import "../../assets/styles/swiper.css";
import { Scrollbar } from "swiper/modules";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

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

const ProductSlider = ({
  productData,
}: {
  productData: ProductDataType[] | null;
}) => {
  return (
    <section className="swiper-section">
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        scrollbar={{ draggable: true }}
        modules={[Scrollbar]}
        breakpoints={{
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1200: { slidesPerView: 5 },
        }}
      >
        {productData && productData.length > 0
          ? productData.map((product) => (
              <SwiperSlide key={product._id}>
                <div className="slider-head">
                  <img
                    src={product.images[0] || "/default-image.jpg"}
                    alt={product.name}
                  />
                </div>
                <div className="slider-body">
                  <div className="slider-heading">
                    <h4>{product.name}</h4>
                    <Icon
                      icon="mdi:heart"
                      width="24"
                      height="24"
                      style={{ color: "#B0BFC9", cursor: "pointer" }}
                    />
                  </div>
                  <p className="product-color-count">
                    {product.colors.length} Colors
                  </p>
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
                </div>
              </SwiperSlide>
            ))
          : Array.from({ length: 5 }).map((_, index) => (
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
            ))}
      </Swiper>
    </section>
  );
};

export default ProductSlider;
