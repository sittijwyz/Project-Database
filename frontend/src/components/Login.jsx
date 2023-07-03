import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Css/Login.css";
import "react-toastify/dist/ReactToastify.css";
import GoHome from "./GoHome";

function Login() {
  const [empId, setEmpId] = useState("");
  const [empPassword, setEmpPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ empId, empPassword }),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === true) {
        navigate("/Admin");
      } else {
        toast.error("รหัสผิดนะจ๊ะเด็กๆ");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="home">
        <h1>WELCOME TO DOCAMENEY CAFE</h1>
        <div className="gohome-page-log">
          <GoHome />
        </div>
      </div>
      <div className="Login-emp">
        <form onSubmit={handleSubmit}>
          <div className="box-login-id">
            <input
              type="text"
              id="ID"
              placeholder="ID"
              value={empId}
              onChange={(e) => setEmpId(e.target.value)}
            />
          </div>
          <div className="box-login-pass">
            <input
              type="password"
              id="password"
              placeholder="PASSWORD"
              value={empPassword}
              required
              onChange={(e) => setEmpPassword(e.target.value)}
            />
          </div>
          <button type="submit">LOGIN</button>
        </form>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default Login;
