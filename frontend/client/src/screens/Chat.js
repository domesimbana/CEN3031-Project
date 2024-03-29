// src/screens/Chat.js
import React, { useState } from 'react';

const Chat = () => {
	const [textInputValue, setTextInputValue] = useState('');
	const [response, setResponse] = useState('');

	const handleInputChange = (event) => {
		setTextInputValue(event.target.value);
	};

	const handleTextSubmit = async () => {
		try {
			const payload = { 
				'inputs' : textInputValue,
				'parameters' : {

				},
				'options' : {
					'wait_for_model' : true
				}
			};

			const response = await fetch(
				"https://api-inference.huggingface.co/models/gpt2",
				{
					headers:{ 	
						'Content-Type' : 'application/json',
					 	'Authorization' : "Bearer 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" 
						},
					method: 'POST',
					body: JSON.stringify(payload)
				}
			);

			// Check if the request was successful
			if (response.ok) {
				const responseData = await response.json();
      			// Extract generated_text from the first element of the array
      			const generatedText = responseData[0].generated_text;
				setResponse(generatedText);
			} else {
				console.error('Error:', response.status);
			}

		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<div>
		<h2>Input Text Here:</h2>
		<textarea
			rows="4"
			cols="50"
			value={textInputValue}
			onChange={handleInputChange}
		/>
		<br />
		<button onClick={handleTextSubmit}>Submit</button>
		<div>
			<h2>Response:</h2>
			<p>{response}</p>
		</div>
		</div>
	);
};

export default Chat;