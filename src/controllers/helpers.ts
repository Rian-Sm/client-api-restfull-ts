import { ErrorResponse, HttpResponse, HttpStatusCode } from "./protocols";

export const ok = <T>(body: T): HttpResponse<T> => {
  return {
    statusCode: HttpStatusCode.OK,
    body,
  };
};
export const created = <T>(body: T): HttpResponse<T> => {
  return {
    statusCode: HttpStatusCode.CREATED,
    body,
  };
};
export const badRequest = (message: string): HttpResponse<ErrorResponse> => {
  return {
    statusCode: HttpStatusCode.BAD_REQUEST,
    body: { message },
  };
};
export const unauthorized = (message: string): HttpResponse<ErrorResponse> => {
  return {
    statusCode: HttpStatusCode.UNAUTHORIZADED,
    body: { message },
  };
};
export const internalError = (): HttpResponse<ErrorResponse> => {
  return {
    statusCode: HttpStatusCode.SERVER_ERROR,
    body: { message: "Somenthing went wrong." },
  };
};
