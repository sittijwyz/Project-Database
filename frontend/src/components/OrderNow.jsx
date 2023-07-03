import React, { useState, useEffect } from "react";
import "./Css/OrderNow.css";
import NavbarAdminPage from "./NavbarAdminPage";
function OrderNow() {
  const [orders, setOrders] = useState([]);
const [emp_id, setEmp_id] = useState("");
const [selectedOrder, setSelectedOrder] = useState(null);


useEffect(() => {
  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/orders");
      const data = await response.json();
      const sortedOrders = data.sort((a, b) => b.Order_ID - a.Order_ID);
      setOrders(sortedOrders);
    } catch (error) {
      console.error(error);
    }
  };

  fetchOrders();
}, []);

const handleClickOrder = async (order) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/orders/${order.Order_ID}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch menu data for the selected order");
    }
    const menuData = await response.json();
    const orderdetail = { ...order, menu: menuData };
    setSelectedOrder(orderdetail);
  } catch (error) {
    console.error(error);
  }
};

const handleClosePopup = () => {
  setSelectedOrder(null);
};

const handleEmpIdChange = (event) => {
  setEmp_id(event.target.value);
};

const handleCheckout = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/InsertTransaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "AVAILABLE",
        EMP_ID: emp_id,
        data_tran: selectedOrder,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to insert transaction");
    }

    const data = await response.json();
    console.log(data);

    setTimeout(() => {
      setSelectedOrder(null);
    }, 2000);
    alert("ออกใบเสร็จเรียบร้อย");
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="Ordernow-page">
      <div className="navbar-Ordernow">
        <NavbarAdminPage />
      </div>
      <main className="main-order-grid">
        <div id="header-Order">
          <p>ORDER NOW</p>
        </div>
        <div className="container-order">
          {orders.map((order) => (
            <div
              className="container-order-item"
              id={order.Order_ID}
              key={order.Order_ID}
            >
              {/* กดปุ่มแสดงpop up */}
              <button
                className="btn-nav-clickOrder"
                onClick={() => handleClickOrder(order)}
              >
                Order : {order.Order_ID}
              </button>
            </div>
          ))}
        </div>
      </main>
      {selectedOrder && (
        <div className="overlay">
          <div className="popup">
            <header className="header-popup">
              <button onClick={handleClosePopup} className="btn-closePopup">X</button>
              <h1>DOCAMENEY CAFE</h1>
              <h2>ใบรายการสั่งอาหาร</h2>
              <h3>เลขที่: {selectedOrder.Order_ID} โต๊ะ: {selectedOrder.T_ID}</h3>
              <h3>วันที่: {selectedOrder.Formatted_Order_DateTime}</h3>
            </header>
            {selectedOrder.menu && (
              <main className="main-popup">
                <div className="list-item">
                  <p>รายการ</p>
                  <p>จำนวน</p>
                  <p>ราคา</p>
                  <p>รวม</p>
                </div>
                <div className="showitem">
                  {selectedOrder.menu.map((menuItem, index) => (
                      <div key={index} className="Orderitem">
                        <div>{menuItem.Menu_Name}</div>
                        <div>{menuItem.Quantity}</div>
                        <div>{menuItem.Menu_Price}</div>
                        <div>{(menuItem.Menu_Price * menuItem.Quantity).toFixed(2)}</div>
                      </div>
                    ))}
                </div>
                  
                  <div className="showtotal">
                    <p>ยอดคำสั่งซื้อ:</p> 
                    <div>
                    {selectedOrder.menu.reduce(
                      (total, menuItem) =>
                        total + menuItem.Menu_Price * menuItem.Quantity,
                      0
                    ).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })} บาท
                    </div>
                  </div>
                  <div>
                    <span>โปรดเลือกรหัสพนักงาน : </span>
                    <select value={emp_id} onChange={handleEmpIdChange}>
                      <option value="">-- Select --</option>
                      <option value="EMP081">EMP081</option>
                      <option value="EMP084">EMP084</option>
                      <option value="EMP085">EMP085</option>
                    </select>
                    <p>ดำเนินการโดย : {emp_id}</p>
                  </div>
                    <button className="btn-checkout-order" onClick={handleCheckout}>ชำระเงินเรียบร้อย</button>
              </main>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderNow;
