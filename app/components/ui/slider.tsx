'use client';

import { Slider as SliderPrimitive } from 'radix-ui';
import * as React from 'react';
import { cn } from '~/lib/utils';

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
        ? defaultValue
        : [min, max],
    [value, defaultValue, min, max],
  );

  // remix specific workaround to know if the change should be ignored when inside a form
  const refCallback: React.RefCallback<HTMLSpanElement> = (node) => {
    if (!node) {
      return;
    }
    node
      .querySelectorAll('input')
      ?.forEach((input) => input.setAttribute('data-ignore-form', 'true'));
  };

  return (
    <SliderPrimitive.Root
      ref={refCallback}
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        'data-vertical:min-h-40 relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:w-auto data-vertical:flex-col',
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="rounded-full bg-primary/20 h-1 data-horizontal:h-1 data-vertical:w-1 relative grow overflow-hidden data-horizontal:w-full data-vertical:h-full"
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className="absolute bg-primary h-1 select-none data-horizontal:h-full data-vertical:w-full"
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="relative size-3 rounded-full border bg-primary transition-[color,box-shadow] after:absolute after:-inset-2 focus-visible:outline-hidden block shrink-0 select-none disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
