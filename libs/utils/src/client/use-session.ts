'use client';

import { useEffect, useState } from 'react';

export const useSession = <T>(
  key: string
): [T | undefined, (value: T | undefined) => void] => {
  /**
   * state
   */
  const [session, setSession] = useState<T | undefined>();

  /**
   * functions
   */
  const setItem = (value: T | undefined) => {
    const storage: Storage = window.sessionStorage;

    if (value) {
      storage.setItem(key, JSON.stringify(value));
    } else {
      storage.removeItem(key);
    }
    return setSession(value);
  };

  /**
   * effect
   */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storage: Storage = window.sessionStorage;
      const item = storage.getItem(key);

      if (item) {
        try {
          setSession(JSON.parse(item));
        } catch (e) {
          // console.log(e);
        }
      }
    }
  }, []);

  return [session, setItem];
};
