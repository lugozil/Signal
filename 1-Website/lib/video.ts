import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Checks whether `/public/videos/<slug>.mp4` has been added yet, so case
 * study sections can render the real video the moment a file lands there —
 * no code change needed.
 */
export function caseStudyVideoPath(slug: string): string | null {
  const relative = `videos/${slug}.mp4`;
  const absolute = join(process.cwd(), "public", relative);
  return existsSync(absolute) ? `/${relative}` : null;
}
