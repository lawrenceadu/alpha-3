import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cnExt } from '@alpha-3/utils';

const SLIDER_ROOT_NAME = 'SliderRoot';
const SLIDER_THUMB_NAME = 'SliderThumb';

const SliderRoot = ({
  ref,
  className,
  children,
  ...rest
}: React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
  ref?: React.Ref<React.ComponentRef<typeof SliderPrimitive.Root>>;
}) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cnExt(
      'relative flex h-4 w-full touch-none select-none items-center',
      className
    )}
    {...rest}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full overflow-hidden rounded-full bg-bg-soft-200">
      <SliderPrimitive.Range className="absolute h-full bg-primary-base" />
    </SliderPrimitive.Track>
    {children}
  </SliderPrimitive.Root>
);
SliderRoot.displayName = SLIDER_ROOT_NAME;

const SliderThumb = ({
  ref,
  className,
  ...rest
}: React.ComponentPropsWithoutRef<typeof SliderPrimitive.Thumb> & {
  ref?: React.Ref<React.ComponentRef<typeof SliderPrimitive.Thumb>>;
}) => {
  return (
    <SliderPrimitive.Thumb
      ref={ref}
      className={cnExt(
        [
          // base
          'box-content block size-1.5 shrink-0 cursor-pointer rounded-full border-[5px] border-static-white bg-primary-base shadow-toggle-switch outline-none',
          // focus
          'focus:outline-none',
        ],
        className
      )}
      {...rest}
    />
  );
};
SliderThumb.displayName = SLIDER_THUMB_NAME;

export { SliderRoot as Root, SliderThumb as Thumb };
