import React, { useState, useEffect } from "react";
import "./Css/Table.css"
import NavbarAdminPage from './NavbarAdminPage'

function Table() {
  const [tables,setTables] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/api/table")
      .then((response) => response.json())
      .then((data) => setTables(data))
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className='Table-page'>
      <nav className='navbar-Table'>
        <NavbarAdminPage/>
      </nav>
      <main className="main-table-grid">
          <div id="header-table">
            <p>TABLE</p>
          </div>
          {tables.map(table =>(
              <div className="container-tables" id={table.T_ID} key = {table.T_ID}>
                <header > {table.T_Status}</header>
                <div className={table.T_Status}>
                  <div className="icon-container">
                    <i className="fa-solid  fa-couch"></i>
                    <span className="icon-text">{table.T_ID}</span>
                  </div>
                </div>
              </div>
          ))}
      </main>
    </div>
  )
}

export default Table