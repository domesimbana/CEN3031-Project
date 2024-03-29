import React, { useState } from 'react';
import { CgFileAdd } from "react-icons/cg";
import Documents from "../Documents";
import { HiUpload } from "react-icons/hi";
import { MdOutlineLogout } from "react-icons/md";
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs";
import './styles.css'

function Work(props) {

    const [isNavBarVisible, setIsNavBarVisible] = useState(false);
    const [isLogOut, setIsLogOut] = useState(false);

    const toggleNavBar = () => {
        setIsNavBarVisible(!isNavBarVisible);
    };

    const toggleLogOut = () => {
        setIsLogOut(!isLogOut);
    };

    function handleSignOut(e) {
        props.display(false);
        props.userSO({});
    }


    return(
        <div className="work-container"> 
            {!isNavBarVisible && (
                    <BsFillArrowRightCircleFill className="dash" onClick={toggleNavBar} />
            )}
            {isNavBarVisible && (
                <>
                    <BsFillArrowLeftCircleFill className="dash left-dash" onClick={toggleNavBar} />
                    <div className="work-details-info">
                        <div className="add-contanier">
                            <p>Add new site</p>
                            <CgFileAdd className='icon-image'/>
                        </div>
                        <div className="past-doc-container">
                            <Documents /> {/* Make sure to pass appropriate props if required */}
                            <Documents />
                            <Documents />
                            <Documents />
                        </div>
                        <div className="user-container">
                            {isLogOut &&
                                <div className='logout-container' onClick={(e) => handleSignOut(e)}>
                                    <MdOutlineLogout className='icon-image'/> Log Out
                                </div>
                            }
                            <div className="user-acc">
                                <img src={props.userAcc.picture} 
                                    onClick={toggleLogOut}
                                    className='user-img'
                                    alt="userName"
                                />
                                {props.userAcc.name}
                             </div>
                        </div>
                    </div>
                </>
            )}
            <div className="work-upload-contanier">
                <h3>DocIQ</h3>
                <p className='note'>DocIQ is not perfect true. Take a moment to verify pertinent data.</p>
                
                <form>
                                
                </form>
                <div className="input-container">
                    <input  type="text" 
                            placeholder="Upload Documents"
                    />
                    <HiUpload className="upload-img"/>
                </div>
            </div>
        </div>
    );
}

export default Work;