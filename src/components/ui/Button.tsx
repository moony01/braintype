import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost';
  size?: 'md' | 'lg';
  fullWidth?: boolean;
}

/**
 * 공통 버튼 컴포넌트
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'rounded-2xl font-bold transition-all duration-200 active:scale-95',
        variant === 'primary' &&
          'bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-xl hover:opacity-90',
        variant === 'ghost' && 'text-gray-500 hover:text-gray-800 hover:bg-gray-100',
        size === 'md' && 'px-6 py-3 text-base',
        size === 'lg' && 'px-8 py-4 text-lg',
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
