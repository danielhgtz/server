class ErrorMessage extends Error {
  statusCode: number;

  constructor(code: string, message: string, statusCode: number) {
    super(message);
    this.name = code;
    this.statusCode = statusCode;
  }
}

export default ErrorMessage;
