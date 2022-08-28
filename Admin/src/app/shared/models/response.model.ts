export interface IResponseModel<T> {
  data: T;
  exception: any;
  message: string;
  totalData: number;
}
