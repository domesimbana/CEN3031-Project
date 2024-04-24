import React from "react";
import { BiSolidSend } from 'react-icons/bi';
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs";
import { HiFolderAdd } from "react-icons/hi";

function PdfComp(props) {
  return (
    <div>
      <div className='title-container'>
        <h2 className='text-note'>DocIQ</h2>
        <p className='note'>DocIQ is not perfect true. Take a moment to verify pertinent data.</p>
      </div>
      <div className="chatbox-container">
        <div className='pdf-title'>
          <h4>PDF Title</h4>
        </div>
        <div className='chat-container'>
          <div className="container">
            <img
              src={""}
              className='user-img'
              alt="MT"
            />
            <span className='content'>Name of file uploaded</span>
          </div>
          <div className="container">
            <img
              src={""}
              className='user-img'
              alt="DOC"
            />
            <span className='content content-ans'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, culpa exercitationem quae recusandae aperiam error non aut molestias id laboriosam, quia harum blanditiis quos? Doloremque accusamus laudantium quibusdam quae hic!</span>
          </div>
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Send a message"
          />
          <BiSolidSend className="upload-img" />
        </div>
      </div>
    </div>
  );
}

export default PdfComp;