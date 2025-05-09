import { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Icon } from "@iconify/react";
import "swiper/css";
import "swiper/css/scrollbar";
import "../../assets/styles/swiper.css";
import { Scrollbar } from "swiper/modules";
import { motion } from "framer-motion";
import { animation } from "../../utils/Animations";
import { Skeleton, Stack } from "@mui/material";
import { ProductDataType } from "@/types/Type";

const IsSaleSwiper = memo(
  ({ productData }: { productData: ProductDataType[] | null }) => {
    const skeletonCount = 5;

    return (
      <motion.section
        variants={animation}
        initial="initial"
        whileInView="animate"
        transition={{ duration: 1 }}
        className="swiper-section"
      >
        <Swiper
          slidesPerView={5}
          spaceBetween={50}
          scrollbar={{ draggable: true }}
          modules={[Scrollbar]}
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
            : Array.from({ length: skeletonCount }).map((_, index) => (
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
        <div className="swiper-scrollbar"></div>
      </motion.section>
    );
  }
);

export default IsSaleSwiper;
