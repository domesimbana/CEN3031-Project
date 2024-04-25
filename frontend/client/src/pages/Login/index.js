// Importing necessary libraries and styles
import React from 'react';
import { useEffect } from 'react';
import './styles.css';

// LogIn component definition
function LogIn() {
 
    // Function to handle login with Google
    const loginWithGoogle = () => {
        window.open('http://localhost:4000/auth/google/callback', '_self');
    }

    // Render LogIn component
    return(
        <div className="open-container">
            <div className="open-details-title">
                <div className='open-title'>
                    <h1>DocIQ</h1>
                </div>
                <div className='open-details'>
                    <div className='details-ctns'>
                        <h3>Get Started</h3>
                        <form type='submit'>
                            <label> Username: <br />
                                <input  type='text'
                                        placeholder='Enter username...'
                                />
                            </label> 
                            <label> Password: <br />
                                <input  type='password'
                                        placeholder='Enter password...'
                                />
                            </label> 
                            <button className='input-btn'>Log in</button>
                            <p className='message'>Not Registered? <a href="#">Create an account</a></p>
                        </form> 
                        <p>------- OR -------</p>
                        <button className='login-with-google-btn' onClick={loginWithGoogle} >
                            Sign in with Google
                        </button>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

// Export LogIn component
export default LogIn
