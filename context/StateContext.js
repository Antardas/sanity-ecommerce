import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

// import toast from "react-hot-toast";
const Context = createContext();
export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [qty, setQty] = useState(1);

  /**
   *
   * @param {Object} product
   * @param {Number} quantity
   */
  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item.id === product.id);
    setTotalPrice(
      (prevTotalPrice) => (prevTotalPrice + product.price) * quantity
    );
    setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + quantity);
    if (checkProductInCart) {
      const updateCartItems = cartItems.map((item) => {
        if (item.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + quantity,
          };
        }
      });
      setCartItems(updateCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }
    toast.success(`${qty} ${product.name} added to cart`);
  };

  const increaseQuantity = () => {
    setQty((prev) => {
      return prev + 1;
    });
  };
  const decreaseQuantity = () => {
    setQty((prev) => {
      if (prev - 1 < 1) {
        return 1;
      }
      return prev - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantity,
        setShowCart,
        qty,
        increaseQuantity,
        decreaseQuantity,
        onAdd,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);

// https://youtu.be/4mOkFXyxfsU?t=6991
