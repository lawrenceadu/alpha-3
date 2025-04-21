'use client';

import { InputHTMLAttributes, JSX } from 'react';
import { Input as UiInput } from '@alpha-3/ui';
import { useFormContext } from 'react-hook-form';
import { cn, helper } from '@alpha-3/utils';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  name?: string;
  leadingIcon?: React.ComponentType<any>;
  trailingIcon?: React.ComponentType<any>;
  leadingNode?: React.ReactNode;
  trailingNode?: React.ReactNode;
  inlineLeadingNode?: React.ReactNode;
  inlineTrailingNode?: React.ReactNode;
}

export function Input({
  name,
  children,
  className,
  leadingNode,
  leadingIcon,
  trailingIcon,
  trailingNode,
  inlineLeadingNode,
  inlineTrailingNode,
  ...props
}: InputProps): JSX.Element {
  /**
   * form
   */
  const {
    register,
    formState: { errors },
  } = useFormContext();

  /**
   * variables
   */
  const hasError = !!helper.getNestedValue(errors, name as string);

  return (
    <UiInput.Root className={cn(className)} {...{ hasError }}>
      {leadingNode}
      <UiInput.Wrapper>
        {inlineLeadingNode}
        {leadingIcon && <UiInput.Icon as={leadingIcon} />}
        {children || (
          <UiInput.Input id={name} {...register(name as string)} {...props} />
        )}
        {trailingIcon && <UiInput.Icon as={trailingIcon} />}
        {inlineTrailingNode}
      </UiInput.Wrapper>
      {trailingNode}
    </UiInput.Root>
  );
}

export default Object.assign(Input, { ...UiInput });
