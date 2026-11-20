import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0e0e10",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
          <circle cx="6" cy="26" r="3" fill="#ff5a00" />
          <path
            d="M6 18 a10 10 0 0 1 10 10"
            stroke="#ff5a00"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M6 10 a18 18 0 0 1 18 18"
            stroke="#ff5a00"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
