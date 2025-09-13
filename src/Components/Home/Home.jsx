import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './home.css'
import profile_img from '../../assets/profile-image.png'

const Home = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("formData");
    console.log(userData)
    if (!userData) {
      // agar user login nahi hai to login page bhej do
      navigate("/auth/login");
    }
  }, [navigate]);



  const logout = () =>{
    localStorage.removeItem("formData"); // user data remove
    navigate("/auth/login"); // login page pe redirect
  }


  return (
    <div className='home-wrap'>
      <div className='cards-wrap'>
        <div className='welcome-text'>
          <h4>Welcome to</h4>
          <h2>Unstop</h2>
        </div>
        <div className='card'>
            <img src={profile_img} alt="" />
            <div>
              <h5 className='card-title'>
                Michael Dam
              </h5>
              <p className='gmail'>example@gmail.com</p>
              <p className='gender'>Female</p>
            </div>
            <button className='logout-btn btn' onClick={logout}>
              Logout
            </button>
        </div>
    </div>
    </div>
  )
}

export default Home