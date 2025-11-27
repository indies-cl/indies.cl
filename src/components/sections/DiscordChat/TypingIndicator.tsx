import { FC } from 'react';
import Image from 'next/image';

interface TypingIndicatorProps {
  users: { name: string; avatar: string }[];
}

const TypingIndicator: FC<TypingIndicatorProps> = ({ users }) => {
  if (users.length === 0) return null;

  const formatTypingText = () => {
    if (users.length === 1) {
      return `${users[0].name} está escribiendo`;
    } else if (users.length === 2) {
      return `${users[0].name} y ${users[1].name} están escribiendo`;
    } else {
      return `${users.slice(0, -1).map(u => u.name).join(', ')} y ${users[users.length - 1].name} están escribiendo`;
    }
  };

  return (
    <div className="absolute left-8 -bottom-1 flex items-center">
      {/* Typing text and dots */}
      <div className="flex items-center">
        <span className="text-xs text-[#b9bbbe]">
          {formatTypingText()}
        </span>

        {/* Animated dots */}
        <div className="flex items-center ml-1 space-x-0.5 translate-y-0.5">
          <div className="w-0.5 h-0.5 bg-[#b9bbbe] rounded-full typing-dot" />
          <div className="w-0.5 h-0.5 bg-[#b9bbbe] rounded-full typing-dot" />
          <div className="w-0.5 h-0.5 bg-[#b9bbbe] rounded-full typing-dot" />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;