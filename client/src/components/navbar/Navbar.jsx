import "./navbar.css"
import {Link, useNavigate} from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate()
  const {user,dispatch} = useContext(AuthContext);
  const handleClick = () =>{
    navigate("/login");
  }
  const handleClickR = () =>{
    navigate("/register");
  }
  const handleClickLogOut = () =>{
    dispatch({type: "LOGOUT"})
  }

  return (
    <div className="navbar">
        <div className="navContainer">
            <Link to="/" style={{color: "inherit", textDecoration: "none", fontSize: 30}}>
            <span className="logo">Hotel Booking</span>
            </Link>
            {user ?
            ((<div className="navItems">
                <div>{user.username}</div>
                <button className="navButton" onClick={handleClickLogOut}>Log out</button>
            </div>)
            )
             : (<div className="navItems">
                <button className="navButton" onClick={handleClickR}>Register</button>
                <button className="navButton" onClick={handleClick}>Login</button>
            </div>)}
        </div>
    </div>
  )
}

export default Navbar