import React,{useEffect} from 'react'
import NavBar from "../NavBar/Navbar"
import FeedSidebar from "../Feed/FeedSidebar"
// import { useTranslation } from 'react-i18next';
import { RiSearchLine } from "react-icons/ri";
import './Chefs.css'
import { Link } from 'react-router-dom';

const Chefs = () => {
    // const {t} = useTranslation()
    // const token = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null

    // useEffect(()=>{
    //   if(token == null){
    //     window.location = '/';
    //   }
    // },[])

    return (
    <div className='main_chefprofile'>
      <NavBar/>
      <FeedSidebar />
      <div className='chefprofile_container'>
        <div className='chefs_container'>
          <h2>Chefs</h2>
          <div className='chefprofile_main'>
            <div className='chefprofile_main_chef'>
              <div><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEuAEJdVru_Y-9OXwqOSEv90zG6z4AyacI1w&usqp=CAU' /></div>
              <Link to="/chef/profile"><h6>Caleb</h6></Link>
              <button>Order Meal</button>
            </div>
            <div className='chefprofile_main_chef'>
              <div><img src='https://5.imimg.com/data5/SELLER/Default/2022/3/LF/EF/HM/148640419/hire-tandoor-chef-for-canteen-500x500.jpg' /></div>
              <Link to="/chef/profile"><h6>Bogan</h6></Link>
              <button>Order Meal</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chefs