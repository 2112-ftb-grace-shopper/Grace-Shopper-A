import React from "react";
import { Link } from "react-router-dom";
import "../style/Navbar.css";

const Navbar = (props) => {
  const { isLoggedIn, setIsLoggedIn } = props;

<<<<<<< HEAD
  return (
    <div className="frontpagediv">
      <p> Cars R Us</p>
=======
        
    return (
<div className="frontpagediv">
      {/* <p> Cars R Us</p> */}
>>>>>>> bf327c1334b56fd6224573f8ecd414731ac9f151
      <div>
        <span class="material-bubble">
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
            <Link to="/searchbar"> Search Bar </Link>
          </button>
          <button>
            <Link to="/shoppingcart"> Shopping Cart Page </Link>
          </button>
          <button>
            <Link to="/adminpage"> Admin Page</Link>
          </button>
        </span>
      </div>
    </div>
<<<<<<< HEAD
  );
};
=======
    )
}
>>>>>>> bf327c1334b56fd6224573f8ecd414731ac9f151

export default Navbar;
