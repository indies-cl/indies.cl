import DiscordChat from '@/components/sections/DiscordChat';

export default function CommunitySection() {
  return (
    <>
      <div className="flex justify-center pt-16 align-middle">
        <h1 className="text-center text-4xl md:text-5xl lg:text-6xl">
          TEAM?
          <br />
          NAH.
        </h1>
      </div>
      <section className="bg-white text-black">
        <div className="mx-auto flex max-w-[1280px] flex-col justify-between gap-12 px-6">
          <h1 className="text-center text-4xl md:text-5xl lg:text-6xl">
            JUST PEOPLE <span className="text-branding-500">DOING</span>
            <br />
            COOL SH*T TOGETHER
          </h1>
          <p className="text-md md:text-lg lg:text-xl">
            Todo partió en un canal de Discord, entre café, memes y gente que
            quería hacer cosas bacanes. Ahora somos la mezcla perfecta de
            builders, soñadores y gente con demasiadas ideas.
          </p>
        </div>
        <div className="mx-auto max-w-[1280px] px-6 py-16">
          <DiscordChat />
        </div>
      </section>
    </>
  );
}
