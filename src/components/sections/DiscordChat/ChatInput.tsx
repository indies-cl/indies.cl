import { FC, useState, useEffect, useRef } from 'react';
import { AtSign } from 'lucide-react';

interface ChatInputProps {
  shouldShowTyping: boolean;            // cuándo debería empezar el auto-typing
  onMessageSent: (message: string) => void;
  onUserTyped: () => void;
  disabled?: boolean;                   // control total desde el padre
}

const demoMessage = 'también quiero participar!';

// Secuencias: 50% normal, 50% con error
const sequences = [
  // Secuencia normal
  { text: demoMessage, hasError: false },
  // Secuencia con error (typo: escribe "partcipar" en vez de "participar")
  {
    text: demoMessage,
    hasError: true,
    errorText: 'también quiero partcipar!',
    errorAt: 15, // índice donde empieza a corregir (después de "también quiero ")
  }
] as const;

const ChatInput: FC<ChatInputProps> = ({
  shouldShowTyping,
  onMessageSent,
  onUserTyped,
  disabled = false,
}) => {
  const [inputValue, setInputValue] = useState(''); // 👈 ahora parte vacío
  const [hasUserTyped, setHasUserTyped] = useState(false);
  const [isAutoTyping, setIsAutoTyping] = useState(false);

  const autoTypingAbortRef = useRef(false);
  const hasUserTypedRef = useRef(false);

  useEffect(() => {
    hasUserTypedRef.current = hasUserTyped;
  }, [hasUserTyped]);

  // Auto-typing del mensaje demo cuando:
  // - shouldShowTyping = true
  // - el usuario aún no ha escrito
  // - el input no está deshabilitado
  useEffect(() => {
    if (!shouldShowTyping || hasUserTypedRef.current || disabled) {
      autoTypingAbortRef.current = true;
      setIsAutoTyping(false);
      return;
    }

    autoTypingAbortRef.current = false;
    setIsAutoTyping(true);

    const run = async () => {
      // Pequeña pausa antes de empezar a escribir
      await new Promise(res => setTimeout(res, 600));
      if (autoTypingAbortRef.current || hasUserTypedRef.current || disabled) {
        setIsAutoTyping(false);
        return;
      }

      // Elegir secuencia aleatoria (50% cada una)
      const sequence = sequences[Math.floor(Math.random() * sequences.length)];

      if (sequence.hasError && 'errorText' in sequence && 'errorAt' in sequence) {
        // Escribir el texto con error
        for (let i = 0; i <= sequence.errorText.length; i++) {
          if (autoTypingAbortRef.current || hasUserTypedRef.current || disabled) {
            setIsAutoTyping(false);
            return;
          }
          setInputValue(sequence.errorText.substring(0, i));
          await new Promise(res => setTimeout(res, 30 + Math.random() * 50));
        }

        // Pausa para "darse cuenta" del error
        await new Promise(res => setTimeout(res, 400 + Math.random() * 300));
        if (autoTypingAbortRef.current || hasUserTypedRef.current || disabled) {
          setIsAutoTyping(false);
          return;
        }

        // Borrar hasta el punto del error (simular backspace)
        for (let i = sequence.errorText.length; i >= sequence.errorAt; i--) {
          if (autoTypingAbortRef.current || hasUserTypedRef.current || disabled) {
            setIsAutoTyping(false);
            return;
          }
          setInputValue(sequence.errorText.substring(0, i));
          await new Promise(res => setTimeout(res, 20 + Math.random() * 30));
        }

        // Pequeña pausa antes de corregir
        await new Promise(res => setTimeout(res, 100 + Math.random() * 150));
        if (autoTypingAbortRef.current || hasUserTypedRef.current || disabled) {
          setIsAutoTyping(false);
          return;
        }

        // Escribir la corrección
        for (let i = sequence.errorAt; i <= sequence.text.length; i++) {
          if (autoTypingAbortRef.current || hasUserTypedRef.current || disabled) {
            setIsAutoTyping(false);
            return;
          }
          setInputValue(sequence.text.substring(0, i));
          await new Promise(res => setTimeout(res, 30 + Math.random() * 50));
        }
      } else {
        // Secuencia normal sin errores
        for (let i = 0; i <= sequence.text.length; i++) {
          if (autoTypingAbortRef.current || hasUserTypedRef.current || disabled) {
            setIsAutoTyping(false);
            return;
          }
          setInputValue(sequence.text.substring(0, i));
          await new Promise(res => setTimeout(res, 30 + Math.random() * 50));
        }
      }

      setIsAutoTyping(false);
    };

    run();

    return () => {
      autoTypingAbortRef.current = true;
    };
  }, [shouldShowTyping, disabled]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const value = e.target.value;
    setInputValue(value);

    if (!hasUserTypedRef.current && value.trim().length > 0) {
      setHasUserTyped(true);
      hasUserTypedRef.current = true;
      autoTypingAbortRef.current = true;
      setIsAutoTyping(false);
      onUserTyped();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (!hasUserTypedRef.current) {
      setHasUserTyped(true);
      hasUserTypedRef.current = true;
      autoTypingAbortRef.current = true;
      setIsAutoTyping(false);
      onUserTyped();
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmed = inputValue.trim();
      if (!trimmed || isAutoTyping) return;

      onMessageSent(trimmed);
      setInputValue(''); // 👈 input vacío después de enviar
    }
  };

  return (
    <div className="flex items-center w-full h-[72px] p-1 px-4 box-border bg-[#36393f] relative">
      <div className="flex items-center w-full px-4 bg-[#40444b] rounded-lg box-border">
        <input
          type="text"
          placeholder={disabled ? 'Cargando conversación…' : 'Message #daily'}
          className="flex-1 h-11 text-white bg-transparent border-none outline-none text-sm relative disabled:cursor-not-allowed disabled:opacity-60"
          value={disabled ? '' : inputValue}   // 👈 vacío si está deshabilitado
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />
        <AtSign className="w-6 h-6 text-[#72767d]" />
      </div>
    </div>
  );
};

export default ChatInput;
