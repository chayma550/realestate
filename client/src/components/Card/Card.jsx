import React, { useContext, useState } from 'react'
import "./card.scss"
import { Link } from 'react-router-dom'
import { useLoaderData, useNavigate } from 'react-router'
import { AuthContext } from '../../Context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBath, faBed, faBookmark, faComment, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import apiRequest from '../lib/apiRequest'

const Card = ({item}) => {
  const post=useLoaderData()
  const[saved,setSaved]=useState(post.isSaved)

 const handleSave=async()=>{
  setSaved((prev)=>!prev)

  try{
    await apiRequest.post("/users/save",{postId:post.id})

  }catch(err){
    console.log(err)
    setSaved((prev)=>!prev)

  }
 }
  
  return (
    <div className='card'>
      <div className="imgContainer">
      <Link to={`/list/${item.id}`}>
     <img src={item.images[0]} alt="" />
      </Link>
      </div>
      <div className="textContainer">
        <h2 className='title'>
        <Link to={`/list/${item.id}`} className='link'>
          {item.title}
        </Link>

        </h2>
       <p className='address'>
        <FontAwesomeIcon icon={faLocationDot}  />
       <span className='location'> {item.address}</span>
        </p>

       <span className='price'>${item.price}</span>
       
        <div className="bottom">
          <div className="feature">
          <FontAwesomeIcon icon={faBed} />
          <span >{item.bedroom} Bedrooms</span>
          </div>
          <div className="feature">
          <FontAwesomeIcon icon={faBath} />
          <span>{item.bathroom} Bathroom</span>
          </div>

           <div className="icons">
            <FontAwesomeIcon icon={faBookmark} className='icon' onClick={handleSave} 
            style={{
              background:saved ? "#fece51":"white"
            }}></FontAwesomeIcon>
            
           <Link to="/profile">    
           <FontAwesomeIcon icon={faComment}  className='icon'/>
           </Link>

       </div>
           </div>
        </div>
      </div>
  )
}

export default Card
