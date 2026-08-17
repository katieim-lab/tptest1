export function BitlyLogo({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="28" height="28" rx="8" fill="#EE6123" />
        <circle cx="10" cy="18" r="3.4" fill="white" />
        <circle cx="18.5" cy="9.5" r="4.6" fill="white" fillOpacity="0.55" />
      </svg>
    </div>
  );
}
