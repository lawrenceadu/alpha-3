'use client';

import React, { HtmlHTMLAttributes } from 'react';
import { cn } from '@alpha-3/utils';

import { Error } from './error';

export interface GroupProps extends HtmlHTMLAttributes<HTMLDivElement> {
  name: string;
  disabled?: boolean;
}

export function Group({
  name,
  children,
  className,
  disabled,
  ...props
}: GroupProps) {
  return (
    <div className={cn(className)} {...props}>
      {React.Children.map(children, (child: React.ReactNode, index) => {
        if (!React.isValidElement(child)) {
          return child;
        }

        return React.cloneElement(child, { name, disabled, ...child.props });
      })}

      <Error name={name} />
    </div>
  );
}
