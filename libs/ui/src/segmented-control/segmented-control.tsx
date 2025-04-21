// AlignUI SegmentedControl v0.0.0

'use client';

import * as React from 'react';
import { Slottable } from '@radix-ui/react-slot';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import mergeRefs from 'merge-refs';

import { useTabObserver } from '@alpha-3/utils';
import { cnExt } from '@alpha-3/utils';

const SegmentedControlRoot = TabsPrimitive.Root;
SegmentedControlRoot.displayName = 'SegmentedControlRoot';

const SegmentedControlList = ({
  children,
  className,
  floatingBgClassName,
  ref,
  ...rest
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
  floatingBgClassName?: string;
  ref?: React.Ref<HTMLDivElement>;
}) => {
  const [lineStyle, setLineStyle] = React.useState({ width: 0, left: 0 });

  const { mounted, listRef } = useTabObserver({
    onActiveTabChange: (_, activeTab) => {
      const { offsetWidth: width, offsetLeft: left } = activeTab;
      setLineStyle({ width, left });
    },
  });

  return (
    <TabsPrimitive.List
      ref={mergeRefs(ref, listRef)}
      className={cnExt(
        'relative isolate grid w-full auto-cols-fr grid-flow-col gap-1 rounded-10 bg-bg-weak-50 p-1',
        className
      )}
      {...rest}
    >
      <Slottable>{children}</Slottable>

      {/* floating bg */}
      <div
        className={cnExt(
          'absolute inset-y-1 left-0 -z-10 rounded-md bg-bg-white-0 shadow-toggle-switch transition-transform duration-300',
          {
            hidden: !mounted,
          },
          floatingBgClassName
        )}
        style={{
          transform: `translate3d(${lineStyle.left}px, 0, 0)`,
          width: `${lineStyle.width}px`,
          transitionTimingFunction: 'cubic-bezier(0.65, 0, 0.35, 1)',
        }}
        aria-hidden="true"
      />
    </TabsPrimitive.List>
  );
};
SegmentedControlList.displayName = 'SegmentedControlList';

const SegmentedControlTrigger = ({
  className,
  ref,
  ...rest
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
  ref?: React.Ref<HTMLButtonElement>;
}) => {
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cnExt(
        // base
        'peer',
        'relative z-10 h-7 whitespace-nowrap rounded-md px-1 text-label-sm text-text-soft-400 outline-none',
        'flex items-center justify-center gap-1.5',
        'transition duration-300 ease-out',
        // focus
        'focus:outline-none',
        // active
        'data-[state=active]:text-text-strong-950',
        className
      )}
      {...rest}
    />
  );
};
SegmentedControlTrigger.displayName = 'SegmentedControlTrigger';

const SegmentedControlContent = ({
  ref,
  ...rest
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  return <TabsPrimitive.Content ref={ref} {...rest} />;
};
SegmentedControlContent.displayName = 'SegmentedControlContent';

export {
  SegmentedControlRoot as Root,
  SegmentedControlList as List,
  SegmentedControlTrigger as Trigger,
  SegmentedControlContent as Content,
};
