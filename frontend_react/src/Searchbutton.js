// import React, { useState, useEffect } from 'react'
import './SearchBar'
import FetchJson from './JsonFetching';
import PieChart from './PieChart';

const SearchButton = ({callback}) => {
    const callbackFunction = callback

    const searchValue = () => {
        var search_value = document.getElementById("searchbox").value

        fetch(`/search`, {
            method: 'POST',
            data: search_value,
            mode:'cors',
            body: search_value,
            headers: {
                'Content-Type': 'application/text'
            }
        })
            .then((response) => {
                response.text()
               
            })
            .then(() => {
                console.log('GET response text:');
                console.log(search_value)
                FetchJson(callbackFunction)
                
            })
            .catch(error => console.log(error))
    }

    return (
        <div className="search_btn">
            <button type="submit" id="search_button" onClick={searchValue}   >Search</button>
          
        </div>
    );
}

export default SearchButton;