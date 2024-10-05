import React from 'react'
import "./home.scss"
import Header from '../../components/Header/Header'
import Feature from "../Feature/Feature"
import HomeCard from '../../HomeCard/HomeCard'
import Help from '../../Help/Help'
import About from '../About/About'
import Popular from '../../components/PopularChoice/Popular'
import Contact from '../Contact/Contact'
import Testimonials from '../Testimonials/Testimonials'
import Footer from '../../components/Footer/Footer'
import 'aos/dist/aos.css';


const Home = () => {
  
 
  return (
    <div className='home'>
     <Header/>
     <About/>
     <Popular/>
     <HomeCard/>
     
     <Feature/>
     <Help/>
     <Testimonials/>
     <Contact/>
     <Footer/>

    </div>
    
  )
}

export default Home
