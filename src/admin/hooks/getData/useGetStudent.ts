import { useQuery } from "@tanstack/react-query";
import httpService from "../../utils/httpService";

const useGetStudent = (faculty_id?: string, department_id?: string, keyword?: string, level?: string) => {
  const { isLoading, isRefetching, data } = useQuery(
    {
      queryKey: [`students`, faculty_id, level, department_id, keyword],
      queryFn: () =>
        httpService.get(`/app_admin/students/?limit=100${faculty_id ? `&faculty=${faculty_id}` : ""}${department_id ? `&department_id=${department_id}` : ""}${keyword ? `&search=${keyword}` : ""}${level ? `&faculty=${level}` : ""}`)
    }
  );

  return {
    data: data?.data?.results ?? [],
    isLoading,
    isRefetching
  };
};

export default useGetStudent;