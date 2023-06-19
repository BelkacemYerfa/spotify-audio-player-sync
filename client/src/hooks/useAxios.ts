import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface QueryProp {
  queryKey: string;
  fetchFunc: () => Promise<AxiosResponse<any, any>>;
}

const useAxios = ({ queryKey, fetchFunc }: QueryProp) => {
  return useQuery([`${queryKey}`], fetchFunc, {
    refetchOnMount: false,
  });
};

export default useAxios;
