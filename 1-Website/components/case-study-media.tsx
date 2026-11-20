import { FilmIcon } from "./icons";

export function CaseStudyMedia({
  videoSrc,
  label,
}: {
  videoSrc: string | null;
  label: string;
}) {
  if (videoSrc) {
    return (
      <video
        src={videoSrc}
        controls
        playsInline
        preload="metadata"
        className="aspect-video w-full rounded-2xl border border-white/10 bg-signal-graphite object-cover"
      >
        Tu navegador no soporta la reproducción de este video.
      </video>
    );
  }

  return (
    <div
      role="img"
      aria-label={`Video de ${label} próximamente`}
      className="grid aspect-video w-full place-items-center rounded-2xl border border-dashed border-white/15 bg-signal-graphite"
    >
      <div className="flex flex-col items-center gap-3 text-signal-mist-dim">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-white/5">
          <FilmIcon className="h-6 w-6" />
        </span>
        <span className="font-mono text-xs uppercase tracking-wide">
          Video próximamente
        </span>
      </div>
    </div>
  );
}
