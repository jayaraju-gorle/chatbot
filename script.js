const apiBaseUrl = 'https://ai-tools-backend-772545827002.asia-south1.run.app';

class ChatManager {
    constructor(type) {
        this.type = type;
        this.container = document.getElementById(`${type}Chat`);
        this.messages = document.getElementById(`${type}Messages`);
        this.input = document.getElementById(`${type}Input`);
        this.sendButton = document.getElementById(`${type}SendButton`);
        this.isProcessing = false;

        this.setupEventListeners();
        this.addInitialMessage();
    }

    setupEventListeners() {
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                this.sendMessage();
            }
        });
    }

    addInitialMessage() {
        const initialMessage = this.type === 'generic' 
            ? "Hi! How can I help you?"
            : "Welcome to Apollo247 Support! How can I help you today? You can ask about your health credits, recent transactions, or membership status.";
        this.addMessage(initialMessage, 'bot');
    }

    createLoadingIndicator() {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading-indicator';
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('div');
            dot.className = 'loading-dot';
            loadingDiv.appendChild(dot);
        }
        return loadingDiv;
    }

    formatTimestamp(date) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    addMessage(message, sender, timestamp = new Date()) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');

        const timestampDiv = document.createElement('div');
        timestampDiv.classList.add('timestamp');
        timestampDiv.textContent = this.formatTimestamp(timestamp);

        const bubble = document.createElement('div');
        bubble.classList.add('message-bubble');
        
        // Handle multi-line messages by preserving line breaks
        if (typeof message === 'string') {
            const formattedMessage = message.split('\n').map(line => {
                const p = document.createElement('p');
                p.textContent = line;
                return p;
            });
            formattedMessage.forEach(p => bubble.appendChild(p));
        } else {
            bubble.textContent = message;
        }

        messageDiv.appendChild(bubble);
        messageDiv.appendChild(timestampDiv);
        this.messages.appendChild(messageDiv);
        this.messages.scrollTop = this.messages.scrollHeight;
    }

    setProcessingState(isProcessing) {
        this.isProcessing = isProcessing;
        this.input.disabled = isProcessing;
        this.sendButton.disabled = isProcessing;
    }

    formatErrorMessage(error) {
        if (typeof error === 'string') {
            return error;
        }
        if (error.error) {
            return error.error;
        }
        return 'An unexpected error occurred. Please try again.';
    }

    async sendMessage() {
        const userMessage = this.input.value.trim();
        if (userMessage === '' || this.isProcessing) return;

        this.setProcessingState(true);
        this.addMessage(userMessage, 'user');
        this.input.value = '';

        const loadingIndicator = this.createLoadingIndicator();
        this.messages.appendChild(loadingIndicator);

        const endpoint = this.type === 'generic' ? '/text' : '/support';

        try {
            const response = await fetch(`${apiBaseUrl}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: userMessage })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(this.formatErrorMessage(data));
            }

            this.messages.removeChild(loadingIndicator);
            
            // Handle the new response format for support endpoint
            if (this.type === 'apollo') {
                // Use the 'response' field for natural language responses
                const botResponse = data.response || data.error || 'No response received';
                this.addMessage(botResponse, 'bot');
            } else {
                // Handle generic chat responses
                this.addMessage(data.result, 'bot');
            }

        } catch (error) {
            console.error('Error:', error);
            this.messages.removeChild(loadingIndicator);
            this.addMessage(this.formatErrorMessage(error), 'bot');
        }

        this.setProcessingState(false);
    }
}

// Mobile toggle functionality
const chatToggle = document.getElementById('chatToggle');
const genericChat = document.getElementById('genericChat');
const apolloChat = document.getElementById('apolloChat');

let currentMobileChat = 'generic';

chatToggle.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
        currentMobileChat = currentMobileChat === 'generic' ? 'apollo' : 'generic';
        genericChat.style.display = currentMobileChat === 'generic' ? 'flex' : 'none';
        apolloChat.style.display = currentMobileChat === 'apollo' ? 'flex' : 'none';
        chatToggle.textContent = `Switch to ${currentMobileChat === 'generic' ? 'Apollo Support' : 'Generic Chat'}`;
    }
});

// Initialize both chat managers
const genericChatManager = new ChatManager('generic');
const apolloChatManager = new ChatManager('apollo');