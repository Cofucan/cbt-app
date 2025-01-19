import { useQuery } from "@tanstack/react-query";
import httpService from "../../utils/httpService";

const useGetSettings = () => {

  const { isLoading, isRefetching, data } = useQuery(
    {
      queryKey: [`settings`],
      queryFn: () =>
        httpService.get(`school/config/`)
    }
  );

  return {
    data: data?.data ?? {},
    isLoading,
    isRefetching
  };
};

export default useGetSettings;