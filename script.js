const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');
const chatMessages = document.getElementById('chatMessages');
const chatToggle = document.getElementById('chatToggle');
const apiBaseUrl = 'https://ai-tools-backend-772545827002.asia-south1.run.app';

let currentChatbot = 'generic'; // 'generic' or 'apollo'

// Function to add a message to the chat display
function addMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    const bubble = document.createElement('div');
    bubble.classList.add('message-bubble');
    bubble.textContent = message;
    messageDiv.appendChild(bubble);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to toggle between chatbots
function toggleChatbot() {
    currentChatbot = currentChatbot === 'generic' ? 'apollo' : 'generic';
    chatToggle.textContent = `Switch to ${currentChatbot === 'generic' ? 'Apollo Support' : 'Generic Chat'}`;
    
    // Clear chat history when switching
    chatMessages.innerHTML = '';
    
    // Add initial message based on chatbot type
    const initialMessage = currentChatbot === 'generic' 
        ? "Hi! How can I help you?"
        : "Welcome to Apollo247 Support! Please provide your order number for assistance.";
    addMessage(initialMessage, 'bot');
}

// Function to send the user's message to the API and handle the response
async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (userMessage === '') return;

    addMessage(userMessage, 'user');
    userInput.value = '';

    const endpoint = currentChatbot === 'generic' ? '/text' : '/support';

    try {
        const response = await fetch(`${apiBaseUrl}${endpoint}`, {
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
        const botResponse = data.result;
        addMessage(botResponse, 'bot');

    } catch (error) {
        console.error('Error:', error);
        addMessage('Error: Could not get a response from the chatbot.', 'bot');
    }
}

// Event listeners
sendButton.addEventListener('click', sendMessage);
chatToggle.addEventListener('click', toggleChatbot);
userInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// Initial message
addMessage("Hi! How can I help you?", "bot");