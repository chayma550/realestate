import React from 'react'
import "./homecard.scss"
const HomeCard = () => {
  return (
    <div className='homeCard' >
      <div className="content">
      <div className="leftContent" >
              <div className="wrapper">
            <img src="./img/couple.jpg" alt="" />
        </div>
        </div>
        <div className="rightContent" >
            <div className="wrapper" >
        <h1>Modern spaces and <b>premium</b> design</h1>
        <p>Lorem ipsum dolor sit amet, minimum inimicus quo no, at vix primis viderere vituperatoribus. In corpora argumentum.</p>
        <ul>
            <li>- Mea omnium explicari</li>
            <li>- His no legere feugaetoer</li>
            <li>- Illum idquem</li>
          </ul>        
            <button className="search-button">Search Property</button>
            </div>
        </div>
        
      </div>
    </div>
  )
}

export default HomeCard
