import React,{useEffect} from 'react'
import './feed.css'
import Container from "react-bootstrap/Container"
import NavBar from '../NavBar/Navbar'
import FeedSideBar from "./FeedSidebar"
import { AiOutlineLike,AiOutlineComment } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import { RiGalleryLine } from "react-icons/ri";
import { useTranslation } from 'react-i18next';

const Feed = () => {
    const {t} = useTranslation()

    // useEffect(()=>{
    //   const token = JSON.parse(localStorage.getItem('token'))
    //    if(!token){
    //      window.location = '/';
    //    }
    // },[])
     
  
    
    
    return (
    <Container fluid className='feed_container'>
      <NavBar/>
      <div className='feed_banner'>
        <FeedSideBar  />
        <div className='feed_banner_scroll'>
          <div className='feed_banner_scroll_left'>
            <div className='feed_banner_scroll_left_items'>
              <div className='feed_banner_left_header'>
                <div className='feed_banner_left_header_image'></div>
                <div className='feed_banner_left_header_content'>
                  <h1>{t("unknown")}</h1>
                  <p>{t("hours_ago")}</p>
                </div>
                <div className='feed_banner_left_header_bars'>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
              <div className='feed_banner_left_video'></div>
              <div className='feed_banner_left_likes'>
                <div><AiOutlineLike /><span>4,000K</span><span>{t("likes")}</span></div>
                <div><span>123</span><span>{t("comments")}</span></div>
              </div>
              <div className='feed_banner_left_comments'>
                <div><AiOutlineLike /> <span>{t("comment")}</span></div>
                <div><AiOutlineComment /> <span>{t("like")}</span></div>
              </div>
              <div className='feed_banner_left_search'>
                <div className='feed_banner_left_search_image'></div>
                <div className='feed_banner_left_search_search'>
                  <input placeholder='Write a Comment'/>
                  <div>
                    <BsEmojiSmile className='feed_banner_left_search_search_icon' />
                    <RiGalleryLine className='feed_banner_left_search_search_icon' />
                  </div>
                </div>
              </div>
            </div>
            <div className='feed_banner_scroll_left_items'>
              <div className='feed_banner_left_header'>
                <div className='feed_banner_left_header_image'></div>
                <div className='feed_banner_left_header_content'>
                  <h1>{t("unknown")}</h1>
                  <p>{t("hours_ago")}</p>
                </div>
                <div className='feed_banner_left_header_bars'>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
              <div className='feed_banner_left_video'></div>
              <div className='feed_banner_left_likes'>
                <div><AiOutlineLike /><span>4,000K</span><span>{t("likes")}</span></div>
                <div><span>123</span><span>{t("comments")}</span></div>
              </div>
              <div className='feed_banner_left_comments'>
                <div><AiOutlineLike /> <span>{t("like")}</span  ></div>
                <div><AiOutlineComment /> <span>{t("comment")}</span></div>
              </div>
              <div className='feed_banner_left_search'>
                <div className='feed_banner_left_search_image'></div>
                <div className='feed_banner_left_search_search'>
                  <input placeholder='Write a Comment'/>
                  <div>
                    <BsEmojiSmile className='feed_banner_left_search_search_icon' />
                    <RiGalleryLine className='feed_banner_left_search_search_icon1' />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='feed_banner_scroll_right'>
            <div className='feed_banner_scroll_right_items'>
              <div className='feed_banner_right_items_info'>
                <h3>{t("order_meal")}</h3>
                <h6>{t("see_all")}</h6>
              </div>
              <div className='feed_banner_right_items_profile'>
                <div className='feed_banner_left_header_image'></div>
                <div className='feed_banner_left_header_content'>
                  <h1>{t("macdonalds")}</h1>
                  <p>{t("hours_ago")}</p>
                </div>
              </div>
              <div className='feed_banner_right_header_image'></div>
              <h1 className='feed_banner_right_header_heading'>{t("double_spicy_mccrispy_meal")}</h1>
              <p className='feed_banner_right_header_para'>{t("spicy_mccrispy_with_regular_fries_and_regular_drink")}</p>
              <div className='feed_banner_right_header_cart'>
                <div className='feed_banner_right_header_cart1'>PKR 1599</div>
                <div className='feed_banner_right_header_cart2'>{t("add_to_cart")}</div>
              </div>
            </div>
            <div className='feed_banner_scroll_right_items'>
              <div className='feed_banner_right_items_info'>
                <h3>{t("order_meal")}</h3>
                <h6>{t("see_all")}</h6>
              </div>
              <div className='feed_banner_right_items_profile'>
                <div className='feed_banner_left_header_image'></div>
                <div className='feed_banner_left_header_content'>
                  <h1>{t("macdonalds")}</h1>
                  <p>{t("hours_ago")}</p>
                </div>
              </div>
              <div className='feed_banner_right_header_image'></div>
              <h1 className='feed_banner_right_header_heading'>{t("double_spicy_mccrispy_meal")}</h1>
              <p className='feed_banner_right_header_para'>{t("spicy_mccrispy_with_regular_fries_and_regular_drink")}</p>
              <div className='feed_banner_right_header_cart'>
                <div className='feed_banner_right_header_cart1'>PKR 1599</div>
                <div className='feed_banner_right_header_cart2'>{t("add_to_cart")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Feed