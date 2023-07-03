import React, { useState, useEffect, useReducer } from "react";
import { ToastContainer,toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import CartReducer from "../Reducer/CartReducer";
import 'react-toastify/dist/ReactToastify.css';
import "./Css/Menu.css";
import GoHome from "./GoHome";
const initialState = {
  products: [],
  cartItems: [],
};

function Menu() {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(CartReducer, initialState);
  const [Cus_Phone,setCus_Phone] = useState("")
  const [selectedType, setSelectedType] = useState("DRINKS");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/menu");
        if (!response.ok) {
          throw new Error("Failed to fetch menu data");
        }
        const data = await response.json();
        dispatch({ type: "setProducts", payload: data });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
 
  const SendtoServer = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems: state.cartItems, Cus_Phone: Cus_Phone }),
      });
      if (!response.ok) {
        throw new Error("Failed to send cart data to server");
      }
      const data = await response.json();
      console.log(data);
      toast.success("Order successful!");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = (product) => {
    dispatch({ type: "addToCart", payload: product });
  };
  const removeFromCart = (product) => {
    dispatch({ type: "removeFromCart", payload: product });
  };
  function incrementQuantity(Menu_ID) {
    dispatch({ type: "INCREMENT", payload: Menu_ID });
  }
  function decrementQuantity(Menu_ID) {
    dispatch({ type: "DECREMENT", payload: Menu_ID });
  }

  const ProductList = ({ products }) => (
    <>
      {products.map((product) => (
        <div className={product.Menu_ID} key={product.Menu_ID}>
          <div className="Products-box">
            <h6>{product.Menu_Name}</h6>
            <div>
              <img src={product.image} className="Productimage" />
            </div>
            <p>
              <button className="ADDtocart" onClick={() => addToCart(product)}>
                ADD TO CART {product.Menu_Price} THB{" "}
              </button>
            </p>
          </div>
        </div>
      ))}
    </>
  );
  
 
  const bakeryProducts = state.products.filter((p) => p.Menu_Type === "BAKERY");
  const drinkProducts = state.products.filter((p) => p.Menu_Type === "DRINKS");
  
  const handlePhoneNumberChange = (event) => {
    setCus_Phone(event.target.value);
  };


  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick = {false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {/* กล่องใหญ่สุดดด */}
      <div className="Page-Menu"> 
        <div className="Product-display">
          <div className="btn-switch">
              <div className="gohome-menu"><GoHome/></div> 
            <h1>Menu</h1>
            <div className="btn-type">
              <button className="btnselectMenu" onClick={() => setSelectedType("DRINKS")}>DRINK</button>
              <button className="btnselectMenu" onClick={() => setSelectedType("BAKERY")}>BAKERY</button>
            </div>
            <div className="inputPhone">
              <input type="text" placeholder="ใส่เบอร์โทรเพื่อเข้าระบบ" value={Cus_Phone} onChange={handlePhoneNumberChange} />
            </div>
          </div>
          <ProductList
            products={
              selectedType === "BAKERY" ? bakeryProducts : drinkProducts
            }
          />
        </div>
        
        {/* ส่วนของตะกร้าาาาาาาาาาาาาาาาาาาาาาาาาาาาา */}
        <div className="Cart-display">
          <h1>ADD TO CART</h1>
          <nav>
            {state.cartItems.map((product) => (
            <div
              className={product.product.Menu_Name}
              key={product.product.Menu_ID}
            >
              <div className="Grid-Cart-box">
                  <img src={product.product.image} className="Cart-image" />
                  <h4>{product.product.Menu_Name}</h4>
                <span className="block-quantity">
                
                  <h4>รวม <input className="Cart-input" type="text" value={`${product.quantity * product.product.Menu_Price}`} disabled/> บาท</h4>
                  <button className="btnquantity" onClick={() => decrementQuantity(product.product.Menu_ID)}>-</button>
                  <input className="Cart-input" type="text" value={product.quantity} disabled />
                  <button className="btnquantity" onClick={() => incrementQuantity(product.product.Menu_ID)}>+</button>
                </span>
                  
                <p className="btn-remove">
                  <button onClick={() => removeFromCart(product.product.Menu_ID)}>X</button>
                </p>
              </div>
              <br />
            </div>
          ))}
          </nav>
        <button onClick={() => SendtoServer()}>CONFIRM</button>
        </div>
      </div>
    </div>
  );
}
export default Menu;
