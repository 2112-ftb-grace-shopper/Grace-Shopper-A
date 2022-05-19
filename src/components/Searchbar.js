import React from 'react';
import '../style/Searchbar.css';
import { Link } from 'react-router-dom';

const Searchbar = () => {

    return (
        <div>

        <span className='searchbar'>
            <select>
                <option value='Make'>Make</option>
            </select>
            <select> 
                <option value='Model'>Model</option>
            </select>
            <select>    
                <option value='Year'>Year</option>
            </select>
            <select>    
                <option value='Color'>Color</option>
            </select>
            <select>    
                <option value='Price'>Price</option>
            </select>
            <select>    
                <option value='MinCityMPG'>Min City MPG</option>
            </select>
            <select>    
                <option value='MaxCityMPG'>Max City MPG</option>
            </select>
            <select>
                <option value='MinHwyMPG'>Min Hwy MPG</option>
            </select>
            <select>
                <option value='MaxHwyMPG'>Max Hwy MPG</option>
            </select>
        </span>
        {/* <Link path='/Landingpage'> Back </Link> */}
        </div>
        
    )
}

export default Searchbar