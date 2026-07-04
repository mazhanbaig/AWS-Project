'use client';

import { InputHTMLAttributes } from 'react';
import Input from './Input';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export default function FormField({ label, error, hint, ...props }: FormFieldProps) {
  return (
    <Input
      label={label}
      error={error}
      hint={hint}
      {...props}
    />
  );
}
