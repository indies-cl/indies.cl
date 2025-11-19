import { FC } from 'react';
import Image from 'next/image';
import { Time } from 'styled-icons/ionicons-solid';

interface EventCardProps {
  onOpenModal?: () => void;
}

const EventCard: FC<EventCardProps> = ({ onOpenModal }) => {
  return (
    <div className="rounded border border-[#2a2b2f] bg-[#1e1f22] p-3 max-w-[350px]">
      <div className="flex items-center gap-1 text-xs text-gray-400">
        <Time className="w-3 h-3" style={{ color: '#949CF7' }} />
        jue. julio, 17º - 19:00
      </div>
      <div className="mt-1 text-lg font-semibold">call para conocerse</div>
      <div className="mt-1 text-sm text-gray-300">
        primera call ever ayo
        <br />
        indies.cl — Charlas
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/gatito-indies.webp"
            alt="Indies community"
            width={48}
            height={48}
            className="rounded bg-[#393B40]"
          />
          <div className="text-sm">
            <div className="font-semibold">indies.cl</div>
            <div>Charlas</div>
          </div>
        </div>
        <button 
          onClick={onOpenModal}
          className="rounded bg-green-600 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-green-700"
        >
          Me interesa
        </button>
      </div>
    </div>
  );
};

export default EventCard;