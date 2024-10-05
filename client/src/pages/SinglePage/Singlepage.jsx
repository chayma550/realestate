import React, { useContext, useState } from 'react'
import "./singlepage.scss"
import Slider from '../../components/Slider/Slider'
import { faBath, faBed, faBookmark, faBus, faHandHoldingDollar, faLocationDot, faMessage, faPaw, faSchool, faScrewdriverWrench, faUpRightAndDownLeftFromCenter, faUtensils } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Map from "../../components/Map/Map"
import { useLoaderData, useNavigate } from 'react-router'
import DOMPurify from 'dompurify'
import { AuthContext } from '../../Context/AuthContext'
import apiRequest from '../../components/lib/apiRequest'
import { Link } from 'react-router-dom'
const Singlepage = () => {

  const post=useLoaderData()
  const{currentUser}=useContext(AuthContext)
  const[saved,setSaved]=useState(post.isSaved)
  const navigate=useNavigate()

 const handleSave=async()=>{
  setSaved((prev)=>!prev)
  if(!currentUser){
    navigate("/login")
  }
  try{
    await apiRequest.post("/users/save",{postId:post.id},{
      headers: {
        Authorization: `Bearer ${currentUser.accessToken}` 
      }})

  }catch(err){
    console.log(err)
    setSaved((prev)=>!prev)

  }
 }


  return (
    <div className='single'>
      <div className="details">
        <div className="wrapper">
        <Slider images={post.images}/>
          <div className="info">
            <div className="top">
                 <div className="post">
                  <h1 className='title'>{post.title}</h1>
                  <p className='address'>
                  <FontAwesomeIcon icon={faLocationDot} className='icon'  />
                  <span className='location'>{post.address}</span>
                  </p>
                  <span className='price'>${post.price}</span>
                 </div>
                 
                 <div className="user">
            
                  <img src={post.user.avatar} alt=''/>
                  <span>{post.user.username}</span>
                 </div>
            </div>
            <div className="bottom"
            dangerouslySetInnerHTML={{
              __html:DOMPurify.sanitize(post.postDetail.desc),
            }}
            >
            
            
            </div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <h1 className='title'>General</h1>
          <div className="listvertical">
            <div className="feature">
            <FontAwesomeIcon className='icon' icon={faScrewdriverWrench} />
              <div className="featureText">
              <span>Utility</span>
              <p>{post.postDetail.utilities}</p>

              </div>
            </div>


            <div className="feature">
            <FontAwesomeIcon className='icon' icon={faPaw} />             
             <div className="featureText">
              <span>Pet Policy</span>
              <p>{post.postDetail.pet}</p>

              </div>
            </div>

            <div className="feature">
            <FontAwesomeIcon className='icon' icon={faHandHoldingDollar} />           
              <div className="featureText">
              <span>Proprety Fees</span>
              <p>{post.postDetail.income}</p>

              </div>
            </div>  

            
          </div>
          <h1 className='title'>Room Sizes</h1>
          <div className="sizes">
          <div className="size">
          <FontAwesomeIcon className='icon' icon={faUpRightAndDownLeftFromCenter} />
          <span>{post.postDetail.size} sqfl</span>
          </div>

          <div className="size">
          <FontAwesomeIcon className='icon' icon={faBed} />         
           <span>{post.bedroom} beds</span>
          </div>

          <div className="size">
          <FontAwesomeIcon className='icon' icon={faBath} />        
             <span>{post.bathroom} bathroom</span>
          </div>
          </div>
          <h1 className='title'>Nearby Places</h1>
          <div className="listhorizontal">

          <div className="feature">
          <FontAwesomeIcon className='icon' icon={faSchool} />           
             <div className="featureText">
              <span>School</span>
              <p>{post.postDetail.school} m away</p>

              </div>
            </div>

            <div className="feature">
            <FontAwesomeIcon className='icon' icon={faBus} />       
              <div className="featureText">
              <span>Bus</span>
              <p>{post.postDetail.bus} m away</p>

              </div>
            </div>
            <div className="feature">
            <FontAwesomeIcon className='icon' icon={faUtensils} />          
                <div className="featureText">
              <span>Restaurant</span>
              <p>{post.postDetail.restaurant} m away</p>

              </div>
            </div>
          </div>
           
          <h1 className='title'>location</h1>
          <div className="mapContainer">
            <Map items={[post]}/>
          </div>
          <div className="buttons">
            <Link to="/profile">
            <button>
            <FontAwesomeIcon icon={faMessage} />
            <span>Send a message</span>
            </button>
            </Link>
            
            <button onClick={ handleSave} style={{
              background:saved ? "#fece51":"white"
            }}>
            <FontAwesomeIcon icon={faBookmark} />
            <span>{saved ? "Place is saved":"Save the place"}</span>
            </button>
          </div>

        </div>
      </div>
      
    </div>
  )
}

export default Singlepage
