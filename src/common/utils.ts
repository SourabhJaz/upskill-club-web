import { ApiCallResponse } from './interface';

const isErrorResponse = (response: ApiCallResponse<unknown>) => {
  return 'err' in response;
};

export const Utils = {
    isErrorResponse,
};
