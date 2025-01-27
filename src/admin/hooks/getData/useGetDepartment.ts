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
      console.log("useGetDepartment data:", data);

      return response.data
    },
  });

  return {
    data: data ?? [],
    isLoading,
    isRefetching,
  };
};

export default useGetDepartment;



// const useGetDepartment = (item?: string | number) => {
//   const { isLoading, isRefetching, data: queryData } = useQuery({
//     queryKey: [`departments`, item],
//     queryFn: async () => {
//       const apiUrl = `app_admin/departments/?limit=100${item ? `&faculty_id=${item}` : ""}`;
//       console.log("API URL:", apiUrl);

//       const response = await httpService.get<PaginationResponse<Department>>(apiUrl);
//       console.log("API Response:", response.data);

//       return response.data;
//     },
//   });

//   return {
//     data: queryData ?? [], // Default to an empty array if results are undefined
//     isLoading,
//     isRefetching,
//   };
// };

// export default useGetDepartment;

