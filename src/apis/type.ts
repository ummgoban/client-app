import {AxiosResponse} from 'axios';
export type ServiceFunc<Params = unknown | undefined, Res = unknown> = (
  params: Params,
) => Promise<AxiosResponse<Res>>;

export type ServiceFuncWithoutParams<Res = unknown> = () => Promise<
  AxiosResponse<Res>
>;
