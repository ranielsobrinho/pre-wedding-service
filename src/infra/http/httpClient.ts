import axios, { AxiosInstance } from "axios";
import {
  HttpClientProtocol,
  ResponseParams,
} from "@/data/protocols/httpClient/httpClientProtocol";

export class HttpClient implements HttpClientProtocol {
  private HttpInstance: AxiosInstance;

  constructor() {
    this.HttpInstance = axios.create({
      baseURL: "",
      timeout: 20000,
    });
  }

  async get<T>(fullURL: string, config?: object): Promise<ResponseParams<T>> {
    return this.HttpInstance.get(fullURL, config);
  }

  async post<T>(
    fullURL: string,
    data: any,
    config?: { params: any } | undefined,
  ): Promise<ResponseParams<T>> {
    return this.HttpInstance.post(fullURL, data, config);
  }
}
