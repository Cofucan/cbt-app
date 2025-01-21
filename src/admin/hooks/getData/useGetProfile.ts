import { useQuery } from "@tanstack/react-query";
import httpService from "../../utils/httpService";
import { useNavigate } from "@tanstack/react-router";
import { Admin } from "../../utils.ts";

const useGetProfile = () => {
  const navigate = useNavigate();

  const { isLoading, isRefetching, data, isError } = useQuery({
    queryKey: [`Profile`],
    queryFn: () => httpService.get<{result: Admin }>(`user/me/`),
  });
  if (isError) {
    localStorage.setItem("token", "");
    navigate({ to: "/admin" }).then(_ => _);
  }

  return {
    data: data?.data?.result ?? {},
    isLoading,
    isRefetching,
  };
};

export default useGetProfile;
