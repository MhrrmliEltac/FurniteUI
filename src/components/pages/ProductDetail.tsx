import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { getProductById, getViewedProduct } from "../store/slice/ProductSlice";
import { Icon } from "@iconify/react/dist/iconify.js";
import NumberFlow from "@number-flow/react";
import { useSearchParams } from "react-router-dom";
import ProductDetailFooter from "../productDetail/ProductDetailFooter";
import InformationPanel from "../productDetail/InformationPanel";
import PaymentPartner from "../productDetail/PaymentPartner";
import RecentlyViewed, { ProductDataType } from "../general/RecentlyViewed";
import Subscription from "../home/Subscription";
import { Skeleton } from "@mui/material";
import { toast } from "sonner";
import axios, { isAxiosError } from "axios";
import "../../assets/styles/productdetail.css";

type Dimensions = {
  width: string;
  height: string;
};

interface ProductById {
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
  dimensions: Dimensions;
  style: string[];
}

const ProductDetail = () => {
  const [productById, setProductById] = useState<ProductById | null>(null);
  const [viewedProduct, setViewed] = useState<ProductDataType[] | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [searchParams, _] = useSearchParams();
  const image: string | undefined = productById?.images[0];
  const productId: string | null = searchParams.get("id");
  const dispatch = useAppDispatch();
  const isAuth = sessionStorage.getItem("auth");

  const increaseQuantity = useCallback(() => {
    if (quantity < 10) {
      setQuantity((prev) => prev + 1);
    }
  }, [quantity]);

  const decreaseQuantity = useCallback(() => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  }, [quantity]);

  const getProduct = async () => {
    try {
      if (productId) {
        const response = await dispatch(getProductById(productId)).unwrap();
        setProductById(response);
      }
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  };

  const getAllViewedProduct = async () => {
    try {
      const response = await dispatch(getViewedProduct());
      setViewed(response.payload);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  useEffect(() => {
    getProduct();
    getAllViewedProduct();
  }, []);

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
      }
      toast.error("Unauthorized access!");
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  return (
    <section className="product-detail-section">
      <div className="product-detail-box">
        <div className="product-detail">
          <div className="image-box-grid">
            {!Array.isArray(productById?.images) ? (
              <Skeleton variant="rounded" width={96} height={96} />
            ) : (
              productById &&
              productById?.images.map((item) => (
                <div key={productById._id} className="left-image">
                  <img src={item} alt="" />
                </div>
              ))
            )}
            {!image ? (
              <Skeleton variant="rounded" height={520} width={500} />
            ) : (
              <div className="right-image">
                <img src={image} alt="" />
              </div>
            )}
          </div>
          <div className="product-info">
            <div className="product-info-container">
              {!productById ? (
                <Skeleton />
              ) : (
                <p className="product-id">{productById?._id}</p>
              )}
              <div className="product-detail-heading">
                {!productById ? (
                  <Skeleton variant="text" height={40} width={300} />
                ) : (
                  <h3>{productById?.name}</h3>
                )}
                {!productById ? (
                  <Skeleton variant="text" height={40} width={100} />
                ) : (
                  <div className="icon-box">
                    <Icon
                      icon="mdi:heart-outline"
                      width="30"
                      height="30"
                      className="icon"
                      style={{
                        color: "#284551",
                      }}
                      onClick={() => addFavorite(productById._id)}
                    />
                    <Icon
                      icon="mynaui:share"
                      width="30"
                      height="30"
                      className="icon"
                      style={{ color: "#284551" }}
                    />
                  </div>
                )}
              </div>
              <div className="product-info-footer">
                {!productById ? (
                  <Skeleton variant="text" height={40} width={150} />
                ) : (
                  <p className="product-price">$ {productById?.price}</p>
                )}
                <div className="product-color">
                  <p>Variations</p>
                  {productById?.colors?.map((color) => (
                    <span
                      key={productById?._id}
                      className="color"
                      style={{
                        backgroundColor: color,
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        border: "1px solid #3692A4",
                      }}
                    ></span>
                  ))}
                </div>
              </div>
            </div>
            <div className="button-box">
              <div className="buttons">
                <button className="first-btn">
                  Add to Cart{" "}
                  <Icon
                    icon="mingcute:shopping-bag-2-line"
                    width="24"
                    height="24"
                    className="icon"
                    style={{
                      color: "#284551",
                    }}
                  />
                </button>
                <button className="second-btn">Buy Now</button>
              </div>
              <div className="product-quantity">
                <button
                  style={{
                    cursor: quantity === 10 ? "not-allowed" : "pointer",
                  }}
                  onClick={increaseQuantity}
                >
                  +
                </button>
                <span>
                  <NumberFlow value={quantity} />
                </span>
                <button
                  style={{ cursor: quantity === 1 ? "not-allowed" : "pointer" }}
                  onClick={decreaseQuantity}
                >
                  -
                </button>
              </div>
            </div>
          </div>
        </div>
        <ProductDetailFooter
          material={productById?.material ?? []}
          description={productById?.description ?? ""}
          structureColor={productById?.structureColor ?? []}
          style={productById?.style ?? []}
          dimensions={productById?.dimensions ?? ({} as Dimensions)}
        />
      </div>
      <InformationPanel />
      <PaymentPartner />
      <div className="viewed-box">
        <RecentlyViewed
          productData={viewedProduct}
          show={{ isVisible: false }}
        />
      </div>
      <Subscription />
    </section>
  );
};

export default ProductDetail;
