type Url = string | URL;

type ApiCallResponse<T> =
  | {
      success: true;
      data: T;
    }
  | { err: true };

const performApiCall = async <T>(url: Url, requestOptions: RequestInit): Promise<ApiCallResponse<T>> => {
  try {
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (err) {
    console.log(
      `error while performing network call\nurl: ${url} options: ${JSON.stringify(requestOptions)} err: ${err}`
    );
    return {
      err: true,
    };
  }
};

const ApiCall = {
  doGet: async <T>(url: Url) => {
    return await performApiCall<T>(url, {
      method: 'GET',
    });
  },
};

export { ApiCall };
