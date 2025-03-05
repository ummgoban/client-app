export type DefaultError = {
  errorCode: number;
  errorMessage: string;
};

type CustomErrorType<T = DefaultError> = T extends Error ? T : unknown;

class CustomError<T extends DefaultError> extends Error {
  constructor(args: CustomErrorType<T>) {
    if (args instanceof Error) {
      super(args.message);
    } else {
      super('Unknown error');
    }
    Object.assign(this, args);
  }
}

export default CustomError;
