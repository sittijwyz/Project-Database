import React from "react";

function CartReducer(state, action) {
  switch (action.type) {
    case "setProducts":
      return { ...state, products: action.payload };
    case "addToCart":
      const existingItem = state.cartItems.find(
        (item) => item.product.Menu_ID === action.payload.Menu_ID
      );
      if (existingItem) {
        const updatedItems = state.cartItems.map((item) => {
          if (item.product.Menu_ID === action.payload.Menu_ID) {
            return { product: action.payload, quantity: item.quantity + 1 };
          }
          return item;
        });
        return { ...state, cartItems: updatedItems };
      } else {
        return {
          ...state,
          cartItems: [
            ...state.cartItems,
            { product: action.payload, quantity: 1 },
          ],
        };
      }
    case "removeFromCart":
      const updatedItems1 = state.cartItems.filter(
        (item) => item.product.Menu_ID !== action.payload
      );
      return { ...state, cartItems: updatedItems1 };

    case "INCREMENT":
      let updateProductIncrement = state.cartItems.map((item) => {
        if (item.product.Menu_ID === action.payload) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      return {
        ...state,
        cartItems: updateProductIncrement,
      };

    case "DECREMENT":
      let updateProductDecrement = state.cartItems
        .map((item) => {
          if (item.product.Menu_ID === action.payload) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }
          return item;
        })
        .filter((item) => item.quantity !== 0);
      return {
        ...state,
        cartItems: updateProductDecrement,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export default CartReducer;
