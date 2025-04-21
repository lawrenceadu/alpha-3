// AlignUI Drawer v0.0.0

'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { RiCloseLine } from '@remixicon/react';
import { cnExt } from '@alpha-3/utils';

import * as CompactButton from '../compact-button/compact-button';

const DrawerRoot = DialogPrimitive.Root;
DrawerRoot.displayName = 'Drawer';

const DrawerTrigger = DialogPrimitive.Trigger;
DrawerTrigger.displayName = 'DrawerTrigger';

const DrawerClose = DialogPrimitive.Close;
DrawerClose.displayName = 'DrawerClose';

const DrawerPortal = DialogPrimitive.Portal;
DrawerPortal.displayName = 'DrawerPortal';

const DrawerOverlay = ({
  className,
  ref,
  ...rest
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cnExt(
        // base
        'fixed inset-0 z-50 grid grid-cols-1 place-items-end overflow-hidden bg-overlay backdrop-blur-[10px]',
        // animation
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        className
      )}
      {...rest}
    />
  );
};
DrawerOverlay.displayName = 'DrawerOverlay';

const DrawerContent = ({
  className,
  children,
  ref,
  ...rest
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  return (
    <DrawerPortal>
      <DrawerOverlay>
        <DialogPrimitive.Content
          ref={ref}
          className={cnExt(
            // base
            'size-full max-w-[400px] overflow-y-auto',
            'border-l border-stroke-soft-200 bg-bg-white-0',
            // animation
            'data-[state=open]:duration-200 data-[state=open]:ease-out data-[state=open]:animate-in',
            'data-[state=closed]:duration-200 data-[state=closed]:ease-in data-[state=closed]:animate-out',
            'data-[state=open]:slide-in-from-right-full',
            'data-[state=closed]:slide-out-to-right-full',
            className
          )}
          {...rest}
        >
          <div className="relative flex size-full flex-col">{children}</div>
        </DialogPrimitive.Content>
      </DrawerOverlay>
    </DrawerPortal>
  );
};
DrawerContent.displayName = 'DrawerContent';

function DrawerHeader({
  className,
  children,
  showCloseButton = true,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & {
  showCloseButton?: boolean;
}) {
  return (
    <div
      className={cnExt(
        'flex items-center gap-3 border-stroke-soft-200 p-5',
        className
      )}
      {...rest}
    >
      {children}

      {showCloseButton && (
        <DrawerClose asChild>
          <CompactButton.Root variant="ghost" size="large">
            <CompactButton.Icon as={RiCloseLine} />
          </CompactButton.Root>
        </DrawerClose>
      )}
    </div>
  );
}
DrawerHeader.displayName = 'DrawerHeader';

const DrawerTitle = ({
  className,
  ref,
  ...rest
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> & {
  ref?: React.Ref<HTMLHeadingElement>;
}) => {
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={cnExt('flex-1 text-label-lg text-text-strong-950', className)}
      {...rest}
    />
  );
};
DrawerTitle.displayName = 'DrawerTitle';

function DrawerBody({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cnExt('flex-1', className)} {...rest}>
      {children}
    </div>
  );
}
DrawerBody.displayName = 'DrawerBody';

function DrawerFooter({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cnExt(
        'flex items-center gap-4 border-stroke-soft-200 p-5',
        className
      )}
      {...rest}
    />
  );
}
DrawerFooter.displayName = 'DrawerFooter';

export {
  DrawerRoot as Root,
  DrawerTrigger as Trigger,
  DrawerClose as Close,
  DrawerContent as Content,
  DrawerHeader as Header,
  DrawerTitle as Title,
  DrawerBody as Body,
  DrawerFooter as Footer,
};
