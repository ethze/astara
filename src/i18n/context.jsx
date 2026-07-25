'use client';

import { createContext, useContext } from 'react';

const I18nContext = createContext({ dict: {}, locale: 'en' });

export function I18nProvider({ dict, locale, children }) {
  return (
    <I18nContext.Provider value={{ dict, locale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
