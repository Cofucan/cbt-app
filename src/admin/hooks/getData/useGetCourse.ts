import { useQuery } from "@tanstack/react-query";
import httpService from "../../utils/httpService";

const useGetCourse = (
  faculty_id?: string,
  department_id?: string,
  level?: string,
) => {
  const { isLoading, isRefetching, data } = useQuery({
    queryKey: [`course`, faculty_id, department_id, level],
    queryFn: () =>
      httpService.get(
        `/app_admin/courses/?limit=100${faculty_id ? `&faculty_id=${faculty_id}` : ""}${department_id ? `&department_id=${department_id}` : ""}${level ? `&level=${level}` : ""}`,
      ),
  });

  return {
    data: data?.data ?? [],
    isLoading,
    isRefetching,
  };
};

export default useGetCourse;
