"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  MessageCircle,
  Send,
  Bot,
  User,
  RefreshCw,
  Loader2,
} from "lucide-react";
import Image from "next/image";

export default function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const faqQuestions = [
    "What is hackX Jr. 8.0?",
    "Who can participate?",
    "What's the theme for this year?",
    "What are the prizes?",
    "How long is the competition?",
    "When will hackX Jr 8.0 take place?",
  ];

  const [chatMessages, setChatMessages] = useState<
    Array<{
      type: "user" | "bot";
      message: string;
      timestamp: Date | null;
      suggestions?: string[];
      isLoading?: boolean;
    }>
  >([]);

  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Initialize chat messages on client side only
  useEffect(() => {
    const initialBotMessage = {
      type: "bot" as const,
      message:
        "Hello! I'm mascot, the official hackX Jr. AI assistant. Feel free to ask me anything, or choose from one of the common questions below.",
      timestamp: new Date(),
      suggestions: faqQuestions,
    };
    setChatMessages([initialBotMessage]);
  }, []);

  // API call to chatbot
  const sendMessageToBot = async (message: string) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: message }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from chatbot");
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error("Error calling chatbot API:", error);
      return "Sorry, I'm having trouble connecting right now. Please try again later.";
    }
  };

  const handleQuestionClick = async (questionText: string) => {
    // Remove suggestions from all previous messages
    const updatedHistory = chatMessages.map((msg) => {
      const { suggestions, ...rest } = msg;
      return rest;
    });

    const newUserMessage = {
      type: "user" as const,
      message: questionText,
      timestamp: new Date(),
    };

    setChatMessages([...updatedHistory, newUserMessage]);

    // Add loading message
    const loadingMessage = {
      type: "bot" as const,
      message: "",
      timestamp: new Date(),
      isLoading: true,
    };

    setChatMessages((prev) => [...prev, loadingMessage]);

    // Get response from API
    const botResponse = await sendMessageToBot(questionText);

    // Prepare next suggestions (random 3 questions excluding current one)
    const availableQuestions = faqQuestions.filter((q) => q !== questionText);
    const shuffled = [...availableQuestions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const nextSuggestions = shuffled.slice(0, 3);

    // Replace loading message with actual response
    setChatMessages((prev) => {
      const newMessages = [...prev];
      newMessages[newMessages.length - 1] = {
        type: "bot" as const,
        message: botResponse,
        timestamp: new Date(),
        suggestions: nextSuggestions,
        isLoading: false,
      };
      return newMessages;
    });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const message = inputMessage.trim();
    setInputMessage("");
    setIsLoading(true);

    // Remove suggestions from all previous messages
    const updatedHistory = chatMessages.map((msg) => {
      const { suggestions, ...rest } = msg;
      return rest;
    });

    const newUserMessage = {
      type: "user" as const,
      message: message,
      timestamp: new Date(),
    };

    setChatMessages([...updatedHistory, newUserMessage]);

    // Add loading message
    const loadingMessage = {
      type: "bot" as const,
      message: "",
      timestamp: new Date(),
      isLoading: true,
    };

    setChatMessages((prev) => [...prev, loadingMessage]);

    // Get response from API
    const botResponse = await sendMessageToBot(message);

    // Prepare next suggestions (random 3 questions)
    const shuffled = [...faqQuestions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const nextSuggestions = shuffled.slice(0, 3);

    // Replace loading message with actual response
    setChatMessages((prev) => {
      const newMessages = [...prev];
      newMessages[newMessages.length - 1] = {
        type: "bot" as const,
        message: botResponse,
        timestamp: new Date(),
        suggestions: nextSuggestions,
        isLoading: false,
      };
      return newMessages;
    });

    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    const initialBotMessage = {
      type: "bot" as const,
      message:
        "Hello! I'm mascot, the official hackX Jr. AI assistant. Feel free to ask me anything, or choose from one of the common questions below.",
      timestamp: new Date(),
      suggestions: faqQuestions,
    };
    setChatMessages([initialBotMessage]);
    setInputMessage("");
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <section ref={ref} className="relative py-24 px-4 overflow-hidden ">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cosmic-blue/80 via-cosmic-navy/90 to-cosmic-deep" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div className="shine-effect inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-8">
            <MessageCircle className="w-4 h-4 inline  text-space-gradient-start" />
            <span className="text-space-gradient-start font-medium">
              AI Assistant
            </span>
          </motion.div>

          <h2 className="font-orbitron text-4xl md:text-6xl font-bold mb-6 bg-text-gradient bg-clip-text text-transparent py-1">
            Ask Mascot Anything
          </h2>

          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Chat with our AI assistant to get instant answers about hackX Jr. 8.0
          </p>
        </motion.div>

        {/* Unified Chat Interface */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-cosmic-navy/60 backdrop-blur-sm border border-space-gradient-start/20 rounded-2xl overflow-hidden shadow-2xl shadow-black/25">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-space-gradient-start/10 to-space-gradient-end/10 p-4 border-b border-space-gradient-start/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div className="w-10 h-10 bg-gradient-to-br from-space-gradient-start to-space-gradient-end rounded-full flex items-center justify-center">
                    <Image
                      src="/images/mascot-face.webp"
                      alt="hackX 10.0"
                      width={25}
                      height={25}
                    />
                  </motion.div>
                  <div>
                    <h4 className="font-orbitron font-semibold text-white">
                      Mascot
                    </h4>
                    <p className="text-space-gradient-start text-sm flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                      Online
                    </p>
                  </div>
                </div>

                <motion.button
                  onClick={clearChat}
                  className="px-3 py-1.5 text-xs bg-cosmic-blue/50 text-gray-300 rounded-full hover:bg-space-gradient-start/20 hover:text-white transition-all duration-300 flex items-center gap-1.5"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RefreshCw size={12} />
                  New Chat
                </motion.button>
              </div>
            </div>

            {/* Chat Messages */}
            <div
              ref={chatContainerRef}
              className="h-96 overflow-y-auto p-4 space-y-4 custom-scrollbar"
              onWheel={(e) => {
                // Prevent main page scroll when mouse is over chat
                e.stopPropagation();

                // Get the chat container
                const container = chatContainerRef.current;
                if (!container) return;

                // Check if we can scroll in the direction being attempted
                const { deltaY } = e;
                const { scrollTop, scrollHeight, clientHeight } = container;

                // If trying to scroll up and already at top, allow main page scroll
                if (deltaY < 0 && scrollTop === 0) {
                  return;
                }

                // If trying to scroll down and already at bottom, allow main page scroll
                if (deltaY > 0 && scrollTop + clientHeight >= scrollHeight) {
                  return;
                }

                // Otherwise, prevent main page scroll
                e.preventDefault();
              }}
            >
              <AnimatePresence>
                {chatMessages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    layout
                    className={`flex gap-3 ${
                      message.type === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.type === "bot"
                          ? "bg-gradient-to-br from-space-gradient-start to-space-gradient-end"
                          : "bg-cosmic-blue"
                      }`}
                    >
                      {message.type === "bot" ? (
                        <Image
                          src="/images/mascot-face.webp"
                          alt="hackX 10.0"
                          width={18}
                          height={18}
                        />
                      ) : (
                        <User className="w-4 h-4 text-white" />
                      )}
                    </div>

                    <div
                      className={`max-w-md px-4 py-3 rounded-2xl ${
                        message.type === "bot"
                          ? "bg-cosmic-blue/50 text-gray-200 rounded-bl-sm"
                          : "bg-space-gradient-start/20 text-white rounded-br-sm"
                      }`}
                    >
                      {message.isLoading ? (
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin text-space-gradient-start" />
                          <span className="text-sm text-gray-300">
                            Mascot is thinking...
                          </span>
                        </div>
                      ) : (
                        <>
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">
                            {message.message}
                          </p>
                          {message.suggestions && (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {message.suggestions.map(
                                (question, questionIndex) => (
                                  <motion.button
                                    key={questionIndex}
                                    onClick={() =>
                                      handleQuestionClick(question)
                                    }
                                    className="px-3 py-1.5 bg-cosmic-blue/40 text-space-gradient-start text-xs font-medium rounded-full border border-space-gradient-start/30 hover:bg-space-gradient-start/20 transition-all"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    {question}
                                  </motion.button>
                                )
                              )}
                            </div>
                          )}
                          <p className="text-xs opacity-60 mt-2 text-right">
                            {message.timestamp?.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            }) || ""}
                          </p>
                        </>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-space-gradient-start/20 bg-cosmic-navy/50">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about hackX Jr. 8.0..."
                  disabled={isLoading}
                  className="flex-1 bg-cosmic-blue/30 border border-space-gradient-start/20 rounded-full px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-space-gradient-start/40 transition-all duration-300 disabled:opacity-50"
                />
                <motion.button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="w-10 h-10 bg-gradient-to-br from-space-gradient-start to-space-gradient-end rounded-full flex items-center justify-center transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                  whileHover={{
                    scale: !inputMessage.trim() || isLoading ? 1 : 1.05,
                  }}
                  whileTap={{
                    scale: !inputMessage.trim() || isLoading ? 1 : 0.95,
                  }}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 text-cosmic-deep animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 text-cosmic-deep" />
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(31, 58, 77, 0.3);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(214, 221, 230, 0.3);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(214, 221, 230, 0.5);
        }
      `}</style>
    </section>
  );
}
