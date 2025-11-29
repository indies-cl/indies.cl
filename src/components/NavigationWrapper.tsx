'use client';

import {
  StaggeredMenu,
  StaggeredMenuRoot,
  StaggeredMenuTrigger,
  StaggeredMenuItem,
  StaggeredSocialItem
} from '@/components/StaggeredMenu';

export default function NavigationWrapper() {
  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
    { label: 'Services', ariaLabel: 'View our services', link: '/services' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' },
  ];

  const socialItems = [
    { label: 'Twitter', link: 'https://twitter.com' },
    { label: 'GitHub', link: 'https://github.com' },
    { label: 'LinkedIn', link: 'https://linkedin.com' },
  ];

  return (
    <StaggeredMenuRoot onOpenChange={(open: boolean) => open ? console.log('Menu opened') : console.log('Menu closed')}>
      <StaggeredMenuTrigger className="fixed top-4 right-4 z-50 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
        <MenuIcon color="#000" />
      </StaggeredMenuTrigger>

      <StaggeredMenu
        position="right"
        items={menuItems.map((item, idx) => (
          <StaggeredMenuItem key={idx} {...item} />
        ))}
        socialItems={socialItems.map((item, idx) => (
          <StaggeredSocialItem key={idx} {...item} />
        ))}
        displayItemNumbering={true}
        colors={['#B19EEF', '#5227FF']}
        accentColor="#ff6b6b"
      />
    </StaggeredMenuRoot>
  );
}

function MenuIcon({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 12H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 6H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 18H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
