import { createContext, useState, useContext, Dispatch, SetStateAction, useEffect } from 'react';
import Cookies from 'js-cookie';

interface LocaleContextProps {
  locale: string;
  setLocale: Dispatch<SetStateAction<string>>;
}

// Default locale value
const defaultLocale = 'en';

// Create a context for locale with a default value
const LocaleContext = createContext<LocaleContextProps>({ locale: defaultLocale, setLocale: () => {} });

// LocaleProvider component that provides the locale state to its children
export function LocaleProvider({ children, initialLocale }) {
  // State for the locale
  const [locale, setLocale] = useState(initialLocale || defaultLocale);

  // Save the locale to cookies whenever it changes
  useEffect(() => {
    Cookies.set('locale', locale);
  }, [locale]);

  // Value to be provided to the children
  const value = { locale, setLocale };

  // Provide the locale state to the children
  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

// Hook to use the locale context
export function useLocale() {
  // Use the locale context
  return useContext(LocaleContext);
}