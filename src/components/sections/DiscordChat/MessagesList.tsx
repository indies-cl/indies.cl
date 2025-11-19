import { FC, useRef, useEffect, useState } from 'react';
import ChannelMessage from './ChannelMessage';
import { mockMessages, users } from './constants';

interface MessagesListProps {
  onTypingChange: (isTyping: boolean) => void;
  onTypingUsersChange: (users: { name: string; avatar: string }[]) => void;
  onAnimationFinished: (finished: boolean) => void;
  userHasTyped: boolean;
  enableAnimations: boolean;
  onOpenModal?: () => void;
}

const MessagesList: FC<MessagesListProps> = ({ onTypingChange, onTypingUsersChange, onAnimationFinished, userHasTyped, enableAnimations, onOpenModal }) => {
  const messagesRef = useRef<HTMLDivElement>(null);
  const [visibleMessages, setVisibleMessages] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [typingUsers, setTypingUsers] = useState<{ name: string; avatar: string }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInViewport, setIsInViewport] = useState<boolean>(false);

  useEffect(() => {
    const div = messagesRef.current;
    if (div) {
      div.scrollTop = div.scrollHeight;
    }
  }, [visibleMessages, isTyping]);

  // Intersection Observer para detectar viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInViewport) {
          setIsInViewport(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isInViewport]);

  useEffect(() => {
    if (!isInViewport) return;
    
    if (!enableAnimations) {
      // Sin animaciones de escritura pero con efecto staggered
      setVisibleMessages(0);
      setIsTyping(false);
      setTypingUsers([]);
      onTypingChange(false);
      onTypingUsersChange([]);
      
      const showMessagesStaggered = async () => {
        for (let i = 0; i < mockMessages.length; i++) {
          setVisibleMessages(i + 1);
          // Delay muy corto para efecto fluido
          if (i < mockMessages.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 150));
          }
        }
        onAnimationFinished(true);
      };
      
      showMessagesStaggered();
      return;
    }
    
    // Reset and start animation
    setVisibleMessages(0);
    setIsTyping(false);
    
    const showMessages = async () => {
      // Primer mensaje sale inmediatamente
      if (mockMessages.length > 0) {
        setVisibleMessages(1);
      }
      
      for (let i = 1; i < mockMessages.length; i++) {
        // Mostrar indicador de "está escribiendo" desde el inicio del timer
        const nextMessage = mockMessages[i];
        const userId = ('userId' in nextMessage) ? nextMessage.userId : null;
        const user = userId ? users[userId] : null;
        
        if (user) {
          const typingUsersList = [{ name: user.name, avatar: user.avatar }];
          setTypingUsers(typingUsersList);
          setIsTyping(true);
          onTypingUsersChange(typingUsersList);
          onTypingChange(true);
          
          // Si el usuario ya empezó a escribir, acelerar todo a 0.5s
          const baseDelay = userHasTyped ? 500 : (1000 + Math.random() * 1000); // 0.5s si escribió, 1-2s si no
          await new Promise(resolve => setTimeout(resolve, baseDelay));
          
          setIsTyping(false);
          setTypingUsers([]);
          onTypingChange(false);
          onTypingUsersChange([]);
        }
        
        // Mostrar el mensaje
        setVisibleMessages(prev => prev + 1);
        
        // Pausa antes del próximo mensaje (misma lógica acelerada)
        if (i < mockMessages.length - 1) {
          const messageDelay = userHasTyped ? 500 : (1000 + Math.random() * 1000);
          await new Promise(resolve => setTimeout(resolve, messageDelay));
        }
      }
      
      // Notificar que la animación terminó
      onAnimationFinished(true);
    };

    showMessages();
  }, [isInViewport, onAnimationFinished, onTypingChange, onTypingUsersChange, userHasTyped, enableAnimations]);


  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'discord-chat-styles';
    style.textContent = `
      .messages-container::-webkit-scrollbar {
        width: 8px;
      }
      .messages-container::-webkit-scrollbar-thumb {
        background-color: #40444b;
        border-radius: 4px;
      }
      .messages-container::-webkit-scrollbar-track {
        background-color: transparent;
      }
      .discord-icon:hover {
        color: #ffffff !important;
      }
      .message-item + .message-item {
        margin-top: 13px;
      }
      
      /* Discord typing dots animation */
      @keyframes typing-dots {
        0%, 60%, 100% {
          transform: translateY(0);
          opacity: 0.4;
        }
        30% {
          transform: translateY(-4px);
          opacity: 1;
        }
      }
      
      /* Message slide up and fade animation */
      @keyframes slideUpFade {
        0% {
          opacity: 0;
          transform: translateY(16px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .typing-dot {
        animation: typing-dots 1.5s infinite;
      }
      
      .typing-dot:nth-child(1) {
        animation-delay: 0s;
      }
      
      .typing-dot:nth-child(2) {
        animation-delay: 0.2s;
      }
      
      .typing-dot:nth-child(3) {
        animation-delay: 0.4s;
      }
    `;
    
    const existingStyle = document.getElementById('discord-chat-styles');
    if (!existingStyle) {
      document.head.appendChild(style);
    }
    
    return () => {
      const styleToRemove = document.getElementById('discord-chat-styles');
      if (styleToRemove && styleToRemove.parentNode) {
        styleToRemove.parentNode.removeChild(styleToRemove);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="py-5 flex flex-col gap-3"
    >
      <div ref={messagesRef}>
        {mockMessages.slice(0, visibleMessages).map((message, index) => {
          const userId = ('userId' in message) ? message.userId : null;
          const avatar = userId ? users[userId]?.avatar : '';
          
          return (
            <div 
              key={('id' in message) ? message.id : `statement-${index}`}
              className="message-item"
              style={{
                animation: `slideUpFade 0.3s ease-out ${index * 0.1}s both`
              }}
            >
              <ChannelMessage
                author={message.author}
                date={message.date}
                content={('content' in message) ? message.content : undefined}
                hasMention={('hasMention' in message) ? message.hasMention : false}
                isBot={('isBot' in message) ? message.isBot : false}
                isStatement={('isStatement' in message) ? message.isStatement : false}
                action={('action' in message) ? message.action : undefined}
                avatar={avatar}
                onOpenModal={onOpenModal}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MessagesList;