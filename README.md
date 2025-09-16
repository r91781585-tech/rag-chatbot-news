# RAG-Powered News Chatbot

A sophisticated Retrieval-Augmented Generation (RAG) chatbot for news websites built with modern web technologies. This project demonstrates a complete implementation of a conversational AI system that can answer queries about news articles using semantic search and natural language generation.

## 🚀 Live Demo

**Frontend Demo**: [https://r91781585-tech.github.io/rag-chatbot-news/](https://r91781585-tech.github.io/rag-chatbot-news/)

## 📋 Project Overview

This project implements a RAG-powered chatbot that:
- Ingests and processes news articles
- Uses semantic embeddings for document retrieval
- Generates contextual responses using retrieved information
- Maintains session-based chat history
- Provides a modern, responsive user interface

## 🛠️ Tech Stack

### Frontend (Current Implementation)
- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with Flexbox/Grid, animations, and responsive design
- **Vanilla JavaScript** - Core functionality and DOM manipulation
- **Font Awesome** - Icons and visual elements
- **Google Fonts** - Typography (Inter font family)

### Backend (Full Implementation - Coming Soon)
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Redis** - In-memory caching and session storage
- **PostgreSQL/MySQL** - Persistent data storage (optional)
- **Socket.io** - Real-time communication

### AI/ML Components
- **Jina Embeddings** - Text embedding generation
- **Qdrant/Chroma** - Vector database for similarity search
- **Google Gemini API** - Large Language Model for response generation

## ✨ Features

### Current Features (Frontend Demo)
- ✅ **Modern Chat Interface** - Clean, responsive design with typing animations
- ✅ **Session Management** - Unique session IDs and chat history
- ✅ **Simulated RAG Pipeline** - Document retrieval and response generation
- ✅ **Real-time Typing Effects** - Animated bot responses
- ✅ **Message Export** - Download chat history as JSON
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile
- ✅ **Keyboard Shortcuts** - Ctrl+K to focus input, Escape to clear
- ✅ **Suggestion Chips** - Quick query suggestions
- ✅ **Loading States** - Visual feedback during processing

### Planned Features (Full Implementation)
- 🔄 **Real RAG Pipeline** - Actual document embedding and retrieval
- 🔄 **Live News Ingestion** - RSS feeds and web scraping
- 🔄 **Vector Search** - Semantic similarity matching
- 🔄 **LLM Integration** - Google Gemini API responses
- 🔄 **Persistent Storage** - Database integration
- 🔄 **WebSocket Support** - Real-time streaming responses
- 🔄 **User Authentication** - Session management
- 🔄 **Analytics Dashboard** - Usage metrics and insights

## 🏗️ Architecture

### Current Architecture (Frontend Only)
```
┌─────────────────┐
│   Frontend      │
│  (HTML/CSS/JS)  │
│                 │
│ • Chat UI       │
│ • Session Mgmt  │
│ • Mock RAG      │
│ • Local Storage │
└─────────────────┘
```

### Target Architecture (Full Stack)
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   AI Services   │
│  (React/SCSS)   │◄──►│  (Node.js/API)  │◄──►│                 │
│                 │    │                 │    │ • Jina Embed   │
│ • Chat UI       │    │ • REST API      │    │ • Vector DB     │
│ • WebSocket     │    │ • Session Mgmt  │    │ • Gemini API    │
│ • State Mgmt    │    │ • Redis Cache   │    │ • News Scraper  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                       ┌─────────────────┐
                       │   Database      │
                       │ (PostgreSQL)    │
                       │                 │
                       │ • Chat History  │
                       │ • User Sessions │
                       │ • News Articles │
                       └─────────────────┘
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for external resources (fonts, icons)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/r91781585-tech/rag-chatbot-news.git
   cd rag-chatbot-news
   ```

2. **Open the application**
   ```bash
   # Option 1: Direct file opening
   open index.html
   
   # Option 2: Local server (recommended)
   python -m http.server 8000
   # or
   npx serve .
   ```

3. **Access the application**
   - Direct: Open `index.html` in your browser
   - Server: Navigate to `http://localhost:8000`

## 💡 Usage

### Basic Interaction
1. **Start Chatting**: Type your message in the input field
2. **Send Message**: Press Enter or click the send button
3. **View Responses**: Watch the AI respond with relevant news information
4. **Clear Chat**: Use the "Clear Chat" button to reset the session
5. **Export History**: Download your chat history as JSON

### Sample Queries
- "What's the latest tech news?"
- "Tell me about climate change developments"
- "Any recent breakthroughs in science?"
- "Show me financial market updates"
- "What's happening in space exploration?"

### Keyboard Shortcuts
- `Ctrl/Cmd + K` - Focus message input
- `Enter` - Send message
- `Shift + Enter` - New line in message
- `Escape` - Clear current input

## 🔧 Configuration

### Customizing the News Database
Edit the `initializeNewsDatabase()` method in `script.js` to add your own news articles:

```javascript
{
    id: 9,
    title: "Your News Title",
    content: "Your news content here...",
    category: "your-category",
    date: "2024-01-16",
    source: "Your Source"
}
```

### Styling Customization
Modify `styles.css` to customize:
- Color scheme (CSS custom properties)
- Typography and spacing
- Animation timings
- Responsive breakpoints

## 📊 Performance Considerations

### Current Implementation
- **Client-side Processing**: All logic runs in the browser
- **Memory Usage**: Minimal, stores only current session
- **Network Requests**: None (fully offline after initial load)
- **Response Time**: Instant (simulated delays for UX)

### Production Optimizations
- **Caching Strategy**: Redis for session data, browser cache for static assets
- **CDN Integration**: Serve static files from CDN
- **Code Splitting**: Lazy load components
- **Compression**: Gzip/Brotli compression
- **Database Indexing**: Optimize vector similarity searches

## 🔒 Security Considerations

### Current Security Measures
- **XSS Prevention**: Proper DOM manipulation without innerHTML
- **Input Sanitization**: Text content only, no HTML injection
- **Session Isolation**: Each session is independent

### Production Security
- **API Authentication**: JWT tokens for API access
- **Rate Limiting**: Prevent abuse and spam
- **Input Validation**: Server-side validation for all inputs
- **HTTPS Only**: Secure communication
- **CORS Configuration**: Proper cross-origin policies

## 🧪 Testing

### Manual Testing Checklist
- [ ] Chat interface loads correctly
- [ ] Messages send and display properly
- [ ] Typing animations work
- [ ] Session ID generates and displays
- [ ] Clear chat functionality works
- [ ] Export feature downloads JSON
- [ ] Responsive design on mobile
- [ ] Keyboard shortcuts function
- [ ] Suggestion chips work

### Automated Testing (Planned)
- Unit tests for core functions
- Integration tests for API endpoints
- E2E tests for user workflows
- Performance testing for response times

## 📈 Future Enhancements

### Phase 1: Backend Integration
- [ ] Node.js/Express API setup
- [ ] Redis session management
- [ ] Database schema design
- [ ] WebSocket implementation

### Phase 2: RAG Implementation
- [ ] News article ingestion pipeline
- [ ] Jina embeddings integration
- [ ] Vector database setup (Qdrant/Chroma)
- [ ] Semantic search implementation

### Phase 3: AI Integration
- [ ] Google Gemini API integration
- [ ] Response streaming
- [ ] Context window management
- [ ] Conversation memory

### Phase 4: Advanced Features
- [ ] Multi-language support
- [ ] Voice input/output
- [ ] Image/document upload
- [ ] Analytics dashboard
- [ ] Admin panel

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style and conventions
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Developer**: [Your Name]
- **Project**: Full Stack Developer Assignment - Voosh
- **Contact**: [Your Email]

## 🙏 Acknowledgments

- **Voosh** - For the challenging and interesting assignment
- **Font Awesome** - For the beautiful icons
- **Google Fonts** - For the Inter font family
- **Open Source Community** - For inspiration and resources

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/r91781585-tech/rag-chatbot-news/issues) page
2. Create a new issue with detailed description
3. Contact the development team

---

**Note**: This is currently a frontend-only demonstration. The full RAG implementation with backend services, real embeddings, and LLM integration is in development. The current version showcases the user interface and simulates the RAG pipeline behavior for demonstration purposes.