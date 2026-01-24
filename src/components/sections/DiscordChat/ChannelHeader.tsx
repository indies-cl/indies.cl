import { FC, useState } from 'react';
import {
  Bell,
  Users,
  Inbox,
  HelpCircle,
  Bookmark,
  Search,
  Hash,
} from 'lucide-react';

interface ChannelHeaderProps {
  onOpenModal?: () => void;
}

const ChannelHeader: FC<ChannelHeaderProps> = ({ onOpenModal }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchValue.trim() && onOpenModal) {
      onOpenModal();
    }
  };

  const handleSearchClick = () => {
    if (searchValue.trim() && onOpenModal) {
      onOpenModal();
    }
  };

  return (
    <div className="relative z-2 box-border flex h-16 w-full items-center bg-[#36393f] px-6 shadow-[0_1px_0_0_rgba(0,0,0,0.2)]">
      <div className="flex flex-1 items-center">
        <Hash className="h-6 w-6 text-[#8e9297]" />
        <h1 className="m-0 ml-2 text-base font-bold text-white">Chat</h1>
        <div className="mx-3 h-6 w-px bg-white opacity-20" />
        <span className="text-sm text-[#72767d]">chat general</span>
      </div>

      <div className="flex items-center">
        <Bell
          onClick={onOpenModal}
          className="mx-1.5 h-5 w-5 cursor-pointer text-[#72767d] transition-colors duration-200 hover:text-white"
        />
        <Bookmark
          onClick={onOpenModal}
          className="mx-1.5 h-5 w-5 cursor-pointer text-[#72767d] transition-colors duration-200 hover:text-white"
        />
        <Users
          onClick={onOpenModal}
          className="mx-1.5 h-5 w-5 cursor-pointer text-[#72767d] transition-colors duration-200 hover:text-white"
        />

        <div className="mx-1.5 flex items-center overflow-hidden rounded bg-[#40444b] p-1">
          <input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            className="border-none bg-transparent pl-1 text-sm text-white outline-none"
          />
          <Search
            onClick={handleSearchClick}
            className="mx-1.5 h-4 w-4 cursor-pointer text-[#8e9297] transition-colors duration-200 hover:text-white"
          />
        </div>

        <Inbox
          onClick={onOpenModal}
          className="mx-1.5 h-5 w-5 cursor-pointer text-[#72767d] transition-colors duration-200 hover:text-white"
        />
        <HelpCircle
          onClick={onOpenModal}
          className="mx-1.5 h-5 w-5 cursor-pointer text-[#72767d] transition-colors duration-200 hover:text-white"
        />
      </div>
    </div>
  );
};

export default ChannelHeader;
