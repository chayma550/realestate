import React, { useState } from 'react'
import "./searchBar.scss"
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const SearchBar = () => {

   const types=["buy","rent"];

    const[query,setQuery]=useState({
        type:"buy",
        city:"",
        minPrice:0,
        maxPrice:0,
    })

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
   
  return (
    <div className='searchBar'>
        <div className="type">
            {types.map((type)=>(
            <button 
            key={type} 
            onClick={()=>switchType(type)} 
            className={query.type===type ?"active ":""}>{type}</button>

            ))}

        </div>
        <form>
            <input type='text' name='city' placeholder=' City Location' onChange={handleChange} />
            <input type='number' name='minPrice' min={0} placeholder='Min Price' onChange={handleChange} />
            <input type='number' name='maxPrice' min={0} placeholder='Max Price' onChange={handleChange}/>
            <Link 
            to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}>        
                <button>
            <FontAwesomeIcon icon={faMagnifyingGlass} size="xl  " style={{color: "#ffffff",}} />
            </button>
            </Link>
        </form>
    </div>
  )
}

export default SearchBar
