'use client';

import { FC, useState, useCallback } from 'react';
import { Inter } from 'next/font/google';
import ChannelHeader from './ChannelHeader';
import MessagesList from './MessagesList';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import JoinDiscordModal from './JoinDiscordModal';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-discord'
});

const DiscordChat: FC = () => {
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [typingUsers, setTypingUsers] = useState<{ name: string; avatar: string }[]>([]);
  const [animationFinished, setAnimationFinished] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [userHasTyped, setUserHasTyped] = useState<boolean>(false);
  
  // Flag para controlar animaciones - false para mostrar todo inmediatamente
  const ENABLE_ANIMATIONS = false;

  const handleTypingChange = useCallback((typing: boolean) => {
    setIsTyping(typing);
  }, []);

  const handleTypingUsersChange = useCallback((users: { name: string; avatar: string }[]) => {
    setTypingUsers(users);
  }, []);

  const handleAnimationFinished = useCallback((finished: boolean) => {
    setAnimationFinished(finished);
  }, []);

  const handleUserTyped = useCallback(() => {
    setUserHasTyped(true);
  }, []);

  const handleMessageSent = useCallback((message: string) => {
    // Mostrar modal inmediatamente cuando envía mensaje
    setShowModal(true);
  }, []);

  return (
    <div className={`relative flex h-[800px] w-full max-w-[800px] flex-col rounded-2xl mx-auto overflow-hidden ${inter.variable}`} style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Whitney", "Helvetica Neue", Helvetica, Arial, sans-serif' }}>
      <ChannelHeader onOpenModal={() => setShowModal(true)} />
      <div className="relative box-border flex w-full flex-col bg-[#36393f]" style={{ height: 'calc(800px - 64px)' }}>
        <div className="messages-container overflow-y-auto" style={{ height: 'calc(100% - 72px)' }}>
          <MessagesList 
            onTypingChange={handleTypingChange} 
            onTypingUsersChange={handleTypingUsersChange}
            onAnimationFinished={handleAnimationFinished}
            userHasTyped={userHasTyped}
            enableAnimations={ENABLE_ANIMATIONS}
            onOpenModal={() => setShowModal(true)}
          />
        </div>
        
        {/* Typing indicator justo arriba del input */}
        {isTyping && (
          <div className="px-4 py-1 bg-[#36393f] border-t border-[#40444b]/20">
            <TypingIndicator users={typingUsers} />
          </div>
        )}
        
        <ChatInput shouldShowTyping={ENABLE_ANIMATIONS ? animationFinished : false} onMessageSent={handleMessageSent} onUserTyped={handleUserTyped} />
      </div>
      
      {/* Modal CTA contenido dentro del Discord */}
      <JoinDiscordModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default DiscordChat;
