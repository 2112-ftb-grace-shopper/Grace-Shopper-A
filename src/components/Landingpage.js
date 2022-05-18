import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Landingpage.css';

const Landingpage = () => {
    return (
        <div class = 'frontpagediv'>
            <p> Cars R Us Scaffolding </p>
            <div>
                <ul>
                    <li>
                        <Link to= '/'> Landing page  -You are here</Link>
                    </li>
                    <li>
                        <Link to='/Login'> Login Page </Link>
                    </li>
                    <li>
                        <Link to='/Registerpage'>Register page</Link>
                    </li>
                    <li>
                        <Link to='/Productpage'> Product Page </Link>
                    </li>
                    <li>
                        <Link to= '/Searchbar'> Search Bar </Link>
                    </li>
                    <li>
                        <Link to= '/Shoppingcart'> Shopping Cart Page </Link>
                    </li>
                    <li>
                        <Link to= '/MiscAPIpage'> Misc API display playground</Link>
                    </li>
                    <li>
                        <Link to= '/Adminpage'> Admin Page</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Landingpage