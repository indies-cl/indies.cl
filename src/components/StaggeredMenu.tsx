import React, { ComponentProps, createContext, useContext } from 'react';
import Link from 'next/link';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence, useAnimate } from 'motion/react';


export interface StaggeredMenuProps {
  items: React.ReactNode[];
  socialItems: React.ReactNode[];
}

const COLORS = ['#FF4F18', '#000000', '#1a1a1a']

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  items = [],
  socialItems = [],
}: StaggeredMenuProps) => {
  // Calculate layer count for timing
  const layerCount = COLORS.length;
  const panelStartTime = layerCount * 0.05;
  const socialsStartTime = panelStartTime + 0.25 + items.length * 0.4;

  // PreLayer variants
  const preLayerVariants = {
    initial: {
      x: '100%',
    },
    animate: {
      x: '0%',
    },
    exit: {
      x: '100%',
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1] as const, // power2.in
      },
    },
  };

  const preLayerTransition = {
    duration: 0.5,
    ease: [0.16, 1, 0.3, 1] as const, // power3.out
  };

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0" />
      <AnimatePresence>
        <Dialog.Content
          forceMount
          key="content"
          className="fixed grid right-0 inset-y-0 max-w-lvw w-full sm:w-124 z-50"
          style={{ '--sm-accent': '#FF4F18' } as React.CSSProperties}
        >

          <Dialog.Title className="sr-only">Menu</Dialog.Title>
          <div className="pointer-events-none z-5 col-start-1 row-start-1 size-full" aria-hidden="true">
            {COLORS.map((c, i) => (
              <motion.div
                key={i}
                className="sm-prelayer absolute inset-0"
                style={{ background: c }}
                variants={preLayerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{
                  ...preLayerTransition,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>

          <motion.aside
            id="staggered-menu-panel"
            className="col-start-1 row-start-1 staggered-menu-panel z-10 flex h-full flex-col bg-white p-[3em_2em_2em_2em] backdrop-blur-md w-full"
            style={{
              WebkitBackdropFilter: 'blur(12px)',
            }}
            initial={{
              x: '100%',
            }}
            animate={{
              x: '0%',
            }}
            exit={{
              x: '100%',
              transition: {
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1], // power2.in
              },
            }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1], // power3.out
              delay: panelStartTime,
            }}
          >
            <div className="sm-panel-inner flex flex-1 flex-col gap-5">
              <motion.ul
                className="sm-panel-list m-0 flex list-none flex-col gap-2 p-0"
                role="list"
                data-numbering
                initial={false}
              >
                {items.map((item, index) => (
                  <StaggeredMenuItemContent.Provider value={{ index, panelStartTime }} key={index}>
                    {item}
                  </StaggeredMenuItemContent.Provider>
                ))}
              </motion.ul>

              <div
                className="sm-socials mt-auto flex flex-col gap-3 pt-8"
                aria-label="Social links"
              >
                <motion.h3
                  className="sm-socials-title m-0 text-base font-medium text-(--sm-accent,#ff0000)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: socialsStartTime,
                  }}
                >
                  Socials
                </motion.h3>
                <motion.ul
                  className="sm-socials-list m-0 flex list-none flex-row flex-wrap items-center gap-4 p-0 group"
                  role="list"
                  initial={false}
                >
                  {socialItems.map((socialItem, i) => (
                    <StaggeredSocialItemContent.Provider value={{ socialsStartTime, index: i }} key={i}>
                      {socialItem}
                    </StaggeredSocialItemContent.Provider>
                  ))}
                </motion.ul>
              </div>
            </div>
          </motion.aside>

          <style>{`
.sm-panel-list[data-numbering] { counter-reset: smItem; }
.sm-panel-list[data-numbering] .sm-panel-item::after { 
  counter-increment: smItem; 
  content: counter(smItem, decimal-leading-zero); 
  position: absolute; 
  top: 0.1em; 
  right: 3.2em; 
  font-size: 18px; 
  font-weight: 400; 
  color: var(--sm-accent, #ff0000); 
  letter-spacing: 0; 
  pointer-events: none; 
  user-select: none; 
  opacity: var(--sm-num-opacity, 0); 
}
.sm-socials-list:hover .sm-socials-link:not(:hover) { opacity: 0.35; }
.sm-socials-list:focus-within .sm-socials-link:not(:focus-visible) { opacity: 0.35; }
      `}</style>
        </Dialog.Content>
      </AnimatePresence>

    </Dialog.Portal>
  );
};

export function StaggeredMenuRoot({ children }: { children: React.ReactNode }) {
  return (
    <Dialog.Root>
      {children}
    </Dialog.Root>
  );
}

export function StaggeredMenuTrigger(props: ComponentProps<typeof Dialog.Trigger>) {
  return <Dialog.Trigger {...props} />;
}


const StaggeredMenuItemContent = createContext({
  index: 0,
  panelStartTime: 0,
})


export interface StaggeredMenuItemProps {
  label: string;
  ariaLabel: string;
  link: string;
  className?: string;
}

export function StaggeredMenuItem(props: StaggeredMenuItemProps) {
  const { label, ariaLabel, link, className } = props;
  const { index, panelStartTime } = useContext(StaggeredMenuItemContent);

  const itemVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: 20,
    },
  };

  const itemTransition = {
    duration: 0.4,
    ease: [0.16, 1, 0.3, 1] as const, // power2.out
    delay: panelStartTime + 0.3 + index * 0.6,
  };

  const [scope, animate] = useAnimate();

  React.useEffect(() => {
    if (scope.current) {
      scope.current.style.setProperty('--sm-num-opacity', '0');
    }
  }, [scope]);

  React.useEffect(() => {
    if (scope.current) {
      const delay = (panelStartTime + 0.3 + index * 0.6) * 1000;
      const timeout = setTimeout(() => {
        animate(scope.current, { '--sm-num-opacity': 1 }, {
          duration: 0.4,
          ease: [0.16, 1, 0.3, 1],
        });
      }, delay);
      return () => {
        clearTimeout(timeout);
        if (scope.current) {
          scope.current.style.setProperty('--sm-num-opacity', '0');
        }
      };
    }
  }, [panelStartTime, index, scope, animate]);

  return (
    <motion.li
      ref={scope}
      className={`relative overflow-hidden leading-none ${className}`}
      variants={itemVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={itemTransition}
      aria-label={ariaLabel}
    >
      <Dialog.Close asChild>
        <Link
          className="sm-panel-item relative inline-block cursor-pointer pr-[1.4em] text-6xl leading-none font-semibold tracking-[-2px] text-black uppercase no-underline transition-colors duration-150 ease-linear hover:text-(--sm-accent,#ff0000)"
          href={link}
        >
          <motion.span
            className="sm-panel-itemLabel w-fit inline-block origin-[50%_100%] will-change-transform"
          >
            {label}
          </motion.span>
        </Link>
      </Dialog.Close>
    </motion.li>
  );
}


const StaggeredSocialItemContent = createContext({
  socialsStartTime: 0,
  index: 0,
})



export interface StaggeredMenuSocialItemProps {
  label: string;
  link: string;
}

export function StaggeredSocialItem(props: StaggeredMenuSocialItemProps) {
  const { label, link } = props;
  const { socialsStartTime, index } = useContext(StaggeredSocialItemContent);

  const socialVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: socialsStartTime + 0.1 + index * 0.2,
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.li
      className="sm-socials-item"
      variants={socialVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Link
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="sm-socials-link relative inline-block py-[2px] text-[1.2rem] font-medium text-[#111] no-underline transition-[color,opacity] duration-300 ease-linear hover:text-(--sm-accent,#ff0000) focus-visible:outline-2 focus-visible:outline-(--sm-accent,#ff0000) focus-visible:outline-offset-[3px]"
      >
        {label}
      </Link>
    </motion.li>
  );
}

export default StaggeredMenu;
