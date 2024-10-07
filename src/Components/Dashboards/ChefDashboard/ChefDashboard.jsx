import React from 'react'
import '../Dashboards.css'
import Table from 'react-bootstrap/Table';
import { BsArrowRight} from "react-icons/bs";
import { FaImage} from "react-icons/fa";
import { AiFillVideoCamera ,AiFillYoutube} from "react-icons/ai";
import NavBar from '../../NavBar/Navbar'
import ChefSidebar from './ChefSidebar';
import { useTranslation } from 'react-i18next';


const ChefDashboard = () => {
  const {t}=useTranslation()
  return (
    <div className="dashboard_container">
        <NavBar/>
        <ChefSidebar/>
        <div className="chef_dash_container">
        <div className='upper'>
            <div className="social">
                <div className="social_form">
                    <div className="social_form_img"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8Fuwv44A0ihiECFWqSer_w2-RjKQIn8DvjIe7qU4&s" alt="" /></div>
                    <form action=""><input type="text" placeholder="What's on your mind?" /></form>
                </div>
                <div className="social_buttons">
                    <button> <AiFillVideoCamera/>{t("video")}</button>
                    <button><FaImage/>{t("photo")}</button>
                    <button><AiFillYoutube/>{t("youtube_link")}</button>
                </div>
            </div>
            <div className="messages">
                <h6 className='head_msg'>{t("new_messages")}<span><BsArrowRight/></span></h6>
                <div className="message_one">
                    <img src="https://image.shutterstock.com/image-photo/chef-hands-keep-wok-fire-260nw-1758966962.jpg" alt="" />
                    <div className="text">
                        <h6>{t("name")}</h6>
                        <small>{t("message")}</small>
                    </div>
                    <div className="number">1</div>
                </div>
                <div className="message_one">
                    <img src="https://image.shutterstock.com/image-photo/chef-hands-keep-wok-fire-260nw-1758966962.jpg" alt="" />
                    <div className="text">
                        <h6>{t("name")}</h6>
                        <small>{t("message")}</small>
                    </div>
                    <div className="number">1</div>
                </div>
            </div>
        </div>
        {/* ------- */}
        <div className="lower">
        <h6>{t("menu")}</h6>
        <small>{t("date")}</small>
        <Table striped>
      <thead>
        <tr>
          <th>{t("no")}</th>
          <th>{t("id")}</th>
          <th>{t("date_text")}</th>
          <th>{t("item")}</th>
          <th>{t("ingredients")}</th>
          <th>{t("price")}</th>
          <th>{t("type")}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>#1234</td>
          <td>23/01/2022</td>
          <td>{t("salad")}</td>
          <td>{t("cabage")}</td>
          <td>Rs.800</td>
          <td>{t("starter")}</td>
        </tr>
        <tr>
          <td>2</td>
          <td>#1234</td>
          <td>23/01/2022</td>
          <td>{t("salad")}</td>
          <td>{t("cabage")}</td>
          <td>Rs.800</td>
          <td>{t("starter")}</td>
        </tr>
        <tr>
            <td>3</td>
        <td>#1234</td>
          <td>23/01/2022</td>
          <td>{t("salad")}</td>
          <td>{t("cabage")}</td>
          <td>Rs.800</td>
          <td>{t("starter")}</td>
        </tr>
      </tbody>
    </Table>
        </div>
        {/* ----- */}
        <div className="lower">
        <h6>{t("order_list")}</h6>
        <small>{t("date")}</small>
        <Table striped>
      <thead>
        <tr>
          <th>{t("no")}</th>
          <th>{t("id")}</th>
          <th>{t("date_text")}</th>
          <th>{t("name")}</th>
          <th>{t("address")}</th>
          <th>{t("amount")}</th>
          <th>{t("status_order")}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
            <td>1</td>
        <td>#1234</td>
          <td>23/01/2022</td>
          <td>{t("name")}</td>
          <td>{t("complete_address")}</td>
          <td>Rs.800</td>
          <td>{t("completed")}</td>
        </tr>
        <tr>
        <td>2</td>
        <td>#1234</td>
          <td>23/01/2022</td>
          <td>{t("name")}</td>
          <td>{t("complete_address")}</td>
          <td>Rs.800</td>
          <td>{t("completed")}</td>
        </tr>
        <tr>
        <td>2</td>
        <td>#1234</td>
          <td>23/01/2022</td>
          <td>{t("name")}</td>
          <td>{t("complete_address")}</td>
          <td>Rs.800</td>
          <td>{t("completed")}</td>
        </tr>
      </tbody>
    </Table>
        </div>
        {/* --------- */}
        
        </div>

    </div>
  )
}

export default ChefDashboard