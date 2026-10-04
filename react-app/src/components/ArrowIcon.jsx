import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function ArrowIcon({ size = 15, strokeWidth = 2.5, className = 'arrow-icon', style = {} }) {
  return (
    <ArrowRight
      size={size}
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
