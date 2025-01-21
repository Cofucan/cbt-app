import { useQuery } from "@tanstack/react-query";
import httpService from "../../utils/httpService";
import { PaginationResponse } from "../../../lib/utils.ts";
import { Faculty } from "../../utils.ts";

const useGetFaculty = () => {
  const { isLoading, isRefetching, data } = useQuery({
    queryKey: [`FacultyList`],
    queryFn: () => httpService.get<PaginationResponse<Faculty>>(`app_admin/faculties/?limit=100`),
  });

  return {
    data: data?.data?.results ?? [],
    isLoading,
    isRefetching,
  };
};

export default useGetFaculty;
