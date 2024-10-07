import axios from 'axios'
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_RESET,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_VERIFY_FAIL,
  USER_VERIFY_REQUEST,
  USER_VERIFY_SUCCESS,
  FORGET_PASSWORD_FAIL,
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESEND_EMAIL_FAIL,
  RESEND_EMAIL_REQUEST,
  RESEND_EMAIL_SUCCESS,
  PROFILE_UPDATE_FAIL,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  USER_LIST_RESET,
  LOGOUT_SUCCESS

} from '../Constants/userConstants'
import { googleLogout } from '@react-oauth/google';

import axiosInstance from "../helper/axios"
import { Navigate } from 'react-router-dom';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axiosInstance.post(
      '/login',
      { email, password },
      config
    )
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })
    localStorage.setItem('login_id', JSON.stringify(data?.user))
     localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {

    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data
        ? error.response.data.message
        : error.message,
    })
  }
}

export const logout = () => (dispatch) => {
  googleLogout();
  localStorage.removeItem('userInfo')
  localStorage.removeItem('cartItems')
  localStorage.removeItem('shippingaddress')
  localStorage.removeItem('paymentMethod')
  
  
  axiosInstance.post('/logout');
  
  
  localStorage.clear();
  dispatch({type:LOGOUT_SUCCESS})
  dispatch({ type: USER_LOGOUT })
  dispatch({ type: USER_DETAILS_RESET })
  dispatch({ type: USER_LIST_RESET })

  return <Navigate to="/" replace />
}

export const register = (firstName,lastName,phone,country,city,street,houseNo,role,email,password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })


    const { data } = await axiosInstance.post(
      '/register',
      { firstName,lastName,phone,country,city,street,houseNo,role,email,password }
    )

    // console.log("he")
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    })
    localStorage.setItem('register_id', JSON.stringify(data?.user?._id))
  } catch (error) { 
    console.log(error,"...............")
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data.message
          : error.error,
    })
  }
}

export const emailExist = (email) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })


    const { data } = await axiosInstance.post(
      '/check-email-exist',
      {email},
    )

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    })
    localStorage.setItem('register_id', JSON.stringify(data?.user?._id))
  } catch (error) { 
    console.log(error,"...............")
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data.message
          : error.error,
    })
  }
}

// export const GoogleRegister = (tokenId, role)=>async(dispatch)=>{
//   try {
//     dispatch({
//       type: USER_REGISTER_REQUEST,
//     })

//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     }

//     const { data } = await axiosInstance.post(
//       '/google/callback',
//       { tokenId, role },
//       config
//     )

//     dispatch({
//       type: USER_LOGIN_SUCCESS,
//       payload: data,
//     })
//      localStorage.setItem('userInfo', JSON.stringify(data))
//      return data.user.role === "chef"?
//      <Navigate to="./chef/dashboard" replace />:
//      data.user.role === "restaurant"?<Navigate to="./chef/dashboard" replace />:
//      <Navigate to="./restaurant/dashboard" replace />
//   } catch (error) {
//     console.log(error,"...............")
//     dispatch({
//       type: USER_LOGIN_FAIL,
//       payload:
//         error.response && error.response.data
//           ? error.response.data.message
//           : error.error,
//     })
//   }
// } 

export const verifyEmail = (token, id) => async (dispatch) => {
  try {
    dispatch({
      type: USER_VERIFY_REQUEST,
    })

    const { data } = await axiosInstance.post(
      `/validate?token=${token}&id=${id}`,

    )
    dispatch({
      type: USER_VERIFY_SUCCESS,
      payload: data,
    })

    console.log(data,".....")
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
    
  } catch (error) {
    dispatch({
      type: USER_VERIFY_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data.message
          : error.message,
    })
  }
}


export const forgetPassword = (email) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FORGET_PASSWORD_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axiosInstance.post("/forget-password", {email:email}, config)

    dispatch({
       type: FORGET_PASSWORD_SUCCESS,
       payload: data,
      })


  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: FORGET_PASSWORD_FAIL,
      payload: message,
    })
  }
}

export const resetPassword = (token,id,password) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axiosInstance.post(`/reset-password?token=${token}&id=${id}`,{password:password}, config)

    dispatch({
       type: RESET_PASSWORD_SUCCESS,
       payload: data,
      })


  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: message,
    })
  }
}


export const resendEmail = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: RESEND_EMAIL_REQUEST,
    })


    const { data } = await axiosInstance.post("/resend-email", {id:id})

    dispatch({
       type: RESEND_EMAIL_SUCCESS,
       payload: data,
      })


  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: RESEND_EMAIL_FAIL,
      payload: message,
    })
  }
}


export const userUpdate = (user,id) => async (dispatch, getState) => {

  try {
    dispatch({
      type: PROFILE_UPDATE_REQUEST,
    })

    const formData=new FormData()
    formData.append("userId",id)
    formData.append("firstName",user.firstName)
    formData.append("lastName",user.lastName)
    formData.append("phone",user.phone)
    formData.append("profilePicture",user.files)
    formData.append("country",user.country)
    formData.append("city",user.city)
    formData.append("street",user.street)
    formData.append("houseNo",user.houseNo)
    const { data } = await axiosInstance.post("/edit/profile", formData)

    dispatch({
      type: PROFILE_UPDATE_SUCCESS,
      payload: data,
    })
    var info=JSON.parse(localStorage.getItem('userInfo'))
    info.user=data.user
    console.log(info,"info")
    localStorage.setItem("userInfo", JSON.stringify(info))

  } catch (error) {

    dispatch({
      type: PROFILE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


export const userSetupUpdate = (user,id) => async (dispatch, getState) => {
console.log(user,id)
  try {
    dispatch({
      type: PROFILE_UPDATE_REQUEST,
    })

    const formData=new FormData()
    formData.append("userId",id)
    formData.append("houseNo",user.houseNo)
    formData.append("street",user.street)
    formData.append("city",user.city)
    formData.append("country",user.country)
    formData.append("coverPicture",user.coverPicture) 

    const { data } = await axiosInstance.post("/edit/account", formData)

    dispatch({
      type: PROFILE_UPDATE_SUCCESS,
      payload: data,
    })

    var info=JSON.parse(localStorage.getItem('userInfo'))
    info.user=data.user
    console.log(info,"info")
    localStorage.setItem("userInfo", JSON.stringify(info))

  } catch (error) {

    dispatch({
      type: PROFILE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const userSocialUpdate = (id,socialLinks) => async (dispatch, getState) => {
console.log(socialLinks,".....")
  try {
    dispatch({
      type: PROFILE_UPDATE_REQUEST,
    })

    const obj = {userId:id,socialLinks}
    

    const { data } = await axiosInstance.post("/edit/profile", obj)

    dispatch({
      type: PROFILE_UPDATE_SUCCESS,
      payload: data,
    })
    var info=JSON.parse(localStorage.getItem('userInfo'))
    info.user=data.user
    console.log(info,"info")
    localStorage.setItem("userInfo", JSON.stringify(info))

  } catch (error) {

    dispatch({
      type: PROFILE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const addUserMenu = (id, menu) => async (dispatch, getState) => {
  console.log(menu,".....")
    try {
      dispatch({
        type: PROFILE_UPDATE_REQUEST,
      })
  
      const obj = {userId:id,menu}
      
  
      const { data } = await axiosInstance.post("/add/menu", obj)
  
      dispatch({
        type: PROFILE_UPDATE_SUCCESS,
        payload: data,
      })
      var info=JSON.parse(localStorage.getItem('userInfo'))
      info.user=data.user
      console.log(info,"info")
      localStorage.setItem("userInfo", JSON.stringify(info))
  
    } catch (error) {
  
      dispatch({
        type: PROFILE_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  
export const getUserDetails = (id) => async (dispatch, getState) => {

  try {
    dispatch({
      type: PROFILE_UPDATE_REQUEST,
    })

    const { data } = await axiosInstance.post("/get-user", {id:id})

    dispatch({
      type: PROFILE_UPDATE_SUCCESS,
      payload: data,
    })
    var info=JSON.parse(localStorage.getItem('userInfo'))
    info.user=data.user
    console.log(info,"info")
    localStorage.setItem("userInfo", JSON.stringify(info))
  } catch (error) {

    dispatch({
      type: PROFILE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}


export const manageTime = (openingTime,userId) => async (dispatch, getState) => {

  try {
    dispatch({
      type: PROFILE_UPDATE_REQUEST,
    })

    const { data } = await axiosInstance.post("/manage/time", {openingTime,userId})

    dispatch({
      type: PROFILE_UPDATE_SUCCESS,
      payload: data,
    })
    var info=JSON.parse(localStorage.getItem('userInfo'))
    info.user=data.user
    localStorage.setItem("userInfo", JSON.stringify(info))
  } catch (error) {

    dispatch({
      type: PROFILE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const removeSocialLink = (linkId,userId) => async (dispatch, getState) => {

  try {
    dispatch({
      type: PROFILE_UPDATE_REQUEST,
    })


    const { data } = await axiosInstance.post("/remove-link", {linkId,userId})

    dispatch({
      type: PROFILE_UPDATE_SUCCESS,
      payload: data,
    })
    var info=JSON.parse(localStorage.getItem('userInfo'))
    info.user=data.user
    console.log(info,"info")
    localStorage.setItem("userInfo", JSON.stringify(info))

  } catch (error) {

    dispatch({
      type: PROFILE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}



export const removeMenu = (menuId,userId) => async (dispatch, getState) => {

  try {
    dispatch({
      type: PROFILE_UPDATE_REQUEST,
    })


    const { data } = await axiosInstance.post("/remove/menu", {menuId,userId})

    dispatch({
      type: PROFILE_UPDATE_SUCCESS,
      payload: data,
    })
    var info=JSON.parse(localStorage.getItem('userInfo'))
    info.user=data.user
    console.log(info,"info")
    localStorage.setItem("userInfo", JSON.stringify(info))

  } catch (error) {

    dispatch({
      type: PROFILE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updatePassword = (prePassword,password, userId) => async (dispatch, getState) => {

  try {
    dispatch({
      type: PROFILE_UPDATE_REQUEST,
    })

    const { data } = await axiosInstance.post("/update-password", {prePassword,password, userId})
    console.log(data,"......")
    dispatch({
      type: PROFILE_UPDATE_SUCCESS,
      payload: data,
    })

    var info=JSON.parse(localStorage.getItem('userInfo'))
    info.user=data.user
    console.log(info,"info")
    localStorage.setItem("userInfo", JSON.stringify(info))

  } catch (error) {

    dispatch({
      type: PROFILE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updatePassword2 = (password, userId) => async (dispatch, getState) => {

  try {
    dispatch({
      type: PROFILE_UPDATE_REQUEST,
    })

    const { data } = await axiosInstance.post("/update-password", {password, userId})
    console.log(data,"......")
    dispatch({
      type: PROFILE_UPDATE_SUCCESS,
      payload: data,
    })

    var info=JSON.parse(localStorage.getItem('userInfo'))
    info.user=data.user
    console.log(info,"info")
    localStorage.setItem("userInfo", JSON.stringify(info))

  } catch (error) {

    dispatch({
      type: PROFILE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}