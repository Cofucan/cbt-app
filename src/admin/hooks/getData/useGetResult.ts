import { useQuery } from "@tanstack/react-query";
import httpService from "../../utils/httpService";

const useGetResult = () => {
  const { isLoading, isRefetching, data } = useQuery(
    {
      queryKey: [`statusresult`],
      queryFn: () =>
        httpService.get(`/app_admin/exams/?status=completed&limit=100`)
    }
  );

  return {
    data: data?.data?.results ?? [],
    isLoading,
    isRefetching
  };
};

export default useGetResult;