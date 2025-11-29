'use client';

import { FC, useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { Inter } from 'next/font/google';
import ChannelHeader from './ChannelHeader';
import MessagesList from './MessagesList';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import JoinDiscordModal from './JoinDiscordModal';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-discord',
});

const DiscordChat: FC = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState<
    { name: string; avatar: string }[]
  >([]);
  const [animationFinished, setAnimationFinished] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userHasTyped, setUserHasTyped] = useState(false);

  const [enableAnimations, setEnableAnimations] = useState(false);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const shouldAutoScrollRef = useRef(true);

  /* Mantener ref sincronizado con el estado */
  useEffect(() => {
    shouldAutoScrollRef.current = shouldAutoScroll;
  }, [shouldAutoScroll]);

  /* ----------------------------------------------------
   * 1. Activar animaciones solo al entrar en viewport
   * -------------------------------------------------- */
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (mediaQuery.matches) {
      setEnableAnimations(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEnableAnimations(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  /* ----------------------------------------------------
   * 2. Detectar si el usuario está cerca del fondo
   * -------------------------------------------------- */
  const handleScroll = useCallback(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const distanceToBottom = scrollHeight - scrollTop - clientHeight;
    const nearBottom = distanceToBottom < 120;

    setShouldAutoScroll(nearBottom);
  }, []);

  /* ----------------------------------------------------
   * 3. Auto-scroll cada vez que se agrega un mensaje
   *    (replay inicial + nuevos mensajes)
   * -------------------------------------------------- */
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const mutationObserver = new MutationObserver((mutations) => {
      const hasAddedNodes = mutations.some((m) => m.addedNodes.length > 0);
      if (!hasAddedNodes) return;
      if (!shouldAutoScrollRef.current) return;

      container.scrollTo({
        top: container.scrollHeight,
        behavior: animationFinished ? 'smooth' : 'auto',
      });
    });

    mutationObserver.observe(container, {
      childList: true,
      subtree: true,
    });

    // Scroll inicial
    if (shouldAutoScrollRef.current) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'auto',
      });
    }

    return () => mutationObserver.disconnect();
  }, [animationFinished]);

  /* ----------------------------------------------------
   * 4. Handlers de estado (typing, animaciones, input)
   * -------------------------------------------------- */
  const handleTypingChange = useCallback((typing: boolean) => {
    setIsTyping(typing);
  }, []);

  const handleTypingUsersChange = useCallback(
    (users: { name: string; avatar: string }[]) => {
      setTypingUsers(users);
    },
    [],
  );

  const handleAnimationFinished = useCallback((finished: boolean) => {
    setAnimationFinished(finished);
  }, []);

  const handleUserTyped = useCallback(() => {
    setUserHasTyped(true);
  }, []);

  const handleMessageSent = useCallback(() => {
    setShowModal(true);
    // No hacemos scroll aquí: el MutationObserver se encargará
  }, []);

  /* ----------------------------------------------------
   * 5. Derivados: estado del input & auto-typing
   * -------------------------------------------------- */
  const isInputDisabled = useMemo(
    () => !animationFinished && !userHasTyped,
    [animationFinished, userHasTyped],
  );

  const shouldShowTypingInInput = useMemo(
    () => enableAnimations && animationFinished,
    [enableAnimations, animationFinished],
  );

  /* ----------------------------------------------------
   * 6. Render
   * -------------------------------------------------- */
  return (
    <div
      ref={containerRef}
      className={`relative mx-auto flex h-[700px] w-full max-w-[800px] flex-col overflow-hidden rounded-2xl ${inter.variable}`}
      style={{
        fontFamily:
          'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Whitney", "Helvetica Neue", Helvetica, Arial, sans-serif',
      }}
    >
      <ChannelHeader onOpenModal={() => setShowModal(true)} />

      <div
        className="relative box-border flex w-full flex-col bg-[#36393f]"
        style={{ height: 'calc(700px - 64px)' }}
      >
        {/* CONTENEDOR SCROLLABLE ÚNICO */}
        <div
          ref={messagesContainerRef}
          onScroll={handleScroll}
          className="messages-container relative overflow-y-auto"
          style={{ height: 'calc(100% - 92px)' }}
        >
          <MessagesList
            onTypingChange={handleTypingChange}
            onTypingUsersChange={handleTypingUsersChange}
            onAnimationFinished={handleAnimationFinished}
            userHasTyped={userHasTyped}
            enableAnimations={enableAnimations}
            onOpenModal={() => setShowModal(true)}
          />
        </div>

        {/* Typing indicator arriba del input */}
        <div className="relative h-5 bg-[#36393f]">
          {isTyping && <TypingIndicator users={typingUsers} />}
        </div>

        <ChatInput
          disabled={isInputDisabled}
          shouldShowTyping={shouldShowTypingInInput}
          onMessageSent={handleMessageSent}
          onUserTyped={handleUserTyped}
        />
      </div>

      <JoinDiscordModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default DiscordChat;
