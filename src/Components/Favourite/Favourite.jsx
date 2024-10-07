import React,{useEffect} from 'react'
import NavBar from "../NavBar/Navbar"
import FeedSidebar from "../Feed/FeedSidebar"
// import { useTranslation } from 'react-i18next';
import { RiSearchLine } from "react-icons/ri";
import { AiFillHeart } from "react-icons/ai";
import './Favourite.css'
import { Link } from 'react-router-dom';

const Favourite = () => {
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
        <h2>Favourites</h2>
          {/* <div className='chefprofile_input'>
            <RiSearchLine className='chefprofile_icon' />
            <input placeholder='Search your favourite chefs' />
          </div> */}
          <div className='chefprofile_main'>
            <div className='chefprofile_main_chefs'>
              <div><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEuAEJdVru_Y-9OXwqOSEv90zG6z4AyacI1w&usqp=CAU' /></div>
              <Link to="/chef/profile"><h6>Caleb Bogan</h6></Link>
              <button><AiFillHeart /> &nbsp; Favourites</button>
            </div>
            <div className='chefprofile_main_chefs'>
              <div><img src='https://cdn.pixabay.com/photo/2014/09/17/20/26/restaurant-449952__340.jpg' /></div>
              <Link to="/chef/profile"><h6>Caleb Bogan</h6></Link>
              <button><AiFillHeart /> &nbsp; Favourites</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Favourite