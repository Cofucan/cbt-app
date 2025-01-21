import { useQuery } from "@tanstack/react-query";
import httpService from "../../utils/httpService";

const useGetAdmin = () => {
  const { isLoading, isRefetching, data } = useQuery({
    queryKey: [`AdminList`],
    queryFn: () => httpService.get(`/app_admin/admins/?limit=100`),
  });

  return {
    data: data?.data?.results ?? [],
    isLoading,
    isRefetching,
  };
};

export default useGetAdmin;
