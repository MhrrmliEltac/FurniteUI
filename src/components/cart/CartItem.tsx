import React from "react";
import { Button } from "../ui/button";
import { CartItemProps, CartProductType } from "@/types/Type";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { useAppDispatch } from "@/hooks/hooks";
import { deleteCartItem, getCartItem } from "../store/slice/CheckOut";

const CartItem: React.FC<CartItemProps> = ({ cartProduct }) => {
  const dispatch = useAppDispatch();

  const deleteCartById = (id: string) => {
    try {
      dispatch(deleteCartItem(id));
      setTimeout(() => {
        dispatch(getCartItem());
      }, 200);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  return (
    <section className="cart-item-section flex justify-center items-start flex-col gap-5 lg:w-1/2 w-full h-full transition-all duration-200">
      {cartProduct && cartProduct.length > 0
        ? cartProduct.map((item: CartProductType) => (
            <div
              key={item._id}
              className="flex gap-5 w-full max-sm:flex-wrap transition-all duration-200"
            >
              <div className="md:w-[300px] w-full h-full transition-all duration-200">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full h-full aspect-square transition-all duration-200"
                />
              </div>
              <div className="md:w-[300px] w-full flex items-start justify-center flex-col gap-5 transition-all duration-200">
                <header className="flex  flex-col gap-1 transition-all duration-200">
                  <h2 className="text-xl font-semibold transition-all duration-200">
                    {item.name}
                  </h2>
                  <span className="text-sm text-[#3C3737] transition-all duration-200">
                    Category: {item.category}
                  </span>
                  <span className="text-sm text-[#3C3737] transition-all duration-200">
                    Structure color: {item.structureColor || "null"}
                  </span>
                </header>
                <div className="flex flex-wrap justify-start gap-5 w-full transition-all duration-200">
                  <p>Size: {item.size}</p>
                  <p>Stock: {item.stock}</p>
                  <p>Material: {item.material}</p>
                </div>
                <div className="flex justify-between items-center w-full transition-all duration-200">
                  <div className="flex max-sm:flex-wrap gap-2 justify-between w-full items-center">
                    <div className="w-full flex gap-2">
                      <p
                        style={{
                          color: item.discountPrice
                            ? "rgb(189, 105, 105)"
                            : undefined,
                        }}
                        className={`${
                          item.discountPrice
                            ? "line-through decoration-2"
                            : "text-[#3692a4]"
                        } font-semibold text-xl transition-all duration-200`}
                      >
                        {item.price}
                      </p>
                      <p className="font-semibold text-xl transition-all duration-200 text-[#3692a4]">
                        {item.discountPrice}
                      </p>
                    </div>
                    <div className="flex items-center gap-5 border operator-box">
                      <button className="border-r operator-btn text-sm">
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button className="border-l operator-btn text-sm">
                        +
                      </button>
                    </div>
                  </div>
                  <Button
                    onClick={() => deleteCartById(item._id)}
                    className="bg-transparent text-black text-lg border-none shadow-none transition-all duration-200 hover:bg-transparent cursor-pointer"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))
        : null}
    </section>
  );
};

export default CartItem;
