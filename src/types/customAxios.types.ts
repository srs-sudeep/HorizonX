import type { AxiosRequestConfig } from 'axios';

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
  silentError?: boolean;
  headers?: AxiosRequestConfig['headers'] & {
    'x-error-context'?: string;
  };
}
