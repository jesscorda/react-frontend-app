import { useState, useEffect } from 'react';

type UseLocalStorageHook<T> = [T, (value: T | ((value: T) => T)) => void];

const useLocalStorage = <T>(key: string, initialValue: T): UseLocalStorageHook<T> => {
  const [value, setValue] = useState(() => {
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
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
