import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface ChatMessage {
  id: string;
  type: "user" | "bot";
  message: string;
  timestamp: Date;
}

interface ChatbotPopupProps {
  isOpen?: boolean;
  onToggle?: (open: boolean) => void;
  onSendMessage?: (message: string) => Promise<string>;
  title?: string;
  placeholder?: string;
  botName?: string;
  color?: string;
  position?: "bottom-right" | "bottom-left";
}

export default function ChatbotPopup({
  isOpen: controlledOpen,
  onToggle,
  onSendMessage,
  title = "Chat with us",
  placeholder = "Type your message...",
  botName = "IIRA Assistant",
  color = "#E8651A",
  position = "bottom-right",
}: ChatbotPopupProps) {
  const [isOpen, setIsOpen] = useState(controlledOpen ?? false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Handle controlled/uncontrolled component
  useEffect(() => {
    if (controlledOpen !== undefined) {
      setIsOpen(controlledOpen);
    }
  }, [controlledOpen]);

  const handleToggle = (newState: boolean) => {
    setIsOpen(newState);
    onToggle?.(newState);
  };

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          type: "bot",
          message: `Hi! 👋 I'm ${botName}. How can I help you today?`,
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, botName]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      type: "user",
      message: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Call the provided handler or show default response
      let botResponse = "Thanks for your message! We'll get back to you soon.";

      if (onSendMessage) {
        botResponse = await onSendMessage(inputValue);
      }

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        type: "bot",
        message: botResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: ChatMessage = {
        id: `bot-error-${Date.now()}`,
        type: "bot",
        message: "Sorry, something went wrong. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const positionClass =
    position === "bottom-left" ? "bottom-6 left-6" : "bottom-6 right-6";

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => handleToggle(true)}
          className={`fixed ${positionClass} z-50 flex items-center justify-center w-14 h-14 rounded-full text-white shadow-xl hover:shadow-2xl active:scale-95 transition-all duration-200 hover:scale-110 group`}
          style={{
            backgroundColor: color,
            boxShadow: `0 10px 30px ${color}60, 0 0 60px ${color}20`,
          }}
          aria-label="Open chat"
        >
          <MessageCircle size={26} className="group-hover:rotate-12 transition-transform" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed ${positionClass} z-50 w-96 max-w-[calc(100vw-24px)] h-[500px] max-h-[calc(100vh-100px)] rounded-2xl shadow-2xl bg-white flex flex-col overflow-hidden border-2`}
          style={{ borderColor: color + "30" }}
        >
          {/* Header */}
          <div
            className="px-4 py-3 text-white flex items-center justify-between shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
            }}
          >
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-white/20">
                <MessageCircle size={20} />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-none">{title}</h3>
                <p className="text-xs opacity-80">{botName}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleToggle(false)}
              className="text-white hover:bg-white/20 h-8 w-8 transition-colors"
            >
              <X size={18} />
            </Button>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4 bg-gradient-to-b from-orange-50 to-orange-100/30">
            <div className="space-y-3 pr-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.type === "user" ? "justify-end" : "justify-start"
                  } animate-in fade-in slide-in-from-bottom-2 duration-300`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg text-sm font-medium ${
                      msg.type === "user"
                        ? "rounded-br-none text-white shadow-lg shadow-orange-400/40"
                        : "rounded-bl-none text-slate-900 shadow-lg shadow-orange-300/30"
                    }`}
                    style={
                      msg.type === "user"
                        ? {
                            background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
                          }
                        : {
                            background: `linear-gradient(135deg, ${color}20 0%, ${color}15 100%)`,
                            borderLeft: `3px solid ${color}`,
                          }
                    }
                  >
                    <p className="break-words whitespace-pre-wrap leading-relaxed">
                      {msg.message}
                    </p>
                    <p
                      className={`text-xs mt-1 font-normal ${
                        msg.type === "user"
                          ? "text-white/70"
                          : "text-slate-600"
                      }`}
                    >
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div
                    className="px-4 py-2 rounded-lg rounded-bl-none shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${color}20 0%, ${color}15 100%)`,
                      borderLeft: `3px solid ${color}`,
                    }}
                  >
                    <div className="flex gap-2">
                      <div
                        className="w-2.5 h-2.5 rounded-full animate-bounce"
                        style={{ backgroundColor: color }}
                      />
                      <div
                        className="w-2.5 h-2.5 rounded-full animate-bounce"
                        style={{
                          backgroundColor: color,
                          animationDelay: "0.1s",
                        }}
                      />
                      <div
                        className="w-2.5 h-2.5 rounded-full animate-bounce"
                        style={{
                          backgroundColor: color,
                          animationDelay: "0.2s",
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t-2 p-3 bg-gradient-to-r from-orange-50 to-orange-100 flex gap-2" style={{ borderColor: color + "30" }}>
            <Input
              type="text"
              placeholder={placeholder}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              className="flex-1 border-2 text-sm font-medium focus:outline-none"
              style={{
                borderColor: color + "40",
                backgroundColor: "#fffbf7",
              }}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              size="icon"
              className="text-white font-bold shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50"
              style={{ backgroundColor: color }}
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
