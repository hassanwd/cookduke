



import React, { useState, useEffect } from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import queryString from "query-string"
import { useTranslation } from 'react-i18next';

import { BiEditAlt } from "react-icons/bi";
import { HiOutlineKey } from "react-icons/hi";
import { MdOutlinePayments } from "react-icons/md";
import { RiShoppingBag3Fill, RiFacebookCircleLine } from "react-icons/ri";
import { AiOutlineYoutube, AiOutlineTwitter, AiOutlineInstagram } from "react-icons/ai";
import { removeSocialLink, userUpdate, userSocialUpdate,updatePassword,updatePassword2 } from '../../Actions/userActions';
import { genPublicURL } from '../../config';

import 'bootstrap/dist/css/bootstrap.css'; // or include from a CDN
import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
import CountrySelect from 'react-bootstrap-country-select';

const ProfileTabs = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin



  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const [user, newUser] = useState(userInfo?.user)

  const updateUserProfile = useSelector((state) => state.updateUserProfile)
  const  userData  = updateUserProfile?.userData
  var message = userData?.message

  const [password, setPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [files, setFiles] = useState('')

  const [country, setCountry]=useState(null)
  const [city, setCity]=useState("")
  const [street, setStreet]=useState("")
  const [houseNo, setHouse]=useState("")

  const [newMessage, setMessage] = useState(null)
  const [passMessage, setPassMessage] = useState(null)
  const [linkMessage, setLinkMessage] = useState(null)


  useEffect(()=>{
    setMessage(null)
    setPassMessage(null)
    setLinkMessage(null)
    message="";
  },[])

  const updateUser = () => {
    if(firstName || lastName || phone|| files || country || city || street || houseNo){
      dispatch(userUpdate({ firstName, lastName, phone, files, country , city, street, houseNo }, userInfo?.user._id))
} else{
alert("please fill all fields")
}  

  }
// abc
  useEffect(() => {
    if (message === "user updated successfully") {
      newUser(userData?.user)
      setPic("")
      setMessage(message)
    }
    else if(message==="link deleted successfully"){
      setLinkMessage(message)
    }else if(
      message==="password Changed successfully." 
    || message==="password Created successfully."
    || message==="Incorrect Previous password" 
    || "New password must be different from previous"){
      setPassMessage(message)
   
    }

  }, [message])



  const [email, setEmail] = useState('')

  const [pic, setPic] = useState(null)

  const handleChangeImage = (e) => {
    setFiles(e.target.files[0])
    setPic(URL.createObjectURL(e.target.files[0]))
  
  }




  const [socialLinks, setSocialLinks] = useState([])

  const [type, setType] = useState("")
  const [link, setLink] = useState("")

  const addLink = (e) => {
         e.preventDefault()

         if(type === "facebook"){
          var pattern = /https?:\/\/facebook\.com\/[a-z0-9_]+$/i;
          if(pattern.test(link)){
            setSocialLinks([...socialLinks, { type: type, link: link }])
            setType("")
            setLink("")
          }else{
            // setTimeout(function () { 
              setLinkMessage("Facebook url not valid")
            //  }, 2000);
          }
        }else if(type === "youtube"){
          var p = /^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.be)\/.+$/;
          if(link.match(p)){
            setSocialLinks([...socialLinks, { type: type, link: link }])
            setType("")
            setLink("")
        }else{
          // setTimeout(function () { 
            setLinkMessage("Youtube url not valid")
          //  }, 2000);
        }
        }else if(type === "twitter"){
          var p = /http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/
          if(link.match(p)){
            setSocialLinks([...socialLinks, { type: type, link: link }])
            setType("")
            setLink("")
        }else{
          // setTimeout(function () { 
            setLinkMessage("Twitter url not valid")
          //  }, 2000);
        }

        }else if(type === "instagram"){
          var p = /^\s*(https\:\/\/)?instagram\.com\/[a-z\A-Z\d\-_]{1,255}\s*$/;;
          if(link.match(p)){
            setSocialLinks([...socialLinks, { type: type, link: link }])
            setType("")
            setLink("")
        }else{
          // setTimeout(function () { 
            setLinkMessage("Instagram url not valid")
          //  }, 2000);
        }
        }else if(type !== "" && link !== ""){
          setSocialLinks([...socialLinks, { type: type, link: link }])
          setType("")
          setLink("")
          document.querySelector("#link_inp").value=""
          }else{
            // setTimeout(function () { 
              setLinkMessage("Select account type and Add link!")
            //  }, 2000);
          }
         
    } 

  

  const updateLinks = () => {
    if(socialLinks.length===0){
      setLinkMessage("Please Add Link first!")
    }else{
      dispatch(userSocialUpdate(userInfo?.user?._id, socialLinks))
      setSocialLinks([])
    }

  }

  const removeLink=(link_id,user_id)=>{
dispatch(removeSocialLink(link_id,user_id))
  }


const changePassword=(e)=>{
  e.preventDefault()
  if(password.length < 6){
    setMessage('password length is less than 6')
}
else if(password===confirmPassword){
    userInfo?.user?.password ? dispatch(updatePassword(oldPassword,password,userInfo?.user?._id)):
    dispatch(updatePassword2(password,userInfo?.user?._id))
  }else{
    setMessage("Password Doesn't Match!")
  }

}

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box className=''>
          <TabList className='profile_banner_tabs' onChange={handleChange} aria-label="lab API tabs example">
            <Tab icon={<BiEditAlt />} iconPosition="start" className='profile_banner_tab' label={t("edit_profile")} value="1" />
            <Tab icon={<HiOutlineKey />} iconPosition="start" className='profile_banner_tab' label={t("change_password")} value="2" />
            <Tab icon={<MdOutlinePayments />} iconPosition="start" className='profile_banner_tab' label={t("payment_method")} value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
  
          <div className='profile_banner_info'>
            <div className='profile_banner_info1'>
              <label for="formFile" className='profile_banner_info1_image'>
                {!pic ? user?.profilePicture? <img className="profile_banner_info1_image" src={genPublicURL(user?.profilePicture)} alt="user image"/>:
                <img className='profile_banner_info1_image' src={`https://colegioclassea.com.br/wp-content/themes/PageLand/assets/img/avatar/avatar.jpg`} alt="not found"/>:
                <img className='profile_banner_info1_image' src={pic} alt="not found pic"/>
              }

                <div className='profile_banner_info1_image1'>
                  <RiShoppingBag3Fill />
                </div>
              </label>
              <input
                className="ppic-input ml-4"
                type="file"
                name="profilePicture"
                id="formFile"
                accept="image/*"
                onChange={(e) => { handleChangeImage(e) }}
              />

              <div className='profile_banner_info1_inputs'>
              {newMessage && <div className="message">{newMessage}</div>}
                <div>
                  <label>{t("full_name")}</label>
                  <div className="inputs-com">
                    <input placeholder="First Name" defaultValue={user && user?.firstName} onChange={(e) => { setFirstName(e.target.value) }} />
                    &nbsp;&nbsp;
                    <input placeholder="Last Name" defaultValue={user && user?.lastName} onChange={(e) => { setLastName(e.target.value) }} />
                  </div>
                </div>
                <div>
                  <label>{t("email")}</label>
                  <input disabled placeholder={user?.email} />
                </div>
                <div>
                  <label>{t("mobile_number")}</label>
                  <input placeholder='0300 xxxxxxxx' defaultValue={user && user?.phone} onChange={(e) => { setPhone(e.target.value) }} />
                </div>
                <div className="inputs-com">
                <div style={{width:"49%"}}>
              <label>{t("house")}</label>
            <input onChange={(e)=>setHouse(e.target.value)} defaultValue={user && user?.houseNo} placeholder='House No.' />
            </div>
                <div style={{width:"49%"}}>
            <label>{t("street")}</label>
            <input onChange={(e)=>setStreet(e.target.value)} defaultValue={user && user?.street} placeholder='Street' />
            </div>
            </div>
            <div className="inputs-com">
            <div style={{width:"49%"}}>
            <label>{t("city")}</label>
            <input onChange={(e)=>setCity(e.target.value)} defaultValue={user && user?.city} placeholder='City' />
            </div>
                <div style={{width:"49%"}}>
          <label>{t("country")}</label>
            <CountrySelect 
            className='country_input'
            placeholder={user?user?.country:"Type or select Country... "}
            value={country?country:user?.country}
            onChange={setCountry}
           />
            {/* <label>{t("country")}</label>
            <input onChange={(e)=>setCountry(e.target.value)} defaultValue={user && user?.country} placeholder='Country' />
            */}
            </div>
           </div>
                <button className='profile_banner_button' onClick={()=>{updateUser()}}>{t("save")}</button>
              </div>
            </div>

            <div className='profile_banner_info2'>
              <div className='profile_banner_info2_info'>
                <div className='profile_banner_info2_links1'>
                  <h1>{t("social_media_links")}</h1>
                  {/* <p style={{ cursor: "pointer" }} >{t("add_link")}</p> */}
                </div>
                {linkMessage && <div className="message">{linkMessage}</div>}
                <form className='profile_links_form' onSubmit={addLink}>
                  <div className="d-flex align-items-center">
                    <RiFacebookCircleLine className={type==='facebook'?'profile_banner_info2_links_icon_active':'profile_banner_info2_links_icon_deactive'} style={{ color: 'blue' }}
                      onClick={() => { setType("facebook") }}  />
                    <AiOutlineYoutube className={type==='youtube'?'profile_banner_info2_links_icon_active':'profile_banner_info2_links_icon_deactive'} style={{ color: 'red' }}
                      onClick={() => { setType("youtube") }} />
                    <AiOutlineTwitter className={type==='twitter'?'profile_banner_info2_links_icon_active':'profile_banner_info2_links_icon_deactive'} style={{ color: 'blue' }}
                      onClick={() => { setType("twitter") }} />
                    <AiOutlineInstagram className={type==='instagram'?'profile_banner_info2_links_icon_active':'profile_banner_info2_links_icon_deactive'} style={{ color: 'purple' }}
                      onClick={() => { setType("instagram") }} />
                  </div>
                  <div>
                    <input id="link_inp" type="url" placeholder="https://facebook.com/cloudcubex" onChange={(e) => { setLink(e.target.value) }} />
                  </div>
                  <span className='span2'>{t("select social accounts")}</span>
                  <button style={{ cursor: "pointer" }} type="submit" className='span1'>{t("add_link")}</button>
                </form>
                {
                  userInfo?.user?.socialLinks && userInfo?.user?.socialLinks?.map((obj, i) => {
                    return <div className='profile_banner_info2_links'>
                      <div>
                        {obj.type === "facebook" ? <RiFacebookCircleLine className='profile_banner_info2_links_icon' style={{ color: 'blue' }} /> :
                          obj.type === "twitter" ? <AiOutlineTwitter className='profile_banner_info2_links_icon' style={{ color: 'blue' }} /> :
                            obj.type === "youtube" ? <AiOutlineYoutube className='profile_banner_info2_links_icon' style={{ color: 'red' }} /> :
                              obj.type === "instagram" ? <AiOutlineInstagram className='profile_banner_info2_links_icon' style={{ color: 'purple' }} /> : null}
                        <span>{obj.link}</span>
                      </div>
                      <p onClick={(e)=>{removeLink(obj?._id,userInfo?.user?._id)}}>{t("remove")}</p>
                    </div>
                  })
                }
                {
                  socialLinks && socialLinks?.map((obj, i) => {
                    return <div className='profile_banner_info2_links'>
                      <div>
                        {obj.type === "facebook" ? <RiFacebookCircleLine className='profile_banner_info2_links_icon' style={{ color: 'blue' }} /> :
                          obj.type === "twitter" ? <AiOutlineTwitter className='profile_banner_info2_links_icon' style={{ color: 'blue' }} /> :
                            obj.type === "youtube" ? <AiOutlineYoutube className='profile_banner_info2_links_icon' style={{ color: 'red' }} /> :
                              obj.type === "instagram" ? <AiOutlineInstagram className='profile_banner_info2_links_icon' style={{ color: 'purple' }} /> : null}
                        <span>{obj.link}</span>
                      </div>
                      {/* <p onClick={(e)=>{removeLink(obj?._id,userInfo?.user?._id)}}>{t("remove")}</p> */}
                    </div>
                  })
                }
                <button className='profile_banner_button' onClick={()=>{updateLinks()}}>{t("save")}</button>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel value="2">
          <div className="change_password">
            <div className="change_passsword_left">
              <div className='signup_container_header'>
                <h3 className="forgetpassword_heading1">{t("create_new_password")}</h3>
                <p style={{ "margin-top": "10px" }}>{t("do_you_want _to_change_your_password")}</p>
                {passMessage && <div className="message">{passMessage}</div>}
              </div>
              <form className="forget_container_footer" onSubmit={(e)=>{changePassword(e)}}>
              {userInfo?.user?.password ?<input className="forgetpassword_input" placeholder='old Password' type="password" onChange={(e) => setOldPassword(e.target.value)} />:null}
                <input className="forgetpassword_input" placeholder='New Password' type="password" onChange={(e) => setPassword(e.target.value)} />
                <input className="forgetpassword_input" placeholder='Confirm Password' type="password" onChange={(e) => setConfirmPassword(e.target.value)} />

                <button type="submit"><span>{t("send")}</span></button>

              </form>
            </div>
      
          </div>
        </TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </Box>
  );
}
export default ProfileTabs