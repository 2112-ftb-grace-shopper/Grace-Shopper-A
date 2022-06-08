import React from "react";
import { Link } from "react-router-dom";
import "../style/Navbar.css";

const Navbar = (props) => {
  const { isLoggedIn, setIsLoggedIn } = props;

        
    return (
<div className="frontpagediv">
      {/* <p> Cars R Us</p> */}
      <div>
        <span class="material-bubble">
          <button>
            <Link to="/"> Home </Link>
          </button>
          <button>
            <Link to="/login"> Login Page </Link>
          </button>
          <button>
            <Link to="/register">Register page</Link>
          </button>
          <button>
            <Link to="/product"> Product Page </Link>
          </button>
          <button>
            <Link to="/shoppingcart"> Shopping Cart Page </Link>
          </button>
        </span>
      </div>
    </div>
    )
}

export default Navbar;
