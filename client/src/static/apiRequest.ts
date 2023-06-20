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
      "X-RapidAPI-Key": "41fa46cb86msh227ef74d0864028p16dcdbjsn9250ccc239c6",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };
  return Options;
};
