import React from 'react'
import '../Feed/feed.css'
import { CgCap } from "react-icons/cg";
import { GiShoppingBag,GiChefToque } from "react-icons/gi";
import { TiMessages } from "react-icons/ti";
import { MdOutlineAccessTime,MdOutlineFavoriteBorder,MdDashboard, MdGroups} from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const FeedSideBar = () => {
    const {t} = useTranslation()

    const logOut=()=>{
        localStorage.removeItem("token")
    }
    
  return (
    <div className='feed_sidebar'>
        <div className='feed_sidebar_items active'>
        <MdDashboard className='feed_sidebar_items_icon' />
            <Link to='/'><span>{t("feed")}</span></Link>
        </div>
        <div className='feed_sidebar_items '>
        <CgCap className='feed_sidebar_items_icon' />
            <Link to='/restaurants'><span>{t("restaurants")}</span></Link>
        </div>
        <div className='feed_sidebar_items'>
            <GiChefToque className='feed_sidebar_items_icon' />
            <Link to='/chefs'><span>{t("chefs")}</span></Link>
        </div>

        <div className='feed_sidebar_items'>
            <GiShoppingBag className='feed_sidebar_items_icon' />
            <span>{t("order_a_meal")}</span>
        </div>
        <div className='feed_sidebar_items'>
        <MdOutlineFavoriteBorder className='feed_sidebar_items_icon' />
            <Link to="/favourite"><span>{t("favourite")}</span></Link>
        </div>
        <div className='feed_sidebar_items'>
        <TiMessages className='feed_sidebar_items_icon' />
            <span>{t("messages")}</span>
        </div>
        {/* <div className='feed_sidebar_items'>
        <MdGroups className='feed_sidebar_items_icon' />
            <span>{t("groups")}</span>
        </div> */}
        <div className='feed_sidebar_items'>
              <MdOutlineAccessTime className='feed_sidebar_items_icon' />
            <span>{t("history")}</span>
        </div>
        {/* <div className='feed_sidebar_items'>
        <IoSettingsOutline className='feed_sidebar_items_icon' />
        <span>{t("settings")}</span>
        </div> */}
        <div className='feed_sidebar_items' onClick={logOut}>
            <RiLogoutCircleLine className='feed_sidebar_items_icon' />
            <Link to="/login"><span>{t("logout")}</span></Link>
        </div>
    </div>
  )
}

export default FeedSideBar