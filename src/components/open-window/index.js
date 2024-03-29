import './styles.css'

import { useEffect } from 'react';

function OpenInterface(props) {
 
    useEffect(() => {
        /* global google */
        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline", size: "medium"}
        );

    }, [props.handleCallbackResponse]);

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
                            <label htmlFor=""> Email addres: <br />
                                <input  type='email'
                                        placeholder='Enter your email...'
                                />
                            </label> 
                            <label htmlFor=""> Password: <br />
                                <input  type='password'
                                        placeholder='Enter the password...'
                                />
                            </label> 
                            <button className='input-btn'>Log in</button>
                        </form>
                        <p>------- OR -------</p>
                        <div id="signInDiv"></div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OpenInterface