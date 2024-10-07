import './App.css';

import {useSelector } from 'react-redux'
import { Navigate } from "react-router-dom";
import SignUp from './Components/Forms/SignUp';
import Login from './Components/Forms/Login';
import SetupAccount from './Components/SetupAccount/SetupAccount';
import ForgotPassword from './Components/Forms/ForgotPassword';
import { GoogleOAuthProvider } from '@react-oauth/google';

import {
  Routes,
  Route,
} from "react-router-dom";

import Feed from './Components/Feed/feed';
import { ValidateEmail } from './Components/Forms/ValidateEmail';
import ResetPassword from './Components/Forms/ResetPassword';
import Profile from './Components/UserProfile/Profile';
import ChefDashboard from './Components/Dashboards/ChefDashboard/ChefDashboard';
import RestaurantDashboard from "./Components/Dashboards/RestaurantDashboard/RestaurantDashboard"
import ChefProfile from './Components/ChefProfile/ChefProfile';
import RestaurantProfile from './Components/RestaurantProfile/RestaurantProfile';
import Chefs from './Components/Chefs/Chefs';
import Restaurants from "./Components/Restaurants/Restaurants"
import Favourite from './Components/Favourite/Favourite';
import About from "./Components/About/About"
// import PrivacyPolicy from "./Components/PrivacyPolicy/PrivacyPolicy"
import Career from "./Components/Career/Career"
import Contact from "./Components/Contact/Contact"
import Advertising from "./Components/Advertising/Advertising"
import { NotFound } from './Components/notFound/NotFound';
const App = () => {

  

  // const userLogin = useSelector((state) => state.userLogin)
  // const { userInfo } = userLogin
  const userInfoFromStorage = localStorage.getItem('sign_up');
  const userInfo = userInfoFromStorage ? JSON.parse(userInfoFromStorage): null;
  console.log(userInfo);

  return (
    <div className="App">

      <GoogleOAuthProvider clientId="438779230494-b1n3ts08qjl5mhiekab1vgg7evevdgnq.apps.googleusercontent.com">
        <Routes>
        
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route path="/reset-password" element={<ResetPassword />}></Route>
          <Route path="/validate-email" element={<ValidateEmail />}></Route>

          <Route path="/chefs" element={<Chefs/>}></Route>
          <Route path="/restaurants" element={<Restaurants/>}></Route>
          <Route path="/favourite" element={<Favourite/>}></Route>
          <Route path="/restaurant/profile" element={<RestaurantProfile/>}></Route>

          <Route path="/about" element={<About/>}></Route>
          <Route path="/career" element={<Career/>}></Route>
          <Route path="/contact" element={<Contact/>}></Route>
          <Route path="/advertising" element={<Advertising/>}></Route>
          {/* <Route path="/privacy-policy" element={<PrivacyPolicy/>}></Route> */}

          <Route path='*' element={<NotFound />} />

          <Route path="/" element={userInfo !== null ? <Feed /> : <Login />}></Route>
          {userInfo?.role ? <Route path="/profile" element={<Profile />}></Route>:null}


          {/* { userInfo?.user?.role==="chef"?  
           <Route path="/chef/profile" element={<ChefProfile/>}></Route>
           :
           null} */}

          <Route path="/chef/profile" element={<ChefProfile/>}></Route>

         { userInfo !== null && userInfo.role ==="chef"?
        <Route path="/chef/dashboard" element={<ChefDashboard/>}></Route>
        :
        null}

        {userInfo !== null && userInfo.role ==="restaurant"?
        <Route path="/restaurant/dashboard" element={<RestaurantDashboard/>}></Route>:
        null}

        
       { userInfo !== null && userInfo.role === "chef" || userInfo !== null && userInfo.role ==="restaurant"?
        <Route exact path="/setup-account" element={<SetupAccount />}></Route>
        :
        null}


        </Routes>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
