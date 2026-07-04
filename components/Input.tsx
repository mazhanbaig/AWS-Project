'use client';

import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id, className = '', ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-surface-700"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            block w-full rounded-lg border px-3.5 py-2.5
            text-sm text-surface-900 placeholder:text-surface-400
            transition-all duration-150 ease-out
            focus:outline-none focus:ring-2 focus:ring-offset-0
            ${
              error
                ? 'border-red-300 focus:border-red-400 focus:ring-red-500/30'
                : 'border-surface-300 hover:border-surface-400 focus:border-brand-500 focus:ring-brand-500/30'
            }
            disabled:bg-surface-50 disabled:text-surface-500 disabled:cursor-not-allowed
            ${className}
          `}
          {...props}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        {hint && !error && <p className="text-sm text-surface-400">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
