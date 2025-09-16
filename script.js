// RAG Chatbot JavaScript Implementation
class RAGChatbot {
    constructor() {
        this.sessionId = this.generateSessionId();
        this.chatHistory = [];
        this.isTyping = false;
        this.newsDatabase = this.initializeNewsDatabase();
        
        this.initializeElements();
        this.bindEvents();
        this.initializeSession();
    }

    generateSessionId() {
        return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    }

    initializeElements() {
        this.elements = {
            sessionId: document.getElementById('session-id'),
            chatMessages: document.getElementById('chat-messages'),
            messageInput: document.getElementById('message-input'),
            sendButton: document.getElementById('send-button'),
            clearButton: document.getElementById('clear-chat'),
            exportButton: document.getElementById('export-chat'),
            typingIndicator: document.getElementById('typing-indicator'),
            loadingOverlay: document.getElementById('loading-overlay'),
            suggestions: document.getElementById('suggestions')
        };
    }

    bindEvents() {
        // Send message events
        this.elements.sendButton.addEventListener('click', () => this.sendMessage());
        this.elements.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Input handling
        this.elements.messageInput.addEventListener('input', () => this.handleInputChange());
        
        // Auto-resize textarea
        this.elements.messageInput.addEventListener('input', () => this.autoResizeTextarea());

        // Clear chat
        this.elements.clearButton.addEventListener('click', () => this.clearChat());
        
        // Export chat
        this.elements.exportButton.addEventListener('click', () => this.exportChat());

        // Suggestion chips
        this.elements.suggestions.addEventListener('click', (e) => {
            if (e.target.classList.contains('suggestion-chip')) {
                this.elements.messageInput.value = e.target.textContent;
                this.handleInputChange();
                this.sendMessage();
            }
        });
    }

    initializeSession() {
        // Simulate loading
        setTimeout(() => {
            this.elements.loadingOverlay.classList.add('hidden');
            this.elements.sessionId.textContent = this.sessionId;
        }, 2000);
    }

    initializeNewsDatabase() {
        // Simulated news database for demo purposes
        return [
            {
                id: 1,
                title: "Tech Giants Report Strong Q3 Earnings",
                content: "Major technology companies including Apple, Google, and Microsoft have reported stronger than expected earnings for the third quarter, driven by cloud computing growth and AI investments.",
                category: "technology",
                date: "2024-01-15",
                source: "TechNews"
            },
            {
                id: 2,
                title: "Global Climate Summit Reaches Historic Agreement",
                content: "World leaders at the Global Climate Summit have reached a historic agreement on carbon emission reductions, with 195 countries committing to net-zero emissions by 2050.",
                category: "environment",
                date: "2024-01-14",
                source: "Environmental Times"
            },
            {
                id: 3,
                title: "Breakthrough in Quantum Computing Achieved",
                content: "Researchers at MIT have achieved a major breakthrough in quantum computing, developing a new quantum processor that can maintain coherence for unprecedented durations.",
                category: "science",
                date: "2024-01-13",
                source: "Science Daily"
            },
            {
                id: 4,
                title: "Stock Markets Hit Record Highs Amid Economic Recovery",
                content: "Global stock markets have reached record highs as economic indicators suggest a strong recovery from recent downturns, with the S&P 500 and NASDAQ leading gains.",
                category: "finance",
                date: "2024-01-12",
                source: "Financial News"
            },
            {
                id: 5,
                title: "New AI Model Shows Promise in Medical Diagnosis",
                content: "A new artificial intelligence model developed by researchers has shown remarkable accuracy in diagnosing rare diseases, potentially revolutionizing medical diagnostics.",
                category: "healthcare",
                date: "2024-01-11",
                source: "Medical Journal"
            },
            {
                id: 6,
                title: "Space Mission Successfully Lands on Mars",
                content: "The latest Mars exploration mission has successfully landed on the red planet, with the rover already beginning its search for signs of ancient microbial life.",
                category: "space",
                date: "2024-01-10",
                source: "Space News"
            },
            {
                id: 7,
                title: "Renewable Energy Adoption Reaches New Milestone",
                content: "Renewable energy sources now account for 40% of global electricity generation, marking a significant milestone in the transition to clean energy.",
                category: "energy",
                date: "2024-01-09",
                source: "Energy Today"
            },
            {
                id: 8,
                title: "Major Cybersecurity Breach Affects Millions",
                content: "A sophisticated cyberattack has compromised the data of millions of users across multiple platforms, highlighting the growing threat of cybercrime.",
                category: "cybersecurity",
                date: "2024-01-08",
                source: "Cyber Security News"
            }
        ];
    }

    handleInputChange() {
        const hasText = this.elements.messageInput.value.trim().length > 0;
        this.elements.sendButton.disabled = !hasText || this.isTyping;
    }

    autoResizeTextarea() {
        const textarea = this.elements.messageInput;
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }

    async sendMessage() {
        const message = this.elements.messageInput.value.trim();
        if (!message || this.isTyping) return;

        // Add user message
        this.addMessage(message, 'user');
        this.elements.messageInput.value = '';
        this.handleInputChange();
        this.autoResizeTextarea();

        // Show typing indicator
        this.showTypingIndicator();

        // Simulate RAG processing delay
        await this.delay(1500 + Math.random() * 2000);

        // Generate response
        const response = await this.generateRAGResponse(message);
        
        // Hide typing indicator and show response
        this.hideTypingIndicator();
        this.addMessage(response, 'bot');
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        avatarDiv.innerHTML = sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const textDiv = document.createElement('div');
        textDiv.className = 'message-text';
        
        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        contentDiv.appendChild(textDiv);
        contentDiv.appendChild(timeDiv);
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        
        this.elements.chatMessages.appendChild(messageDiv);
        
        // Animate text typing for bot messages
        if (sender === 'bot') {
            this.typeText(textDiv, text);
        } else {
            textDiv.textContent = text;
        }
        
        // Store in chat history
        this.chatHistory.push({
            text,
            sender,
            timestamp: new Date().toISOString()
        });
        
        // Scroll to bottom
        this.scrollToBottom();
    }

    async typeText(element, text) {
        element.textContent = '';
        const words = text.split(' ');
        
        for (let i = 0; i < words.length; i++) {
            element.textContent += (i > 0 ? ' ' : '') + words[i];
            await this.delay(50 + Math.random() * 100);
        }
    }

    showTypingIndicator() {
        this.isTyping = true;
        this.elements.typingIndicator.classList.add('show');
        this.elements.sendButton.disabled = true;
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        this.isTyping = false;
        this.elements.typingIndicator.classList.remove('show');
        this.handleInputChange();
    }

    async generateRAGResponse(query) {
        // Simulate RAG pipeline: Retrieve relevant documents
        const relevantDocs = this.retrieveRelevantDocuments(query);
        
        // Simulate LLM generation with retrieved context
        return this.generateResponseWithContext(query, relevantDocs);
    }

    retrieveRelevantDocuments(query) {
        const queryLower = query.toLowerCase();
        const keywords = queryLower.split(' ').filter(word => word.length > 2);
        
        // Simple similarity scoring based on keyword matching
        const scoredDocs = this.newsDatabase.map(doc => {
            let score = 0;
            const docText = (doc.title + ' ' + doc.content + ' ' + doc.category).toLowerCase();
            
            keywords.forEach(keyword => {
                const matches = (docText.match(new RegExp(keyword, 'g')) || []).length;
                score += matches;
            });
            
            return { ...doc, score };
        });
        
        // Return top 3 most relevant documents
        return scoredDocs
            .filter(doc => doc.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 3);
    }

    generateResponseWithContext(query, relevantDocs) {
        if (relevantDocs.length === 0) {
            return "I couldn't find specific information about that topic in our news database. Could you try asking about technology, climate, science, finance, healthcare, space, energy, or cybersecurity news?";
        }

        const queryLower = query.toLowerCase();
        
        // Generate contextual response based on retrieved documents
        if (queryLower.includes('latest') || queryLower.includes('recent') || queryLower.includes('new')) {
            const latestDoc = relevantDocs[0];
            return `Based on our latest news data, here's what I found: **${latestDoc.title}**\n\n${latestDoc.content}\n\n*Source: ${latestDoc.source} (${latestDoc.date})*\n\nWould you like more details about this topic or information about related news?`;
        }
        
        if (queryLower.includes('summary') || queryLower.includes('overview')) {
            const summaries = relevantDocs.map(doc => `• **${doc.title}** - ${doc.content.substring(0, 100)}...`).join('\n');
            return `Here's a summary of relevant news articles I found:\n\n${summaries}\n\nWould you like me to elaborate on any of these topics?`;
        }
        
        if (relevantDocs.length === 1) {
            const doc = relevantDocs[0];
            return `I found this relevant information: **${doc.title}**\n\n${doc.content}\n\n*Source: ${doc.source} (${doc.date})*\n\nIs there anything specific about this topic you'd like to know more about?`;
        }
        
        // Multiple relevant documents
        const mainDoc = relevantDocs[0];
        const relatedCount = relevantDocs.length - 1;
        
        return `**${mainDoc.title}**\n\n${mainDoc.content}\n\n*Source: ${mainDoc.source} (${mainDoc.date})*\n\nI also found ${relatedCount} other related article${relatedCount > 1 ? 's' : ''} on this topic. Would you like me to share those as well?`;
    }

    clearChat() {
        if (confirm('Are you sure you want to clear the chat history? This action cannot be undone.')) {
            // Keep only the initial bot message
            const messages = this.elements.chatMessages.querySelectorAll('.message');
            for (let i = 1; i < messages.length; i++) {
                messages[i].remove();
            }
            
            this.chatHistory = [];
            this.sessionId = this.generateSessionId();
            this.elements.sessionId.textContent = this.sessionId;
            
            // Show confirmation
            setTimeout(() => {
                this.addMessage("Chat history cleared! I'm ready to help you with news queries.", 'bot');
            }, 500);
        }
    }

    exportChat() {
        if (this.chatHistory.length === 0) {
            alert('No chat history to export.');
            return;
        }

        const exportData = {
            sessionId: this.sessionId,
            exportDate: new Date().toISOString(),
            messages: this.chatHistory
        };

        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `chat-export-${this.sessionId}.json`;
        link.click();
        
        URL.revokeObjectURL(link.href);
    }

    scrollToBottom() {
        setTimeout(() => {
            this.elements.chatMessages.scrollTop = this.elements.chatMessages.scrollHeight;
        }, 100);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the chatbot when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new RAGChatbot();
});

// Add some utility functions for enhanced UX
document.addEventListener('DOMContentLoaded', () => {
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K to focus input
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            document.getElementById('message-input').focus();
        }
        
        // Escape to clear input
        if (e.key === 'Escape') {
            const input = document.getElementById('message-input');
            if (input === document.activeElement) {
                input.value = '';
                input.dispatchEvent(new Event('input'));
            }
        }
    });

    // Add visual feedback for interactions
    const addRippleEffect = (element) => {
        element.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    };

    // Add ripple effect to buttons
    document.querySelectorAll('button, .suggestion-chip').forEach(addRippleEffect);
});

// Add CSS for ripple effect
const rippleCSS = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);