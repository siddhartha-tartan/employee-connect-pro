import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface AIChatSidebarProps {
  userName: string;
}

export const AIChatSidebar: React.FC<AIChatSidebarProps> = ({ userName }) => {
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'ai'; text: string }>>([]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessages = [...messages, { type: 'user' as const, text: inputValue }];
    setMessages(newMessages);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I can help you with that! Based on your profile, here are your options...",
        "Great question! Let me analyze your financial situation and recommend the best path forward.",
        "I've found 3 personalized options for you. Would you like to explore them?",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages([...newMessages, { type: 'ai' as const, text: randomResponse }]);
    }, 800);
  };

  const suggestions = [
    "💰 How to save tax?",
    "🏠 Home loan eligibility",
    "📈 Best investment options",
    "🚗 Car loan calculator",
  ];

  return (
    <div className="sticky top-24 space-y-4">
      {/* AI Assistant Header */}
      <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 border-blue-100 shadow-sm rounded-lg">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-[hsl(var(--primary))] to-blue-700 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-sm">AI Assistant</h3>
            <p className="text-xs text-muted-foreground">Always here to help</p>
          </div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </Card>

      {/* Chat Messages */}
      <Card className="p-4 h-[400px] flex flex-col border border-gray-200 dark:border-gray-700 shadow-sm rounded-lg">
        <div className="flex-1 overflow-y-auto space-y-3 mb-4">
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">💬</div>
              <p className="text-sm text-muted-foreground">
                Hi {userName.split(' ')[0]}! Ask me anything about your finances.
              </p>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm shadow-sm ${
                    msg.type === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-muted border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Quick Suggestions */}
        {messages.length === 0 && (
          <div className="mb-3 space-y-2">
            <p className="text-xs text-muted-foreground">Quick actions:</p>
            <div className="grid grid-cols-2 gap-2">
              {suggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInputValue(suggestion.slice(2));
                  }}
                  className="text-xs bg-muted hover:bg-muted/80 rounded-lg p-2 text-left transition-colors border border-gray-200 dark:border-gray-700"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="flex items-center space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your question..."
            className="flex-1 text-sm"
          />
          <Button 
            onClick={handleSend} 
            size="sm"
            disabled={!inputValue.trim()}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </Button>
        </div>
      </Card>
    </div>
  );
};
