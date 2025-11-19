import { FC } from 'react';
import Image from 'next/image';

interface TypingIndicatorProps {
  users: { name: string; avatar: string }[];
}

const TypingIndicator: FC<TypingIndicatorProps> = ({ users }) => {
  if (users.length === 0) return null;

  const formatTypingText = () => {
    if (users.length === 1) {
      return `${users[0].name} está escribiendo...`;
    } else if (users.length === 2) {
      return `${users[0].name} y ${users[1].name} están escribiendo...`;
    } else {
      return `${users.slice(0, -1).map(u => u.name).join(', ')} y ${users[users.length - 1].name} están escribiendo...`;
    }
  };

  return (
    <div className="flex items-center p-1 px-4 mr-1">
      {/* Avatars */}
      <div className="flex -space-x-2">
        {users.slice(0, 3).map((user, index) => (
          <div 
            key={index} 
            className="w-5 h-5 rounded-full overflow-hidden border border-[#36393f] bg-[#2f3136]"
          >
            {user.avatar && (
              <Image 
                src={user.avatar} 
                alt={user.name} 
                width={20} 
                height={20} 
                className="w-full h-full object-cover" 
              />
            )}
          </div>
        ))}
      </div>

      {/* Typing text and dots */}
      <div className="flex items-center ml-3">
        <span className="text-sm text-[#949ba4] italic">
          {formatTypingText()}
        </span>
        
        {/* Animated dots */}
        <div className="flex items-center ml-1 space-x-1">
          <div className="w-1 h-1 bg-[#949ba4] rounded-full typing-dot" />
          <div className="w-1 h-1 bg-[#949ba4] rounded-full typing-dot" />
          <div className="w-1 h-1 bg-[#949ba4] rounded-full typing-dot" />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;