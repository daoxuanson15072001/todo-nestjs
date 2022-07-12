import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from 'src/types/enums/error.enum';

export class customException extends HttpException {
  constructor(
    errCode: ErrorCode,
    message?: string | any,
    statusCode?: HttpStatus,
    payload?: any,
  ) {
    const errObject = {
      errCode,
      statusCode: statusCode || HttpStatus.BAD_REQUEST,
    };
    if (message) errObject['message'] = message;
    if (payload) errObject['payload'] = payload;
    super(errObject , errObject.statusCode);
  }
}
export class Exception extends customException{
    constructor(errCode: ErrorCode, message?: string | any, statusCode?: HttpStatus, payload?: any) {
        super(errCode, message, statusCode, payload);
      }
}
