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
        
         
        
        </span>
        </div>
        
    )
}

export default Searchbar