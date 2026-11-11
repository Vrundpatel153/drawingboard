import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function ArrowIcon({ size = 16, strokeWidth = 2.5, className = 'arrow-icon', style = {} }) {
  // Enforce prominent, legible arrow sizing across all buttons and links
  const finalSize = Math.max(Number(size) || 16, 14);

  return (
    <ArrowRight
      size={finalSize}
      strokeWidth={strokeWidth}
      className={className}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        marginLeft: '6px',
        transition: 'transform 0.2s ease',
        flexShrink: 0,
        ...style,
      }}
    />
  );
}
