// One source of truth for how QR images are drawn. Changing these would change
// the look of new downloads (not the encoded link), so keep them stable.
// Level Q tolerates ~25 % damage — good for printed cards. Black on white with a
// 2-module quiet zone gives the most reliable scans.
export const QR_OPTIONS = {
  errorCorrectionLevel: "Q" as const,
  margin: 2,
  color: { dark: "#000000", light: "#ffffff" },
};
