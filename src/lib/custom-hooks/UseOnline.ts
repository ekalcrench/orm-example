'use client';

import { useState, useEffect } from 'react';

export default function useOnline() {
  const [isOnline, setIsOnline] = useState<boolean>(true);

  const updateOnlineStatus = () => {
    setIsOnline(navigator.onLine);
  };

  useEffect(() => {
    // Check if the window object is defined (i.e., we are on the client side)
    if (typeof window !== 'undefined') {
      setIsOnline(navigator.onLine);
      window.addEventListener('online', updateOnlineStatus);
      window.addEventListener('offline', updateOnlineStatus);

      // Cleanup event listeners on component unmount
      return () => {
        window.removeEventListener('online', updateOnlineStatus);
        window.removeEventListener('offline', updateOnlineStatus);
      };
    }
  }, []);

  return { isOnline };
}
