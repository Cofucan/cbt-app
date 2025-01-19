import { useQuery } from "@tanstack/react-query";
import httpService from "../../utils/httpService";

const useGetExamData = (id: string) => {

  const { isLoading, isRefetching, data } = useQuery(
    {
      queryKey: [`ExamData`],
      queryFn: () =>
        httpService.get(`app_admin/exams/analysis/?exam_id=${id}`)

    }
  );

  return {
    data: data?.data?.results ?? [],
    isLoading,
    isRefetching
  };

};

export default useGetExamData;