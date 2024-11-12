import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import Config from 'react-native-config';

import {SessionType} from '@/types/Session';
import {getStorage} from '@/utils/storage';

class ApiClient {
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;

  private _JWTToken: string | null = null;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: Config.SERVER_API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.axiosInstance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const session: SessionType | null = await getStorage('session');

        console.log('session:', session);

        this._JWTToken = session?.jwtToken ?? null;

        if (this._JWTToken) {
          config.headers.Authorization = `Bearer ${this._JWTToken}`;
        }

        return config;
      },
      error => Promise.reject(error),
    );

    // 응답 인터셉터: 응답에서 토큰을 받아 저장
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        if (response.data && response.data.token) {
          this._JWTToken = response.data.token; // 토큰 갱신
          console.log('토큰 갱신:', this._JWTToken);
        }
        return response;
      },
      error => Promise.reject(error),
    );
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }

    return ApiClient.instance;
  }

  get = async <T>(
    url: string,
    config?: AxiosRequestConfig<any> | undefined,
  ): Promise<T | null> => {
    try {
      const res: AxiosResponse = await this.axiosInstance.get(url, config);
      console.debug('GET', url, res.data);

      if (res.data.code === 200 && res.data.data) {
        return res.data.data;
      }

      return null;
    } catch (error) {
      console.debug('GET', url, error);
      console.dir({error});
      return null;
    }
  };

  post = async <T>(
    url: string,
    body?: unknown,
    config?: AxiosRequestConfig<any> | undefined,
  ): Promise<T | null> => {
    try {
      const res: AxiosResponse = await this.axiosInstance.post(
        url,
        body,
        config,
      );

      console.debug('POST', url, res.data);

      return res.data;
    } catch (error) {
      console.debug('POST', url, error);
      console.error(error);

      return null;
    }
  };

  patch = async <T>(
    url: string,
    body: unknown,
    config?: AxiosRequestConfig<any> | undefined,
  ): Promise<T | null> => {
    try {
      const res: AxiosResponse = await this.axiosInstance.patch(
        url,
        body,
        config,
      );
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  put = async <T>(
    url: string,
    body: unknown,
    config?: AxiosRequestConfig<any> | undefined,
  ): Promise<T | null> => {
    try {
      const res: AxiosResponse = await this.axiosInstance.put(
        url,
        body,
        config,
      );
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  del = async <T>(
    url: string,
    config?: AxiosRequestConfig<any> | undefined,
  ): Promise<T | null> => {
    try {
      const res: AxiosResponse = await this.axiosInstance.delete(url, config);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
}

const apiClient = ApiClient.getInstance();

export default apiClient;
