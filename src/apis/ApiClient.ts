import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import Config from 'react-native-config';

import {SessionType} from '@/types/Session';
import {getStorage, setStorage} from '@/utils/storage';
import CustomError from './CustomError';
import {refreshAccessToken} from './auth/client';

class ApiClient {
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;

  private _jwt: string | null = null;

  private async setAuthorizationHeader(
    config: InternalAxiosRequestConfig,
  ): Promise<void> {
    const session: SessionType | null = await getStorage('session');
    this._jwt = session?.accessToken ?? null;

    if (!this._jwt) {
      return;
    }

    /**
     * OAuth 서비스에 따라 refreshToken이 없는 경우가 있어. AccessToken 만료 시 강제 로그아웃 처리
     */
    const isOAuthTokenExpired =
      session &&
      session.OAuthProvider !== 'BASIC' &&
      session.accessTokenExpiresAt &&
      session.accessTokenExpiresAt < Date.now();

    // Oauth 토큰이 만료된 경우에 강제 로그아웃
    if (isOAuthTokenExpired) {
      console.debug('OAuth token expired. Force Sign Out');
      // setStorage('session', {});
      this._jwt = null;
      config.headers.Authorization = null;
      return;
    }

    // 리프레쉬 토큰이 있는 경우 갱신
    // 리프레쉬 토큰 갱신 실패 시 강제 로그아웃
    if (session?.refreshToken) {
      try {
        const newSession = await refreshAccessToken(session.refreshToken);

        if (newSession) {
          setStorage('session', newSession);

          config.headers.Authorization = `Bearer ${newSession.accessToken}`;
          return;
        } else {
          setStorage('session', {});
          this._jwt = null;
          config.headers.Authorization = null;
        }
      } catch (error) {
        console.error('Error refreshing access token:', error);
        setStorage('session', {});
        this._jwt = null;
        config.headers.Authorization = null;
      }
    }

    config.headers.Authorization = `Bearer ${this._jwt}`;
  }

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: Config.SERVER_API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.axiosInstance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        if (config.url?.includes('/auth/refresh')) {
          // Skip authorization header for refresh token request
          return config;
        }

        await this.setAuthorizationHeader(config);
        return config;
      },
      error => Promise.reject(error),
    );

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        if (response.data?.token) {
          this._jwt = response.data.token; // Update token
          console.debug('Token updated:', this._jwt);
        }
        return response;
      },
      async error => {
        const errorCode = error.response?.data?.errorCode;
        if (errorCode === 401) {
          console.debug('Token expired. Force Sign Out');
          await this.setAuthorizationHeader(error.config);
        } else if (errorCode === 400) {
        }
        console.debug(`[${errorCode}] ${error.response?.data?.errorMessage}`);
        Promise.reject(error);
      },
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
      console.debug('GET', url, JSON.stringify(config, null, 2));
      const res: AxiosResponse = await this.axiosInstance.get(url, config);
      console.debug('GET', url, JSON.stringify(res.data, null, 2));

      if (res.data.code === 200 && res.data.data) {
        return res.data.data;
      }

      return null;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          console.error(
            'GET',
            url,
            JSON.stringify(error.response.data, null, 2),
          );
          throw new CustomError(error.response.data);
        }
      }

      console.error('unknown error', JSON.stringify(error, null, 2));

      return null;
    }
  };

  post = async <T, D = unknown>(
    url: string,
    body?: D,
    config?: AxiosRequestConfig<D> | undefined,
  ): Promise<T | null> => {
    try {
      console.debug(
        'POST',
        url,
        JSON.stringify(body, null, 2),
        JSON.stringify(config, null, 2),
      );
      const res: AxiosResponse<T, D> = await this.axiosInstance.post(
        url,
        body,
        config,
      );

      console.debug('POST', url, JSON.stringify(res.data, null, 2));

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          console.error(
            'POST',
            url,
            JSON.stringify(error.response.data, null, 2),
          );
          throw new CustomError(error.response.data);
        }
      }

      console.error('unknown error', JSON.stringify(error, null, 2));

      return null;
    }
  };

  patch = async <T, D = unknown>(
    url: string,
    body: D,
    config?: AxiosRequestConfig<D> | undefined,
  ): Promise<T | null> => {
    try {
      console.debug(
        'PATCH',
        url,
        JSON.stringify(body, null, 2),
        JSON.stringify(config, null, 2),
      );
      const res: AxiosResponse<T, D> = await this.axiosInstance.patch(
        url,
        body,
        config,
      );

      console.debug('PATCH', url, JSON.stringify(res.data, null, 2));

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          console.error(
            'PATCH',
            url,
            JSON.stringify(error.response.data, null, 2),
          );
          throw new CustomError(error.response.data);
        }
      }

      console.error('unknown error', JSON.stringify(error, null, 2));

      return null;
    }
  };

  put = async <T, D = unknown>(
    url: string,
    body: D,
    config?: AxiosRequestConfig<D> | undefined,
  ): Promise<T | null> => {
    try {
      console.debug(
        'PUT',
        url,
        JSON.stringify(body, null, 2),
        JSON.stringify(config, null, 2),
      );
      const res: AxiosResponse<T, D> = await this.axiosInstance.put(
        url,
        body,
        config,
      );

      console.debug('PUT', url, JSON.stringify(res.data, null, 2));

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          console.error(
            'PUT',
            url,
            JSON.stringify(error.response.data, null, 2),
          );
          throw new CustomError(error.response.data);
        }
      }

      console.error('unknown error', JSON.stringify(error, null, 2));

      return null;
    }
  };

  del = async <T, D = unknown>(
    url: string,
    config?: AxiosRequestConfig<D> | undefined,
  ): Promise<T | null> => {
    try {
      const res: AxiosResponse<T, D> = await this.axiosInstance.delete(
        url,
        config,
      );

      console.debug('DELETE', url, JSON.stringify(res.data, null, 2));

      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          console.error(
            'DELETE',
            url,
            JSON.stringify(error.response.data, null, 2),
          );
          throw new CustomError(error.response.data);
        }
      }

      console.error('unknown error', JSON.stringify(error, null, 2));

      return null;
    }
  };
}

const apiClient = ApiClient.getInstance();

export default apiClient;
