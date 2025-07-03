'use client';

// confirm.ts
import {
  createConfirmationCreater,
  createReactTreeMounter,
  createMountPoint,
  confirmable as baseConfirmable,
} from 'react-confirm';

// this mounter will render *within* your app’s tree
const mounter = createReactTreeMounter();
export const createConfirmation = createConfirmationCreater(mounter);
export const ConfirmMountPoint = createMountPoint(mounter);
export const confirmable = baseConfirmable;
