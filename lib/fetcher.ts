export type QueryParams = Record<string, string | number | boolean | null | undefined>;

export type FetcherOptions = (RequestInit & {
  params?: QueryParams;
  timeoutMs?: number;
  parseJson?: boolean; // default true
}) & {
  // Next.js fetch options (optional)
  next?: { revalidate?: number; tags?: string[] };
};

const DEFAULT_TIMEOUT_MS = 15000;

function buildUrl(input: string, params?: QueryParams) {
  const isAbsolute = /^https?:\/\//i.test(input);
  const base = isAbsolute ? '' : (process.env.NEXT_PUBLIC_API_BASE_URL || '');
  const url = new URL(input.replace(/^\//, ''), base.replace(/\/?$/, '/') );
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      url.searchParams.set(key, String(value));
    });
  }
  return url.toString();
}

export async function request<T = unknown>(path: string, options: FetcherOptions = {}): Promise<T> {
  const { params, timeoutMs = DEFAULT_TIMEOUT_MS, parseJson = true, headers, ...rest } = options;
  const url = buildUrl(path, params);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      ...rest,
      headers: {
        'Accept': 'application/json',
        ...(rest.body && !(headers && 'Content-Type' in headers) ? { 'Content-Type': 'application/json' } : {}),
        ...(headers || {}),
      },
      signal: controller.signal,
      // preserve next options if provided
      next: (options as any).next,
      cache: options.cache,
    } as any);

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      const err = new Error(`HTTP ${res.status} ${res.statusText}: ${text}`);
      (err as any).status = res.status;
      (err as any).body = text;
      throw err;
    }

    if (!parseJson) {
      return (await res.text()) as unknown as T;
    }

    // Handle empty responses
    const contentLength = res.headers.get('content-length');
    if (contentLength === '0' || res.status === 204) {
      return undefined as unknown as T;
    }

    return (await res.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}

export const get = <T = unknown>(path: string, options?: Omit<FetcherOptions, 'method' | 'body'>) =>
  request<T>(path, { ...options, method: 'GET' });

export const post = <T = unknown, B = unknown>(path: string, body?: B, options?: Omit<FetcherOptions, 'method' | 'body'>) =>
  request<T>(path, { ...options, method: 'POST', body: body != null ? JSON.stringify(body) : undefined });

export const put = <T = unknown, B = unknown>(path: string, body?: B, options?: Omit<FetcherOptions, 'method' | 'body'>) =>
  request<T>(path, { ...options, method: 'PUT', body: body != null ? JSON.stringify(body) : undefined });

export const patch = <T = unknown, B = unknown>(path: string, body?: B, options?: Omit<FetcherOptions, 'method' | 'body'>) =>
  request<T>(path, { ...options, method: 'PATCH', body: body != null ? JSON.stringify(body) : undefined });

export const del = <T = unknown>(path: string, options?: Omit<FetcherOptions, 'method' | 'body'>) =>
  request<T>(path, { ...options, method: 'DELETE' });


