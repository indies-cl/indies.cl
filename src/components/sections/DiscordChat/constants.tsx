import { DiscordColors, Message, User } from './types';

export const users: Record<string, User> = {
  reno: { id: 'reno', name: 'Reno', avatar: '/avatars/reno_cropped.webp' },
  damian: {
    id: 'damian',
    name: 'Damián',
    avatar: '/avatars/damian_cropped.webp',
  },
  silvana: {
    id: 'silvana',
    name: 'Silvana',
    avatar: '/avatars/silvana_cropped.webp',
  },
  alvaro: {
    id: 'alvaro',
    name: 'Álvaro',
    avatar: '/avatars/alvaro_cropped.webp',
  },
  nacho: { id: 'nacho', name: 'Nacho', avatar: '/avatars/nacho_cropped.webp' },
  user: { id: 'user', name: 'Tú', avatar: '/avatars/default-user.webp' },
};

export const colors: DiscordColors = {
  primary: '#36393f',
  secondary: '#2f3136',
  tertiary: '#40444b',
  gray: '#72767d',
  symbol: '#8e9297',
  white: '#ffffff',
  link: '#7289da',
  mention: '#faf5ab',
  mentionBg: 'rgba(250, 245, 171, 0.1)',
  chatInput: '#40444b',
};

export const mockMessages: (
  | Message
  | {
      author: string;
      date: string;
      action: string;
      isStatement: boolean;
      userId: string;
    }
)[] = [
  // Statements
  {
    author: 'Carla',
    date: 'hace 5 meses',
    action: 'ha creado el servidor indies!',
    isStatement: true,
    userId: 'carla',
  },
  {
    author: 'Reno',
    date: 'hace 5 meses',
    action: 'se ha unido al servidor',
    isStatement: true,
    userId: 'reno',
  },

  // Card de evento (no es statement, es mensaje con "contenido especial")
  {
    id: 1,
    author: 'Reno',
    date: '15/07/2025 - 19:35',
    content: 'EVENT_CARD',
    isBot: false,
    hasMention: false,
    userId: 'reno',
  },

  // Chat mensajes normales
  {
    id: 2,
    author: 'Damian',
    date: '20/07/2025 - 22:00',
    content:
      'chicos, el 28 de agosto tendremos el primer meetup de la comunidad 👀',
    isBot: false,
    hasMention: false,
    userId: 'damian',
  },
  {
    id: 3,
    author: 'Nacho',
    date: '22/07/2025 - 19:35',
    content: 'Hey, alguien nos ayuda?',
    isBot: false,
    hasMention: false,
    userId: 'nacho',
  },
  {
    id: 4,
    author: 'Álvaro',
    date: '22/07/2025 - 20:05',
    content: 'Me apunto!',
    isBot: false,
    hasMention: false,
    userId: 'alvaro',
  },
  {
    id: 5,
    author: 'Silvana',
    date: '24/07/2025 - 13:20',
    content: 'Tenemos flyer para publicarlo 📣',
    isBot: false,
    hasMention: false,
    userId: 'silvana',
  },
  {
    id: 6,
    author: 'Allison',
    date: '24/07/2025 - 13:30',
    content: 'Hey, también me quiero sumar 👀',
    isBot: false,
    hasMention: false,
    userId: 'allison',
  },
];
