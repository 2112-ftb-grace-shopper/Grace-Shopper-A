import React from 'react';
import '../style/Searchbar.css';
import { Link } from 'react-router-dom';

const Searchbar = () => {

    return (
        <div className='searchbar'>

        <span >
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
        </div>
        
    )
}

export default Searchbar