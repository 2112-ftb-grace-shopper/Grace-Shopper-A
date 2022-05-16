import React from 'react';
import ReactDOM from 'react-dom';
import '../style/Searchbar.css';

const Searchbar = () => {

    return (
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
    )
}

export default Searchbar