import { FC } from 'react';
import Image from 'next/image';
import { ChannelMessageProps } from './types';
import EventCard from './EventCard';

const ChannelMessage: FC<ChannelMessageProps> = ({
  author,
  date,
  content,
  hasMention = false,
  isBot = false,
  isStatement = false,
  action = '',
  avatar = '',
  onOpenModal,
}) => {
  if (isStatement) {
    return (
      <div className="message-item flex items-start p-1 px-4 mr-1">
        <div className="w-10 h-10 rounded-full bg-[#2f3136] overflow-hidden">
          {avatar && (
            <Image 
              src={avatar} 
              alt={author} 
              width={40} 
              height={40} 
              className="w-full h-full object-cover" 
            />
          )}
        </div>
        <div className="min-h-10 flex-1 flex flex-col ml-4">
          <time className="text-[#72767d] text-xs leading-tight">{date}</time>
          <div className="text-left text-base text-[#CED1D3] leading-snug">
            <strong className="text-white font-bold">{author}</strong>
            <span className="ml-1">{action}</span>
          </div>
        </div>
      </div>
    );
  }

  // Detectar si es un mensaje con contenido especial (como la card de evento)
  const hasSpecialContent = typeof content === 'object' && content !== null;
  
  return (
    <div className={`message-item flex items-start p-1 px-4 mr-1 ${
      hasMention 
        ? 'bg-[rgba(250,245,171,0.1)] border-l-2 border-[#faf5ab] pl-3.5' 
        : 'bg-transparent pl-4'
    }`}>
      <div className={`w-10 h-10 rounded-full overflow-hidden ${
        isBot ? 'bg-[#faf5ab]' : 'bg-[#2f3136]'
      }`}>
        {avatar && (
          <Image 
            src={avatar} 
            alt={author} 
            width={40} 
            height={40} 
            className="w-full h-full object-cover" 
          />
        )}
      </div>
      <div className="min-h-10 flex-1 flex flex-col justify-between ml-4">
        <div className="flex items-center">
          <strong className="text-white text-base font-bold m-0">{author}</strong>
          {isBot && (
            <span className="ml-1.5 bg-[#7289da] text-white rounded px-1 py-1 uppercase font-bold text-xs">
              Bot
            </span>
          )}
          <time className="ml-1.5 text-[#72767d] text-xs">{date}</time>
        </div>
        <div className="text-left text-base text-white">
          {content === 'EVENT_CARD' ? <EventCard onOpenModal={onOpenModal} /> : content}
        </div>
      </div>
    </div>
  );
};

export default ChannelMessage;