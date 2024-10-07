import React from 'react'
import '../../Feed/feed.css'
import { useDispatch } from 'react-redux';
import { GiHotMeal,GiShoppingBag } from "react-icons/gi";
import { TiMessages } from "react-icons/ti";
import {CgMenuBoxed} from "react-icons/cg"
import { MdOutlineAccessTime,MdDashboard,MdOutlineAttractions,MdGroups } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useTranslation } from 'react-i18next';
import {logout} from "../../../Actions/userActions"
import { Link } from 'react-router-dom';

const Feed_profile_sidebar = () => {
    const {t} = useTranslation()
    const dispatch=useDispatch

    const logOut=()=>{
        localStorage.removeItem("token")
    }
  return (
    <div className='feed_sidebar'>
   <div className='feed_sidebar_items active'>
        <MdDashboard className='feed_sidebar_items_icon' />
            <span>{t("dashboard")}</span>
        </div>
        <div className='feed_sidebar_items '>
            <GiShoppingBag className='feed_sidebar_items_icon' />
            <span>{t("orders")}</span>
        </div>
        <div className='feed_sidebar_items'>
            <MdOutlineAttractions className='feed_sidebar_items_icon' />
            <span>{t("tracking")}</span>
        </div>
        <div className='feed_sidebar_items'>
            <GiHotMeal className='feed_sidebar_items_icon' />
            <span>{t("table_reservation")}</span>
        </div>
        <div className='feed_sidebar_items'>
            <CgMenuBoxed className='feed_sidebar_items_icon' />
            <span>{t("menu")}</span>
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
        <div className='feed_sidebar_items'>
            <IoSettingsOutline className='feed_sidebar_items_icon' />
            <Link to="/setup-account"><span>{t("settings")}</span></Link>
        </div>
        <div className='feed_sidebar_items' onClick={logOut}>
            <RiLogoutCircleLine className='feed_sidebar_items_icon' />
            <Link to="/login"><span>{t("logout")}</span></Link>
        </div>
    </div>
  )
}

export default Feed_profile_sidebar