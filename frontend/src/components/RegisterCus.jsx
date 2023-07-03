import React, { useState} from "react";
import "./Css/RegisterCus.css";
import GoHome from "./GoHome";
import { useNavigate } from "react-router-dom";
function RegisterCus() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    tel: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/Register-cus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tel: formData.tel,
          firstname: formData.firstname,
          lastname: formData.lastname,
        }),
      });
      const data = await res.json();
      console.log(data);
      console.log(formData);
      // ล้างค่าในฟอร์ม
      setFormData({
        firstname: "",
        lastname: "",
        tel: "",
      });
      navigate("/");
      alert("สมัครสมาชิกเรียบร้อย");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-RegisterCus-grid">
        <header className="header-RegisterCus">
          <h1>REGISTER</h1>
          <GoHome/>
        </header>
        <main className="main-RegisterCus">
          <form onSubmit={handleSubmit} className="form-register-cus">
            <label>
              <p>FIRSTNAME:</p>
              <input
                className="input-register-cus"
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
              />
            </label>
            <label>
              <p>LASTNAME:</p>
              <input
                className="input-register-cus"
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
              />
            </label>
            <label>
              <p>TEL:</p>
              <input
                className="input-register-cus"
                type="tel"
                name="tel"
                pattern="[0-9]{10}"
                value={formData.tel}
                onChange={handleChange}
              />
            </label>
            <div>
                <button type="submit" className="btn-submit-registerCus">SUBMIT</button>
            </div>
          </form>
        </main>
      </div>
  );
}

export default RegisterCus;
