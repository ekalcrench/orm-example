import { useEffect, useState } from 'react';

export default function useLocalStorageChange(key: string) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  });

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        setStoredValue(event.newValue);
      }
    };

    // Listen to localStorage changes from other tabs/windows
    window.addEventListener('storage', handleStorageChange);

    // Optional: listen to changes in the same tab
    const handleSameTabChange = () => {
      setStoredValue(localStorage.getItem(key));
    };

    window.addEventListener('focus', handleSameTabChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleSameTabChange);
    };
  }, [key]);

  return storedValue;
}
