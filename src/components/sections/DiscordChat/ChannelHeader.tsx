import { FC, useState } from 'react';
import {
  Notifications,
  People,
  FileTray,
  HelpCircle,
  Bookmark,
  Search,
} from 'styled-icons/ionicons-solid';
import { Hashtag } from 'styled-icons/heroicons-outline';

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
    <div className="h-16 w-full flex px-6 bg-[#36393f] shadow-[0_1px_0_0_rgba(0,0,0,0.2)] z-2 relative box-border items-center">
      <div className="flex-1 flex items-center">
        <Hashtag className="w-6 h-6 text-[#8e9297]" />
        <h1 className="ml-2 text-base font-bold text-white m-0">Chat</h1>
        <div className="h-6 w-px bg-white opacity-20 mx-3" />
        <span className="text-sm text-[#72767d]">chat general</span>
      </div>

      <div className="flex items-center">
        <Notifications 
          onClick={onOpenModal}
          className="w-5 h-5 text-[#72767d] transition-colors duration-200 mx-1.5 cursor-pointer hover:text-white" 
        />
        <Bookmark 
          onClick={onOpenModal}
          className="w-5 h-5 text-[#72767d] transition-colors duration-200 mx-1.5 cursor-pointer hover:text-white" 
        />
        <People 
          onClick={onOpenModal}
          className="w-5 h-5 text-[#72767d] transition-colors duration-200 mx-1.5 cursor-pointer hover:text-white" 
        />

        <div className="mx-1.5 p-1 bg-[#40444b] rounded overflow-hidden flex items-center">
          <input 
            type="text" 
            placeholder="Search" 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            className="pl-1 text-white bg-transparent border-none outline-none text-sm"
          />
          <Search 
            onClick={handleSearchClick}
            className="w-4 h-4 text-[#8e9297] mx-1.5 cursor-pointer transition-colors duration-200 hover:text-white" 
          />
        </div>

        <FileTray 
          onClick={onOpenModal}
          className="w-5 h-5 text-[#72767d] transition-colors duration-200 mx-1.5 cursor-pointer hover:text-white" 
        />
        <HelpCircle 
          onClick={onOpenModal}
          className="w-5 h-5 text-[#72767d] transition-colors duration-200 mx-1.5 cursor-pointer hover:text-white" 
        />
      </div>
    </div>
  );
};

export default ChannelHeader;