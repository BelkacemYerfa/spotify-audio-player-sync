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
      "X-RapidAPI-Key": "68c8255426msh9d11b94a2ee4bf6p1d028bjsn720ae8f042c2",
      "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
    },
  };
  return Options;
};
