import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

// import toast from "react-hot-toast";
const Context = createContext();
export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [qty, setQty] = useState(1);
  let foundProduct, index;

  /**
   * When click Add to cart button
   * @param {Object} product
   * @param {Number} quantity
   */
  const onAdd = (product, quantity) => {
    console.log(cartItems, "cartItems");
    // console.log(product._id, cartItems.length && cartItems.length, "Id Checker")
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );
    console.log(checkProductInCart);
    setTotalPrice(
      (prevTotalPrice) => (prevTotalPrice + product.price) * quantity
    );
    setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + quantity);
    if (checkProductInCart) {
      const updateCartItems = cartItems.map((item) => {
        console.log(item._id, product._id, "Id Checker");
        if (item._id === product._id) {
          return {
            ...item,
            quantity: item.quantity + quantity,
          };
        }
        return item;
      });
      console.log(updateCartItems, "updateCartItems");
      setCartItems(updateCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }
    toast.success(`${qty} ${product.name} added to cart`);
  };

  // when click + or - button in cart section
  /**
   *
   * @param {String} id (Product _id)
   * @param {String} enums (inc or dec)
   */
  const toggleItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItem = cartItems.filter(
      (item) => item._id !== foundProduct._id
    );

    if (value === "inc") {
      setCartItems([
        ...newCartItem,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems([
          ...newCartItem,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantity((prevTotalQuantity) => prevTotalQuantity - 1);
      }
    }
  };

  const onRemove = (id) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItem = cartItems.filter(
      (item) => item._id !== foundProduct._id
    );
    setTotalPrice((prevTotalPrice) => prevTotalPrice - (foundProduct.price * foundProduct.quantity));
    setTotalQuantity(
      (prevTotalQuantity) => prevTotalQuantity - foundProduct.quantity
      );
      setCartItems(newCartItem);
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
        toggleItemQuantity,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  );
};
/**
 * State Management hooks
 * @param {Function} setShowCart
 * @param {Function} setCartItems
 * @param {Function} setTotalPrice
 * @param {Function} setTotalQuantity
 * @param {Function} setQty
 * @param {Function} increaseQuantity
 * @param {Function} decreaseQuantity
 * @param {Function} onAdd
 * @param {Function} toggleItemQuantity
 * @param {Function} onRemove
 * @returns {Object}  StateContext
 * @example
 * import { useStateContext } from '../context/StateContext';
 * const { showCart, cartItems, totalPrice, totalQuantity, qty, increaseQuantity, decreaseQuantity, onAdd } = useStateContext();
 * @returns
 */
export const useStateContext = () => useContext(Context);

// https://youtu.be/4mOkFXyxfsU?t=6991
