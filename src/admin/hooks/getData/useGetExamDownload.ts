import { useQuery } from "@tanstack/react-query";
import httpService from "../../utils/httpService";

const useGetExamDownload = (id: string) => {
  const { isLoading, isRefetching, data } = useQuery(
    {
      queryKey: [`Examdownload`],
      queryFn: () =>
        httpService.get(`app_admin/exams/${id}/download-result-csv/`)
    }
  );

  return {
    data: data?.data ?? [],
    isLoading,
    isRefetching
  };
};

export default useGetExamDownload;