export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="6" cy="26" r="3" fill="#FF5A00" />
      <path
        d="M6 18 a10 10 0 0 1 10 10"
        stroke="#FF5A00"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M6 10 a18 18 0 0 1 18 18"
        stroke="#FF5A00"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
