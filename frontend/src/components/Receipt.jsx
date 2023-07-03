import React, { useState, useEffect } from "react";
import "./Css/Receipt.css";
import NavbarAdminPage from "./NavbarAdminPage";
function Receipt() {
  const [transaction, setTransaction] = useState([]);
const [selectedtransaction, setSelectedtransaction] = useState(null);

useEffect(() => {
  const fetchTransaction = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/transaction");
      const data = await res.json();
      const sortedOrders = data.sort((a, b) => b.Order_ID - a.Order_ID);
      setTransaction(sortedOrders);
    } catch (error) {
      console.error(error);
    }
  };

  fetchTransaction();
}, []);

const handleClickTransaction = async (transaction) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/transaction/${transaction.Tran_ID}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch menu data for the selected transaction");
    }
    const orderData = await response.json();
    const orderdetail = { ...transaction, menu: orderData };
    setSelectedtransaction(orderdetail);
  } catch (error) {
    console.error(error);
  }
};

const handleClosePopup = () => {
  setSelectedtransaction(null);
};

  return (
    <div className="Receipt-page">
      <nav className="navbar-Receipt">
        <NavbarAdminPage />
      </nav>
      <main className="main-Receipt-grid">
        <div id="header-Receipt">
          <p>Receipt</p>
        </div>
        {/* ส่วนของหน้าจอ */}
        <div className="container-Receipt">
          {transaction.map((transaction) => (
            <div
              className="container-Receipt-item"
              id={transaction.Tran_ID}
              key={transaction.Tran_ID}
            >
              {/* กดปุ่มแสดงpop up */}
              <button
                className="btn-nav-clickReceipt"
                onClick={() => handleClickTransaction(transaction)}
              >
                <p>Transaction : {transaction.Tran_ID}</p>
                <p>Order : {transaction.Order_ID}</p>
                 
              </button>
            </div>
          ))}
        </div>
      </main>
      {selectedtransaction && (
        <div className="overlay-receipt">
          <div className="popup-receipt">
            {selectedtransaction.menu &&(
                <header className="header-popup-receipt">
                <button onClick={handleClosePopup} className="btn-closePopup-receipt">
                <i className="fa-solid fa-otter"></i>
                </button>
                
                <h1 className="box-receipt">RECEIPT</h1>
                <div className="headerreceipt-from">
                  <h3>DOCAMENEY</h3>
                  <p>คณะวิทยาศาสตร์</p>
                  <p>อาคารจุฬาภรณ์ 1 ห้อง 207</p>
                </div>
                <div className="headerreceipt-to">
                  <h3>BILL TO</h3>
                  <p>{selectedtransaction.Cus_FName}</p>
                  <p>แต้มสมาชิก # {selectedtransaction.Cus_Points}</p>
                </div>
                <div className="headerreceipt-staff">
                  <h3>STAFF</h3>
                  <p>{selectedtransaction.EMP_ID}</p>
                  <p>{selectedtransaction.EMP_FName}</p>
                </div>
                <div className="headerreceipt-date">
                  <p>ORDER # {selectedtransaction.Order_ID}</p>
                  <p>TRANSACTION # {selectedtransaction.Tran_ID}</p>
                  <p>RECEIPT DATE </p>
                  <p>{selectedtransaction.Formatted_Tran_DateTime}</p>
                </div>
                
                <h3></h3>
              </header>
            )}
            {selectedtransaction.menu && (
              <main className="main-popup-receipt">
                <p>รายการ</p>
                <p>จำนวน</p>
                <p>ราคา</p>
                <p>รวม</p>
                <div className="showitem-receipt">
                  {selectedtransaction.menu.map((menuItem, index) => (
                    <div key={index} className="receiptitem">
                        <p>{menuItem.Menu_Name}</p> 
                        <p>{menuItem.Quantity}</p>
                        <p>{menuItem.Menu_Price}</p>
                        <p>{(menuItem.Menu_Price * menuItem.Quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="showtotal-receipt">
                  <p>TOTAL</p>
                  <div>
                    {selectedtransaction.menu
                      .reduce(
                        (total, menuItem) =>
                          total + menuItem.Menu_Price * menuItem.Quantity,
                        0
                      )
                      .toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                    บาท
                  </div>
                </div>
              </main>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Receipt;
