import { getSession } from '@/actions';

export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {},
  params?: Record<string, any>
) => {
  const session = await getSession();

  const headers = {
    ...options.headers,
    Authorization: session?.sessionId ? `Bearer ${session.sessionId}` : '', // Add the Authorization header
    'Content-Type': 'application/json',
  };

  // If params are provided, add them to the URL
  if (params) {
    const queryParams = new URLSearchParams(params).toString();
    url = `${url}?${queryParams}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  return response;
};
