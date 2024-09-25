export const setSibagiStorage = (props: {
  customCSS: string;
  customHtml: string;
}) => {
  const storageValue = props;

  if (typeof window !== 'undefined') {
    localStorage.setItem('sibagi:storage', JSON.stringify(storageValue));
  }
};

export const getSibagiStorage = (): {
  customCSS: string;
  customHtml: string;
} | null => {
  if (typeof window !== 'undefined') {
    const storedValue = localStorage.getItem('sibagi:storage');
    if (storedValue) {
      return JSON.parse(storedValue);
    }
  }
  return null;
};
