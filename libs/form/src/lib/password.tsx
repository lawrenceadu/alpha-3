'use client';

import { useState } from 'react';
import { RiEyeLine, RiEyeOffLine, RiLock2Line } from '@remixicon/react';

import { Input } from './input';

export function Password({ name }: { name?: string }) {
  /**
   * states
   */
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      name={name}
      placeholder="••••••••••"
      leadingIcon={RiLock2Line}
      type={showPassword ? 'text' : 'password'}
      inlineTrailingNode={
        <button type="button" onClick={() => setShowPassword((s) => !s)}>
          {showPassword ? (
            <RiEyeOffLine className="size-5 text-text-soft-400 group-has-[disabled]:text-text-disabled-300" />
          ) : (
            <RiEyeLine className="size-5 text-text-soft-400 group-has-[disabled]:text-text-disabled-300" />
          )}
        </button>
      }
    />
  );
}
