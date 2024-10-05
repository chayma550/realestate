import React, { useState } from 'react'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "./filter.scss"
import { useSearchParams } from 'react-router-dom';
const Filter = () => {
  const[searchParams,setSearchParams]=useSearchParams()
  const[query,setQuery]=useState({
    type:searchParams.get("type")||"",
    city:searchParams.get("city")||"",
    minPrice:searchParams.get("minPrice")||0,
    maxPrice:searchParams.get("maxPrice")||100000000,
    bedroom:searchParams.get("bedroom")||1,

  })
  const handleChange=(e)=>{
    setQuery({...query,[e.target.name]:e.target.value})


  }
  const handleFilter=()=>{
    setSearchParams(query)
  }
  return (
    <div className='filter'>
      <h1>Search results for <b>{searchParams.get("city")}</b></h1>
      <div className="top">
        <div className="item">
        <label htmlFor='Location'>Location</label>
      <input 
      type='text' 
      name='city' 
      id='city'
     placeholder='City Location' 
      onChange={handleChange}
      defaultValue={query.city}
      />
        </div>
        
      </div>
      <div className="bottom">

      <div className="item">
      <label htmlFor='type'>Type</label>
      <select name='type' id='type' onChange={handleChange } defaultValue={query.type}>
      <option value='any'>Any</option>
        <option value='buy'>Buy</option>
        <option value='rent'>Rent</option>

      </select>
      </div>
   
       <div className="item">
       <label htmlFor='Proprety'>Proprety</label>
       <select name='proprety' id='property' onChange={handleChange} defaultValue={query.proprety}>
        <option value="any">Any</option>
        <option value="appartment">Appartment</option>
        <option value="house">House</option>
        <option value="condo">Condo</option>
        <option value="land">Land</option>


       </select>
       </div>
      
       <div className="item">
       <label htmlFor='Minprice'>Min Price</label>
      <input type='number' name='minprice' min={0} id='minprice'
       placeholder='Min Price' onChange={handleChange} defaultValue={query.minPrice}/>
       </div>
      
      <div className="item">
      <label htmlFor='MaxPrice'>Max Price</label>
      <input type='number' name='maxprice' min={0} 
      id='maxprice' placeholder='Max Price' onChange={handleChange} defaultValue={query.maxPrice}/>
      </div>

      <div className="item">
       <label htmlFor='bedrom'>Bedroom</label>
      <input type='number' name='bedroom' min={0} id='bedroom'
       placeholder='Bedroom' onChange={handleChange} defaultValue={query.bedroom}  />
       </div>

         <div className="item">
           <button onClick={handleFilter}>
            <FontAwesomeIcon icon={faMagnifyingGlass} size="l  "   style={{color: "#ffffff", }} />
            </button>
      </div>
      </div>
      
    </div>
  )
}

export default Filter
