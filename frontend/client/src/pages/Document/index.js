import React, { useState, useEffect } from "react";
import { BiSolidSend } from 'react-icons/bi';
import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs";
import "./styles.css";
import OpenAI from "openai";

function Document() {
  //Gets the info of the Documents
  const [searchParams] = useSearchParams();
  const file = searchParams.get('file'); 
  const [allImage, setAllImage] = useState([]);

  const [pdfFile, setPdfFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");

  const parsePdfForText = async () => {
    try {
      // Create a FormData object
      const formData = new FormData();
      // Append the PDF file to the FormData object
      formData.append("pdfFile", pdfFile.file);

      // Send the FormData object to the backend for parsing
      const response = await axios.post("http://localhost:4000/parse-pdf", formData, {
        headers: {
          "Content-Type": "multipart/form-data" // Set the content type to multipart/form-data
        }
      });

      // Set the extracted text content in the state variable
      setExtractedText(response.data.text);
    } catch (error) {
      console.error("Error parsing PDF for text:", error);
    }
  };
  
  useEffect(() => {
    const fetchPdfFile = async () => {
      try {
        const response = await axios.get("http://localhost:4000/get-files");
        const files = response.data.data;
        // Assuming the first file is the desired PDF file
        if (files.length > 0) {

          let index = 1;
          while (index < files.length) {
            const item = files[index];
            console.log(item.file);
            if (item.file === file) {
              pdfTitleInfo = item.title;
              pdfFileInfo = item.file;
              console.log(pdfFileInfo);
              break;
            }
            index++;
          }

          const firstFile = files[index];
          setPdfFile(firstFile);
          parsePdfForText(firstFile);
        }
      } catch (error) {
        console.error("Error fetching PDF file:", error);
      }
    };

    fetchPdfFile();
  }, []);

  //variables for file title and file 
  let pdfTitleInfo='Document';
  let pdfFileInfo='Document';
  let indexSecond;
  let message;

  useEffect(() => {
    const getPdf = async () => {
      const result = await axios.get("http://localhost:4000/get-files");
      console.log(result.data.data);
      setAllImage(result.data.data);
    };
    
    getPdf();
  }, []);

  // Function to find the specific file
  
  let index = 1;
  while (index < allImage.length) {
    const item = allImage[index];
    console.log(item.file);
    if (item.file === file) {
      pdfTitleInfo = item.title;
      pdfFileInfo = item.file;
      console.log(pdfFileInfo);
      break;
    }
    index++;
  }
  
  const openai = new OpenAI({
    apiKey: 'sk-proj-yzKV5lfkyKuMAvqvAkhHT3BlbkFJdT9HmMQcfaTQUH37zoEL',
    dangerouslyAllowBrowser: true,
  });

  const [messageInput, setMessageInput] = useState("");
  const [messageList, setMessageList] = useState([]);

  const handleMessageChange = (e) => {
    setMessageInput(e.target.value);
  };

  const handleSubmitButton = async () => {
    if (messageInput.trim() !== "") {
      setMessageList([...messageList, { text: messageInput, type: "user" }]);
      
      const contentToSend = "Use this text as context for your responses: " + extractedText + " My prompt for you to answer: " + messageInput;

      try {
        // openapi (GPT)
        const completion = await openai.chat.completions.create({
          messages: [{role: "user", content: contentToSend}],
          model: "gpt-3.5-turbo",
        });
        setMessageList([
          ...messageList, 
          { text: messageInput, type: "user" }, // Keep user's question intact
          { text: completion.choices[0].message["content"], type: "llm" } // Add LLM response
        ]);
  
      } catch (error) {
        console.error("Error with fetching LLM data: ", error);
      }
  
      setMessageInput("");
    }
  }


  return (
    <div>
      <div className='title-container'>
        <h2 className='text-note'>DocIQ</h2>
        <p className='note'>DocIQ: Get the answers you need</p>
      </div>
      <div className="chatbox-container">
        <div className='pdf-title'>
          <h4>Document Title: {pdfTitleInfo}</h4>
        </div>
        <div className='chat-container'>
          {messageList.map((message, index) => (
            <div key={index} className={`message-container ${message.type}`}>
              <img
                src={message.type === "user" ? "https://cdn-icons-png.flaticon.com/512/149/149071.png" : "https://cdn.discordapp.com/attachments/614053470022139935/1232809813927395428/image.png?ex=662acf1c&is=66297d9c&hm=297bb28240953a5c6e39557897b4e809cd0e5731e24a69e77b21ea925bdd63f4&"}
                className='user-img'
                alt={message.type === "user" ? "User" : "LLM"}
              />
              <span className={`content ${message.type}`}>{message.text}</span>
            </div>
          ))}
        </div>
        <div className="input-container">
          <textarea
            type="text"
            placeholder="Send a message"
            value={messageInput}
            onChange={handleMessageChange}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSubmitButton();
              }
            }}
          />
          <BiSolidSend className="upload-img" onClick={handleSubmitButton} />
        </div>
      </div>
    </div>
  );
}

export default Document;