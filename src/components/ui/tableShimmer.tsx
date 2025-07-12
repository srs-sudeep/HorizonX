'use client';

import { Skeleton } from '@/components';
import { useEffect } from 'react';

export const TableShimmer = ({
  rows = 12,
  columns = 6,
  showHeader = true,
  showAvatar = true,
  showActions = true,
  className = '',
}) => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes slideInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.6; }
      }

      .animate-fadeIn {
        animation: fadeIn 0.6s ease-out;
      }

      .animate-slideInUp {
        animation: slideInUp 0.8s ease-out;
      }

      .animate-pulse {
        animation: pulse 1.5s ease-in-out infinite;
        position: relative;
        overflow: hidden;
      }

      .animate-pulse::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        animation: shimmer 2s infinite;
        z-index: 1;
      }

      .dark .animate-pulse::before {
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const renderCell = (colIndex: number, isHeader = false, rowIndex = 0) => {
    const delay = isHeader ? 0 : rowIndex * 100 + colIndex * 50;
    const animationStyle = {
      animationDelay: `${delay}ms`,
      animationDuration: '1.5s',
    };

    if (isHeader) {
      return <Skeleton className="h-12 w-full animate-pulse" style={animationStyle} />;
    }

    if (colIndex === 0 && showAvatar) {
      return (
        <div className="flex items-center space-x-4">
          <Skeleton className="h-16 w-12 rounded-full animate-pulse" style={animationStyle} />
          <Skeleton
            className="h-12 w-32 animate-pulse"
            style={{ ...animationStyle, animationDelay: `${delay + 200}ms` }}
          />
        </div>
      );
    }

    if (colIndex === columns - 1 && showActions) {
      return (
        <div className="flex items-center space-x-3">
          <Skeleton className="h-16 w-20 rounded-md animate-pulse" style={animationStyle} />
          <Skeleton
            className="h-16 w-20 rounded-md animate-pulse"
            style={{ ...animationStyle, animationDelay: `${delay + 150}ms` }}
          />
        </div>
      );
    }

    const widths = ['w-full', 'w-4/5', 'w-3/4', 'w-2/3', 'w-5/6'];
    const heights = ['h-12', 'h-16', 'h-18'];
    const randomWidth = widths[colIndex % widths.length];
    const randomHeight = heights[rowIndex % heights.length];

    return (
      <Skeleton className={`${randomHeight} ${randomWidth} animate-pulse`} style={animationStyle} />
    );
  };

  return (
    <div
      className={`border border-border rounded-xl overflow-hidden shadow-sm ${className} bg-gray-600/20`}
    >
      {showHeader && (
        <div className="bg-muted/60 border-b border-border animate-fadeIn">
          <div className={`grid grid-cols-${columns} gap-6 p-6`}>
            {Array.from({ length: columns }).map((_, index) => (
              <div key={`header-${index}`} className="flex items-center">
                {renderCell(index, true)}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="divide-y divide-border">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className={`grid grid-cols-${columns} gap-6 p-6 hover:bg-muted/40 transition-all duration-300 animate-slideInUp`}
            style={{
              animationDelay: `${rowIndex * 200}ms`,
              animationFillMode: 'both',
            }}
          >
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div key={`cell-${rowIndex}-${colIndex}`} className="flex items-center">
                {renderCell(colIndex, false, rowIndex)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
