/**
 * Configuração base para chamadas à API.
 *
 * No futuro, basta trocar a BASE_URL para apontar para o backend real
 * (ex: process.env.NEXT_PUBLIC_API_URL) e toda a aplicação
 * estará conectada — sem tocar em nenhum componente.
 */
const BASE_URL = '/api';

type RequestOptions = RequestInit & {
  params?: Record<string, string>;
};

async function request<T>(endpoint: string, options?: RequestOptions): Promise<T> {
  let url = `${BASE_URL}${endpoint}`;

  if (options?.params) {
    const searchParams = new URLSearchParams(options.params);
    url = `${url}?${searchParams.toString()}`;
  }

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Erro na requisição: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'GET' }),
};
