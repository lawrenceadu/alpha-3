'use client';

import React, { ReactNode } from 'react';
import { AppProgressProvider } from '@bprogress/next';
import { useTranslations } from 'next-intl';
import { http, validator } from '@alpha-3/utils';
import { ToastContainer } from 'react-toastify';
import { SWRConfig } from 'swr';

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
      <AppProgressProvider
        shallowRouting
        color="#07893B"
        options={{ showSpinner: false }}
      >
        {children}
      </AppProgressProvider>
      <ToastContainer hideProgressBar newestOnTop />
    </SWRConfig>
  );
}

export default AppProvider;
