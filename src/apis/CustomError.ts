type CustomErrorType<T = unknown> = T extends Error ? T : unknown;

class CustomError<T = unknown> extends Error {
  errorCode?: number;
  errorMessage?: string;

  constructor(args: CustomErrorType<T>) {
    if (args instanceof Error) {
      super(args.message);
    } else {
      super('Unknown error');
      this.errorMessage = 'Unknown error';
    }
    Object.assign(this, args);
  }
}

export default CustomError;
