import { Response } from 'express';

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export class HttpResponse {
  estado(
    res: Response,
    data?: {
      estado: {
        correlativo: string;
        status: number;
      }[];
    },
  ) {
    return res.json(data);
  }

  Ok(res: Response, data?: any): Response {
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: 'Success',
      data: data,
    });
  }

  Created(res: Response, data?: any): Response {
    return res.status(HttpStatus.CREATED).json({
      status: HttpStatus.CREATED,
      message: 'Created',
      data: data,
    });
  }

  BadRequest(res: Response, data?: any) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      status: HttpStatus.BAD_REQUEST,
      message: 'Bad Request',
      error: data,
    });
  }

  Unauthorized(res: Response, data?: any) {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      status: HttpStatus.UNAUTHORIZED,
      message: 'Unauthorized',
      error: data,
    });
  }

  Forbidden(res: Response, data?: any) {
    return res.status(HttpStatus.FORBIDDEN).json({
      status: HttpStatus.FORBIDDEN,
      message: 'Forbidden',
      error: data,
    });
  }

  NotFound(res: Response, data?: any) {
    return res.status(HttpStatus.NOT_FOUND).json({
      status: HttpStatus.NOT_FOUND,
      message: 'Not Found',
      error: data,
    });
  }

  Error(res: Response, data?: any) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
      error: data,
    });
  }
}
