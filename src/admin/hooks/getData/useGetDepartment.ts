import { useQuery } from "@tanstack/react-query";
import httpService from "../../utils/httpService";

const useGetDepartment = (item?: string) => {
  const { isLoading, isRefetching, data } = useQuery({
    queryKey: [`departments`, item],
    queryFn: () =>
      httpService.get(
        `app_admin/departments/?limit=100${item ? `&faculty_id=${item}` : ""}`,
      ),
  });

  return {
    data: data?.data ?? [],
    isLoading,
    isRefetching,
  };
};

export default useGetDepartment;
