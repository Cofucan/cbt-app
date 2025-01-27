import { useQuery } from "@tanstack/react-query";
import httpService from "../../utils/httpService";
import { PaginationResponse } from "../../../lib/utils.ts";
import { Department } from "../../utils.ts";

const useGetDepartment = (item?: string | number) => {
  const { isLoading, isRefetching, data } = useQuery({
    queryKey: [`departments`, item],
    queryFn: async () => {
      const response = await httpService.get<PaginationResponse<Department>>(
        `app_admin/departments/?limit=100${item ? `&faculty_id=${item}` : ""}`,
      );
      return response.data;
    },
  });

  // If the data is directly an array of departments, return it; otherwise, return results
  const departmentList = Array.isArray(data) ? data : (data?.results ?? []);

  return {
    data: departmentList,
    isLoading,
    isRefetching,
  };
};

export default useGetDepartment;
