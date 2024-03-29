export enum EnumHttpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export type SuccessResponse = {
  data: any;
  statusCode: EnumHttpStatusCode;
}

export type ErrorResponse = {
  statusCode: EnumHttpStatusCode;
  error: string;
  message: string;
}
