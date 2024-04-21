import React, { useEffect, useState } from 'react';
// import Documents from "../Document";
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs";
import { HiFolderAdd } from "react-icons/hi";
import axios from "axios";
import './styles.css'
import Navbar from '../Navbar';
import PdfComp from '../Document';


function Homepage(props) {

    const [isNavBarVisible, setIsNavBarVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [allImage, setAllImage] = useState(null);

    useEffect(() => {
        getPdf();
    }, []);

    const toggleNavBar = () => {
        setIsNavBarVisible(!isNavBarVisible);
    };
     
    const getPdf = async() => {
        const result = await axios.get("http://localhost:4000/get-files");
        console.log(result.data.data);
        setAllImage(result.data.data);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append('file', file);
        console.log(title, file);

        const result = await axios.post("http://localhost:4000/posts", 
            formData, 
            {
                headers: {"Content-Type": "multipart/form-data"}     
            }
        );
        console.log(result);
        if (result.data.status === 'ok') {
            alert("Upload Successfully!");
            getPdf();
            setTitle('');
            setFile(null);
        }
    };

    return(
        <div className="work-container"> 
            {!isNavBarVisible && (
                    <BsFillArrowRightCircleFill className="dash" onClick={toggleNavBar} />
            )}
            {isNavBarVisible && (
                <>
                    <BsFillArrowLeftCircleFill className="dash left-dash" onClick={toggleNavBar} />
                    <Navbar allImage={allImage}/>
                </>
            )}
            <div className="work-upload-contanier">
                <div className='upload-file-container'>
                    <div className='title-container'>
                        <h2 className='text-note'>DocIQ</h2>
                        <p className='note'>DocIQ is not perfect true. Take a moment to verify pertinent data.</p>
                    </div>

                    <h4 className='desc-note'>CHAT WITH DOCUMENT</h4>

                    <div className="file-container">
                        <form onSubmit={handleSubmit}>
                            <div className="upload"> 
                                <HiFolderAdd className='folder-icon'/>
                                <p className='note'>Click to Upload File or Drop PDF here</p>

                                <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0]) }   required/> <br/>

                                <label> 
                                    <span className='note'>Title Name:</span> <br />
                                    <input type='text' placeholder='Enter the name file' className='title-input' value={title} onChange={(e) => setTitle(e.target.value)} required/>
                                </label>
                            </div>
                            <button className='button' type="submit">
                                Submit File
                            </button>
                        </form>
                    </div>
                </div>
                {/* <div className="chatbox-container">
                    <div className='pdf-title'>
                        <h4>PDF Title</h4>
                    </div>
                    <div className='chat-container'>
                        <div className="container">
                            <img src={""} 
                                className='user-img'
                                    alt="MT"
                            />
                            <span className='content'>Name of file uploaded</span>
                        </div>
                        <div className="container">
                            <img src={""} 
                                    className='user-img'
                                        alt="DOC"
                                />
                            <span className='content content-ans'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, culpa exercitationem quae recusandae aperiam error non aut molestias id laboriosam, quia harum blanditiis quos? Doloremque accusamus laudantium quibusdam quae hic!</span>
                        </div>
                    </div>
                    <div className="input-container">
                        <input  type="text" 
                                placeholder="Send a message"
                        />
                        <BiSolidSend className="upload-img"/>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default Homepage;