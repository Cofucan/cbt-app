import { useMutation, useQueryClient } from "@tanstack/react-query";
import httpService from "../../utils/httpService";
import toast from "react-hot-toast";

const useDeleteDepartment = () => {
  const query = useQueryClient();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (id: string) =>
      httpService.delete(`/app_admin/departments/${id}/`),
    onError: (error) => {
      console.log(error?.response?.data?.detail);
      toast?.error(
        error?.response?.data?.detail
          ? error?.response?.data?.detail
          : "Error occured Deleting Admin",
      );
    },
    onSuccess: async () => {
      query?.invalidateQueries({ queryKey: ["departments"] });
      toast?.success("Department Deleted Successfully");
    },
  });

  return {
    mutate,
    isLoading: isPending,
    isSuccess,
  };
};

export default useDeleteDepartment;
