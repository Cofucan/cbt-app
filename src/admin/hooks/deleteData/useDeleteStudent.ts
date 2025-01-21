import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import httpService from "../../utils/httpService";

const useDeleteStudent = () => {
  const query = useQueryClient();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (id: string) => httpService.delete(`app_admin/students/${id}/`),
    onError: (error) => {
      console.log(error?.response?.data?.detail);
      toast?.error(
        error?.response?.data?.detail
          ? error?.response?.data?.detail
          : "Error occured",
      );
    },
    onSuccess: async () => {
      await query?.invalidateQueries({ queryKey: ["students"] });
      toast?.success("Student Deleted Successfully");
    },
  });

  return {
    mutate,
    isLoading: isPending,
    isSuccess,
  };
};

export default useDeleteStudent;
