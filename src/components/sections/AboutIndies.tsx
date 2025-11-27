import Image from 'next/image';
import ImageWithDepth from '@/components/ImageWithDepth';
import CountUp from '@/components/CountUp';

async function getDiscordMemberCount(): Promise<number> {
  try {
    const response = await fetch(
      'https://discord.com/api/invites/indies?with_counts=true',
      {
        next: { revalidate: 86400 }, // Cache por 24 horas
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch Discord invite data');
    }

    const data = await response.json();
    const count = data.approximate_member_count || 1000;
    // Redondear al múltiplo de 10 más cercano
    return Math.round(count / 10) * 10;
  } catch (error) {
    console.error('Error fetching Discord members:', error);
    return 1000; // Valor por defecto
  }
}

export default async function AboutIndies() {
  const memberCount = await getDiscordMemberCount();
  const meetupsCount = 6;

  return (
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
        <ImageWithDepth
          imageSrc="/indies-crowd.jpg"
          depthSrc="/indies-crowd-depth.png"
          strength={0.0012}
          smoothing={0.001}
          height={550}
        />
      </div>
      <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-5">
        <div className="col-span-2 py-4">
          <h1 className="text-[44px]">
            <CountUp end={memberCount} suffix="&nbsp;+" />{' '}
            <span className="opacity-60">miembros</span>
          </h1>
          <p>De todo Chile, creando productos y construyendo juntos.</p>
        </div>
        <div className="col-span-2 py-4">
          <h1 className="text-[44px]">
            {meetupsCount} <span className="opacity-60">meetups</span>
          </h1>
          <p>Encuentros presenciales en Santiago llenos de buena onda.</p>
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
  );
}
