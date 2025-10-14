import { AxiosRequestConfig, AxiosResponse } from "axios";

export interface ResponseParams<T> extends AxiosResponse<T> {}

export interface HttpClientProtocol {
  get<T>(
    fullURL: string,
    config?: AxiosRequestConfig,
  ): Promise<ResponseParams<T>>;
  post<D, T>(
    fullURL: string,
    data: D,
    config?: AxiosRequestConfig & { responseEncoding?: "binary" },
  ): Promise<ResponseParams<T>>;
}
