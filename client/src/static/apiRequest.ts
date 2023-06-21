type ApiRequestType = {
  url: string;
  params?: any;
};

export const ApiRequest = ({ url, params }: ApiRequestType) => {
  const Options = {
    method: "GET",
    url: url,
    params: params,
    headers: {
      "X-RapidAPI-Key": "65c39e4e6emsh7ce48ecbfe9a08dp199fffjsnd1d14d96e4d3",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };

  return Options;
};
