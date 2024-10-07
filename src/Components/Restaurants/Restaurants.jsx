import React,{useEffect} from 'react'
import NavBar from "../NavBar/Navbar"
import FeedSidebar from "../Feed/FeedSidebar"
// import { useTranslation } from 'react-i18next';
import { RiSearchLine } from "react-icons/ri";
import './Restaurants.css'
import { Link } from 'react-router-dom';

const Restaurants = () => {
    // const {t} = useTranslation()
    // useEffect(()=>{
    //   const token = JSON.parse(localStorage.getItem('userInfo'))?.token
    //   if(!token){
    //     window.location = '/';
    //   }
    // },[])
    return (
    <div className='main_chefprofile'>
      <NavBar/>
      <FeedSidebar />
      <div className='chefprofile_container'>
        <div className='chefs_container'>
        <h2>Restaurants </h2>
          {/* <div className='chefprofile_input'>
            <RiSearchLine className='chefprofile_icon' />
            <input placeholder='Search your favourite chefs' />
          </div> */}
          <div className='chefprofile_main'>
            <div className='chefprofile_main_chef'>
              <div><img src='https://cdn.pixabay.com/photo/2014/09/17/20/26/restaurant-449952__340.jpg' /></div>
              <Link to="/restaurant/profile"><h6>ChatterBox</h6></Link>
              <button>Order Meal</button>
            </div>
            <div className='chefprofile_main_chef'>
              <div><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6d2ZXDNxbn3xefiWWdFyJjMXAeQYdHuN1qF0-oBpJrQ&s' /></div>
              <Link to="/restaurant/profile"><h6>Jhon</h6></Link>
              <button>Order Meal</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Restaurants 