// AlignUI Label v0.0.0

'use client';

import * as React from 'react';
import * as LabelPrimitives from '@radix-ui/react-label';

import { cnExt } from '@alpha-3/utils';

const LabelRoot = ({
  ref,
  className,
  disabled,
  ...rest
}: React.ComponentPropsWithoutRef<typeof LabelPrimitives.Root> & {
  disabled?: boolean;
  ref?: React.Ref<React.ComponentRef<typeof LabelPrimitives.Root>>;
}) => {
  return (
    <LabelPrimitives.Root
      ref={ref}
      className={cnExt(
        'group cursor-pointer text-label-sm text-text-strong-950',
        'flex items-center gap-px',
        // disabled
        'aria-disabled:text-text-disabled-300',
        className
      )}
      aria-disabled={disabled}
      {...rest}
    />
  );
};
LabelRoot.displayName = 'LabelRoot';

function LabelAsterisk({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cnExt(
        'text-primary-base',
        // disabled
        'group-aria-disabled:text-text-disabled-300',
        className
      )}
      {...rest}
    >
      {children || '*'}
    </span>
  );
}

function LabelSub({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cnExt(
        'text-paragraph-sm text-text-sub-600',
        // disabled
        'group-aria-disabled:text-text-disabled-300',
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
}

export { LabelRoot as Root, LabelAsterisk as Asterisk, LabelSub as Sub };
