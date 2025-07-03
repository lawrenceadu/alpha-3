'use client';

import { Label as UiLabel } from '@alpha-3/ui';
import { cnExt } from '@alpha-3/utils';

export interface LabelProps {
  name?: string;
  children?: React.ReactNode;
  required?: boolean;
  optional?: boolean;
  className?: string;
}

export function Label({
  name,
  children,
  required,
  optional,
  className,
}: LabelProps) {
  return (
    <UiLabel.Root htmlFor={name} className={cnExt(className)}>
      {children}
      {required && <UiLabel.Asterisk />}
      {optional && <UiLabel.Sub>(Optional)</UiLabel.Sub>}
    </UiLabel.Root>
  );
}
