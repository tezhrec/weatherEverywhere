interface UVGaugeProps {
  uvIndex: number;
  darkMode: boolean;
}

export function UVGauge({ uvIndex, darkMode }: UVGaugeProps) {
  const getUVColor = (uv: number): string => {
    if (uv <= 2) return '#22c55e';
    if (uv <= 5) return '#eab308';
    if (uv <= 7) return '#f97316';
    if (uv <= 10) return '#ef4444';
    return '#a855f7';
  };

  const getUVCategory = (uv: number): string => {
    if (uv <= 2) return 'Low';
    if (uv <= 5) return 'Moderate';
    if (uv <= 7) return 'High';
    if (uv <= 10) return 'Very High';
    return 'Extreme';
  };

  const percentage = Math.min((uvIndex / 11) * 100, 100);
  const rotation = (percentage / 100) * 180;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-24">
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <path
            d="M 10 90 A 90 90 0 0 1 190 90"
            fill="none"
            stroke={darkMode ? '#374151' : '#e5e7eb'}
            strokeWidth="20"
            strokeLinecap="round"
          />
          <path
            d="M 10 90 A 90 90 0 0 1 190 90"
            fill="none"
            stroke={getUVColor(uvIndex)}
            strokeWidth="20"
            strokeLinecap="round"
            strokeDasharray={`${(rotation / 180) * 282.7} 282.7`}
            className="transition-all duration-500"
          />
          <circle
            cx="100"
            cy="90"
            r="4"
            fill={darkMode ? '#9ca3af' : '#6b7280'}
          />
          <g transform={`rotate(${rotation - 90}, 100, 90)`}>
            <line
              x1="100"
              y1="90"
              x2="100"
              y2="30"
              stroke={getUVColor(uvIndex)}
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="100" cy="30" r="5" fill={getUVColor(uvIndex)} />
          </g>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
          <div className="text-3xl font-bold" style={{ color: getUVColor(uvIndex) }}>
            {uvIndex}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {getUVCategory(uvIndex)}
          </div>
        </div>
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">UV Index</div>
    </div>
  );
}
