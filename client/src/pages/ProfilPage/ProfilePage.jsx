import React, { Suspense, useContext, useEffect } from 'react'
import "./profilepage.scss"
import List from '../../components/List/List'
import { Await, useLoaderData, useNavigate } from 'react-router'
import { AuthContext } from '../../Context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import Chat from "../../components/Chat/Chat"
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase'

const ProfilePage = () => {
  const data=useLoaderData()
  const navigate=useNavigate();
const{updateUser,currentUser}=useContext(AuthContext)

 
useEffect(()=>{
if(!currentUser){
  navigate("/login")
}
},[currentUser,navigate])
const singOut =async()=>{
  try {
    await signOut(auth);
    updateUser(null); // Reset the user context
    navigate("/login"); // Navigate to login page or another appropriate page
  } catch (err) {
    console.error("Logout Error: ", err.message);
  }

}
 
  return (
    currentUser&&(
    <div className='profile'>
       <div className="details">
        <div className="wrapper">
            <div className="title">
                <h1>User Information</h1>
               <Link to="/updateProfile"> <button>Update Profile</button></Link>
            </div>
            <div className="info">
                <div className="user">
                <span>Avatar:</span>
               
            <img src={currentUser.avatar  || "/img/noavatar.jpg"} alt=""/>
           
             
                </div>
             <div className="user">
             <span>Username:</span>
             <span><b>{currentUser.username}</b></span>
             </div>
            
             <div className="user">
             <span>Email:</span>
             <span><b>{currentUser.email}</b></span>

             </div>
             <div className="user">
             <button onClick={singOut}><FontAwesomeIcon icon={faRightFromBracket} />logout</button>


             </div>

            </div>
            <div className="title">
                <h1>My List </h1>
              <Link to="/add"> <button>Create New Post</button></Link> 
                
            </div>
            <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.userPosts} />}
            </Await>
          </Suspense>
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.savedPosts} />}
            </Await>
          </Suspense>
            



        </div>
       </div>
       <div className="chatContainer">
        <div className="wrapper">
        <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.chatResponse}
              errorElement={<p>Error loading chats!</p>}
            >
              {(chatResponse) => <Chat chats={chatResponse.data}/>}
            </Await>
          </Suspense>
        </div>
       </div>
    </div>
  )
)
}

export default ProfilePage
