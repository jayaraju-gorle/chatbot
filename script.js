const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');
const chatMessages = document.getElementById('chatMessages');
const apiUrl = 'https://ai-tools-backend-772545827002.asia-south1.run.app/text';

// Function to add a message to the chat display
function addMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    const bubble = document.createElement('div');
    bubble.classList.add('message-bubble');
    bubble.textContent = message;
    messageDiv.appendChild(bubble);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom
}

// Function to send the user's message to the API and handle the response
async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (userMessage === '') return; // Don't send empty messages

    addMessage(userMessage, 'user'); // Display user message
    userInput.value = ''; // Clear the input field

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: userMessage })
        });

        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }

        const data = await response.json();
        const botResponse = data.text;  //CHANGED: extract text from data
        addMessage(botResponse, 'bot'); // Display bot response

    } catch (error) {
        console.error('Error:', error);
        addMessage('Error: Could not get a response from the chatbot.', 'bot');
    }
}

// Event listener for the "Send" button
sendButton.addEventListener('click', sendMessage);

// Event listener for pressing "Enter" in the input field
userInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

//Initial message from the bot
addMessage("Hi! How can i help you?", "bot");