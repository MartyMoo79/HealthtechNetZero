import React from 'react';
import { Leaf, Heart } from 'lucide-react';

export default function Logo({ size = 'default' }: { size?: 'small' | 'default' | 'large' }) {
  const sizeClasses = {
    small: 'h-8',
    default: 'h-12',
    large: 'h-16'
  };

  return (
    <div className={`flex items-center justify-center ${sizeClasses[size]}`}>
      <div className="relative">
        <Heart className={`${sizeClasses[size]} text-green-600`} />
        <Leaf className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
          size === 'small' ? 'w-4 h-4' : size === 'large' ? 'w-8 h-8' : 'w-6 h-6'
        } text-white`} />
      </div>
    </div>
  );
}