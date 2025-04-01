import React, { useEffect } from "react";
import CartItem from "../cart/CartItem";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getCartItem } from "../store/slice/CheckOut";
import DontAuth from "../general/DontAuth";
import PaymentDetail from "../cart/PaymentDetail";
import Loader from "../general/RoundedLoader";
import "../../assets/styles/checkout.css";

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartProduct = useAppSelector((state) => state.checkReducer.cart);
  const isLoading = useAppSelector((state) => state.checkReducer.loading);
  const isAuth = sessionStorage.getItem("auth");

  useEffect(() => {
    if (isAuth) {
      dispatch(getCartItem());
    }
  }, [dispatch, isAuth]);

  if (!isAuth) {
    return (
      <section className="auth-section">
        <DontAuth />
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="loader-section">
        <Loader />
      </section>
    );
  }

  if (cartProduct.length === 0) {
    return <section className="cart-section">Empty Cart</section>;
  }

  return (
    <section className="cart-section flex justify-center items-center">
      <section className="flex justify-between w-[80%] flex-wrap">
        <CartItem cartProduct={cartProduct} />
        <PaymentDetail cartProduct={cartProduct} />
      </section>
    </section>
  );
};

export default Cart;
