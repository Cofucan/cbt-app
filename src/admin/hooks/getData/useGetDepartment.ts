import { useQuery } from "@tanstack/react-query";
import httpService from "../../utils/httpService";
import { PaginationResponse } from "../../../lib/utils.ts";
import { Department } from "../../utils.ts";

const useGetDepartment = (item?: string | number) => {
  const { isLoading, isRefetching, data } = useQuery({
    queryKey: [`departments`, item],
    queryFn: async () => {
      const response = await httpService.get<PaginationResponse<Department>>(
        `app_admin/departments/?limit=100${item ? `&faculty_id=${item}` : ""}`
      );
      return response.data
    },
  });

  return {
    data: data?.results ?? [],
    isLoading,
    isRefetching,
  };
};

export default useGetDepartment;
