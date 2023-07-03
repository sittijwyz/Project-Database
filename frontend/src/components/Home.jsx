import {NavLink} from "react-router-dom"
import "./Css/Home.css"
export default function Home() {

  return (
    <div className="display">
        <div className="home">
            <h1>WELCOME TO DOCAMENEY CAFE</h1>
            <div className="Btnlog ">
              <NavLink  to = "/Login">
                <i className="fa-solid fa-right-to-bracket"></i>
              </NavLink>
            </div>
            

        </div>
        <div className="button">
            <p><NavLink  to = "/Menu"><button>MENU</button></NavLink></p>
            <p><NavLink  to = "/RegisterCus"><button>REGISTER</button> </NavLink></p>
        </div>

    </div>
    
  )
}