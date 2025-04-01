import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CartProductType } from "./CartItem";

interface PaymentDetailProps {
  cartProduct: CartProductType[];
}

const PaymentDetail: React.FC<PaymentDetailProps> = ({ cartProduct }) => {
  const delivery = 0;
  const promoCode = 0;

  const price = cartProduct.reduce((total, item) => {
    if (item.discountPercent) {
      return total + item.discountPrice * item.quantity;
    } else {
      return total + item.price * item.quantity;
    }
  }, 0);

  let total = price + delivery + promoCode;

  return (
    <section className="payment-section lg:w-2/5 w-full flex items-start sticky top-0">
      <div className="flex flex-col w-full">
        {cartProduct && cartProduct.length > 0 && (
          <div className="w-full flex flex-col gap-2">
            <div className="text-md flex justify-between items-center font-medium">
              <span>Summary:</span>
              <span>{price.toFixed(2)} $</span>
            </div>
            <div className="text-md flex justify-between items-center font-medium">
              <span>Delivery:</span>
              <span>0 $</span>
            </div>
            <div className="text-md flex justify-between items-center font-medium">
              <span>Promocode:</span>
              <span>0 $</span>
            </div>
            <div className="text-[#080B13] text-xl font-semibold flex justify-between items-center total">
              <span>Total:</span>
              <span>{total.toFixed(2)} $</span>
            </div>
          </div>
        )}
        <div className="flex gap-10 h-[50px]">
          <Input
            placeholder="Enter promocode"
            className="rounded-none h-[50px] input placeholder:text-lg"
          />
          <Button className="btn h-full rounded-none cursor-pointer">
            Apply
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PaymentDetail;
