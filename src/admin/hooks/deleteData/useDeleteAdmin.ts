import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import httpService from "../../utils/httpService";
import { AxiosError } from "axios";
import { AdminErrorResponse } from "../../utils.ts";

const useDeleteAdmin = () => {
  const query = useQueryClient();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (id: string) => httpService.delete(`app_admin/admins/${id}`),
    onError: (error: AxiosError<AdminErrorResponse>) => {
      console.log(error?.response?.data?.detail);
      toast?.error(
        error?.response?.data?.detail
          ? error?.response?.data?.detail
          : "Error occured Deleting Admin",
      );
    },
    onSuccess: async () => {
      await query?.invalidateQueries({ queryKey: ["AdminList"] });
      toast?.success("Admin Deleted Successfully");
    },
  });

  return {
    mutate,
    isLoading: isPending,
    isSuccess,
  };
};

export default useDeleteAdmin;
