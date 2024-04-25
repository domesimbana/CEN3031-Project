// Importing necessary icons and libraries
import { CgFileAdd } from "react-icons/cg";
import { GoHistory } from "react-icons/go";
import { BiSolidDownArrow, BiSolidRightArrow } from "react-icons/bi";
import { MdOutlineLogout } from "react-icons/md";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css'
import { NavLink } from "react-router-dom";
import axios from "axios";

// Navbar component definition
function Navbar(props) {

    // State variables initialization
    const [userData, setUserData] = useState({}); // Holds user data
    console.log("response", userData);

    // Fetch user data from server
    const getUser = async() => {
        try {
            const response = await axios.get('http://localhost:4000/login/sucess', {
                withCredentials: true
            })
            setUserData(response.data.user)
        } catch (error) {
            console.log("error", error);
        }
    }

    // Fetch user data when component mounts
    useEffect(() => {
        getUser()
    }, [])
    
    const [isLogOut, setIsLogOut] = useState(false); // Flag for logout state
    const [chatHistoryVisible, setChatHistoryVisible] = useState(false); // Flag for chat history visibility
    const [pdfFile, setPdfFile] = useState(null); // Holds PDF file

    // Toggle logout state
    const toggleLogOut = () => {
        setIsLogOut(!isLogOut);
    };

    // Toggle chat history visibility
    const toggleChat = () => {
        setChatHistoryVisible(!chatHistoryVisible);
    }

    // Handle user sign out
    function handleSignOut(e) {
        window.open("http://localhost:4000/logout", "_self");
    }

    // Show PDF file in a new tab
    const showPdf = (pdf) => {
        window.open(`http://localhost:4000/files/${pdf}`, "_blank", "noreferrer");
        //setPdfFile(`/document?file=${pdf}`);
    }

    // Render Navbar component
    return ( 
        <div className="work-details-info">
            <div className='logo-container'>
                <img src="./logo.png" alt="logo" className='logo' />
                <span>DocIQ</span>
            </div>
            
            <div className="add-contanier">
                <p>New Chat</p>
                <CgFileAdd className='icon-image'/>
            </div>

            <div className="past-doc-container">
                {
                    !chatHistoryVisible && (
                        <div className="history-container" onClick={toggleChat}>
                            <GoHistory className="his-icon" />
                            <span>Chat History</span>
                            <BiSolidRightArrow />
                        </div>
                )}
                {
                    chatHistoryVisible && (
                        <div>
                            <div className="history-container" onClick={toggleChat}>
                                <GoHistory className="his-icon"/>
                                <span>Chat History</span>
                                <BiSolidDownArrow />
                            </div>
                            {
                                props.allImage == null 
                                    ? "" 
                                    : props.allImage.map((data) => {
                                        return (
                                            //<NavLink key={data.id} to="#" onClick={() => setPdfFile(`/files/${data.file}`)}>
                                            <div className="history-document">
                                                <h6>Title: {data.title}</h6>
                                                <button onClick={() => showPdf(data.file)}>Show PDF</button>  
                                                <Link to={`/document?file=${data.file}`}>
                                                    <button>Chat with PDF</button>
                                                </Link> 
                                            </div>
                                            
                                            //</NavLink>
                                        )
                                    })
                            }            
                        </div>
                )}
            </div>
            <div className="user-container">
                {
                    isLogOut &&
                        <div className='logout-container' onClick={(e) => handleSignOut(e)}>
                            <MdOutlineLogout className='icon-image'/> Log Out
                        </div>
                }
                
                <div className="user-acc">
                    <img src={userData.image} 
                        onClick={toggleLogOut}
                        className='user-img'
                        alt="userName"
                    />
                    {userData.displayName}
                </div>
            </div>
        </div>
    );
}

// Export Navbar component
export default Navbar;
