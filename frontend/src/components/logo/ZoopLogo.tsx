
const ZoopLogo = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`h-6 w-6 ${className}`}
  >
    {/* 집 외곽선 */}
    <path d="M3 11L12 3L21 11V20A1 1 0 0 1 20 21H15V16H9V21H4A1 1 0 0 1 3 20Z" />

    {/* 작은 Z */}
    <path d="M10 9.7h4l-4 3h4" />
  </svg>
);

export default ZoopLogo;
