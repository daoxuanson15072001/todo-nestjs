import { start } from 'repl';
import { ErrorCode } from 'src/types/enums/error.enum';
import { Exception } from './exception';

export function validateStartEndTime(startTime: string, endTime: string) {
  if (startTime >= endTime) {
    throw new Exception(ErrorCode.Invalid_Input, 'endTime after startTime');
  }
}
