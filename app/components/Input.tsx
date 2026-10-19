import clsx from 'clsx';
import React from 'react';
import { useField } from 'remix-validated-form';
import FormElement from './FormElement';

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'placeholder'
> & {
  label?: string;
  name: string;
};

export const ValidatedInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ name, label, required, title, ...props }, ref) => {
    const { error, getInputProps } = useField(name);
    const { onChange: formOnChange, ...formProps } = getInputProps();
    const { onChange: distinctOnChange, ...rest } = props;

    const handleChange = (e: any) => {
      formOnChange && formOnChange(e);
      distinctOnChange && distinctOnChange(e);
    };

    return (
      <FormElement name={name} label={label} required={required}>
        <input
          id={name}
          ref={ref}
          title={label}
          {...rest}
          {...formProps}
          onChange={handleChange}
          className={clsx(
            'appearance-none caret-zinc-900 text-black font-normal text-sm block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm disabled:text-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed',
            {
              'border-rose-500 focus:border-rose-500': error,
            },
            props.className,
          )}
        >
          {props.children}
        </input>
      </FormElement>
    );
  },
);

interface FieldsetInputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  readOnly?: boolean;
  icon?: React.ReactNode;
  className?: string;
  error?: string;
}

export function Input({
  name,
  label,
  type = 'text',
  placeholder,
  defaultValue,
  readOnly = false,
  icon,
  className,
  error,
  ...rest
}: FieldsetInputProps & React.InputHTMLAttributes<HTMLInputElement>) {
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
          <input
            name={name}
            type={type}
            placeholder={placeholder}
            {...rest}
            readOnly={readOnly}
            defaultValue={defaultValue}
            className={`w-full text-gray-900 text-sm focus:outline-none focus:ring-0 border-none p-0 ${
              readOnly ? 'bg-transparent' : ''
            } ${className || ''}`}
          />
        </div>
      </fieldset>
      {error && <div className="text-xs text-red-700 mt-1">{error}</div>}
    </div>
  );
}
