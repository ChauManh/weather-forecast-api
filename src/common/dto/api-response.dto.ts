export class ApiResponse<T> {
  statusCode: number;
  message: string;
  result: T;

  constructor(statusCode: number, message: string, result: T) {
    this.statusCode = statusCode;
    this.message = message;
    this.result = result;
  }

  static success<T>(result: T, message = 'Success', statusCode = 200) {
    return new ApiResponse<T>(statusCode, message, result);
  }
}
