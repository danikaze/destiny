import { HttpMethod } from '@api';
import { addUrlParams } from './url';

export interface CallApiOptions<Q extends {} = {}, B extends {} = {}> {
  /**
   * Data to pass in the query string
   */
  params?: Q;
  /**
   * Data to pass in the body
   */
  data?: B;
  /**
   * Milliseconds before timing-out (falsy or <0 value to disable)
   * Default is 10 seconds.
   */
  timeout?: number;
}

interface ApiResponse<R> {
  data: R;
}

export interface ApiErrorResponse {
  error: true;
  msg: string;
  id?: string;
}

type MethodOptions<
  M extends HttpMethod,
  Q extends {} = {},
  B extends {} = {}
> = CallApiOptions<Q, M extends 'GET' | 'HEAD' ? never : B>;

const defaultOptions: Partial<CallApiOptions> = {
  timeout: 10000,
};

export function callApi<
  R extends {},
  Q extends {} = {},
  B extends {} = {},
  M extends HttpMethod = HttpMethod
>(apiUrl: string, method: M, opt: MethodOptions<M, Q, B> = {}): Promise<R> {
  const options = {
    ...defaultOptions,
    ...opt,
  };

  return new Promise<R>((resolve, reject) => {
    let timeoutHandler: number;
    if (options.timeout! > 0) {
      timeoutHandler = window.setTimeout(
        () => reject('timeout'),
        options.timeout!
      );
    }

    const body = options.data ? JSON.stringify(options.data) : undefined;
    let url = `/api/${apiUrl}`;

    if (!IS_PRODUCTION && url[url.length - 1] === '/') {
      // tslint:disable-next-line: no-console
      console.error(`callApi URLs shouldn't end with "/" (${apiUrl})`);
    }

    if (options.params) {
      url = addUrlParams(url, options.params);
    }

    fetch(url, {
      method,
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async (response) => {
      clearTimeout(timeoutHandler);
      const res = (await response.json()) as ApiResponse<R> | ApiErrorResponse;
      if ('error' in res) {
        reject(res);
        return;
      }
      resolve(res.data);
    });
  });
}
