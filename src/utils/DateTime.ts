import { format } from 'date-fns';

export function formatDateddMMMyyyyhhmm(value: string) {
  return `${format(new Date(value), 'dd MMM yyyy, HH:mm')}`;
}
