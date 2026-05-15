import React from 'react';

type IconProps = { size?: number; stroke?: number; color?: string; className?: string };

const base = (size: number, stroke: number, color: string, className?: string) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: color,
  strokeWidth: stroke,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className
});

export const IconMap = ({ size = 22, stroke = 2, color = 'currentColor', className }: IconProps) => (
  <svg {...base(size, stroke, color, className)}>
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21 3 6" />
    <line x1="9" y1="3" x2="9" y2="18" />
    <line x1="15" y1="6" x2="15" y2="21" />
  </svg>
);

export const IconUsers = ({ size = 22, stroke = 2, color = 'currentColor', className }: IconProps) => (
  <svg {...base(size, stroke, color, className)}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const IconPlus = ({ size = 22, stroke = 2.5, color = 'currentColor', className }: IconProps) => (
  <svg {...base(size, stroke, color, className)}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const IconMessage = ({ size = 22, stroke = 2, color = 'currentColor', className }: IconProps) => (
  <svg {...base(size, stroke, color, className)}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

export const IconUser = ({ size = 22, stroke = 2, color = 'currentColor', className }: IconProps) => (
  <svg {...base(size, stroke, color, className)}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const IconSearch = ({ size = 18, stroke = 2, color = 'currentColor', className }: IconProps) => (
  <svg {...base(size, stroke, color, className)}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export const IconCompass = ({ size = 22, stroke = 2, color = 'currentColor', className }: IconProps) => (
  <svg {...base(size, stroke, color, className)}>
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

export const IconTrending = ({ size = 22, stroke = 2, color = 'currentColor', className }: IconProps) => (
  <svg {...base(size, stroke, color, className)}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

export const IconShield = ({ size = 22, stroke = 2, color = 'currentColor', className }: IconProps) => (
  <svg {...base(size, stroke, color, className)}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

export const IconMoon = ({ size = 22, stroke = 2, color = 'currentColor', className }: IconProps) => (
  <svg {...base(size, stroke, color, className)}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export const IconLocation = ({ size = 22, stroke = 2, color = 'currentColor', className }: IconProps) => (
  <svg {...base(size, stroke, color, className)}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const IconArrow = ({ size = 18, stroke = 2.2, color = 'currentColor', className }: IconProps) => (
  <svg {...base(size, stroke, color, className)}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export const IconBack = ({ size = 22, stroke = 2.2, color = 'currentColor', className }: IconProps) => (
  <svg {...base(size, stroke, color, className)}>
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

export const IconCheck = ({ size = 18, stroke = 2.5, color = 'currentColor', className }: IconProps) => (
  <svg {...base(size, stroke, color, className)}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const IconHeart = ({ size = 22, stroke = 2, color = 'currentColor', className }: IconProps) => (
  <svg {...base(size, stroke, color, className)}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export const IconClock = ({ size = 16, stroke = 2, color = 'currentColor', className }: IconProps) => (
  <svg {...base(size, stroke, color, className)}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export const IconShare = ({ size = 18, stroke = 2, color = 'currentColor', className }: IconProps) => (
  <svg {...base(size, stroke, color, className)}>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

export const IconSparkle = ({ size = 18, stroke = 2, color = 'currentColor', className }: IconProps) => (
  <svg {...base(size, stroke, color, className)}>
    <path d="M12 2l2.39 6.95L21 12l-6.61 3.05L12 22l-2.39-6.95L3 12l6.61-3.05L12 2z" />
  </svg>
);

export const IconFlag = ({ size = 22, stroke = 2, color = 'currentColor', className }: IconProps) => (
  <svg {...base(size, stroke, color, className)}>
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
    <line x1="4" y1="22" x2="4" y2="15" />
  </svg>
);

export const IconLock = ({ size = 22, stroke = 2, color = 'currentColor', className }: IconProps) => (
  <svg {...base(size, stroke, color, className)}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
