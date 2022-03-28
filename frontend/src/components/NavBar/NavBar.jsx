import React, {useState} from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";
import useAuth from "../../hooks/useAuth";
import logo from '../../Images/CouchBuddy.png'


const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  

  return (
    <div className="navBar">
      <ul>
        <li className="brand">
          
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <img title="Home" className="logo" src={logo}></img>
          </Link>
        </li>
        <br />
        <li className="brand">
          <Link to="search" style={{ textDecoration: "none", color: "white" }}>
            <b>Search</b>
          </Link>
        </li>
        <br />
        <li className="brand">
          <Link to="profile" style={{ textDecoration: "none", color: "white" }}>
            <b>Profile</b>
          </Link>
        </li>
        <br />
        <li>
          {user ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
      </ul>
      {user ? (<h1>Welcome {user.first_name}</h1>) : null}
      
      
    </div>
  );
};

export default Navbar;
