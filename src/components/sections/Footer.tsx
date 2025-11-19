import FooterForm from '@/components/FooterForm';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mx-auto flex max-w-[1280px] px-6 py-16">
      <div className="flex w-full flex-col gap-5">
        <FooterForm />
        <div className="flex w-full flex-col gap-3">
          <h1 className="text-4xl">Links</h1>
          <div className="flex justify-around">
            <ul className="flex w-full flex-col gap-2">
              <li>Manifiesto</li>
              <li>Team</li>
              <li>Sponsors</li>
              <li>Journey</li>
              <li>FAQ memes</li>
              <li>
                <Link 
                  href="/codigo-de-conducta" 
                  className="hover:text-branding-400 transition-colors"
                >
                  Código de Conducta
                </Link>
              </li>
            </ul>
            <ul className="flex w-full flex-col gap-2">
              <li>Discord</li>
              <li>Github</li>
              <li>Linkedin</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
