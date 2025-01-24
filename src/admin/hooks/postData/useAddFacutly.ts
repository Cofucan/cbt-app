import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import httpService from "../../utils/httpService";
import findEmptyFields from "../../utils/findEmptyField";
import { AxiosError } from "axios";
import { AdminErrorResponse } from "../../utils";

const useAddFaculty = () => {
  const query = useQueryClient();
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      console.log(values);
      const emptyFields = findEmptyFields(values);
      if (emptyFields?.length > 0) {
        toast?.error(`Enter your ${emptyFields[0]}`);
      } else {
        mutate({
          ...formik.values,
        });
      }
    },
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (info: Record<string, string | number>) => {
      console.log(info);
      return httpService.post(`app_admin/faculties/`, info);
    },
    onError: (error: AxiosError<AdminErrorResponse>) => {
      console.log(error?.response?.data?.detail);
      toast?.error(
        error?.response?.data?.detail
          ? error?.response?.data?.detail
          : "Error occured",
      );
    },
    onSuccess: async () => {
      await query?.invalidateQueries({ queryKey: ["FacultyList"] });
      toast?.success("Created Faculty Successfully");
    },
  });

  return {
    formik,
    isLoading: isPending,
    isSuccess,
  };
};

export default useAddFaculty;
