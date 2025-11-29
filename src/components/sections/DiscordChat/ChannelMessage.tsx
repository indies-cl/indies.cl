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
      <div className="message-item mr-1 flex items-start p-1 px-4">
        <div className="h-10 w-10 overflow-hidden rounded-full bg-[#2f3136]">
          {avatar && (
            <Image
              src={avatar}
              alt={author}
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          )}
        </div>
        <div className="ml-4 flex min-h-10 flex-1 flex-col">
          <time className="text-xs leading-tight text-[#72767d]">{date}</time>
          <div className="text-left text-base leading-snug text-[#CED1D3]">
            <strong className="font-bold text-white">{author}</strong>
            <span className="ml-1">{action}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`message-item mr-1 flex items-start p-1 px-4 ${
        hasMention
          ? 'border-l-2 border-[#faf5ab] bg-[rgba(250,245,171,0.1)] pl-3.5'
          : 'bg-transparent pl-4'
      }`}
    >
      <div
        className={`h-10 w-10 overflow-hidden rounded-full ${
          isBot ? 'bg-[#faf5ab]' : 'bg-[#2f3136]'
        }`}
      >
        {avatar && (
          <Image
            src={avatar}
            alt={author}
            width={40}
            height={40}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div className="ml-4 flex min-h-10 flex-1 flex-col justify-between">
        <div className="flex items-center">
          <strong className="m-0 text-base font-bold text-white">
            {author}
          </strong>
          {isBot && (
            <span className="ml-1.5 rounded bg-[#7289da] px-1 py-1 text-xs font-bold text-white uppercase">
              Bot
            </span>
          )}
          <time className="ml-1.5 text-xs text-[#72767d]">{date}</time>
        </div>
        <div className="text-left text-base text-white">
          {content === 'EVENT_CARD' ? (
            <EventCard onOpenModal={onOpenModal} />
          ) : (
            content
          )}
        </div>
      </div>
    </div>
  );
};

export default ChannelMessage;
