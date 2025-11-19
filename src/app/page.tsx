import Image from 'next/image';
import Hero from '@/components/sections/Hero';
import DiscordChat from '@/components/sections/DiscordChat';

export default function Home() {
  return (
    <main className="">
      {/* Hero */}
      <Hero></Hero>

      <section className="mx-auto flex max-w-[1280px] flex-col justify-between gap-4 px-6 py-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl">
          El ecosistema donde tus ideas se vuelven bacanes
        </h1>
        <p className="text-md md:text-lg lg:text-xl">
          Somos el lugar de encuentro para gente patua creando cosas choras,
          cualquiera que quiera apostar en su idea o en si mismo. Si eres de
          región construyendo tu startup, desarrollas un juego desde tu pieza, o
          vendes figuras de porcelana por instagram.
          <br />
          <br />
          <br />
          indies.cl no busca lucrar. creamos comunidad para conocernos,
          compartir ideas y construir con otros en la misma onda. todo lo
          levantan voluntarios y siempre buscamos manos que quieran sumarse.
          <br />
          <br />
          <br />
          Empezó como una excusa para hacer amigos, y lo sigue siendo.
        </p>
        <div className="py-6">
          <Image
            src="/img.png"
            width={1820}
            height={0}
            alt="group img"
            placeholder="empty"
          />
        </div>
        <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-5">
          <div className="col-span-2 py-4">
            <h1 className="text-[44px]">1000&nbsp;+</h1>
            <p>Comunidad emergente para mentes creativas y emprendedores.</p>
          </div>
          <div className="col-span-2 py-4">
            <h1 className="text-[44px]">4&nbsp;+</h1>
            <p>Meetups organizados para compartir ideas y experiencias.</p>
          </div>
          <div className="relative hidden justify-end p-2 md:flex">
            <Image
              src="michi.svg"
              width={290}
              height={0}
              alt="michi"
              className="absolute -top-[100px] h-auto"
            />
          </div>
        </div>
      </section>
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
          <DiscordChat></DiscordChat>
        </div>
        <div className="mx-auto flex max-w-[1280px] flex-col gap-12 px-6 py-16">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl">
              ELLOS PAGAN LAS PIZZAS
            </h1>
            <h1 className="text-4xl md:text-5xl lg:text-6xl">
              (Y LOS AMAMOS POR ESO)
            </h1>
          </div>
          <p className="text-md w-full md:w-1/2 md:text-lg lg:text-xl">
            No tenemos inversionistas, tenemos gente buena onda que cree que una
            pizza puede cambiar el mundo (más o menos).
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:justify-start">
            <div className="bg-background flex min-h-[206px] min-w-[244px] items-center px-4 py-1">
              <Image
                src={'/communityos_logo.png'}
                alt="test"
                width={244}
                height={0}
                className="w-full"
              />
            </div>
            <div className="bg-background flex min-h-[206px] min-w-[244px] items-center px-4 py-1">
              <Image
                src={'/skywardai_logo.png'}
                alt="test"
                width={244}
                height={0}
                className="w-full"
              />
            </div>
            <div className="bg-background flex min-h-[206px] min-w-[244px] items-center px-4 py-1">
              <Image
                src={'/div_ally3.png'}
                alt="test"
                width={244}
                height={0}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
