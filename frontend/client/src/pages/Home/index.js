// Import necessary dependencies
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BiSolidSend } from 'react-icons/bi';
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs";
import { HiFolderAdd } from "react-icons/hi";
import axios from "axios";
import './styles.css'
import Navbar from '../Navbar';
import PdfComp from '../Document';

// Homepage component definition
function Homepage(props) {
    // State variables
    const [isNavBarVisible, setIsNavBarVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [allImage, setAllImage] = useState(null);

    // useEffect to fetch PDFs on component mount
    useEffect(() => {
        getPdf();
    }, [])

    // Function to toggle navbar visibility
    const toggleNavBar = () => {
        setIsNavBarVisible(!isNavBarVisible);
    }
     
    // Function to fetch PDFs from server
    const getPdf = async() => {
        console.log('Getting PDF');
        const result = await axios.get("http://localhost:4000/get-files");
        console.log(result.data.data);
        setAllImage(result.data.data);
    }

    // Function to handle form submission
    const handleSubmit = async(e) => {
        console.log('Handling Submit');
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append('file', file);
        console.log(title, file);

        try {
            const result = await axios.post(
                "http://localhost:4000/posts",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" }
                }
            );
            console.log(result);
            console.log(result.data.status);
            if (result.data.status === 'ok') {
                alert("Upload Successfully!");
                getPdf();
                setTitle('');
                setFile(null);
            }
        } catch (error) {
            console.log("Not uploaded");
            // Handle the error (e.g., display an error message to the user)
        }
    }

    // Rendering JSX
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
            </div>
        </div>
    );
}

// Export the Homepage component
export default Homepage;
