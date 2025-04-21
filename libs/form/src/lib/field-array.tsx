'use client';

import React, { JSX } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

export type ArrayHelper<T> = {
  push: (item: T) => void;
  remove: (index: number) => void;
};

export interface FieldArrayProps<T> {
  name: string;
  children: (helpers: ArrayHelper<T>, values: any[]) => React.ReactNode;
}

export function FieldArray<T>({
  name,
  children,
}: FieldArrayProps<T>): JSX.Element {
  const items = useWatch({ name });
  const { getValues, setValue } = useFormContext();

  const push = (item: T) => {
    const values: T[] = getValues(name) || [];
    setValue(name, [...values, item]);
  };

  const remove = (index: number) => {
    const values: T[] = getValues(name) || [];
    setValue(
      name,
      values.filter((_, i) => i !== index)
    );
  };

  return <>{children({ push, remove }, items)}</>;
}
