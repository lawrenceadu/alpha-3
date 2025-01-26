// AlignUI ProgressBar v0.0.0

import * as React from 'react';

import { tv, type VariantProps } from '@alpha-3/utils';

export const progressBarVariants = tv({
  slots: {
    root: 'h-1.5 w-full rounded-full bg-bg-soft-200',
    progress: 'h-full rounded-full transition-all duration-300 ease-out',
  },
  variants: {
    color: {
      blue: {
        progress: 'bg-information-base',
      },
      red: {
        progress: 'bg-error-base',
      },
      orange: {
        progress: 'bg-warning-base',
      },
      green: {
        progress: 'bg-success-base',
      },
    },
  },
  defaultVariants: {
    color: 'blue',
  },
});

type ProgressBarRootProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof progressBarVariants> & {
    value?: number;
    max?: number;
    ref?: React.Ref<HTMLDivElement>;
  };

const ProgressBarRoot = ({
  ref,
  className,
  color,
  value = 0,
  max = 100,
  ...rest
}: ProgressBarRootProps) => {
  const { root, progress } = progressBarVariants({ color });
  const safeValue = Math.min(max, Math.max(value, 0));

  return (
    <div ref={ref} className={root({ class: className })} {...rest}>
      <div
        className={progress()}
        style={{
          width: `${(safeValue / max) * 100}%`,
        }}
        aria-valuenow={value}
        aria-valuemax={max}
        role="progressbar"
      />
    </div>
  );
};
ProgressBarRoot.displayName = 'ProgressBarRoot';

export { ProgressBarRoot as Root };
