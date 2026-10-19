import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { set } from 'zod';
import { CurrencyCode } from '~/generated/graphql';

interface CurrencyContextType {
  currency: CurrencyCode;
  updateCurrency: (currency: CurrencyCode) => void;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: CurrencyCode.Usd,
  updateCurrency: () => {},
});

export const CurrencyProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currency, setCurrency] = useState(CurrencyCode.Usd);

  const updateCurrency = useCallback((newCurrency: CurrencyCode) => {
    setCurrency(newCurrency);
    if (typeof window !== 'undefined') {
      localStorage.setItem('currency', newCurrency);
    }
  }, []);

  // fetch currency from localStorage on initial load

  const fetchCurrency = async () => {
    try {
      const res = await fetch('https://ipapi.co/json/');
      const data = await res.json();
      const countryCode = data.country_code;

      let currency = CurrencyCode.Npr;
      switch (countryCode) {
        case 'US':
          currency = CurrencyCode.Usd;
          break;
        case 'AUS':
          currency = CurrencyCode.Aud;
          break;
        default:
          currency = CurrencyCode.Npr;
      }
      setCurrency(currency);
      localStorage.setItem('currency', currency);
    } catch (error) {
      console.error('error while getting country code');
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCurrency = localStorage.getItem('currency') as CurrencyCode;
      if (storedCurrency) {
        setCurrency(storedCurrency);
      } else {
        fetchCurrency();
      }
    }
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency, updateCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (ctx === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return ctx;
};
