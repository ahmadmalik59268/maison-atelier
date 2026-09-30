import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'dark' | 'light' | 'gold';
  showSubtitle?: boolean;
  linkToHome?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  variant = 'dark',
  showSubtitle = true,
  linkToHome = true,
}) => {
  // Size configurations
  const dimensions = {
    sm: {
      emblem: 'w-6 h-6',
      title: 'text-base sm:text-lg tracking-tight',
      sub: 'text-[7px] tracking-[0.25em]',
      gap: 'gap-2',
    },
    md: {
      emblem: 'w-7 h-7 sm:w-8 sm:h-8',
      title: 'text-lg sm:text-2xl tracking-tight',
      sub: 'text-[8px] sm:text-[9px] tracking-[0.28em]',
      gap: 'gap-2.5 sm:gap-3',
    },
    lg: {
      emblem: 'w-9 h-9 sm:w-10 sm:h-10',
      title: 'text-xl sm:text-3xl tracking-tight',
      sub: 'text-[9px] sm:text-[10px] tracking-[0.3em]',
      gap: 'gap-3 sm:gap-3.5',
    },
    xl: {
      emblem: 'w-12 h-12 sm:w-14 sm:h-14',
      title: 'text-2xl sm:text-4xl tracking-tight',
      sub: 'text-[10px] sm:text-xs tracking-[0.35em]',
      gap: 'gap-4',
    },
  }[size];

  // Color configurations
  const colorStyles = {
    dark: {
      primary: '#18181B',
      accent: '#9E4734',
      gold: '#C5A880',
      border: '#27272A',
      sub: 'text-[#77767B]',
    },
    light: {
      primary: '#FFFFFF',
      accent: '#E58A77',
      gold: '#DFCAAB',
      border: '#52525B',
      sub: 'text-[#A1A1AA]',
    },
    gold: {
      primary: '#C5A880',
      accent: '#9E4734',
      gold: '#DFCAAB',
      border: '#C5A880',
      sub: 'text-[#C5A880]/80',
    },
  }[variant];

  const content = (
    <div className={`flex items-center ${dimensions.gap} ${className} group select-none`}>
      {/* Luxury Geometric Monogram Crest */}
      <div className={`relative ${dimensions.emblem} shrink-0 transition-transform duration-300 group-hover:scale-105`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Subtle Outer Diamond / Shield Guide */}
          <rect
            x="8"
            y="8"
            width="84"
            height="84"
            transform="rotate(45 50 50)"
            stroke={colorStyles.gold}
            strokeWidth="1.5"
            strokeOpacity="0.45"
            strokeDasharray="4 2"
          />
          {/* Inner Diamond Frame */}
          <rect
            x="14"
            y="14"
            width="72"
            height="72"
            transform="rotate(45 50 50)"
            stroke={colorStyles.primary}
            strokeWidth="1.75"
          />
          {/* Architectural Serif Monogram "A" with "C" intertwine */}
          <path
            d="M50 20 L27 75 H38 L43.5 61 H56.5 L62 75 H73 L50 20 Z M46.5 53 L50 43 L53.5 53 H46.5 Z"
            fill={colorStyles.primary}
          />
          {/* Terracotta / Gold Atelier Thread Accent Accent Bar */}
          <line
            x1="34"
            y1="57"
            x2="66"
            y2="57"
            stroke={colorStyles.accent}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Center Luxury Star Needle Eye */}
          <circle cx="50" cy="33" r="2" fill={colorStyles.gold} />
          {/* Refined C Accent Arc */}
          <path
            d="M 68 40 C 76 46, 76 60, 67 67"
            stroke={colorStyles.accent}
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>

      {/* Typography Wordmark */}
      <div className="flex flex-col text-left justify-center leading-none">
        <span
          className={`font-serif uppercase font-medium ${dimensions.title} transition-colors duration-200 group-hover:text-[#9E4734]`}
          style={{ color: variant === 'light' ? '#FFFFFF' : '#18181B' }}
        >
          Ahmad Clothing
        </span>
        {showSubtitle && (
          <span
            className={`font-sans uppercase font-medium mt-1 ${dimensions.sub} ${colorStyles.sub}`}
          >
            Haute Couture • Atelier
          </span>
        )}
      </div>
    </div>
  );

  if (linkToHome) {
    return (
      <Link to="/" className="inline-block outline-none focus-visible:ring-1 focus-visible:ring-[#9E4734]">
        {content}
      </Link>
    );
  }

  return content;
};
