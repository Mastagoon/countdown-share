type FormActionResponseType<T> = {
  isSuccess: boolean;
  result?: T;
  error?: string;
}
