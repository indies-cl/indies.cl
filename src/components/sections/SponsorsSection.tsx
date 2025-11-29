import Image from 'next/image';

export default function SponsorsSection() {
  return (
    <section className="bg-white text-black">
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
              alt="CommunityOS Logo"
              width={244}
              height={0}
              className="w-full"
            />
          </div>
          <div className="bg-background flex min-h-[206px] min-w-[244px] items-center px-4 py-1">
            <Image
              src={'/skywardai_logo.png'}
              alt="SkywardAI Logo"
              width={244}
              height={0}
              className="w-full"
            />
          </div>
          <div className="bg-background flex min-h-[206px] min-w-[244px] items-center px-4 py-1">
            <Image
              src={'/div_ally3.png'}
              alt="Div Ally Logo"
              width={244}
              height={0}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
