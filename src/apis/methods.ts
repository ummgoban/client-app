import axios, {AxiosResponse} from 'axios';
import {SERVER_URL} from '@env';

// TODO: Interceptor 이용 토큰 헤더 추가 필요
const client = axios.create({
  // TODO: 실제 URL 명시 필요
  baseURL: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
// TODO: Error handling 명시 및 반환 타입 정비 필요
export const get = async <T>(url: string): Promise<T | null> => {
  try {
    const res: AxiosResponse = await client.get(url);
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const post = async <T>(
  url: string,
  body?: unknown,
): Promise<T | null> => {
  try {
    const res: AxiosResponse = await client.post(url, body);
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const patch = async <T>(
  url: string,
  body: unknown,
): Promise<T | null> => {
  try {
    const res: AxiosResponse = await client.patch(url, body);
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const put = async <T>(url: string, body: unknown): Promise<T | null> => {
  try {
    const res: AxiosResponse = await client.put(url, body);
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const del = async <T>(
  url: string,
  body?: unknown,
): Promise<T | null> => {
  try {
    const res: AxiosResponse = await client.delete(url, {data: body});
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
