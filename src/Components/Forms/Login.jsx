import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Form } from 'react-bootstrap';
import FormsNavbar from './FormsNavbar';
import FormsFooter from './FormsFooter';
import {
  Link,
} from "react-router-dom";

import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

const Login = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  // const responseGoogle = (response) => {
   
  //   let tokenId = response.credential;
  //   dispatch(GoogleRegister(tokenId))
  // }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newMessage, setMessage] = useState('')
   const [remember, setRemember]=useState(false)

  const userLoginHandler = async (e) => {
    e.preventDefault()
    if (email === "" || password === "") {
      setMessage("Please fill all the fields")
    } else {
      // dispatch(login(email, password))
      try {
        const response = await fetch('http://localhost:3001/sign_up');
        const users = await response.json();
    
        const matchedUser = users.find(
          (user) =>
            user.email === email && user.password === password
        );
    
        if (matchedUser) {
          localStorage.setItem('sign_up', JSON.stringify(matchedUser))
          localStorage.setItem('token', JSON.stringify(matchedUser.id))
          if(remember===true){
            // Cookies.set('cd_email', email, { path: 'https://cookduke.ellaclosset.com/#/' })
            localStorage.setItem('cd_email', JSON.stringify(matchedUser.email))
            // Cookies.set('cd_password', password, { path: 'http://localhost:3000/' })
          }
    
            if(matchedUser?.role==="user"){
              navigate("/")
              console.log("called");
            }else if(matchedUser?.role==="chef"){
              if(matchedUser?.loginCount===1){
                navigate("/setup-account")
              }else{
                navigate("/chef/dashboard")
              }
    
            }else if(matchedUser?.role==="restaurant"){
              if(matchedUser?.loginCount===1){
                navigate("/setup-account")
              }else{
              navigate("/restaurant/dashboard")
            }
          }
          window.location.reload();
          console.log('Login successful:', matchedUser);
          // Proceed with further actions for logged-in user
        } else {
          console.log('Login failed: User not found or incorrect credentials');
          // Handle unsuccessful login (show error message, redirect, etc.)
        }
      } catch (error) {
        console.error('Error logging in:', error);
        // Handle error scenario
      }
    }
  }

//   const usrResendEmail=()=>{
//     const { id} = queryString.parse(location.search) 
// if(id){
// dispatch(resendEmail(id)) 
// }
// }


  useEffect(()=>{
const email= JSON.parse(localStorage.getItem('cd_email'))
// const password=Cookies.get("cd_password")
document.getElementById("email").value=email
console.log(email);
// document.getElementById("password").value=password
setEmail(email)
// setPassword(password)

  },[])

  return (
    <>
      <FormsNavbar />
      <Container className='main_signup'>
        <div className='signup_container'>
          <div className='signup_container_header'>
            <h3 className="Register-with">{t("Login")}</h3>
            <div className="Rectangle">
              {/* <GoogleLogin
                onSuccess={responseGoogle}
                onError={errorGoogle}
                buttonText="Login"
                useOneTap 
              /> */}
            </div>
            <span className="or">{t("or")}</span>
          </div>
          <Form className='signup_container_footer' onSubmit={userLoginHandler}>
            <div className='signup_inputs'>
              <input placeholder='Email' id="email" type="email" onChange={(e) => setEmail(e.target.value)} />
              <input placeholder='Enter Password' id="password" type="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className='signup_terms'>
                            <div className='signup_terms_main'>
                <input classname="geekmark signup_terms_main" type="checkbox" name="terms" value="accepted" id="terms" onClick={()=>{setRemember(remember===false?true:false)}}/>
                 <label for="terms" className="mt-2 signup_terms_text2 signup_terms_text1">&nbsp;{t("remember_me")}</label>
                <span className="signup_terms_text2 signup_terms_text1">&nbsp;</span>
              </div>
              <Link className="signup_terms_text2 signup_terms_text3" to="/forgot-password">{t("forgot_password")}?</Link>
            </div>
            <button type="submit"><span>{t("login")}</span></button>
            <div className='signup_text'>
              <span className="signup_text_Ques">{t("login_your_account")}</span>
              <Link className="signup_text_login" to="/signup">{t("sign_up")}</Link>
            </div>
          </Form>
        </div>
      </Container>
      <FormsFooter />
    </>
  )
}

export default Login