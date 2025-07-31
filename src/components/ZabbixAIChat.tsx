import React, { useState, useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { FeedbackModal } from './FeedbackModal';
import { Sidebar } from './Sidebar';
import { FileUploadArea } from './FileUploadArea';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  isLiked?: boolean;
  isDisliked?: boolean;
}

interface UploadedFile {
  name: string;
  size: number;
  type: string;
}
export const ZabbixAIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m ZabbixAI Bot, your intelligent monitoring assistant. I can help you with Zabbix configuration, troubleshooting, monitoring best practices, and much more. What would you like to know?',
      isBot: true,
      timestamp: new Date(),
    }
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (messageText: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || 'Sorry, I received an empty response.',
        isBot: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error fetching response:', error);
      
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I\'m having trouble connecting to the server. Please make sure the API is running on localhost:8000.',
        isBot: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorResponse]);
      
      toast({
        title: "Connection Error",
        description: "Failed to connect to the chat API",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, isLiked: !msg.isLiked, isDisliked: false }
        : msg
    ));
    
    toast({
      title: "Feedback recorded",
      description: "Thank you for your positive feedback!",
    });
  };

  const handleDislike = (messageId: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, isDisliked: !msg.isDisliked, isLiked: false }
        : msg
    ));
    
    toast({
      title: "Feedback recorded",
      description: "I'll work on improving my responses.",
      variant: "destructive",
    });
  };

  const handleFeedback = (messageId: string) => {
    setSelectedMessageId(messageId);
    setFeedbackModalOpen(true);
  };

  const handleFeedbackSubmit = (rating: number, comment: string) => {
    toast({
      title: "Feedback submitted",
      description: `Thank you for your ${rating}-star rating and feedback!`,
    });
  };

  return (
    <div className="flex h-screen bg-gradient-ambient">
      {/* Sidebar */}
      <Sidebar onFileUpload={handleFileUpload} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="glass-card px-6 py-4 m-4 mb-0">
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-primary-glow">
              <span className="text-primary-foreground font-bold text-lg">Z</span>
            </div>
            <div className="text-center">
              <h1 className="text-xl font-bold text-gradient-primary">ZabbixAI Bot</h1>
              <p className="text-sm text-muted-foreground">Your intelligent monitoring assistant</p>
            </div>
          </div>
        </div>
              </div>
              <div className="bg-card glass-card p-4 rounded-2xl rounded-tl-sm">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="p-4 pt-0">
        <div className="max-w-4xl mx-auto">
          <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
        </div>
      </div>

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={feedbackModalOpen}
        onClose={() => setFeedbackModalOpen(false)}
        onSubmit={handleFeedbackSubmit}
      />
    </div>
  );
};