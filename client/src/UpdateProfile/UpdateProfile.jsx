import React, { useContext, useState } from 'react'
import "./updateProfile.scss"
import { AuthContext } from '../Context/AuthContext'
import apiRequest from '../components/lib/apiRequest'
import { useNavigate } from 'react-router'
import UploadWidget from '../components/UploadWidget/UploadWidget'

const UpdateProfile = () => {

const{currentUser,updateUser}=useContext(AuthContext)
const[error,setError]=useState("");
const [avatar,setAvatar]=useState([])

const navigate=useNavigate()

const handleSubmit=async(e)=>{
    e.preventDefault();
    const formData=new FormData(e.target)
    const{username,email,password}=Object.fromEntries(formData)
    try{
        const res=await apiRequest.put(`/users/${currentUser.id}`,{
            username,
            email,
            password,
            avatar:avatar[0]
        },{
          headers: {
            Authorization: `Bearer ${currentUser.accessToken}` 
          }});
      updateUser(res.data)
      navigate("/profile")
    }catch(err){
        console.log(err)
        setError(err.response?.data?.message || "An error occurred"); // Improve error handling
    }

}
console.log(currentUser.accessToken)

  return (
    <div className="update">
    <div className="update-container">
     
      <div className="right-side">
        <div className="update-box">
          <h2>Update Profile</h2>
      
          
          <form onSubmit={handleSubmit}>
          <input type="text" placeholder={currentUser.username} name="username" required  />
            <input type="email" placeholder={currentUser.email  } name="email" required  />
            <input type="password" placeholder="Password" name="password" required />
           
            <button type="submit" >Update</button>
            {error && <span>{error}</span>}
          </form>
         
        </div>
      </div>
      <div className="left-side">
        <img src={avatar[0] ||currentUser.avatar || "/img/noavatar.jpg"} alt=''/>
        <UploadWidget
        uwConfig={{
          cloudName: "dneg17tpk",
          uploadPreset: "estate",
          multiple: false,
          maxImageFileSize: 2000000,
          folder: "avatars",
        }}
        setState={setAvatar}
        />
          
        
      </div>
    </div>
    </div>
  )
}

export default UpdateProfile
