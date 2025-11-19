import { ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Message {
  id: number;
  author: string;
  date: string;
  content: ReactNode;
  isBot: boolean;
  hasMention: boolean;
  userId?: string;
}

export interface ChannelMessageProps {
  author: string;
  date: string;
  content?: ReactNode;
  hasMention?: boolean;
  isBot?: boolean;
  isStatement?: boolean;
  action?: string;
  avatar?: string;
  onOpenModal?: () => void;
}

export interface MentionMessageData {
  id: number;
  author: string;
  date: string;
  isBot: boolean;
  hasMention: boolean;
}

export interface DiscordColors {
  primary: string;
  secondary: string;
  tertiary: string;
  gray: string;
  symbol: string;
  white: string;
  link: string;
  mention: string;
  mentionBg: string;
  chatInput: string;
}