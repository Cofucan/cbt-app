import { useQuery } from "@tanstack/react-query";
import httpService from "../../utils/httpService";

const useGetExam = (
  faculty_id?: string,
  department_id?: string,
  keyword?: string,
  level?: string,
) => {
  const { isLoading, isRefetching, data } = useQuery({
    queryKey: [`Exam`, department_id, faculty_id, keyword, level],
    queryFn: () =>
      httpService.get(
        `app_admin/exams/?limit=100${faculty_id ? `&faculty_id=${faculty_id}` : ""}${department_id ? `&department_id=${department_id}` : ""}${keyword ? `&title=${keyword}` : ""}${level ? `&level=${level}` : ""}`,
      ),
  });

  return {
    data: data?.data?.results ?? [],
    isLoading,
    isRefetching,
  };
};

export default useGetExam;
