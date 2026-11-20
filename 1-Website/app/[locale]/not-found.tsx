import { CtaButton } from "@/components/cta-button";

export default function NotFound() {
  return (
    <section className="grid-bg flex min-h-[70vh] items-center justify-center px-6 text-center">
      <div>
        <p className="kicker justify-center">404</p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Página no encontrada
        </h1>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-signal-mist">
          El contenido que buscas no está disponible o cambió de dirección.
        </p>
        <div className="mt-8 flex justify-center">
          <CtaButton href="/">Volver al inicio</CtaButton>
        </div>
      </div>
    </section>
  );
}
