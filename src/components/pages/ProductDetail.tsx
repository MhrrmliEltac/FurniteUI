import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { getProductById } from "../store/slice/ProductSlice";
import { Icon } from "@iconify/react/dist/iconify.js";
import NumberFlow from "@number-flow/react";
import "../../assets/styles/productdetail.css";
import { useSearchParams } from "react-router-dom";

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
  const [quantity, setQuantity] = useState(1);
  const [searchParams, _] = useSearchParams();
  const image: string | undefined = productById?.images[0];
  const dispatch = useAppDispatch();
  const productId: string | null = searchParams.get("id");

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

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <section className="product-detail-section">
      <div className="product-detail-box">
        <div className="product-detail">
          <div className="image-box-grid">
            {productById &&
              productById?.images.map((item) => (
                <div key={productById._id} className="left-image">
                  <img src={item} alt="" />
                </div>
              ))}
            <div className="right-image">
              <img src={image} alt="" />
            </div>
          </div>
          <div className="product-info">
            {productById && (
              <div className="product-info-container">
                <p className="product-id">{productById?._id}</p>
                <div className="product-detail-heading">
                  <h3>{productById?.name}</h3>
                  <div className="icon-box">
                    <Icon
                      icon="mdi:heart-outline"
                      width="30"
                      height="30"
                      className="icon"
                      style={{
                        color: "#284551",
                      }}
                    />
                    <Icon
                      icon="mynaui:share"
                      width="30"
                      height="30"
                      className="icon"
                      style={{ color: "#284551" }}
                    />
                  </div>
                </div>
                <div className="product-info-footer">
                  <p className="product-price">$ {productById?.price}</p>
                  <div className="product-color">
                    <p>Variations</p>
                    {productById.colors?.map((color) => (
                      <div
                        key={productById._id}
                        className="color"
                        style={{
                          backgroundColor: color,
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          border: "1px solid #3692A4",
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            )}
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
      </div>
    </section>
  );
};

export default ProductDetail;
