import React from 'react'
import "./help.scss"
const Help = () => {
  return (
    <div className='help'> 
     
     <div className="leftContainer">
        <div className="wrapper">
        <h1 className='title'>Our expert will help you make the renovation</h1>
            <div className="details">
              <img src="./img/home.png" alt="" />
              <div className="desc">
              <h2>Find inspiration</h2>
              <p>Sumo petentium ut per, at his wisim utinam adipis cing. Est e graeco quod suavitate vix ad praesent.</p>

              </div>
            </div>

            <div className="details">
              <img src="./img/blueprint.png" alt="" />
              <div className="desc">
              <h2>Find architect/designer</h2>
              <p>Sumo petentium ut per, at his wisim utinam adipis cing. Est e graeco quod suavitate vix ad praesent.</p>

              </div>
            </div>

            <div className="details">
              <img src="./img/roller.png" alt="" />
              <div className="desc">
              <h2>Begin renovation</h2>
              <p>Sumo petentium ut per, at his wisim utinam adipis cing. Est e graeco quod suavitate vix ad praesent.</p>

              </div>
            </div>
            
        </div>
     </div>
     <div className="rightContainer">
      <img src="./img/agent.png" alt="" />
     </div>
    </div>
  )
}

export default Help
