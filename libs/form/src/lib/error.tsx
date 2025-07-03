'use client';

import { useFormContext } from 'react-hook-form';
import { helper } from '@alpha-3/utils';
import { Hint } from '@alpha-3/ui';

export function Error({ name }: { name: string }) {
  const {
    formState: { errors },
  } = useFormContext();

  const error = helper.getNestedValue(errors, name as string);

  if (!error) {
    return null;
  }

  return <Hint.Root hasError>{error.message}</Hint.Root>;
}
