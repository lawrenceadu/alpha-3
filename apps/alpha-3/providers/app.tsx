'use client';

import React, { ReactNode } from 'react';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { useTranslations } from 'next-intl';
import { ToastContainer } from 'react-toastify';
import { SWRConfig } from 'swr';
import { http, validator } from '@alpha-3/utils';

function AppProvider({ children }: { children: ReactNode }) {
  /**
   * translate
   */
  const t = useTranslations('schema');

  /**
   * injections
   */
  validator.injectTranslate(t);

  /**
   * api
   */
  //   http.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_API;
  //   http.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  return (
    <SWRConfig
      value={{
        fetcher: (key, params) =>
          http.get<never, unknown>(key, params).then((response) => response),
        dedupingInterval: 1000 * 5,
        shouldRetryOnError: false,
        revalidateOnFocus: false,
      }}
    >
      {children}
      <ToastContainer hideProgressBar newestOnTop />
      <ProgressBar
        color="#07893B"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </SWRConfig>
  );
}

export default AppProvider;
