/** Minimalistic sock icon — geometric, not emoji */
export default function SockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 28 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Sock: rounded toe, straight sides, open cuff */}
      <path
        d="M6 4h16v32q0 4-4 4H10q-4 0-4-4V4z"
        fill="currentColor"
      />
    </svg>
  )
}
