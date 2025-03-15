import type { InputHTMLAttributes } from 'react';
import React, { forwardRef } from 'react';

import { Input } from '@/components/UI/atoms/input';
import { Label } from '@/components/UI/atoms/label';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, id, error, ...rest }, ref) => (
    <div className="flex-1">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} ref={ref} {...rest} />
      {error && <span className="mt-1 text-sm text-red-500">{error}</span>}
    </div>
  )
);

FormField.displayName = 'FormField';

export default FormField;
