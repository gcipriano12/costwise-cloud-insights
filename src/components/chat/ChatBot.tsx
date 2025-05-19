import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export function ChatBot() {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Esta função rola a área de mensagens para a mensagem mais recente
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Efeito para rolagem automática quando as mensagens são atualizadas ou o carregamento muda
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      text: message,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('https://vreco.app.n8n.cloud/webhook-test/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newMessage.text }),
      });

      if (!response.ok) {
        throw new Error('Falha ao enviar mensagem');
      }

      const data = await response.json();
      
      setMessages(prev => [...prev, {
        text: data.response || 'Desculpe, não consegui processar sua mensagem.',
        isUser: false,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setMessages(prev => [...prev, {
        text: 'Desculpe, ocorreu um erro ao processar sua mensagem.',
        isUser: false,
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Botão flutuante do chat */}
      <Button
        className="fixed bottom-4 right-4 rounded-full w-12 h-12 p-0 bg-cloudcostx-blue hover:bg-cloudcostx-blue/90"
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Modal do chat */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 z-50">
          <Card className={cn(
            "w-full shadow-lg",
            isDark ? "bg-slate-800 border-slate-700" : "bg-white"
          )}>
            {/* Header do chat */}
            <div className={cn(
              "flex items-center justify-between p-4 border-b",
              isDark ? "border-slate-700" : "border-gray-200"
            )}>
              <div className="flex items-center">
                <Bot className={cn(
                  "h-5 w-5 mr-2",
                  isDark ? "text-blue-400" : "text-cloudcostx-blue"
                )} />
                <h3 className={cn(
                  "font-semibold",
                  isDark ? "text-white" : "text-gray-900"
                )}>FinBot Assistant</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className={isDark ? "text-gray-300 hover:text-white" : ""}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Área de mensagens */}
            <div className={cn(
              "h-96 overflow-y-auto p-4 space-y-4",
              isDark ? "bg-slate-900" : "bg-gray-50"
            )}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-2 ${
                      msg.isUser
                        ? 'bg-cloudcostx-blue text-white'
                        : isDark 
                          ? 'bg-slate-800 text-gray-100' 
                          : 'bg-white text-gray-900 border border-gray-200'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <span className={cn(
                      "text-xs opacity-70",
                      isDark && !msg.isUser ? "text-gray-400" : ""
                    )}>
                      {msg.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className={cn(
                    "rounded-lg p-2",
                    isDark 
                      ? "bg-slate-800 border border-slate-700"
                      : "bg-white border border-gray-200"
                  )}>
                    <p className={cn(
                      "text-sm",
                      isDark ? "text-gray-300" : "text-gray-700"
                    )}>
                      Pensando...
                    </p>
                  </div>
                </div>
              )}
              {/* Elemento de referência para rolagem automática */}
              <div ref={messagesEndRef} />
            </div>

            {/* Input de mensagem */}
            <div className={cn(
              "p-4 border-t",
              isDark ? "border-slate-700 bg-slate-800" : "border-gray-200"
            )}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage();
                }}
                className="flex gap-2"
              >
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className={cn(
                    "flex-1",
                    isDark 
                      ? "bg-slate-700 border-slate-600 text-white placeholder:text-gray-400" 
                      : ""
                  )}
                />
                <Button
                  type="submit"
                  disabled={isLoading || !message.trim()}
                  className="bg-cloudcostx-blue hover:bg-cloudcostx-blue/90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </Card>
        </div>
      )}
    </>
  );
} 