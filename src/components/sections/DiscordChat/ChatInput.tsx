import { FC, useState, useEffect } from 'react';
import { AlternateEmail } from 'styled-icons/material';

interface ChatInputProps {
  shouldShowTyping: boolean;
  onMessageSent: (message: string) => void;
  onUserTyped: () => void;
}

const ChatInput: FC<ChatInputProps> = ({ shouldShowTyping, onMessageSent, onUserTyped }) => {
  const [inputValue, setInputValue] = useState('también quiero participar! 👀');
  const [hasUserTyped, setHasUserTyped] = useState(false);
  const [isAutoTyping, setIsAutoTyping] = useState(false);

  const message = "también quiero participar! 👀";

  useEffect(() => {
    if (shouldShowTyping && !hasUserTyped && !isAutoTyping) {
      setIsAutoTyping(true);
      
      const typeMessage = async () => {
        // Esperar un poco antes de empezar a escribir
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Verificar si el usuario no ha empezado a escribir durante la espera
        if (!hasUserTyped) {
          for (let i = 0; i <= message.length; i++) {
            // Verificar nuevamente en cada iteración
            if (hasUserTyped) break;
            
            await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 100));
            setInputValue(message.substring(0, i));
          }
        }
        
        setIsAutoTyping(false);
      };

      typeMessage();
    }
  }, [shouldShowTyping, hasUserTyped, isAutoTyping]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (!hasUserTyped) {
      setHasUserTyped(true);
      onUserTyped(); // Notificar al componente padre
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (!hasUserTyped) {
      setHasUserTyped(true);
      onUserTyped(); // Notificar al componente padre
    }
    
    if (e.key === 'Enter' && inputValue.trim() && !isAutoTyping) {
      onMessageSent(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className="flex items-center w-full h-[72px] p-1 px-4 box-border bg-[#36393f] relative">
      <div className="flex items-center w-full px-4 bg-[#40444b] rounded-lg box-border">
        <input
          type="text"
          placeholder="Message #daily"
          className="flex-1 h-11 text-white bg-transparent border-none outline-none text-sm relative"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          disabled={isAutoTyping}
        />
        <AlternateEmail className="w-6 h-6 text-[#72767d]" />
      </div>
    </div>
  );
};

export default ChatInput;