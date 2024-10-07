import React from 'react'
import './Profile.css'
import Container from "react-bootstrap/Container"
import Navbar from "../NavBar/Navbar"
import ProfileSidebar from "./ProfileSidebar"
import ProfileTabs from './ProfileTabs'

const Profile = () => {


    return (
    <Container fluid className='profile_container'>
        <Navbar />
        <div className='profile_banner'>
            <ProfileSidebar/>
            <div className='profile_banner_side'>
            <ProfileTabs/>
            </div>
        </div>
    </Container>
  )
}

export default Profile