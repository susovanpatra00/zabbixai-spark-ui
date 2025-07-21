import React, { useState, useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { FeedbackModal } from './FeedbackModal';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  isLiked?: boolean;
  isDisliked?: boolean;
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateBotResponse = (userMessage: string): string => {
    // Simple response simulation - in real app, this would call your AI API
    const responses = [
      `I understand you're asking about "${userMessage}". Let me help you with that. In Zabbix, this typically involves configuring your monitoring templates and ensuring proper agent communication. Would you like me to walk you through the specific steps?`,
      `Great question about "${userMessage}"! For Zabbix monitoring, I recommend starting with the built-in templates and then customizing based on your specific infrastructure needs. What type of environment are you monitoring?`,
      `Regarding "${userMessage}" - this is a common scenario in Zabbix environments. The best approach usually involves setting up proper triggers and notifications. Let me know if you need help with the configuration specifics.`,
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

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

    // Simulate API delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: simulateBotResponse(messageText),
        isBot: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1000 + Math.random() * 2000);
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
    <div className="flex flex-col h-screen bg-gradient-ambient">
      {/* Header */}
      <div className="glass-card px-6 py-4 m-4 mb-0">
        <div className="flex items-center justify-center gap-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
            <span className="text-primary-foreground font-bold text-lg">Z</span>
          </div>
          <div className="text-center">
            <h1 className="text-xl font-bold text-gradient-primary">ZabbixAI Bot</h1>
            <p className="text-sm text-muted-foreground">Your intelligent monitoring assistant</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2 mx-4 border border-white/20 rounded-2xl">
        <div className="max-w-4xl mx-auto">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message.text}
              isBot={message.isBot}
              timestamp={message.timestamp}
              onLike={() => handleLike(message.id)}
              onDislike={() => handleDislike(message.id)}
              onFeedback={() => handleFeedback(message.id)}
              isLiked={message.isLiked}
              isDisliked={message.isDisliked}
            />
          ))}
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="flex gap-3 p-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
                <span className="text-primary-foreground font-bold text-sm">Z</span>
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