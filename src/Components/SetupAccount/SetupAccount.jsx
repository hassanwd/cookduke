import React,{useEffect, useState} from 'react'
import './SetupAccount.css'
import NavBar from '../NavBar/Navbar';
import { useDispatch, useSelector } from 'react-redux'
import FormsFooter from '../Forms/FormsFooter';
import {Container,Form,Row,Col} from 'react-bootstrap';
import { BsCheck2 } from "react-icons/bs";
import icon from "../images/Icons.png"
import { useTranslation } from 'react-i18next';
import { genPublicURL } from '../../config';
import {userSetupUpdate,addUserMenu,removeMenu,manageTime} from "../../Actions/userActions"

import 'bootstrap/dist/css/bootstrap.css'; // or include from a CDN
import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
import CountrySelect from 'react-bootstrap-country-select';

const SetupAccount = () => {
  const {t} = useTranslation()
  const dispatch=useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
// edit

  const closePopup=()=>{
    var pop=document.querySelector(".menu_popup")
   pop.style.display="none"
  }
  const openPopup=()=>{
    var pop=document.querySelector(".menu_popup")
   pop.style.display="flex"
  }

  const [user, newUser] = useState(userInfo?.user)

  const [phone, setPhone]=useState("")
  const [country, setCountry]=useState(null)
  const [city, setCity]=useState("")
  const [street, setStreet]=useState("")
  const [houseNo, setHouse]=useState("")
  const [coverPicture, setCoverPicture]=useState("")

  const [pic , setPic]=useState("")
  const [newMessage, setMessage] = useState('')

  const handleChangeImage = (e) => {
     setPic(URL.createObjectURL(e.target.files[0]))
     setCoverPicture(e.target.files[0])
   }
   
   const setupAccount=()=>{
    if( country || city|| street || houseNo || coverPicture){
      console.log({country:country.name , city, street , houseNo , coverPicture},'while setupAccount');
      // dispatch(userSetupUpdate({country:country.name , city, street , houseNo , coverPicture}, userInfo?.user._id))
} else{
alert("please fill all fields")
}  

   }

   const updateUserProfile = useSelector((state) => state.updateUserProfile)
   const { userData } = updateUserProfile
   const umessage = userData?.message


   useEffect(() => {
    setMessage(umessage)
    window.scroll(0, 0)
    if (umessage === "user updated successfully") {
      newUser(userData?.user)
      setPic("")
      setTimeout(function () { 
        setMessage("")
       }, 2000);
      }else if(umessage=== "menu added successfully"){
        newUser(userData?.user)
        setTimeout(function () { 
          setMessage("")
          window.location.reload()
         }, 2000);
      }   else if(umessage==="menu deleted successfully"){
        newUser(userData?.user)
        setTimeout(function () { 
          setMessage("")
          window.location.reload()
         }, 2000);
      }
      else if(umessage==="time updated successfully"){
        newUser(userData?.user)
        setTimeout(function () { 
          setMessage("")
          window.location.reload()
         }, 2000);
      }
      
    },[umessage])


 


   const [menuList, setMenuList] = useState([])
   const [itemName, setItemName] = useState("")
   const [ingrediants, setIngrediants] = useState("")
   const [type, setType] = useState("")
   const [price, setPrice] = useState("")

   const addMenuItems = () => {
         if(itemName!=="" && ingrediants !==""  && type !== "" && price !== ""){

          setMenuList([...menuList, {itemName: itemName,ingrediants:ingrediants,type:type,price:price}])
  
         setItemName("")
         setIngrediants("")
         setType("")
         setPrice("")
         closePopup()
         }else{
           alert("please fill all the fields")
         }
     } 

const saveMenu=()=>{
  if(menuList.length===0){
    alert("please add menu")
 }else{
  console.log(menuList,' while saveMenu');
  //  dispatch(addUserMenu(userInfo?.user?._id, menuList))
   setMenuList([])
 }

}

const removeMenuItems =(menu_id,user_id)=>{

    dispatch(removeMenu(menu_id,user_id))

}
// --------------------------------------------
const [day, setDay]=useState(false)

useEffect(()=>{
  if(day==true){
    document.querySelector(".every-day").style.display="block"
    document.querySelector(".individually-days").style.display="none"
  }else{ 
    document.querySelector(".every-day").style.display="none"
    document.querySelector(".individually-days").style.display="block"
  }
  },[day])



const [times, setTimes]=useState(userInfo && userInfo?.user?.openingTime)

    const [opens,setOpens]=useState("")
    const [closes,setCloses]=useState("")



const setOpen=(day,time)=>{
  setOpens({"day":day,"open":time})
}

const setClose=(day,time)=>{
  setCloses({"day":day,"close":time})
}

const[monday, setMonday]=useState(false)
const[tuesday, setTuesday]=useState(false)
const[wednesday, setWednesday]=useState(false)
const[thursday, setThursday]=useState(false)
const[friday, setFriday]=useState(false)
const[saturday, setSaturday]=useState(false)
const[sunday, setSunday]=useState(false)

useEffect(()=>{

if(day && day!==false){
  // setTimes("")
  if(opens!==""  && closes!=="" && closes?.day==="everyday"&& opens?.day==="everyday" ){
      setTimes([
        // {everyday:monday && monday===true?{"open":opens?.open,"close":closes?.close}:null},
        {monday:monday && monday===true?{"open":opens?.open,"close":closes?.close}:null},
        {tuesday:tuesday && tuesday===true?{"open":opens?.open,"close":closes?.close}:null},
        {wednesday:wednesday && wednesday===true?{"open":opens?.open,"close":closes?.close}:null},
        {thursday:thursday && thursday===true?{"open":opens?.open,"close":closes?.close}:null},
        {friday:friday && friday===true?{"open":opens?.open,"close":closes?.close}:null},
        {saturday:saturday && saturday===true?{"open":opens?.open,"close":closes?.close}:null},
        {sundy:sunday && sunday===true?{"open":opens?.open,"close":closes?.close}:null}
      ])
    }
  }else if(day && day===false){
    setTimes(userInfo && userInfo?.user?.openingTime)
  }
},[opens,closes,day])
// 
console.log(times,"........")


const timeManagement=()=>{
  if(times!=='' || times!==[]){
    console.log(times,'while timeManagement');
    // dispatch(manageTime(times,userInfo?.user?._id))
  }else{
    newMessage("please Choose time first")
  }
  }



const[_monday, _setMonday]=useState(false)
const[_tuesday, _setTuesday]=useState(false)
const[_wednesday, _setWednesday]=useState(false)
const[_thursday, _setThursday]=useState(false)
const[_friday, _setFriday]=useState(false)
const[_saturday, _setSaturday]=useState(false)
const[_sunday, _setSunday]=useState(false)

const [openTime, setOpenTime]=useState('')
const [closeTime, setCloseTime]=useState('')


useEffect(()=>{
  if(openTime!==""  && closeTime!=="" && openTime?.key===closeTime?.key ){
      if(times?.length===0){
         setTimes(
          [...times,{[openTime.key]:{"open":openTime.value,"close":closeTime.value}}]
        ) 
      }else{
        const objectToReplace = times?.find(item => Object.keys(item)[0] === openTime.key);
        if(objectToReplace){
          Object.assign(objectToReplace,{[openTime.key]:{"open":openTime.value,"close":closeTime.value}});
        }else{
          setTimes(
            [...times,{[openTime.key]:{"open":openTime.value,"close":closeTime.value}}]
          )  
        }
    }
   }
},[openTime,closeTime])



const unSelect=(status,day)=>{
 if(status===true){
  document.getElementsByName(day)[0].value="";
  document.getElementsByName(day)[1].value="";
  document.getElementsByName(day)[0].defaultValue="";
  document.getElementsByName(day)[1].defaultValue="";

  const newTime=times?.filter((item,i)=>{
    return Object.keys(item)[0] !== day
  })
setTimes(newTime);
 }

}


const unSlt=(status,day)=>{
  if(status===true){
   const newTime=times?.filter((item,i)=>{
     return Object.keys(item)[0] !== day
   })
 setTimes(newTime);
  }
 
 }
  return (
    <div> 
         <NavBar/>
         <div className="cont">
         <h3 className="setup_your_account_heading1">{t("setup_your_account")}</h3>
         {newMessage && <div className="message">{newMessage}</div>}
         <div className='setup_your_account_container'>
         <div className='setup_your_account_column'>
          <h6>{t("upload_cover_photo")}
          {/* <small>{t("remove")}</small> */}
          </h6>
          <div className="image_frame">
          <form>
              <label for="formFile">
                <img src={icon} alt="" />
                {!pic ? user?.coverPicture? <img className="img" src={genPublicURL(user?.coverPicture)} alt="user image"/>:
                null:<img className="img" src={pic} alt="not found pic"/>
              }
              </label>
              <input
                className="ppic-input ml-4"
                type="file"
                name="coverPicture"
                id="formFile"
                accept="image/*"
                onChange={(e)=>{handleChangeImage(e)}}
              />
            </form>
          <p>{t("save")}</p>
          </div>
          <form className="account_inputs">
         {/* <h6>{t("address")}</h6> */}
            {/* <input placeholder={userInfo?.user.houseNo || userInfo?.user.street || userInfo?.user.city? `${userInfo.user.houseNo}, ${userInfo.user.street}, ${userInfo.user.city}, ${userInfo.user.country}` :"Enter Your Address"}/> */}
            {/* <h6>{t("phone")}</h6>
            <input onChange={(e)=>setPhone(e.target.value)} placeholder={userInfo?.user?.phone || "0300 XXXXXX"}/> */}
            <h6>{t("house")}</h6>
            <input onChange={(e)=>setHouse(e.target.value)} defaultValue={user?.houseNo} placeholder='House No.' />
            <h6>{t("street")}</h6>
            <input onChange={(e)=>setStreet(e.target.value)} defaultValue={user?.street} placeholder='Street' />
            <h6>{t("city")}</h6>
            <input onChange={(e)=>setCity(e.target.value)} defaultValue={user?.city} placeholder='City' />
        
            <h6>{t("country")}</h6>
            <CountrySelect 
            className='country_input'
            placeholder={user?user?.country:"Type or select Country... "}
            value={country?country:user?.country}
            onChange={setCountry}
           />
              
            {/* <h6>{t("country")}</h6>
            <input onChange={(e)=>setCountry(e.target.value)} defaultValue={user?.country} placeholder='Country' />
             */}
            </form>
            <button className='save_btn' onClick={setupAccount}>{t("save")}</button>
         </div>

         <div className='setup_your_account_column'>
         <h6>{t("sopening_time_hours")}</h6>
         <div className='check-box-box'>
         <div className='signup_terms_main'>
                <input classname="geekmark signup_terms_main" type="checkbox" name="terms" onChange={(e)=>{setDay(day===true?false:day===false?true:"")}} id="terms"/>
                 <label for="terms" className="mt-2 signup_terms_text2 signup_terms_text1">&nbsp;<b>{t("same_everyday")}</b></label>
              </div>  
         </div>
         <div className='every-day'>
         <div className="weak-days">
        
          <span className={
          times?.length !==0 && times && times?.find(item => Object.keys(item)[0] === "monday")?'opened':
          monday && monday===true?'opened':"closed"
        }
           onClick={()=>{setMonday(monday===false?true:false);unSlt(monday,"monday")}}>{t("m")}</span>
          <span className={
          times?.length !==0 && times && times?.find(item => Object.keys(item)[0] === "tuesday")?'opened':
          tuesday && tuesday===true?'opened':"closed"
        }  
          onClick={(e)=>{setTuesday(tuesday===false?true:false);unSlt(tuesday,"tuesday")}} >{t("t")}</span>
          <span className={
          times?.length !==0 && times && times?.find(item => Object.keys(item)[0] === "wednesday")?'opened':
          wednesday && wednesday===true?'opened':"closed"
        }
          onClick={(e)=>{setWednesday(wednesday===false?true:false);unSlt(wednesday,"wednesday")}} >{t("w")}</span>
          <span className={
          times?.length !==0 && times && times?.find(item => Object.keys(item)[0] === "thursday")?'opened':
          thursday && thursday===true?'opened':"closed"
        }
          onClick={(e)=>{setThursday(thursday===false?true:false);unSlt(thursday,"thursday")}} >{t("t")}</span>
          <span className={
          times?.length !==0 && times && times?.find(item => Object.keys(item)[0] === "friday")?'opened':
          friday && friday===true?'opened':"closed"
        }
          onClick={(e)=>{setFriday(friday===false?true:false);unSlt(friday,"friday")}} >{t("f")}</span>
          <span className={
          times?.length !==0 && times && times?.find(item => Object.keys(item)[0] === "saturday")?'opened':
          saturday && saturday===true?'opened':"closed"
        }
          onClick={(e)=>{setSaturday(saturday===false?true:false);unSlt(saturday,"saturday")}} >{t("s")}</span>
          <span className={
          times?.length !==0 && times && times?.find(item => Object.keys(item)[0] === "sunday")?'opened':
          sunday && sunday===true?'opened':"closed"
        }
          onClick={(e)=>{setSunday(sunday===false?true:false);unSlt(sunday,"sunday")}} >{t("s")}</span>
         </div>
         <br/>
         <input type='time' name='open' 
        //  defaultValue={times && times?.length>0 &&
        //  times?.find(item => Object?.keys(item)[0]!=="_id" &&  Object?.keys(item)[0]) &&
        //   Object?.values(times?.find(item => Object?.keys(item)[0]!=="_id" &&  Object?.keys(item)[0]))[0]?.open}
         onChange={(e)=>{setOpen("everyday",e.target.value)}}/>
         <span>-</span>
          <input type='time' name='close' 
          // defaultValue={times && times?.length>0 &&
          //  times?.find(item => Object?.keys(item)[0]!=="_id" &&  Object?.keys(item)[0]) &&
          // Object?.values(times && times?.find(item => Object?.keys(item)[0]!=="_id" &&  Object?.keys(item)[0]))[0]?.open} 
          onChange={(e)=>{setClose("everyday",e.target.value)}}/>
         </div>
                 {/* ------------------------------------------------------------------------- */}
         <div className='individually-days'>
         <div className='each-day'>
         <div className="weak-days">
          <span className={
          times?.length !==0 && times?.find(item => Object.keys(item)[0] === "monday")?'opened':
          _monday && _monday===true?'opened':'closed'} 
          onClick={()=>{_setMonday(_monday===false?true:false);unSelect(_monday,"monday")}} 
          >{t("m")}</span>
         </div>
         <div className="timming">

          <input type='time' name='monday' 
          defaultValue={times && times?.find(item => Object.keys(item)[0] === "monday")?.monday?.open}
          disabled={_monday && _monday===true?false:true}
          onChange={(e)=>{setOpenTime({key:"monday",value:e.target.value})}}
          />
         <span>-</span>
          <input type='time' name='monday' defaultValue={times && times?.find(item => Object.keys(item)[0] === "monday")?.monday?.close}
          disabled={_monday && _monday===true?false:true}       
           onChange={(e)=>{setCloseTime({key:"monday",value:e.target.value})}}
          />
         </div>
         </div>
         <div className='each-day'>
         <div className="weak-days">
          <span className={times?.length !==0 && times?.find(item => Object.keys(item)[0] === "tuesday")?'opened':
          times && times?.find(item => Object.keys(item)[0] === "tuesday")?'opened':
          _tuesday && _tuesday===true?'opened':'closed'} 
          onClick={()=>{_setTuesday(_tuesday===false?true:false);unSelect(_tuesday,"tuesday")}} 
          >{t("t")}</span>
         </div>
         <div className="timming">
          <input type='time' name='tuesday' defaultValue={times && times?.find(item => Object.keys(item)[0] === "tuesday")?.tuesday?.open}
          disabled={_tuesday && _tuesday===true?false:true}
          onChange={(e)=>{setOpenTime({key:"tuesday",value:e.target.value})}}
          />
         <span>-</span>
          <input type='time' name='tuesday' defaultValue={times && times?.find(item => Object.keys(item)[0] === "tuesday")?.tuesday?.close}
          disabled={_tuesday && _tuesday===true?false:true}       
          onChange={(e)=>{setCloseTime({key:"tuesday",value:e.target.value})}}
          />
         </div>
         </div>
         <div className='each-day'>
         <div className="weak-days">
          <span className={times?.length !==0 && times?.find(item => Object.keys(item)[0] === "wednesday")?'opened':
          times && times?.find(item => Object.keys(item)[0] === "wednesday")?'opened':
          _wednesday && _wednesday===true?'opened':'closed'} 
          onClick={()=>{_setWednesday(_wednesday===false?true:false);unSelect(_wednesday,"wednesday")}} 
          >{t("w")}</span>
         </div>
         <div className="timming">
          <input type='time' name='wednesday' defaultValue={times && times?.find(item => Object.keys(item)[0] === "wednesday")?.wednesday?.open}
          disabled={_wednesday && _wednesday===true?false:true}       
          onChange={(e)=>{setOpenTime({key:"wednesday",value:e.target.value})}}
          />
         <span>-</span>
          <input type='time' name='wednesday' defaultValue={times && times?.find(item => Object.keys(item)[0] === "wednesday")?.wednesday?.close}
          disabled={_wednesday && _wednesday===true?false:true}       
          onChange={(e)=>{setCloseTime({key:"wednesday",value:e.target.value})}}
          />
         </div>
         </div>
         <div className='each-day'>
         <div className="weak-days">
          <span className={times?.length !==0 && times?.find(item => Object.keys(item)[0] === "thursday")?'opened':
          times && times?.find(item => Object.keys(item)[0] === "thursday")?'opened':
          _thursday && _thursday===true?'opened':'closed'} 
          onClick={()=>{_setThursday(_thursday===false?true:false);unSelect(_thursday,"thursday")}} 
          >{t("t")}</span>
         </div>
         <div className="timming">
          <input type='time' name='thursday' defaultValue={times && times?.find(item => Object.keys(item)[0] === "thursday")?.thursday?.open}
          disabled={_thursday && _thursday===true?false:true}       
          onChange={(e)=>{setOpenTime({key:"thursday",value:e.target.value})}}
          />
         <span>-</span>
          <input type='time' name='thursday' defaultValue={times && times?.find(item => Object.keys(item)[0] === "thursday")?.thursday?.close}
          disabled={_thursday && _thursday===true?false:true}       
          onChange={(e)=>{setCloseTime({key:"thursday",value:e.target.value})}}
          />
         </div>
         </div>
         <div className='each-day'>
         <div className="weak-days">
          <span className={times?.length !==0 && times?.find(item => Object.keys(item)[0] === "friday")?'opened':
          times && times?.find(item => Object.keys(item)[0] === "friday")?'opened':
          _friday && _friday===true?'opened':'closed'} 
          onClick={()=>{_setFriday(_friday===false?true:false);unSelect(_friday,"friday")}} 
          >{t("f")}</span>
         </div>
         <div className="timming">
          <input type='time' name='friday' defaultValue={times && times?.find(item => Object.keys(item)[0] === "friday")?.friday?.open}
          disabled={_friday && _friday===true?false:true}       
          onChange={(e)=>{setOpenTime({key:"friday",value:e.target.value})}}
          />
         <span>-</span>
          <input type='time' name='friday' defaultValue={times && times?.find(item => Object.keys(item)[0] === "friday")?.friday?.close}
          disabled={_friday && _friday===true?false:true}       
          onChange={(e)=>{setCloseTime({key:"friday",value:e.target.value})}}
          />
         </div>
         </div>
         <div className='each-day'>
         <div className="weak-days">
          <span className={times?.length !==0 && times?.find(item => Object.keys(item)[0] === "saturday")?'opened':
          times && times?.find(item => Object.keys(item)[0] === "saturday")?'opened':
          _saturday && _saturday===true?'opened':'closed'} 
          onClick={()=>{_setSaturday(_saturday===false?true:false);unSelect(_saturday,"saturday")}} 
          >{t("s")}</span>
         </div>
         <div className="timming">
          <input type='time' name='saturday' defaultValue={times && times?.find(item => Object.keys(item)[0] === "saturday")?.saturday?.open}
          disabled={_saturday && _saturday===true?false:true}       
          onChange={(e)=>{setOpenTime({key:"saturday",value:e.target.value})}}
          />
         <span>-</span>
          <input type='time' name='saturday' defaultValue={times && times?.find(item => Object.keys(item)[0] === "saturday")?.saturday?.close}
          disabled={_saturday && _saturday===true?false:true}       
          onChange={(e)=>{setCloseTime({key:"saturday",value:e.target.value})}}

          />
         </div>
         </div>
         <div className='each-day'>
         <div className="weak-days">
          <span className={times?.length !==0 && times?.find(item => Object.keys(item)[0] === "sunday")?'opened':
          times && times?.find(item => Object.keys(item)[0] === "sunday")?'opened':
          _sunday && _sunday===true?'opened':'closed'} 
          onClick={()=>{_setSunday(_sunday===false?true:false);unSelect(_sunday,"sunday")}} 
          >{t("s")}</span>
         </div>
         <div className="timming">
          <input type='time' name='sunday' defaultValue={times && times?.find(item => Object.keys(item)[0] === "sunday")?.sunday?.open}
          // onChange={(e)=>{setOpen("sunday",e.target.value)}}
          disabled={_sunday && _sunday===true?false:true}       
          onChange={(e)=>{setOpenTime({key:"sunday",value:e.target.value})}}
          />
         <span>-</span>
          <input type='time' name='sunday' defaultValue={times && times?.find(item => Object.keys(item)[0] === "sunday")?.sunday?.close}
          // onChange={(e)=>{setClose("sunday",e.target.value)}}
          disabled={_sunday && _sunday===true?false:true}       
          onChange={(e)=>{setCloseTime({key:"sunday",value:e.target.value})}}
          />
         </div>
         </div>
         </div>
         {/* <div>
         <h6>{t("social_media_accounts")}<small>{t("add_more")}</small></h6>
         
         <div className="account_boxes">http://localhost:3000/setup-account
         <span>x</span>
         </div>
         <div className="account_boxes">http://localhost:3000/setup-account
         <span>x</span>
         </div>
         </div> */}
         <button className='save_btn' onClick={timeManagement}>{t("save")}</button>
         </div>

         <div className='setup_your_account_column setup_your_account_column3'>
          <h6 onClick={openPopup}>{t("add_menu")}<small>{t("add_more")}</small></h6>
          { menuList && menuList.map((obj, i)=>{
          return <div className="menu_frame1">
            <h6>{obj?.itemName}<span className='spn'>({obj?.type})</span> <small>Rs.{obj?.price} 
            {/* <span>x</span> */}
            </small></h6>
            <span>{obj.ingrediants} ...</span>
            </div>
          })}

          {
            userInfo?.user?.menu && userInfo?.user?.menu?.map((obj, i) => {
              return <div className="menu_frame1">
              <h6>{obj?.itemName}<span className='spn'>({obj?.type})</span> <small>Rs.{obj?.price} 
              &nbsp;<span onClick={(e)=>{removeMenuItems(obj?._id,userInfo?.user?._id)}}>x</span>
              </small></h6>
              <span>{obj.ingrediants} ...</span>
              </div>
            })}

          <div className="menu_frame2" onClick={openPopup}><p>{t("add_menu_item")}</p></div>
          <button onClick={saveMenu} className='save_btn'>{t("save")}</button>
         </div>
         
         </div>
         <div className="menu_popup">
        <div className="menu_container">
          <span className='cross_menu' onClick={closePopup}>x</span>
          <h3>{t("add_menu_item")}</h3>
          <p>{t("item_name")}</p>
          <input onChange={(e) => setItemName(e.target.value)} placeholder='Salad'/>
          <p>{t("ingredients")}</p>
          <input onChange={(e) => setIngrediants(e.target.value)} placeholder='Carrot, Apple'/>
          <p>{t("type")}</p>
          <input onChange={(e) => setType(e.target.value)} placeholder='Starter'/>
          <p>{t("price")}</p>
          <input onChange={(e) => setPrice(e.target.value)} placeholder='100 Rs.'/>
          <button onClick={addMenuItems}>{t("add")}</button>
        </div>
         </div>
         </div>
         <FormsFooter />
    </div>
  )
}

export default SetupAccount