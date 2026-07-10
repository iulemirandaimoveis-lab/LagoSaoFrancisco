export function InstagramIcon({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M14 8.5h2V5.6c-.35-.05-1.5-.15-2.86-.15-2.83 0-4.77 1.78-4.77 5.05v2.6H5.5V16.6h2.87V22h3.2v-5.4h2.75l.44-3.5h-3.19v-2.2c0-1.01.27-1.7 1.73-1.7Z"
        fill="currentColor"
      />
    </svg>
  );
}
