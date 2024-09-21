export type Url = string | URL;

export type ApiCallResponse<T> =
  | {
      success: true;
      data: T;
    }
  | { err: true };
