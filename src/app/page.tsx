import Image from 'next/image';

export default function Home() {
  return (
    <main>
      <div className="absolute -top-[110%] z-[-1] w-[100dvw]">
        <Image
          width={0}
          height={0}
          className="h-full w-full object-cover"
          src="/background-elements.svg"
          alt="xd"
        />
      </div>
      <div className="absolute top-0 z-[-2] mx-auto h-full w-[100dvw]">
        <Image
          width={0}
          height={0}
          className="h-full w-full object-cover"
          src="/bitmap-xl-svgo.svg"
          alt="xd"
        />
      </div>
      <section className="mx-auto flex max-w-[1280px]">
        <h2>Welcome to Indies</h2>
      </section>
      <section></section>
      <section></section>
      <section></section>
      <section></section>
      <h2>Welcome to Indies</h2>
      <p>Your gateway to indie content.</p>
    </main>
  );
}
