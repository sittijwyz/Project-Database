import React from 'react'
import "./Css/Navbar-admin-page.css";
import { NavLink } from 'react-router-dom'

function NavbarAdminPage() {
  return (
    <nav className='Navbar-admin-page'>
        <div className='box-Navbar-admin-page'>
            <h1 ><i className="fa-solid fa-martini-glass-citrus"></i> DOCAMENEY CAFE</h1>
            <NavLink className="btn-nav-ad" to ="/Order" activeclassname="active" >
                <i className="fa-regular fa-bell"></i> ORDER NOW <i className="fa-solid fa-angles-right"></i>
            </NavLink>
            <NavLink className="btn-nav-ad" to ="/Table" activeclassname="active" >
                <i className="fa-solid fa-couch"></i> TABLE <i className="fa-solid fa-angles-right"></i>
            </NavLink>
            <NavLink className="btn-nav-ad" to ="/Receipt" activeclassname="active" >
                <i className="fa-solid fa-file-invoice-dollar"></i> RECEIPT <i className="fa-solid fa-angles-right"></i>
            </NavLink>
            <NavLink className="btn-nav-ad" to ="/RegisterEmp" activeclassname="active" >
                <i className="fa-solid fa-registered"></i> REGISTER <i className="fa-solid fa-angles-right"></i>
            </NavLink>
            <NavLink className="btn-nav-ad" to ="/" activeclassname="active" >
                <i className="fa-solid fa-house"></i> HOME <i className="fa-solid fa-angles-right"></i>
            </NavLink>
        </div>
            
</nav>

  )
}

export default NavbarAdminPage