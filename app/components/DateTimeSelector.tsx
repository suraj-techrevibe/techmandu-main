'use client';

import * as React from 'react';
import { Button } from '~/components/ui/button';
import { Calendar } from '~/components/ui/calendar';
import { Field, FieldGroup, FieldLabel } from '~/components/ui/field';
import { Input } from '~/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { format } from 'date-fns';
import { ChevronDownIcon } from 'lucide-react';

export function DateTimeSelector({
  date,
  setDate,
}: {
  date: Date | undefined;
  setDate: (date: Date) => void;
}) {
  const [open, setOpen] = React.useState(false);

  // derive time string from provided date (HH:mm:ss) so the input reflects the actual time
  const timeValue = React.useMemo(() => {
    return date ? format(date, 'HH:mm:ss') : '';
  }, [date]);

  // when user changes time input, merge the new time into the existing date (or today if none)
  const handleTimeChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value; // expected "HH:mm" or "HH:mm:ss"
      if (!val) return;
      const parts = val.split(':').map((p) => parseInt(p, 10) || 0);
      const hours = parts[0] ?? 0;
      const minutes = parts[1] ?? 0;
      const seconds = parts[2] ?? 0;

      const base = date ? new Date(date) : new Date();
      base.setHours(hours, minutes, seconds, 0);
      setDate(base);
    },
    [date, setDate],
  );

  return (
    <FieldGroup className="mx-auto flex-row">
      <Field>
        <FieldLabel htmlFor="date-picker-optional">Date</FieldLabel>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker-optional"
              className="w-32 justify-between font-normal"
            >
              {date ? format(date, 'PPP') : 'Select date'}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              disabled={(date) => date < new Date()}
              defaultMonth={date}
              onSelect={(date) => {
                if (date) setDate(date);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </Field>
      <Field className="w-32">
        <FieldLabel htmlFor="time-picker-optional">Time</FieldLabel>
        <Input
          type="time"
          id="time-picker-optional"
          step="1"
          value={timeValue}
          onChange={handleTimeChange}
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </Field>
    </FieldGroup>
  );
}
