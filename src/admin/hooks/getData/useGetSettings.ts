import { useQuery } from "@tanstack/react-query";
import httpService from "../../utils/httpService";
import { SettingResponse, UserResponse} from "../../utils.ts";

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

export const useGetUser = () => {
  const { isLoading, isRefetching, data } = useQuery<UserResponse>({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await httpService.get<UserResponse>('user/me/');
      return response.data;
    },
  });

  return {
    profile: data?.result,
    isLoading,
    isRefetching,
  };
};

