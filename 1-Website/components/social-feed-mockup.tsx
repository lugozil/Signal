import Image from "next/image";

const TILES = [
  {
    src: "https://assets.cdn.filesafe.space/IJppYkeGZGZu2v8D5I04/media/6a418d6bc93b89d83fab9898.png",
    label: "Reel · 12K",
    heart: true,
    float: false,
  },
  {
    src: "https://assets.cdn.filesafe.space/IJppYkeGZGZu2v8D5I04/media/6a418d6bc408020f9710bc42.png",
    label: "Post · 4.8K",
    heart: false,
    float: true,
    delay: "0s",
  },
  {
    src: "https://assets.cdn.filesafe.space/IJppYkeGZGZu2v8D5I04/media/6a418d6bd50c4ff1844660a7.png",
    label: "Story · 9K",
    heart: false,
    float: false,
  },
  {
    src: "https://assets.cdn.filesafe.space/IJppYkeGZGZu2v8D5I04/media/6a418d6b89d9cd8dc214ec71.png",
    label: "TikTok · 88K",
    heart: true,
    float: true,
    delay: "0.6s",
  },
  {
    src: "https://assets.cdn.filesafe.space/IJppYkeGZGZu2v8D5I04/media/6a418d6bc492ddc24cdc59b9.png",
    label: "Carrusel",
    heart: false,
    float: false,
  },
  {
    src: "https://assets.cdn.filesafe.space/IJppYkeGZGZu2v8D5I04/media/6a418d6b89d9cd8dc214ec6c.png",
    label: "Ad · ROAS 5.2",
    heart: false,
    float: true,
    delay: "1s",
  },
] as const;

export function SocialFeedMockup() {
  return (
    <div className="mt-6 grid grid-cols-3 gap-2">
      {TILES.map((tile) => (
        <div
          key={tile.label}
          className={`relative aspect-square overflow-hidden rounded-xl border border-white/10 ${tile.float ? "tile-float" : ""}`}
          style={tile.float ? { animationDelay: tile.delay } : undefined}
        >
          <Image
            src={tile.src}
            alt=""
            fill
            sizes="120px"
            loading="lazy"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-signal-orange/60 to-transparent"
          />
          <span className="absolute bottom-1.5 left-1.5 z-10 rounded bg-black/45 px-1.5 py-0.5 font-mono text-[10px] font-bold text-white backdrop-blur-sm">
            {tile.label}
          </span>
          {tile.heart && (
            <svg
              className="absolute right-1.5 top-1.5 z-10 h-3.5 w-3.5 text-white/90"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 21s-7-4.35-7-10a4 4 0 017-2.65A4 4 0 0119 11c0 5.65-7 10-7 10z" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}
