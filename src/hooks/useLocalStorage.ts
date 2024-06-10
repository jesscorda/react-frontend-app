import { useState, useEffect } from 'react';

type UseLocalStorageHook<T> = [
  T | null,
  (value: T | null | ((value: T | null) => T | null)) => void,
];

const useLocalStorage = <T>(key: string, initialValue: T | null): UseLocalStorageHook<T> => {
  const [value, setValue] = useState<T | null>(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      try {
        const parsedValue = JSON.parse(storedValue);
        return parsedValue;
      } catch (error) {
        console.error(`Failed to parse local storage value for key "${key}"`, error);
      }
    }
    return initialValue;
  });

  useEffect(() => {
    if (value === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
