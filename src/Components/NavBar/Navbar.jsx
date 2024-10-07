import React,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import '../Feed/feed.css'
import { BiSearch,BiAlbum,BiBell,BiCartAlt } from "react-icons/bi";
import { useTranslation } from 'react-i18next';
import  DropDown  from './DropDown';


const Feed_profile_navbar = () => {
    const {t} = useTranslation()

    return (
    <div className='feed_header'>
        <a href='/'><div className='feed_header_logo'>{t("feed_logo")}</div></a>
        <div className='feed_haider_main'>
            <div className='feed_header_search'>
                <BiSearch className='feed_header_search_icon' />
                <input placeholder='Search anything here...' />
            </div>
            <div className='feed_header_icon'>
                <BiAlbum className='feed_header_icon_icon' />
            </div>
        </div>
        <div className='feed_haider_search_icon'>
        <BiSearch className='feed_header_search_icon' />
        </div>
        <div className='feed_header_info'>
            <div className='feed_header_info1'><BiBell /><span>3</span></div>
            <div className='feed_header_info1'><BiCartAlt /><span>1</span></div>
            <div className='feed_header_info_profile'>
                <DropDown/>
            </div>
        </div>
    </div>
  )
}

export default Feed_profile_navbar