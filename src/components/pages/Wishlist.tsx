import axios from "axios";
import ProductSlider from "../general/Swiper";
import RecentlyViewed from "../general/RecentlyViewed";
import DontAuth from "../general/DontAuth";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getFavorite } from "../store/slice/FavoriteSlice";
import "../../assets/styles/wishlist.css";
import { ProductUserDataType } from "@/types/Type";

const Wishlist = () => {
  const [viewed, setViewed] = useState<ProductUserDataType[] | null>(null);
  const dispatch = useAppDispatch();
  const isAuth = sessionStorage.getItem("auth");
  const favoriteState = useAppSelector(
    (state) => state.favoriteReducer.favorite
  );
  const isLoading = useAppSelector((state) => state.favoriteReducer.loading);

  const getAllViewed = async () => {
    const response = await axios.get(
      "https://furniture-server-two.vercel.app/api/viewed/recently-viewed/1234"
    );
    const product = response.data;
    setViewed(product);
  };

  useEffect(() => {
    getAllViewed();
    dispatch(getFavorite());
  }, []);

  return (
    <section className="wishlist-section" style={{ marginTop: "200px" }}>
      {!isAuth ? (
        <DontAuth />
      ) : (
        <div className="wishlist-box">
          <div className="wishlist-heading">
            <h3>Wishlist</h3>
          </div>
          <ProductSlider
            productData={favoriteState}
            show={{ isVisible: true }}
            isFavorite={true}
            isLoading={isLoading}
          />
          <div className="viewed-heading">
            <h3>Recently Viewed</h3>
          </div>
          <RecentlyViewed productData={viewed} show={{ isVisible: false }} />
        </div>
      )}
    </section>
  );
};

export default Wishlist;
