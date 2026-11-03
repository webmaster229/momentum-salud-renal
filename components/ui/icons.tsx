type IconProps = { className?: string };

export function ChevronIcon({ className = "" }: IconProps) {
  return (
    <svg aria-hidden viewBox="0 0 16 26" fill="none" className={className}>
      <path d="M4 4l8 9-8 9" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronDownIcon({ className = "" }: IconProps) {
  return (
    <svg aria-hidden viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LineIcon({ className = "", children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </LineIcon>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </LineIcon>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </LineIcon>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </LineIcon>
  );
}

export function DirectionsIcon(props: IconProps) {
  return (
    <LineIcon {...props}>
      <path d="M3 11 21 3l-8 18-2-8-8-2Z" />
    </LineIcon>
  );
}

export function PlayIcon({ className = "" }: IconProps) {
  return (
    <svg aria-hidden viewBox="0 0 100 100" fill="none" className={className}>
      <circle cx="50" cy="50" r="46" fill="rgb(255 255 255 / 0.18)" stroke="white" strokeWidth="5" />
      <path d="M41 32.5v35a2 2 0 0 0 3 1.7l27-17.5a2 2 0 0 0 0-3.4l-27-17.5a2 2 0 0 0-3 1.7Z" fill="white" />
    </svg>
  );
}
