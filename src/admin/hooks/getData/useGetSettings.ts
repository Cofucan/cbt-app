import { useQuery } from "@tanstack/react-query";
import httpService from "../../utils/httpService";
import { SettingResponse } from "../../utils.ts";

const useGetSettings = () => {
  const { isLoading, isRefetching, data } = useQuery({
    queryKey: [`settings`],
    queryFn: () => httpService.get<SettingResponse>(`school/config/`),
  });

  return {
    data: data?.data,
    isLoading,
    isRefetching,
  };
};

export default useGetSettings;
