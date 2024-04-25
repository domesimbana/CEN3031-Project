import { CgFileAdd } from "react-icons/cg";
import { GoHistory } from "react-icons/go";
import { BiSolidDownArrow, BiSolidRightArrow } from "react-icons/bi";
import { MdOutlineLogout } from "react-icons/md";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css'
import { NavLink } from "react-router-dom";
import axios from "axios";


function Navbar(props) {

    const [userData, setUserData] = useState({});
    console.log("response", userData);

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

    useEffect(() => {
        getUser()
    }, [])
    
    const [isLogOut, setIsLogOut] = useState(false);
    const [chatHistoryVisible, setChatHistoryVisible] = useState(false);
    const [pdfFile, setPdfFile] = useState(null);

    const toggleLogOut = () => {
        setIsLogOut(!isLogOut);
    };

    const toggleChat = () => {
        setChatHistoryVisible(!chatHistoryVisible);
    }

    function handleSignOut(e) {
        window.open("http://localhost:4000/logout", "_self");
    }

    const showPdf = (pdf) => {
        window.open(`http://localhost:4000/files/${pdf}`, "_blank", "noreferrer");
        //setPdfFile(`/document?file=${pdf}`);
    }

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

export default Navbar;