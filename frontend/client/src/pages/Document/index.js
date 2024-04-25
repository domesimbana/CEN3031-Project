import React, { useState } from "react";
import { BiSolidSend } from 'react-icons/bi';
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from "react-icons/bs";
import { HiFolderAdd } from "react-icons/hi";
import "./styles.css";
import OpenAI from "openai";

function PdfComp(props) {
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
      
      try {
        // openapi (GPT)
        const completion = await openai.chat.completions.create({
          messages: [{role: "user", content: messageInput}],
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
        <p className='note'>DocIQ: Ask me anything!</p>
      </div>
      <div className="chatbox-container">
        <div className='pdf-title'>
          <h4>PDF Title</h4>
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

export default PdfComp;