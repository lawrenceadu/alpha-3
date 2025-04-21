'use client';

import { UseFormSetValue, useWatch } from 'react-hook-form';
import { Datepicker, Dropdown } from '@alpha-3/ui';

export interface CalendarProps {
  name?: string;
  children: (date: any) => React.ReactNode;
  setFieldValue: UseFormSetValue<any>;
}

export function Calendar({ name, children, setFieldValue }: CalendarProps) {
  const date = useWatch({ name: name as string });

  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>{children({ date })}</Dropdown.Trigger>
      <Dropdown.Content className="max-w-[368px] !w-full !p-0">
        <Datepicker.Calendar
          mode="single"
          selected={date}
          onSelect={(date) => setFieldValue(name as string, date)}
        />
      </Dropdown.Content>
    </Dropdown.Root>
  );
}
