'use client';

import { useFormContext, useWatch } from 'react-hook-form';
import { Textarea as UiTextarea } from '@alpha-3/ui';
import { helper } from '@alpha-3/utils';

export interface TextareaProps {
  name?: string;
  count?: number;
  placeholder?: string;
  className?: string;
}

export function Textarea({ count, name, ...props }: TextareaProps) {
  /**
   * form
   */
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const text = useWatch({ name: name as string });

  /**
   * variables
   */
  const hasError = !!helper.getNestedValue(errors, name as string);

  return (
    <UiTextarea.Root {...register(name as string)} {...{ ...props, hasError }}>
      {count && <UiTextarea.CharCounter current={text.length} max={count} />}
    </UiTextarea.Root>
  );
}
