// Server component: renders the QR as inline SVG. Same options as the
// downloads (see qr-options.ts) so what you see is exactly what gets printed.

import QRCode from "qrcode";
import { QR_OPTIONS } from "./qr-options";

export async function QrSvg({ value, className = "" }: { value: string; className?: string }) {
  const svg = await QRCode.toString(value, { ...QR_OPTIONS, type: "svg" });
  return (
    <div
      className={`overflow-hidden rounded-xl bg-white [&>svg]:block [&>svg]:h-full [&>svg]:w-full ${className}`}
      // Generated locally by the qrcode library from our own short URL.
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
