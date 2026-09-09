import Image from "next/image";

// Team roster for the About page marquee. Photos are optional — add one via
// `photoSrc` (e.g. "/team/miguel-lugo.jpg" in /public/team/) and it renders
// in place of the initials avatar, always in grayscale per the brand's B&W
// team-photo treatment. Roles are placeholders until the real titles are
// provided — swap `role` per person.
export type TeamMember = {
  name: string;
  role?: string;
  photoSrc?: string;
};

export const TEAM: TeamMember[] = [
  { name: "Yajeli Melean" },
  { name: "Carmen" },
  { name: "Barbara Perez" },
  { name: "Amaru Aviles" },
  { name: "Carlos Vigos" },
  { name: "Miguel Lugo" },
];

function initialsOf(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function TeamCard({ name, role, photoSrc }: TeamMember) {
  return (
    <div className="w-44 shrink-0 sm:w-52">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
        {photoSrc ? (
          <Image
            src={photoSrc}
            alt={name}
            fill
            sizes="(min-width: 640px) 208px, 176px"
            className="object-cover grayscale"
            loading="lazy"
          />
        ) : (
          <div className="grid h-full w-full place-items-center font-mono text-3xl font-medium text-signal-orange">
            {initialsOf(name)}
          </div>
        )}
      </div>
      <p className="mt-3 text-sm font-semibold tracking-tight">{name}</p>
      <p className="font-mono text-xs uppercase tracking-wide text-signal-mist-dim">
        {role}
      </p>
    </div>
  );
}

export function TeamCarousel({ roleFallback }: { roleFallback: string }) {
  const doubled = [...TEAM, ...TEAM];

  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <div className="marquee-track flex w-max gap-5">
        {doubled.map((member, i) => (
          <TeamCard
            key={`${member.name}-${i}`}
            {...member}
            role={member.role ?? roleFallback}
          />
        ))}
      </div>
    </div>
  );
}
