export function emptyFunc() {
  return;
}

export function numberWithDot(number: number): string {
  return number.toLocaleString('id');
}

export function numberToK(number: number): string {
  return `${(number / 1000).toLocaleString('id')}k`;
}

export function convertToCurrency(number: number): string {
  return `Rp ${number.toLocaleString('id')}`;
}

export function hexToRGBA(hex: string) {
  // Check if the hex code is valid
  const hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i;
  const result = hexRegex.exec(hex);
  if (!result) return null; // Invalid hex code

  // Separate the components
  const [, r, g, b, a] = result.map((component) =>
    parseInt(component || 'ff', 16)
  );

  // Convert alpha value to a range between 0 and 1
  const alpha = typeof a !== 'undefined' ? (a / 255).toFixed(2) : '1';

  // Return the RGBA values as an object
  return {
    r,
    g,
    b,
    a: parseFloat(alpha),
  };
}

export function transformValueToLabel(input: string): string {
  // Convert the input string to lower case and replace underscores with spaces
  const transformed = input.toLowerCase().replace(/_/g, ' ');

  // Split the transformed string into words and capitalize the first letter of each word
  const capitalized = transformed
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return capitalized;
}

export interface MetaType {
  page: number;
  pageSize: number;
  totalData: number;
  totalPages: number;
}

export interface PaginatedData<DATA = any> {
  data: DATA;
  meta: MetaType;
}
