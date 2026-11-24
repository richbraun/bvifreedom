export default function Stars({ value, size = 18 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${value.toFixed(1)} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.max(0, Math.min(1, value - (i - 1)));
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
            <defs><linearGradient id={`s${i}-${Math.round(fill * 100)}`}><stop offset={`${fill * 100}%`} stopColor="#e9b949" /><stop offset={`${fill * 100}%`} stopColor="#d9dee3" /></linearGradient></defs>
            <path fill={`url(#s${i}-${Math.round(fill * 100)})`} d="M12 2.5l2.9 6.1 6.7.8-4.9 4.6 1.3 6.6L12 17.4 6 20.6l1.3-6.6L2.4 9.4l6.7-.8z" />
          </svg>
        );
      })}
    </span>
  );
}
