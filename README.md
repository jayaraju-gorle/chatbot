# Dual AI Chatbot Interface

A responsive web interface that provides access to two specialized chatbots:
1. Generic AI Assistant - For general queries and conversations
2. Apollo247 Support Assistant - Specialized in handling Apollo247-related support queries

## Features

- 🔄 Easy switching between two specialized chatbots
- 📱 Fully responsive design optimized for mobile and desktop
- 💬 Real-time message updates
- 🎨 Modern UI with WhatsApp-style chat bubbles
- ⌨️ Support for both click and Enter key message sending

## API Endpoints

The application interfaces with two API endpoints:

```bash
# Generic Chatbot
POST https://ai-tools-backend-772545827002.asia-south1.run.app/text

# Apollo247 Support Chatbot
POST https://ai-tools-backend-772545827002.asia-south1.run.app/support
```

## Setup

1. Clone the repository
```bash
git clone [repository-url]
```

2. Open `index.html` in a web browser
   - For development, use a local server (e.g., Live Server in VS Code)
   - For production, deploy to your preferred hosting service

## Development

- `index.html` - Main HTML structure
- `style.css` - Styling and responsive design
- `script.js` - Chat functionality and API integration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details