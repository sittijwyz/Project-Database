const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const router = express.Router();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Docameney",
});

db.connect((err) => {
  if (err) {
    console.log("Error connecting!", err);
    return;
  }
  console.log("Connected Mysql successfully");
});


router.get("/api/menu", async (req, res) => {
  try {
    const results = await new Promise((resolve, reject) => {
      db.query("SELECT * FROM menu", (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
    return res.status(200).json(results);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
});


router.post("/api/login", async (req, res) => {
  try {
    const { empId, empPassword } = req.body;
    const results = await new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM employee WHERE EMP_ID = ? AND EMP_Password = ?`,
        [empId, empPassword],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
    if (results.length === 1) {
      const user = results[0];
      res.json({ success: true, user });
    } else {
      res.json({ success: false, message: "Invalid username or password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


router.post("/api/cart/add", async (req, res) => {
  try {
    const cartItems = req.body.cartItems;
    const Cus_Phone = req.body.Cus_Phone;
    const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    if (itemCount === 0) {
      return res.status(400).send({ message: "Cart is empty" });
    }

    const [result] = await new Promise((resolve, reject) => {
      db.query("SELECT MAX(Order_ID) AS maxOrderID FROM orders", (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    const maxOrderID = result.maxOrderID;
    const Order_ID = maxOrderID ? maxOrderID + 1 : 111;
    const values1 = [Order_ID, "T01", Cus_Phone];
    const values2 = cartItems.map((item) => [
      item.product.Menu_ID,
      Order_ID,
      item.quantity,
    ]);

    const sql1 = "INSERT INTO orders (Order_ID, T_ID,  Cus_Phone) VALUES (?, ?, ?)";
    const sql2 = "INSERT INTO orders_detail (Menu_ID, Order_ID, Quantity) VALUES ?";
    const sql3 = `UPDATE tables SET T_Status = 'UNAVAILABLE' WHERE T_ID = 'T01'`;

    await new Promise((resolve, reject) => {
      db.query(sql1, values1, (err,result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    await new Promise((resolve, reject) => {
      db.query(sql2, [values2], (err,result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    await new Promise((resolve, reject) => {
      db.query(sql3, (err,result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    return res.status(200).send({ message: "Added to cart" });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
});


router.post("/api/InsertTransaction", async (req, res) => {
  try {
    const T_Status = req.body.status;
    const EMP_ID = req.body.EMP_ID;
    const Data_tran = req.body.data_tran;

    const result = await new Promise((resolve, reject) => {
      db.query(
        "SELECT MAX(Tran_ID) AS maxTran_ID FROM transaction",
        (err, result) => {
          if (err) {
            console.error(err);
            reject("Internal Server Error");
          } else {
            resolve(result);
          }
        }
      );
    });
    
    const maxTran_ID = result[0].maxTran_ID;
    const Tran_ID = maxTran_ID ? maxTran_ID + 1 : 999;
    const value = [Tran_ID, Data_tran.Order_ID, EMP_ID];
    const value1 = [Data_tran.Cus_Points + 1, Data_tran.Cus_Phone];

    const sql1 = `UPDATE tables SET T_Status = '${T_Status}' WHERE T_ID = 'T01'`;
    const sql2 = `INSERT INTO transaction (Tran_ID, Order_ID, EMP_ID) VALUES (?,?,?)`;
    const sql3 = 'UPDATE customer SET Cus_Points = ? WHERE Cus_Phone = ?';
    await new Promise((resolve, reject) => {
      db.query(sql1, (err, result) => {
        if (err) {
          console.log("เปลี่ยนสถานะโต๊ะไม่สำเร็จ");
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    await new Promise((resolve, reject) => {
      db.query(sql2, value, (err, result) => {
        if (err) {
          console.log("เพิ่มข้อมูลลง tran ไม่สำเร็จ");
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    await new Promise((resolve, reject) => {
      db.query(sql3,value1,(err, result) => {
        if (err) {
          console.log("เพิ่มคะแนนลูกค้าไม่สำเร็จ");
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    return res.status(200).json({ message: "Insert Transaction successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});


router.get("/api/table", async (req, res) => {
  try {
    const results = await new Promise((resolve, reject) => {
      db.query("SELECT * FROM tables", (err, results) => {
        if (err) {
          console.log("มี Error โว้ยยยย");
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    return res.status(200).json(results);
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});


router.get("/api/orders", async (req, res) => {
  try {
    const results = await new Promise((resolve, reject) => {
      db.query(
        `SELECT *, DATE_FORMAT(Order_DateTime, '%d-%m-%Y %H:%i:%s') AS Formatted_Order_DateTime 
        FROM orders INNER JOIN customer ON orders.Cus_Phone = customer.Cus_Phone`,
        (err, results) => {
          if (err) {
            console.log("มี Error โว้ยยยย");
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });

    return res.status(200).json(results);
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});


router.get("/api/orders/:orderID", async (req, res) => {
  try {
    const orderID = req.params.orderID;
    const results = await new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM orders NATURAL JOIN orders_detail 
          NATURAL JOIN menu 
          
          WHERE Order_ID = ?`,
        [orderID],
        (err, results) => {
          if (err) {
            console.log("มี Error โว้ยยยย");
            reject(err);
            }
            resolve(results);
        }
      );
    });

    return res.status(200).json(results);
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});


router.get("/api/transaction", async (req, res) => {
  try {
    const results = await new Promise((resolve, reject) => {
      db.query(
        `SELECT *, DATE_FORMAT(Tran_DateTime, '%d-%m-%Y %H:%i:%s') AS Formatted_Tran_DateTime
           FROM transaction
          INNER JOIN orders ON transaction.Order_ID = orders.Order_ID
          INNER JOIN employee ON transaction.EMP_ID = employee.EMP_ID
          INNER JOIN customer ON orders.Cus_Phone = customer.Cus_Phone`,
        (err, results) => {
          if (err) {
            console.log("มี Error โว้ยยยย");
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });

    return res.status(200).json(results);
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});

router.get("/api/transaction/:tranID", async (req, res) => {
  const tranID = req.params.tranID;
  try {
    const results = await new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM transaction
          INNER JOIN orders ON transaction.Order_ID = orders.Order_ID
          INNER JOIN orders_detail ON orders.Order_ID = orders_Detail.Order_ID
          INNER JOIN menu ON orders_detail.Menu_ID = menu.Menu_ID
          WHERE Tran_ID = ?`,
        [tranID],
        (err, results) => {
          if (err) {
            console.log("มี Error โว้ยยยย");
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });

    return res.status(200).json(results);
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
});


router.post("/api/Register-emp", async (req, res) => {
  const { firstname, lastname, email, tel, id, password } = req.body;
  const sql = `INSERT INTO employee (EMP_ID,EMP_FName,EMP_LName,EMP_Email,EMP_Phone,EMP_Password) VALUES (?,?,?,?,?,?)`;
  const value = [id, firstname, lastname, email, tel, password];

  try {
    await new Promise((resolve, reject) => {
      db.query(sql, value, (err, results) => {
        if (err) {
          console.log("สมัครสมาชิกพนักงานไม่สำเร็จ");
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    return res.status(200).json({ message: "Registration successful" });
  } catch (err) {
    return res.status(400).send(err);
  }
});


router.post("/api/Register-cus", async (req, res) => {
  const { firstname, lastname, tel } = req.body;
  const sql = `INSERT INTO customer (Cus_Phone,Cus_FName,Cus_LName) VALUES (?,?,?)`;
  const value = [tel, firstname, lastname];

  try {
    await new Promise((resolve, reject) => {
      db.query(sql, value, (err,result) => {
        if (err) {
          console.log("สมัครสมาชิกไม่สำเร็จ");
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    return res.status(200).json({ message: "Registration successful" });
  } catch (err) {
    return res.status(400).send();
  }
});


app.use(router);
app.listen(8080, () => {
  console.log("รัน server ที่ port 8080.");
});
