import React from 'react'
import "./header.scss"
import SearchBar from '../../components/SearchBar/SearchBar'
import CountUp from 'react-countup';

const Header = () => {
 
 
  return (
    <div className='header'>
    
      <div className="textContainer" >
          <div className="wrapper" >
          <h1 className='title'>Find Real Estate & Get Your Dream Place</h1>
          <p className='desc'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sit amet eleifend mauris. Donec convallis consectetur mauris, nec vestibulum diam molestie non. Mauris bibendum</p>
          <SearchBar/>
          <div className="boxes">
            <div className="boxe">
            <h1 >
              <CountUp end={16} prefix="+"  style={{color:"black",fontWeight:"bold",fontSize:"25px"}}/>
            </h1>
              <span>Years of Experience</span>
            </div>

            <div className="boxe">
            <h1  >
              <CountUp end={200}  style={{color:"black",fontWeight:"bold",fontSize:"25px"}}/>
            </h1>              
              <span>Award Gained</span>
            </div>

            <div className="boxe">
            <h1  >
              <CountUp end={1200} prefix="+"  style={{color:"black",fontWeight:"bold",fontSize:"25px"}} />
            </h1>
              <span>Property Ready</span>
            </div>
          </div>
          </div>
      </div>
      <div className="imgContainer">
          <img src="./img/bg.png" alt="" />
      </div>
      
  </div>
  )
}

export default Header
