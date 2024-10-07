import React, { useState, useEffect } from 'react'
import {Container }from 'react-bootstrap';
import FormsNavbar from './FormsNavbar';
import FormsFooter from './FormsFooter';
import {GiForkKnifeSpoon} from "react-icons/gi";
import { SiCodechef } from "react-icons/si";
import { FaUser } from "react-icons/fa";

import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';

import {
  Link, useNavigate
} from "react-router-dom";
import { useTranslation } from 'react-i18next';




import { v4 as uuidv4 } from 'uuid';


const SignUp = () => {
  const {t}=useTranslation()
  const navigate = useNavigate()

  const [role, setRole] = useState('')
  const [terms, setTerms] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [newMessage, setMessage] = useState('')
  const [newError, setError] = useState('')


  const selectAcc = (e,type) => {
   setRole(type)
  var list=document.querySelectorAll(".Account-Type")
   for(var i=0;i<=list.length-1;i++){
    list[i].classList.remove("active")
   }
   if(e.target.classList!=="Account-Type" && e.target.parentElement.classList==="Account-Type"){
    e.target.parentElement.classList.add('active')
   }else if(e.target.classList!=="Account-Type" && e.target.parentElement.parentElement.classList==="Account-Type"){
    e.target.parentElement.parentElement.classList.add('active')
   }else{
    e.target.classList.add('active')
   }

    var acc=document.querySelector(".select_account")
   acc.style.display="none"
   var cont1=document.querySelector(".signup_container1")
   cont1.style.display="block"

}

useEffect(()=>{
  setMessage("")
  setTimeout(function() {setError("")}, 0);
  var main=document.querySelector(".select_account")
  main.style.display="flex"
  var cont1=document.querySelector(".signup_container1")
  cont1.style.display="none"

  var cont2=document.querySelector(".signup_container2")
  cont2.style.display="none"
},[])


// -----------------------------------
const userRegisterHandler= async (e)=>{

  e.preventDefault()

  if(email==="" || password==="" || confirmPassword===""){
    setMessage("Please fill all the fields")
  }else if(!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
    setMessage('Email is Invalid')
  }else if(password.length < 6){
    setMessage('password length is less than 6')
}
   else if (password !== confirmPassword) {
    setMessage("Password doesn't match")
  }
  else if (terms !== true) {
    setMessage("Please accept the terms and conditions.")
  }
  else {
    let obj = {
      id: uuidv4(),
      email: email,
      password: password,
      role: role,
      terms: terms
    }
    try {
      const response = await fetch('http://localhost:3001/sign_up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      });
  
      const data = await response.json();
      navigate('/login')
      console.log('User signed up:', data);
    } catch (error) {
      console.error('Error signing up:', error);
    }
    setMessage("")
    setError("")
  }
}

  return (
    <>
      <FormsNavbar />
      {/* --------------------------- */}
      <Container className='main_signup'>
      <div className="select_account">
      <div className="check_your_email">
        <h3>{t("select_account_type")}</h3>
<div className="select_account_boxes">
    <div className="Account-Type" onClick={(e)=>{selectAcc(e,"restaurant")}}>
        <GiForkKnifeSpoon/>
    <h4>{t("restaurant")}</h4>
    </div>
    <div className="Account-Type" onClick={(e)=>{selectAcc(e,"chef")}}>
   <SiCodechef/>
    <h4>{t("chef")}</h4>
    </div>
    <div className="Account-Type" onClick={(e)=>{selectAcc(e,"user")}}>
      <FaUser/>
    <h4>{t("user")}</h4>
    </div>
</div>
      </div>
    </div>

      {/* -------------------------- */}

      <div className='signup_container signup_container1'>
        <div className='signup_container_header'>
          <h3 className="Register-with">{t("register_with")}</h3>
          <div className="Rectangle">
          {/* <GoogleLogin
                onSuccess={responseGoogle}
                onError={errorGoogle}
                buttonText="Login"
                useOneTap
              /> */}
          </div>
          <span className="or mb-2">{t("or")}</span>
        </div>
        {newError && <div className="error">{newError}</div>}
        {newMessage && <div className="message">{newMessage}</div>}
        <form className='signup_container_footer' onSubmit={userRegisterHandler}>
          <div className='signup_inputs'>
            <input placeholder='Email' type="email" onChange={(e) => setEmail(e.target.value)}/>
            <input placeholder='Password' type="password" onChange={(e) => setPassword(e.target.value)}/>
            <input placeholder='Confirm Password' type="password" onChange={(e) => setConfirmPassword(e.target.value)}/>
          </div>
          <div className='signup_terms mt-4'>

              <div className='signup_terms_main'>
                <input 
                classname="geekmark signup_terms_main" 
                type="checkbox" name="terms"  
                id="terms" onChange={(e) => setTerms(terms===true?false:terms===false?true:"")} />
                 <label for="terms" className="mt-2 signup_terms_text2 signup_terms_text1">&nbsp;{t("i_aggree_the")} &nbsp;<Link target="_blank" to="/privacy-policy"><b style={{color:"black"}}>{t("terms_and_conditions")}</b></Link></label>

              </div>

            </div>
          <button type="submit"><span>{t("sign_up")}</span></button>
          <div className='signup_text'>
            <span className="signup_text_Ques">{t("already_have_an_account")}</span>
            <Link className="signup_text_login" to="/login">{t("login")}</Link>
          </div>
        </form>
      </div>
  
      <div className='signup_container signup_container2'>
        <div className='' style={{"margin-bottom":"20px"}}>
          <h3 className="Register-with">{t("setup_your_account")}</h3>
        </div>
        {newMessage && <div className="message">{newMessage}</div>}
        {newError && <div className="message">{newError}</div>}
      </div>
      {/* ---------------------------- */}
      <div className="signup_container3">
      <div className="checkmail_box">
      <div className="check_your_email check_your_email2">
        <h3>{t("check_your_email")}</h3>
{newMessage && <div className="message">{newMessage}</div>}
      </div>
  
    </div>
      </div>
    </Container>
    <FormsFooter />
    </>
  )
}

export default SignUp