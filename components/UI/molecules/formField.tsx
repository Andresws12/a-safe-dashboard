import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
} from 'react';
import React, { forwardRef } from 'react';

import { Input } from '@/components/UI/atoms/input';
import { Label } from '@/components/UI/atoms/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/UI/atoms/select';
import { Textarea } from '@/components/UI/atoms/textarea';

type InputProps = InputHTMLAttributes<HTMLInputElement>;
type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;
type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & { value?: string };

interface BaseFormFieldProps {
  label: string;
  error?: string;
  type?: 'input' | 'textarea' | 'select' | 'password' | 'email';
  options?: { value: string; label: string }[];
  dataCy?: string;
}

type FormFieldProps = BaseFormFieldProps &
  (InputProps | TextareaProps | SelectProps);

const FormField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  FormFieldProps
>(
  (
    { label, id, error, type = 'input', options = [], dataCy, ...rest },
    ref,
  ) => (
    <div className="flex-1">
      <Label htmlFor={id} data-cy={`${dataCy}-label`}>
        {label}
      </Label>

      {type === 'textarea' && (
        <Textarea
          id={id}
          data-cy={`${dataCy}-textarea`}
          ref={ref as React.ForwardedRef<HTMLTextAreaElement>}
          {...(rest as TextareaProps)}
        />
      )}

      {type === 'select' && (
        <Select
          defaultValue={
            (rest as SelectProps).value ||
            ((rest as SelectProps).defaultValue as string)
          }
          onValueChange={(value) => {
            if ((rest as SelectProps).onChange) {
              const event = {
                target: { value },
              } as React.ChangeEvent<HTMLSelectElement>;
              (
                (rest as SelectProps)
                  .onChange as React.ChangeEventHandler<HTMLSelectElement>
              )(event);
            }
          }}
        >
          <SelectTrigger
            id={id}
            data-cy={`${dataCy}-select`}
            className="w-full"
          >
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {(type === 'input' || type === 'password' || type === 'email') && (
        <Input
          data-cy={`${dataCy}-input`}
          id={id}
          type={
            type === 'password'
              ? 'password'
              : type === 'email'
                ? 'email'
                : (rest as InputProps).type || 'text'
          }
          ref={ref as React.ForwardedRef<HTMLInputElement>}
          {...(rest as InputProps)}
        />
      )}

      {error && (
        <span className="mt-1 text-sm text-red-500" data-cy={`${dataCy}-error`}>
          {error}
        </span>
      )}
    </div>
  ),
);

FormField.displayName = 'FormField';

export default FormField;
