import { FC, useEffect, useRef, useState, useCallback } from 'react';
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

const MessagesList: FC<MessagesListProps> = ({
  onTypingChange,
  onTypingUsersChange,
  onAnimationFinished,
  userHasTyped,
  enableAnimations,
  onOpenModal,
}) => {
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [, setIsTyping] = useState(false);
  const [, setTypingUsers] = useState<{ name: string; avatar: string }[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const animationAbortRef = useRef(false);

  /* --------------------------------------------------------- */
  /* PREFERS REDUCED MOTION                                    */
  /* --------------------------------------------------------- */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  /* --------------------------------------------------------- */
  /* ANIMATION OR REPLAY LOGIC                                 */
  /* --------------------------------------------------------- */
  const runReplay = useCallback(async () => {
    animationAbortRef.current = false;

    const cancelCheck = () => animationAbortRef.current;
    const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

    // Si reduce motion: mostrar todo inmediatamente
    if (prefersReducedMotion) {
      setVisibleMessages(mockMessages.length);
      setIsTyping(false);
      setTypingUsers([]);
      onTypingChange(false);
      onTypingUsersChange([]);
      onAnimationFinished(true);
      return;
    }

    // Si no debe haber animación todavía: mostrar pero sin typing
    if (!enableAnimations) {
      setVisibleMessages(mockMessages.length);
      setIsTyping(false);
      setTypingUsers([]);
      onTypingChange(false);
      onTypingUsersChange([]);
      onAnimationFinished(true);
      return;
    }

    // Reset clean
    setVisibleMessages(0);
    setTypingUsers([]);
    setIsTyping(false);
    onTypingChange(false);
    onTypingUsersChange([]);
    onAnimationFinished(false);

    // Pequeño delay antes del primer mensaje
    await sleep(500);
    if (cancelCheck()) return;

    // Primer mensaje
    if (mockMessages.length > 0) {
      setVisibleMessages(1);
    }

    for (let i = 1; i < mockMessages.length; i++) {
      if (cancelCheck()) return;

      const msg = mockMessages[i];
      const userId = 'userId' in msg ? msg.userId : null;
      const user = userId ? users[userId] : null;

      if (user) {
        const list = [{ name: user.name, avatar: user.avatar }];
        setTypingUsers(list);
        setIsTyping(true);
        onTypingUsersChange(list);
        onTypingChange(true);

        // Calcular tiempo de escritura basándose en la longitud del mensaje
        const content = 'content' in msg ? msg.content : null;
        const messageLength = typeof content === 'string' ? content.length : 50;
        const baseTypingSpeed = 40; // ms por carácter
        let typingTime = messageLength * baseTypingSpeed;

        // Delays específicos para ciertos mensajes
        const messageId = 'id' in msg ? msg.id : null;
        if (userId === 'reno' && content === 'EVENT_CARD') {
          // Reno creando la call - demora más
          typingTime = 1700;
        } else if (userId === 'damian' && messageId === 2) {
          // Damián respondiendo - demora más para dar tiempo de leer
          typingTime = 1500;
        }

        const typingDelay = userHasTyped
          ? Math.max(300, typingTime * 0.3)
          : typingTime + Math.random() * 200;

        await sleep(typingDelay);

        if (cancelCheck()) return;

        setIsTyping(false);
        setTypingUsers([]);
        onTypingChange(false);
        onTypingUsersChange([]);
      }

      setVisibleMessages((prev) => prev + 1);

      // Delay después de mostrar el mensaje
      let msgDelay = userHasTyped ? 300 : 400 + Math.random() * 300;

      // Delays adicionales después de ciertos mensajes para dar tiempo de leer
      const messageId = 'id' in msg ? msg.id : null;
      const isStatement = 'isStatement' in msg ? msg.isStatement : false;

      // Reducir delay después del primer statement de Reno (para que el EVENT_CARD aparezca más rápido)
      if (isStatement && userId === 'reno') {
        msgDelay = userHasTyped ? 200 : 300;
      } else if (messageId === 1) {
        // Después del EVENT_CARD de Reno, dar más tiempo
        msgDelay = userHasTyped ? 900 : 1500;
      } else if (messageId === 2) {
        // Después del mensaje de Damián, dar más tiempo
        msgDelay = userHasTyped ? 800 : 1200;
      }

      await sleep(msgDelay);
    }

    if (!cancelCheck()) {
      onAnimationFinished(true);
    }
  }, [
    enableAnimations,
    prefersReducedMotion,
    userHasTyped,
    onTypingChange,
    onTypingUsersChange,
    onAnimationFinished,
  ]);

  // Lanzar la animación solo cuando enableAnimations cambia / monta
  useEffect(() => {
    animationAbortRef.current = true;
    runReplay();

    return () => {
      animationAbortRef.current = true;
    };
  }, [runReplay]);

  /* --------------------------------------------------------- */
  /*  INJECT STYLES ONCE                                      */
  /* --------------------------------------------------------- */
  useEffect(() => {
    if (document.getElementById('discord-chat-styles')) return;

    const style = document.createElement('style');
    style.id = 'discord-chat-styles';
    style.textContent = `
      .messages-container::-webkit-scrollbar { width: 8px; }
      .messages-container::-webkit-scrollbar-thumb {
        background-color: #40444b;
        border-radius: 4px;
      }
      .messages-container::-webkit-scrollbar-track { background: transparent; }

      .message-item + .message-item {
        margin-top: 13px;
      }

      @keyframes messageFadeIn {
        from { opacity: 0; transform: translateY(2px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .message-item--new {
        animation: messageFadeIn 0.16s ease-out;
      }

      @keyframes typing-dots {
        0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
        30% { transform: translateY(-3px); opacity: 1; }
      }

      @media (prefers-reduced-motion: reduce) {
        .message-item--new { animation: none !important; }
      }

      .typing-dot { animation: typing-dots 1.5s infinite; }
      .typing-dot:nth-child(1) { animation-delay: 0s; }
      .typing-dot:nth-child(2) { animation-delay: .2s; }
      .typing-dot:nth-child(3) { animation-delay: .4s; }
    `;

    document.head.appendChild(style);

    return () => {
      const el = document.getElementById('discord-chat-styles');
      if (el) el.remove();
    };
  }, []);

  /* --------------------------------------------------------- */
  /* RENDER                                                    */
  /* --------------------------------------------------------- */
  return (
    <div className="flex flex-col gap-3 px-2 py-5">
      {mockMessages.slice(0, visibleMessages).map((message, index) => {
        const userId = 'userId' in message ? message.userId : null;
        const avatar = userId ? users[userId]?.avatar : '';
        const isLast = index === visibleMessages - 1;

        return (
          <div
            key={'id' in message ? message.id : `statement-${index}`}
            className={`message-item ${
              !prefersReducedMotion && enableAnimations && isLast
                ? 'message-item--new'
                : ''
            }`}
          >
            <ChannelMessage
              author={message.author}
              date={message.date}
              content={'content' in message ? message.content : undefined}
              hasMention={'hasMention' in message ? message.hasMention : false}
              isBot={'isBot' in message ? message.isBot : false}
              isStatement={
                'isStatement' in message ? message.isStatement : false
              }
              action={'action' in message ? message.action : undefined}
              avatar={avatar}
              onOpenModal={onOpenModal}
            />
          </div>
        );
      })}
    </div>
  );
};

export default MessagesList;
