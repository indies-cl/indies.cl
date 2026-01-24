import Image from 'next/image';

export default function HeroSection() {
  return (
    <div>
      <div className="absolute z-[-1] md:-top-[30dvw] xl:-top-[40dvw]">
        <Image
          width={0}
          height={980}
          src="/background-elements.svg"
          alt="Background Elements"
          className="w-full"
        />
      </div>

      <section className="mx-auto flex h-[91dvh] max-w-[1280px] flex-col justify-between px-6 py-16">
        <div className="flex flex-col">
          <div className="hidden items-center justify-center self-stretch lg:inline-flex">
            <div className="flex items-center justify-center overflow-hidden">
              <p className="text-color-foreground-primary justify-start leading-[120px] font-normal uppercase md:text-7xl lg:text-9xl">
                hacemos
              </p>
            </div>
            <div className="flex items-center justify-start overflow-hidden p-4">
              <p className="text-color-foreground-primary max-w-96 flex-1 justify-center text-xl leading-8 font-normal">
                Comunidad de devs, diseñadores y startups que crean cosas
                bacanes en Chile.
              </p>
            </div>
          </div>
          <div className="hidden items-center justify-center self-stretch overflow-hidden lg:inline-flex">
            <div className="text-color-foreground-primary justify-start leading-[120px] font-normal uppercase md:text-7xl lg:text-9xl">
              cosas bacanes
            </div>
          </div>
          <div className="flex w-full flex-col justify-center lg:hidden">
            <h1 className="text-center text-5xl">HACEMOS COSAS BACANES</h1>
            <p className="text-center text-lg">
              Comunidad de devs, diseñadores y startups que crean cosas bacanes
              en Chile.
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            src="/cat-jumpup-right.svg"
            width={105}
            height={118}
            alt="Cat Jumping Up Right"
          />
        </div>
        <div className="flex flex-col justify-center gap-4">
          <div className="flex justify-center gap-8">
            <a
              className="button-box hover:after:bg-branding-600 hover:bg-branding-600 after:bg-branding-500 bg-branding-500 flex cursor-pointer items-center gap-2 px-2 py-4 text-xl"
              href="https://discord.gg/indies"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.4817 6.21829C20.9301 5.49496 19.2501 4.96996 17.5001 4.66663C17.4693 4.66706 17.4399 4.67964 17.4184 4.70163C17.2084 5.08663 16.9634 5.58829 16.8001 5.97329C14.9439 5.69347 13.0562 5.69347 11.2001 5.97329C11.0367 5.57663 10.7917 5.08663 10.5701 4.70163C10.5584 4.67829 10.5234 4.66663 10.4884 4.66663C8.73839 4.96996 7.07006 5.49496 5.50672 6.21829C5.49506 6.21829 5.48339 6.22996 5.47172 6.24163C2.29839 10.99 1.42339 15.61 1.85506 20.1833C1.85506 20.2066 1.86672 20.23 1.89006 20.2416C3.99006 21.7816 6.00839 22.715 8.00339 23.3333C8.03839 23.345 8.07339 23.3333 8.08506 23.31C8.55172 22.6683 8.97172 21.9916 9.33339 21.28C9.35672 21.2333 9.33339 21.1866 9.28672 21.175C8.62172 20.9183 7.99172 20.615 7.37339 20.265C7.32672 20.2416 7.32672 20.1716 7.36172 20.1366C7.49006 20.0433 7.61839 19.9383 7.74672 19.845C7.77006 19.8216 7.80506 19.8216 7.82839 19.8333C11.8417 21.665 16.1701 21.665 20.1367 19.8333C20.1601 19.8216 20.1951 19.8216 20.2184 19.845C20.3467 19.95 20.4751 20.0433 20.6034 20.1483C20.6501 20.1833 20.6501 20.2533 20.5917 20.2766C19.9851 20.6383 19.3434 20.93 18.6784 21.1866C18.6317 21.1983 18.6201 21.2566 18.6317 21.2916C19.0051 22.0033 19.4251 22.68 19.8801 23.3216C19.9151 23.3333 19.9501 23.345 19.9851 23.3333C21.9917 22.715 24.0101 21.7816 26.1101 20.2416C26.1334 20.23 26.1451 20.2066 26.1451 20.1833C26.6584 14.8983 25.2934 10.3133 22.5284 6.24163C22.5167 6.22996 22.5051 6.21829 22.4817 6.21829ZM9.94006 17.395C8.73839 17.395 7.73506 16.2866 7.73506 14.9216C7.73506 13.5566 8.71506 12.4483 9.94006 12.4483C11.1767 12.4483 12.1567 13.5683 12.1451 14.9216C12.1451 16.2866 11.1651 17.395 9.94006 17.395ZM18.0717 17.395C16.8701 17.395 15.8667 16.2866 15.8667 14.9216C15.8667 13.5566 16.8467 12.4483 18.0717 12.4483C19.3084 12.4483 20.2884 13.5683 20.2767 14.9216C20.2767 16.2866 19.3084 17.395 18.0717 17.395Z"
                  fill="white"
                />
              </svg>
              <span className="text-white">DISCORD</span>
            </a>

            <a
              className="button-box flex cursor-pointer items-center gap-2 bg-black px-2 py-4 text-xl after:bg-black hover:bg-neutral-900 hover:after:bg-neutral-900"
              href="https://github.com/indies-cl"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.9999 2.33331C12.4678 2.33331 10.9507 2.63508 9.53528 3.22139C8.11981 3.80769 6.83369 4.66705 5.75034 5.7504C3.56242 7.93832 2.33325 10.9058 2.33325 14C2.33325 19.1566 5.68159 23.5316 10.3133 25.0833C10.8966 25.1766 11.0833 24.815 11.0833 24.5V22.5283C7.85158 23.2283 7.16325 20.965 7.16325 20.965C6.62659 19.6116 5.86825 19.25 5.86825 19.25C4.80659 18.5266 5.94992 18.55 5.94992 18.55C7.11658 18.6316 7.73492 19.7516 7.73492 19.7516C8.74992 21.525 10.4649 21 11.1299 20.72C11.2349 19.9616 11.5383 19.4483 11.8649 19.1566C9.27492 18.865 6.55658 17.8616 6.55658 13.4166C6.55658 12.1216 6.99992 11.0833 7.75825 10.255C7.64159 9.96331 7.23325 8.74998 7.87492 7.17498C7.87492 7.17498 8.85492 6.85998 11.0833 8.36498C12.0049 8.10831 13.0083 7.97998 13.9999 7.97998C14.9916 7.97998 15.9949 8.10831 16.9166 8.36498C19.1449 6.85998 20.1249 7.17498 20.1249 7.17498C20.7666 8.74998 20.3583 9.96331 20.2416 10.255C20.9999 11.0833 21.4433 12.1216 21.4433 13.4166C21.4433 17.8733 18.7133 18.8533 16.1116 19.145C16.5316 19.5066 16.9166 20.2183 16.9166 21.3033V24.5C16.9166 24.815 17.1033 25.1883 17.6983 25.0833C22.3299 23.52 25.6666 19.1566 25.6666 14C25.6666 12.4679 25.3648 10.9508 24.7785 9.53534C24.1922 8.11987 23.3328 6.83375 22.2495 5.7504C21.1661 4.66705 19.88 3.80769 18.4646 3.22139C17.0491 2.63508 15.532 2.33331 13.9999 2.33331Z"
                  fill="white"
                />
              </svg>
            </a>
          </div>
          <p className="text-center">O compártelo con tus amigos</p>
        </div>
      </section>
    </div>
  );
}
