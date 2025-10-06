import React, { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import './Login.css'
import login_img from '../../assets/Illustration.png'
import google_img from '../../assets/google.png'
import fb_img from '../../assets/fb.png'
import user_icon from '../../assets/account_circle.png'
import mail_icon from '../../assets/mail.png'
import key_icon from '../../assets/key.png'
import eye_icon from '../../assets/visibility.png'

const Login = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        setUsername("");
        setEmail("");
        setPassword("");
    }, []);


    let formData = {
        username: username,  
        password: password,  
        email: email,   
        expiresInMins: 30,               
    }

    const validation = () => {
        let showErr = {};

        // Username validation of 'emilys'
        if(username.trim() === ""){
            showErr.username = "Please enter email";
        }
         else if (username !== "emilys") {
            showErr.username = "Username must be 'emilys'";
        }


        // Email validation foramate
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(email.trim() === ""){
            showErr.email = "Please enter Email";
        }
       
        else if (!emailRegex.test(email)) {
            showErr.email = "Invalid email format";
        }

        // Password validation of less than 8 character
        if(password.trim() === ""){
            showErr.password = "Please enter password";   
        }

        else if (password.length < 8) {
            tempErrors.password = "Password must be at least 8 characters long";
        }

        setErr(showErr);
        return Object.keys(showErr).length === 0;
    };



    const formSubmit = async (e) => {

        e.preventDefault();

        if (!validation()) return;
        try {
            const response = await fetch("https://dummyjson.com/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();  // response parse karna
            console.log(data, '===response===');
            localStorage.setItem("formData", JSON.stringify(data));
            console.log("form data saved:", data);
            navigate("/home");
        } catch (err) {
            setErr({ api: "Something went wrong!! " });
        }

    }

    return (
        <div className='login-page'>
            <div className='login-img'>
                <img src={login_img} alt="login-image" className="login-image" />
            </div>
            <div className='login-form'>
                <div className='heading'>
                    <h4>Welcome to </h4>
                    <h2>Unstop</h2>
                </div>
                <div className='google-facebook-login'>
                    <div>
                        <img src={google_img} alt="" />
                        <p>Login with Google</p>
                    </div>
                    <div>
                        <img src={fb_img} alt="" />
                        <p>Login with Facebook</p>
                    </div>
                </div>
                <div className='ruler'>
                    <span>OR</span>
                </div>
                    {err.api ? <span className="error">{err.api}</span>: <></> }
                <div className='form-container'>
                    <div className='input-wrap'>
                        <img src={user_icon} alt="" />
                        <div className='input-box'>
                            <input type="text" placeholder=" " value={username} onChange={(e) => { setUsername(e.target.value); setErr((prev) => ({ ...prev, username: "" }));
                                }}
                            />
                            <label htmlFor="userName">User Name</label>
                        </div>
                    </div>
                    {err.username && <p className="error">{err.username}</p>}
                    <div className='input-wrap'>
                        <img src={mail_icon} alt="" />
                        <div className='input-box'>
                            <input type="email" placeholder=" " value={email} onChange={(e) => {setEmail(e.target.value);setErr((prev) => ({ ...prev, email: "" }));}} autoComplete="off" name="email"/>
                            <label htmlFor="email">Email</label>
                        </div>
                    </div>
                    {err.email && <p className="error">{err.email}</p>}
                    <div className='input-wrap'>
                        <img src={key_icon} alt="" />
                        <div className='input-box'>
                            <input type="password" placeholder=" " value={password} onChange={(e) => {setPassword(e.target.value); setErr((prev) => ({ ...prev, password: "" }));}} autoComplete="off" name="password"/>
                            <label htmlFor="email">Password</label>
                        </div>
                        <div className='eye'>
                            <img src={eye_icon} alt="" />
                        </div>
                    </div>
                    {err.password && <p className="error">{err.password}</p>}
                </div>
                <div className='remember-forget'>
                    <div className='remember'>
                        <input type="checkbox" id='rememeber' />
                        <label htmlFor='rememeber'>Remember me</label>
                    </div>
                    <p>Forget Password ?</p>
                </div>
                <button className='login-btn btn' type="button" onClick={formSubmit}>Login</button>
                <div className='register'>
                    <p>Don’t have an account? <span>Register</span></p>
                </div>

            </div>
        </div>
    )
}

export default Login