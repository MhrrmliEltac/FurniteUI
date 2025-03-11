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
  itemId: item;
  userId: string;
  viewedAt: string;
}

interface item {
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

const RecentlyViewed = ({
  productData,
  show,
}: {
  productData: ProductDataType[] | null;
  show: ShowProps;
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
              <SwiperSlide key={product.itemId._id}>
                <div className="slider-head">
                  <img
                    src={product.itemId.images[0] || "/default-image.jpg"}
                    alt={product.itemId.name}
                  />
                </div>
                <div className="slider-body">
                  <div className="slider-heading">
                    <h4>{product.itemId.name}</h4>
                    <Icon
                      icon="mdi:heart"
                      width="24"
                      height="24"
                      style={{ color: "#B0BFC9", cursor: "pointer" }}
                    />
                  </div>
                  <div className="color-box">
                    <p className="product-color-count">
                      {product.itemId.colors.length} Colors
                    </p>
                    {show?.isVisible &&
                      product.itemId.colors.map((color, index) => (
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
                      {product.itemId.isOnSale ? (
                        <>
                          <span
                            style={{
                              textDecoration: "line-through",
                              color: "#bd6969",
                              marginRight: "8px",
                            }}
                          >
                            ${product.itemId.price}
                          </span>
                          ${product.itemId.discountPrice}
                        </>
                      ) : (
                        `$${product.itemId.price}`
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
                      />
                    </div>
                  </div>
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

export default RecentlyViewed;
