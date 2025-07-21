import React, { useState, useRef } from 'react';
import { Send, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // TODO: Implement actual voice recording functionality
  };

  return (
    <div className="glass-card p-4">
      <form onSubmit={handleSubmit} className="flex items-end gap-3">
        {/* Voice recording button */}
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={toggleRecording}
          className={`flex-shrink-0 transition-all duration-300 ${
            isRecording 
              ? 'bg-destructive/20 border-destructive text-destructive pulse-record' 
              : 'hover:bg-muted'
          }`}
        >
          {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
        </Button>

        {/* Text input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              adjustTextareaHeight();
            }}
            onKeyPress={handleKeyPress}
            placeholder="Ask ZabbixAI anything..."
            disabled={disabled}
            className="w-full p-3 pr-12 bg-input border border-border rounded-xl text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring transition-all min-h-[48px] max-h-[120px]"
            rows={1}
          />
          
          {/* Send button */}
          <Button
            type="submit"
            size="icon"
            disabled={!message.trim() || disabled}
            className="absolute right-2 bottom-2 btn-ai h-8 w-8"
          >
            <Send size={16} />
          </Button>
        </div>
      </form>

      {isRecording && (
        <div className="mt-3 flex items-center justify-center gap-2 text-destructive">
          <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
          <span className="text-sm font-medium">Recording... Click mic to stop</span>
        </div>
      )}
    </div>
  );
};