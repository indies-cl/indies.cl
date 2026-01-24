import { FC } from 'react';

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
      return `${users
        .slice(0, -1)
        .map((u) => u.name)
        .join(', ')} y ${users[users.length - 1].name} están escribiendo`;
    }
  };

  return (
    <div className="absolute -bottom-1 left-8 flex items-center">
      {/* Typing text and dots */}
      <div className="flex items-center">
        <span className="text-xs text-[#b9bbbe]">{formatTypingText()}</span>

        {/* Animated dots */}
        <div className="ml-1 flex translate-y-0.5 items-center space-x-0.5">
          <div className="typing-dot h-0.5 w-0.5 rounded-full bg-[#b9bbbe]" />
          <div className="typing-dot h-0.5 w-0.5 rounded-full bg-[#b9bbbe]" />
          <div className="typing-dot h-0.5 w-0.5 rounded-full bg-[#b9bbbe]" />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
