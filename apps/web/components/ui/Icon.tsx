export function VernacularIcon({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 배경 */}
      <rect width="32" height="32" rx="8" fill="#0A0A0A" />

      {/* 왼쪽 굵은 바 */}
      <rect x="7" y="7" width="4" height="18" rx="2" fill="white" />

      {/* 오른쪽 위 */}
      <rect x="14" y="7" width="11" height="4" rx="2" fill="white" />

      {/* 오른쪽 중간 */}
      <rect x="14" y="14" width="7" height="3" rx="1.5" fill="white" opacity="0.5" />

      {/* 오른쪽 아래 */}
      <rect x="14" y="21" width="9" height="4" rx="2" fill="white" opacity="0.25" />
    </svg>
  );
}
