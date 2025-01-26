// AlignUI Dropdown v0.0.0

'use client';

import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { RiArrowRightSLine } from '@remixicon/react';

import { cnExt, PolymorphicComponentProps } from '@alpha-3/utils';

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;
const DropdownMenuCheckboxItem = DropdownMenuPrimitive.CheckboxItem;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
const DropdownMenuRadioItem = DropdownMenuPrimitive.RadioItem;
const DropdownMenuSeparator = DropdownMenuPrimitive.Separator;
const DropdownMenuArrow = DropdownMenuPrimitive.Arrow;

const DropdownMenuContent = ({
  ref,
  className,
  sideOffset = 8,
  ...rest
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> & {
  ref?: React.Ref<React.ComponentRef<typeof DropdownMenuPrimitive.Content>>;
}) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cnExt(
        'z-50 w-[300px] overflow-hidden rounded-2xl bg-bg-white-0 p-2 shadow-regular-md ring-1 ring-inset ring-stroke-soft-200',
        'flex flex-col gap-1',
        // origin
        'data-[side=bottom]:origin-top data-[side=left]:origin-right data-[side=right]:origin-left data-[side=top]:origin-bottom',
        // animation
        'data-[state=open]:animate-in data-[state=open]:fade-in-0',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      {...rest}
    />
  </DropdownMenuPrimitive.Portal>
);
DropdownMenuContent.displayName = 'DropdownMenuContent';

const DropdownMenuItem = ({
  ref,
  className,
  inset,
  ...rest
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  ref?: React.Ref<React.ComponentRef<typeof DropdownMenuPrimitive.Item>>;
}) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cnExt(
      // base
      'group/item relative cursor-pointer select-none rounded-lg p-2 text-paragraph-sm text-text-strong-950 outline-none',
      'flex items-center gap-2',
      'transition duration-200 ease-out',
      // hover
      'data-[highlighted]:bg-bg-weak-50',
      // focus
      'focus:outline-none',
      // disabled
      'data-[disabled]:text-text-disabled-300',
      inset && 'pl-9',
      className
    )}
    {...rest}
  />
);
DropdownMenuItem.displayName = 'DropdownMenuItem';

function DropdownItemIcon<T extends React.ElementType>({
  className,
  as,
  ...rest
}: PolymorphicComponentProps<T>) {
  const Component = as || 'div';

  return (
    <Component
      className={cnExt(
        // base
        'size-5 text-text-sub-600',
        // disabled
        'group-has-[[data-disabled]]:text-text-disabled-300',
        className
      )}
      {...rest}
    />
  );
}
DropdownItemIcon.displayName = 'DropdownItemIcon';

const DropdownMenuGroup = ({
  ref,
  className,
  ...rest
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Group> & {
  ref?: React.Ref<React.ComponentRef<typeof DropdownMenuPrimitive.Group>>;
}) => (
  <DropdownMenuPrimitive.Group
    ref={ref}
    className={cnExt('flex flex-col gap-1', className)}
    {...rest}
  />
);
DropdownMenuGroup.displayName = 'DropdownMenuGroup';

const DropdownMenuLabel = ({
  ref,
  className,
  ...rest
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
  ref?: React.Ref<React.ComponentRef<typeof DropdownMenuPrimitive.Label>>;
}) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cnExt(
      'px-2 py-1 text-subheading-xs uppercase text-text-soft-400',
      className
    )}
    {...rest}
  />
);
DropdownMenuLabel.displayName = 'DropdownMenuLabel';

const DropdownMenuSubTrigger = ({
  ref,
  className,
  inset,
  children,
  ...rest
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
  ref?: React.Ref<React.ComponentRef<typeof DropdownMenuPrimitive.SubTrigger>>;
}) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cnExt(
      // base
      'group/item relative cursor-pointer select-none rounded-lg p-2 text-paragraph-sm text-text-strong-950 outline-0',
      'flex items-center gap-2',
      'transition duration-200 ease-out',
      // hover
      'data-[highlighted]:bg-bg-weak-50',
      // disabled
      'data-[disabled]:text-text-disabled-300',
      inset && 'pl-9',
      className
    )}
    {...rest}
  >
    {children}
    <span className="flex-1" />
    <DropdownItemIcon as={RiArrowRightSLine} />
  </DropdownMenuPrimitive.SubTrigger>
);
DropdownMenuSubTrigger.displayName = 'DropdownMenuSubTrigger';

const DropdownMenuSubContent = ({
  ref,
  className,
  ...rest
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent> & {
  ref?: React.Ref<React.ComponentRef<typeof DropdownMenuPrimitive.SubContent>>;
}) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cnExt(
      'z-50 w-max overflow-hidden rounded-2xl bg-bg-white-0 p-2 shadow-regular-md ring-1 ring-inset ring-stroke-soft-200',
      'flex flex-col gap-1',
      // animation
      'data-[state=open]:animate-in data-[state=open]:fade-in-0',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
      'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
      'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className
    )}
    {...rest}
  />
);
DropdownMenuSubContent.displayName = 'DropdownMenuSubContent';

export {
  DropdownMenu as Root,
  DropdownMenuPortal as Portal,
  DropdownMenuTrigger as Trigger,
  DropdownMenuContent as Content,
  DropdownMenuItem as Item,
  DropdownItemIcon as ItemIcon,
  DropdownMenuGroup as Group,
  DropdownMenuLabel as Label,
  DropdownMenuSub as MenuSub,
  DropdownMenuSubTrigger as MenuSubTrigger,
  DropdownMenuSubContent as MenuSubContent,
  DropdownMenuCheckboxItem as CheckboxItem,
  DropdownMenuRadioGroup as RadioGroup,
  DropdownMenuRadioItem as RadioItem,
  DropdownMenuSeparator as Separator,
  DropdownMenuArrow as Arrow,
};
