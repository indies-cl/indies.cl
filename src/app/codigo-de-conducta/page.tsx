import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Código de Conducta - indies.cl',
  description:
    'Normas y lineamientos para crear un espacio seguro y respetuoso en la comunidad de desarrolladores independientes de Chile.',
};

export default function CodigoDeConducta() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-neutral-300 underline transition-colors hover:text-white"
        >
          ← volver a inicio
        </Link>
      </div>

      <h1 className="mb-12 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
        código de conducta
      </h1>

      <div className="space-y-12 text-lg leading-relaxed">
        <div className="border-branding-500 rounded-lg border-l-4 bg-neutral-800 p-6">
          <h2 className="mb-4 text-2xl font-bold text-white">aviso</h2>
          <div className="space-y-4 text-neutral-100">
            <p>
              todos los asistentes, expositores, personas voluntarias y
              auspiciadores, tanto de los eventos apoyados por Indies, así como
              quienes participen e interactúen en cualquier espacio o
              plataformas (Slack, Discord, Twitter, etc.), se comprometen a
              seguir y respetar este código de conducta.
            </p>
            <p>
              la organización siempre se encargará de velar por el cumplimiento
              y respeto de lo aquí expuesto.
            </p>
            <p>no se harán excepciones de ningún tipo.</p>
          </div>
        </div>

        <section>
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            la versión más corta de todas
          </h2>
          <div className="space-y-4 text-neutral-200">
            <p>
              ¿has visto como en algunas comunidades o luego de algunos eventos,
              todos terminan hablando de &quot;aquella persona&quot; que causó
              un mal rato a uno o más asistentes?
            </p>
            <p className="text-branding-400 text-xl font-semibold">
              no seas esa persona.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            la versión no tan corta
          </h2>
          <div className="space-y-4 text-neutral-200">
            <p>
              en los eventos y espacios organizados o apoyados por Indies, así
              como en cualquiera de las plataformas de redes sociales (Slack,
              Twitter, Discord, WhatsApp, etc.) buscamos crear un espacio
              seguro, y una experiencia libre de acoso.
            </p>
            <p>
              nuestro lema es que{' '}
              <span className="text-branding-400 font-semibold">
                todas las personas son bienvenidas
              </span>
              , sin importar género, raza, orientación sexual, capacidades,
              apariencia física o creencias.
            </p>
            <p>
              no toleramos el maltrato ni el acoso bajo ningún tipo, forma ni
              contexto, directa o indirectamente. cualquier participante que
              viole estas reglas será sancionado y expulsado de este y futuros
              eventos.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            la versión más larga
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="mb-4 text-xl font-bold text-white md:text-2xl">
                ¿qué se entiende por acoso?
              </h3>
              <p className="text-neutral-200">
                maltrato y abuso físico o verbal relacionado con el género de
                una persona, orientación sexual, capacidades, apariencia física,
                nivel de conocimiento, raza, creencias y creencias religiosas.
                adicionalmente, creación o reproducción de imágenes de contenido
                sexual en espacios públicos, intimidación física o verbal,
                acoso, interrupciones groseras de charlas, uso de información
                personal, contacto físico inapropiado y cualquier acción que
                atente contra la privacidad, dignidad e integridad de las
                personas.
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-bold text-white md:text-2xl">
                comportamientos inaceptables
              </h3>
              <div className="space-y-3 text-neutral-200">
                <p>
                  • envío de mensajes directos sin previo consentimiento en un
                  canal público.
                </p>
                <p>
                  • lenguaje o contenido sexualmente explícito, violento,
                  amenazante, discriminatorio o que promueva el odio.
                </p>
                <p>
                  • acoso, intimidación, o comportamiento abusivo hacia
                  cualquier persona que sea parte de la comunidad.
                </p>
                <p>
                  • divulgación de información personal de otros sin su
                  consentimiento explícito (doxxing).
                </p>
                <p>
                  • interrupción intencional de discusiones o actividades de la
                  comunidad.
                </p>
                <p>• suplantación de identidad.</p>
                <p>
                  • spam, publicidad no solicitada, o promoción de productos y
                  servicios.
                </p>
                <p>
                  • uso de bots, <em>scripts</em> o cualquier otro medio
                  automatizado que interfiera con el funcionamiento de la
                  comunidad.
                </p>
              </div>
            </div>

            <div className="space-y-4 text-neutral-200">
              <p>
                la organización se reserva el derecho de intervenir ante
                cualquier comportamiento relacionado con lo anterior.
                adicionalmente, quienes atenten contra este código de conducta,
                podrán ser expulsados de este y futuros espacios.
              </p>
              <p>
                si eres víctima o testigo de algún tipo de acoso, por parte de
                cualquier persona, por favor contacta a alguna de las personas
                que representan a Indies de forma inmediata. estas personas
                estarán debidamente identificadas por sus roles y distintivos en
                los eventos y espacios de los que forman parte.
              </p>
              <p>
                si es necesario, la organización ayudará a contactar autoridades
                policiales y proveerá cualquier tipo de asistencia necesaria
                para remediar la situación.
              </p>
            </div>
          </div>
        </section>

        <hr className="my-12 border-neutral-600" />

        <div className="rounded-lg bg-neutral-800 p-6">
          <p className="text-lg leading-relaxed font-bold text-white">
            somos una comunidad inclusiva que valora la diversidad. si no estás
            de acuerdo con cualquier punto de este código de conducta, ni con su
            espíritu, no deberías participar de nuestras actividades y espacios
            de comunidad.
          </p>
        </div>
      </div>
    </main>
  );
}
