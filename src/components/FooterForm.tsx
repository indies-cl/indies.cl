import Image from 'next/image';

export default function FooterForm() {
  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="text-6xl">Update Indies</h1>
      <p>Entérate al tiro de lo que suena en indies, directo a tu inbox.</p>
      <form
        action="#"
        className="flex flex-col gap-4 align-bottom md:flex-row lg:items-end"
      >
        <div className="flex-1">
          <label
            className="bg-branding-500 inline-block px-2 py-1 text-xs font-bold text-white uppercase"
            htmlFor="nombre"
          >
            NOMBRE
          </label>
          <input
            type="text"
            id="nombre"
            placeholder="tu nombre"
            className="border-branding-500 focus:border-branding-400 w-full border-2 bg-transparent px-4 py-2.5 text-white placeholder:text-neutral-600 focus:outline-none"
            required
          />
        </div>

        <div className="flex-1">
          <label
            className="bg-branding-500 inline-block px-2 py-1 text-xs font-bold text-white uppercase"
            htmlFor="email"
          >
            CORREO ELECTRÓNICO
          </label>
          <input
            type="email"
            id="email"
            placeholder="nombre@ejemplo.com"
            className="border-branding-500 focus:border-branding-400 w-full border-2 bg-transparent px-4 py-2.5 text-white placeholder:text-neutral-600 focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="max-h-[48px] max-w-[48px] cursor-pointer gap-2 bg-white p-3 hover:bg-neutral-100"
          aria-label="Subscribe"
        >
          <Image src="/send-sharp.svg" alt="Send" width={24} height={24} />
        </button>
      </form>
    </div>
  );
}
