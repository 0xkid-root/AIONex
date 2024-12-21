import * as React from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md',
  className, 
  ...props 
}) => {
  return (
    <button
      className={cn(
        'rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
        // Variant styles
        variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        variant === 'secondary' && 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
        variant === 'outline' && 'border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
        // Size styles
        size === 'sm' && 'px-3 py-1.5 text-sm',
        size === 'md' && 'px-4 py-2 text-base',
        size === 'lg' && 'px-6 py-3 text-lg',
        className
      )}
      {...props}
    />
  );
};
