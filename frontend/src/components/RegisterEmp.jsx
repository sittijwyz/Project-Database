import React, { useState, useEffect } from "react";
import "./Css/RegisterEmp.css";
import NavbarAdminPage from "./NavbarAdminPage";

function RegisterEmp() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    tel: "",
    id: "",
    password: "",
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
      const res = await fetch("http://localhost:8080/api/Register-emp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          tel: formData.tel,
          id: formData.id,
          password: formData.password,
        }),
      });
      const data = await res.json();
      console.log(data);
      console.log(formData);
      // ล้างค่าในฟอร์ม
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        tel: "",
        id: "",
        password: "",
      });
    } catch (error) {
      console.error(error);
    }
    alert("สมัครสมาชิกเรียบร้อย");
  };
  return (
    <div className="RegisterEmp-page">
      <nav className="navbar-RegisterEmp">
        <NavbarAdminPage />
      </nav>
      <div className="container-RegisterEmp-grid">
        <header id="header-RegisterEmp">
          <p>REGISTER</p>
        </header>
        <main className="main-RegisterEmp">
          <form onSubmit={handleSubmit} className="form-register-emp">
            <label>
              <p>FIRSTNAME:</p>
              <input
                className="input-register-emp"
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
              />
            </label>
            <label>
              <p>LASTNAME:</p>
              <input
                className="input-register-emp"
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
              />
            </label>
            <label>
              <p>EMAIL:</p>
              <input
                className="input-register-emp"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
            <label>
              <p>TEL:</p>
              <input
                className="input-register-emp"
                type="tel"
                name="tel"
                pattern="[0-9]{10}"
                value={formData.tel}
                onChange={handleChange}
              />
            </label>
            <div className="uselogin-emp">
              <label>
                <p>ID:</p>
                <input
                  className="input-register-emp"
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                />
              </label>
              <label>
                <p>PASSWORD:</p>
                <input
                  className="input-register-emp"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <button type="submit">SUBMIT</button>
          </form>
        </main>
      </div>
    </div>
  );
}

export default RegisterEmp;
