export interface authorType {
    email: string;
    nombre: string;
    apellido: string;
    edad: number;
    alias: string;
    avatar: string;
  }
export interface messageType {
    author: authorType;
    text: string;
    timeStamp: string;
  }

export interface FormDataType {
    userName: string;
    password: string;
}

export type TApiResponse = {
  data: any;
  isLoading: Boolean;
};