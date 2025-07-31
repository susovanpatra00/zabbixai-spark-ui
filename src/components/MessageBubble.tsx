import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, MessageSquare, Bot, User } from 'lucide-react';

interface MessageBubbleProps {
  message: string;
  isBot: boolean;
  timestamp: Date;
  onLike?: () => void;
  onDislike?: () => void;
  onFeedback?: () => void;
  isLiked?: boolean;
  isDisliked?: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isBot,
  timestamp,
  onLike,
  onDislike,
  onFeedback,
  isLiked,
  isDisliked
}) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <div 
      className={`flex gap-3 p-4 message-enter ${
        isBot ? 'justify-start' : 'justify-end'
      }`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {isBot && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
            <Bot size={16} className="text-primary-foreground" />
          </div>
        </div>
      )}

      <div className={`flex flex-col max-w-[80%] ${isBot ? 'items-start' : 'items-end'}`}>
        {/* Message bubble */}
        <div
          className={`p-4 rounded-2xl shadow-ambient ${
            isBot
              ? 'bg-card glass-card text-card-foreground rounded-tl-sm'
              : 'bg-gradient-primary text-primary-foreground rounded-tr-sm'
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message}
          </p>
        </div>

        {/* Timestamp */}
        <span className="text-xs text-muted-foreground mt-1 px-2">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>

        {/* Bot message actions */}
        {isBot && (
          <div className={`flex items-center gap-2 mt-2 transition-all duration-300 ${
            showActions ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
            <button
              onClick={onLike}
              className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
                isLiked 
                  ? 'bg-primary/20 text-primary shadow-primary-glow' 
                  : 'hover:bg-muted text-muted-foreground'
              }`}
            >
              <ThumbsUp size={14} />
            </button>
            
            <button
              onClick={onDislike}
              className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 ${
                isDisliked 
                  ? 'bg-destructive/20 text-destructive shadow-[0_0_10px_hsla(0,75%,60%,0.3)]' 
                  : 'hover:bg-muted text-muted-foreground'
              }`}
            >
              <ThumbsDown size={14} />
            </button>
            
            <button
              onClick={onFeedback}
              className="p-2 rounded-lg transition-all duration-200 hover:scale-110 hover:bg-muted text-muted-foreground"
            >
              <MessageSquare size={14} />
            </button>
          </div>
        )}
      </div>

      {!isBot && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
            <User size={16} className="text-secondary-foreground" />
          </div>
        </div>
      )}
    </div>
  );
};