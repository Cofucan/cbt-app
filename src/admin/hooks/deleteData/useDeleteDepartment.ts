import { useMutation, useQueryClient } from "@tanstack/react-query";
import httpService from "../../utils/httpService";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { AdminErrorResponse } from "../../utils.ts";

const useDeleteDepartment = () => {
  const query = useQueryClient();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (id: string) =>
      httpService.delete(`/app_admin/departments/${id}/`),
    onError: (error: AxiosError<AdminErrorResponse>) => {
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


// const useDeleteDepartment = () => {
//   const query = useQueryClient();

//   const { mutate, isPending, isSuccess } = useMutation({
//     mutationFn: async (id: string) => {
//       console.log("Attempting to delete department with id:", id);
//       const response = await httpService.delete(`/app_admin/departments/${id}/`);
//       console.log("Delete response:", response);
//       return response;
//     },
//     onError: (error: AxiosError<AdminErrorResponse>) => {
//       console.error("Delete failed:", error?.response?.data?.detail);
//       toast?.error(
//         error?.response?.data?.detail
//           ? error?.response?.data?.detail
//           : "Error occurred while deleting department",
//       );
//     },
//     onSuccess: async () => {
//       console.log("Delete successful, invalidating query...");
//       query?.invalidateQueries({ queryKey: ["departments"] });
//       toast?.success("Department Deleted Successfully");
//     },
//   });

//   return {
//     mutate,
//     isLoading: isPending,
//     isSuccess,
//   };
// };

// export default useDeleteDepartment;
