import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Navbar.css';

const Navbar = () => {
    return (
        <div class = 'frontpagediv'>
            <p> Cars R Us Scaffolding </p>
            <div>
                <ul>
                    <li>
                        
                         <Link to ='/'>
                             Nav page  -You should always see here.
                             </Link>
                    </li>
                    <li>
                            <Link to='/login'> Login Page </Link> 
                    </li>
                    <li>
                            <Link to='/register'>Register page</Link>
                    </li>
                    <li>
                            <Link to ='/product'> Product Page </Link>    
                    </li>
                    <li>
                            <Link to= '/searchbar'> Search Bar </Link>
                    </li>
                    <li>
                            <Link to= '/shoppingcart'> Shopping Cart Page </Link>
                    </li>
                    <li>
                            <Link to= '/miscAPIpage'> Misc API display playground</Link>
                    </li>
                    <li>
                            <Link to= '/adminpage'> Admin Page</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar