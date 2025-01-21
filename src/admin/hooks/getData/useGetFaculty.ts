import { useQuery } from "@tanstack/react-query";
import httpService from "../../utils/httpService";

const useGetFaculty = () => {
  const { isLoading, isRefetching, data } = useQuery({
    queryKey: [`FacultyList`],
    queryFn: () => httpService.get(`app_admin/faculties/?limit=100`),
  });

  return {
    data: data?.data?.results ?? [],
    isLoading,
    isRefetching,
  };
};

export default useGetFaculty;
