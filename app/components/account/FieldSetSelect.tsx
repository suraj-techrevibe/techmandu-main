import clsx from 'clsx';
import React from 'react';
import { useField } from 'remix-validated-form';

interface FieldsetSelectProps {
  name: string;
  label: string;
  placeholder?: string;
  defaultValue?: string;
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export function FieldsetSelect({
  name,
  label,
  placeholder,
  defaultValue,
  icon,
  className,
  children,
  ...rest
}: FieldsetSelectProps & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const { error, getInputProps } = useField(name);

  return (
    <div>
      <fieldset
        className={clsx(
          'border rounded-lg px-3 py-2.5 focus-within:border-gray-400 transition-colors outline-none',
          error ? 'border-red-500' : 'border-gray-300',
        )}
      >
        <legend
          className={clsx(
            'text-xs px-1.5',
            error ? 'text-red-500' : 'text-gray-500',
          )}
        >
          {label}
        </legend>
        <div className="flex items-center gap-2">
          {icon && <div className="flex-shrink-0">{icon}</div>}
          <select
            {...getInputProps({
              id: name,
              ...rest,
            })}
            defaultValue={defaultValue}
            className={`w-full text-gray-900 text-sm focus:outline-none focus:ring-0 border-none p-0 bg-transparent ${
              className || ''
            }`}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {children}
          </select>
        </div>
      </fieldset>
      {error && <div className="text-xs text-red-700 mt-1">{error}</div>}
    </div>
  );
}
