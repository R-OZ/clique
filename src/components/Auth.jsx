import React, { useState} from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios';

import Chatting from '../assets/Chatting';
import signinImage from '../assets/signup.jpg'

const cookies = new Cookies();
export const linkedInUrl = "https://www.linkedin.com/in/reginald-ojeba/"
const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: '',
}

const Auth = () => {
    const [form, setForm] = useState(initialState)
    const [isSignup, setIsSignup] = useState(true);
    const [incorrect, setIncorrect] = useState('')

    const handleChange =(e)=>{
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit =async (e) =>{ 
        try {
            e.preventDefault();

            const { username, password, phoneNumber, avatarURL } = form;

            // const URL = 'http://localhost:5000/auth';
            const URL = 'https://clique-backend.onrender.com/auth';

            // const URL = 'https://clique-chat-app.herokuapp.com/auth'

            const { data: { token, userId, hashedPassword, fullName,} } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
                username, password, fullName: form.fullName, phoneNumber, avatarURL,
            });
            cookies.set('token', token);
            cookies.set('username', username);
            cookies.set('fullName', fullName);
            cookies.set('userId', userId);

            if(isSignup) {
                cookies.set('phoneNumber', phoneNumber);
                cookies.set('avatarURL', avatarURL);
                cookies.set('hashedPassword', hashedPassword);
            }

            window.location.reload();
            
    } catch (error) {
        e.preventDefault()
        setIncorrect(error)
    }
}
    
    // {
    //     e.preventDefault();

    //     const { username, password, phoneNumber, avatarURL } = form;

    //     const URL = 'http://localhost:5000/auth';

    //     const { data: { token, userId, hashedPassword, fullName,} } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
    //         username, password, fullName: form.fullName, phoneNumber, avatarURL,
    //     }).then(res)();
        
    //     cookies.set('token', token);
    //     cookies.set('username', username);
    //     cookies.set('fullName', fullName);
    //     cookies.set('userId', userId);

    //     if(isSignup) {
    //         cookies.set('phoneNumber', phoneNumber);
    //         cookies.set('avatarURL', avatarURL);
    //         cookies.set('hashedPassword', hashedPassword);
    //       }

    //     window.location.reload();
        
    // }

    const switchMode =()=>{
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }

    return (
        <div className="auth__form-container">
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <a href={linkedInUrl} target="_blank"><div className="auth__form-logo">
                        <p id="auth__logo">Clique</p>
                        <p id="auth__logo-caption">By Reginald Ojeba</p>
                    </div></a>
                    <p>{isSignup ? 'Sign Up' : 'Sign In'}</p> 
                    <form onSubmit={handleSubmit}>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="fullName">Full Name</label>
                                <input 
                                    name="fullName" 
                                    type="text"
                                    placeholder="Full Name"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="username">Username</label>
                                <input 
                                    name="username" 
                                    type="text"
                                    placeholder="Username"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input 
                                    name="phoneNumber" 
                                    type="text"
                                    placeholder="Phone Number"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="avatarURL">Avatar URL</label>
                                <input 
                                    name="avatarURL" 
                                    type="text"
                                    placeholder="Avatar URL"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="auth__form-container_fields-content_input">
                                <label htmlFor="password">Password</label>
                                <input 
                                    name="password" 
                                    type="password"
                                    placeholder="Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            {incorrect?<p id='auth__incorrect'>Incorrect username or password</p>:null}
                        {isSignup && (
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input 
                                    name="confirmPassword" 
                                    type="password"
                                    placeholder="Confirm Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            )}
                        <div className="auth__form-container_fields-content_button">
                            <button>{isSignup ? "Sign Up" : "Sign In"}</button>
                        </div>
                    </form>
                    <div className="auth__form-container_fields-account">
                        <p>
                            {isSignup
                             ? "Already have an account?" 
                             : "Don't have an account?"
                             }
                             <span onClick={switchMode}>
                             {isSignup ? 'Sign In' : 'Sign Up'}
                             </span>
                        </p>
                    </div>
                    
                </div> 
            </div>
            <div className="auth__form-container_image">
                {/* <img src={signinImage} alt="sign in" /> */}
                    <Chatting />
                
                
            </div>
        </div>
    )
}

export default Auth