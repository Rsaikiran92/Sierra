import React, { useContext } from "react";
import { AuthContext } from "../contextapi/AuthContext";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>Sierra</h1>
      </div>
      <div className="navbar-right">
        {!user ? (
          <>
            <Link to="/login" className="btn">
              Login
            </Link>
            <Link to="/register" className="btn">
              Signup
            </Link>
          </>
        ) : (
          <div style={{display:"flex",gap:"10px"}}>
          <Link to="/" className="btn">Upload</Link>
          <Link to="/videos" className="btn">Videos</Link>
          <button onClick={logout} className="btn">
            Logout
          </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
