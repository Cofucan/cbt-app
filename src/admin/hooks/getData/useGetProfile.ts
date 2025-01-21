import { useQuery } from "@tanstack/react-query";
import httpService from "../../utils/httpService";
import { useNavigate } from "@tanstack/react-router";

const useGetProfile = () => {
  const navigate = useNavigate();

  const { isLoading, isRefetching, data, isError } = useQuery({
    queryKey: [`Profile`],
    queryFn: () => httpService.get(`user/me/`),
  });
  if (isError) {
    localStorage.setItem("token", "");
    navigate({ to: "/admin" });
  }

  return {
    data: data?.data?.result ?? {},
    isLoading,
    isRefetching,
  };
};

export default useGetProfile;
