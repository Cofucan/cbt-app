import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import findEmptyFields from "../../utils/findEmptyField";
import httpService from "../../utils/httpService";
import { AxiosError } from "axios";
import { AdminErrorResponse } from "../../utils";

const useAddDepartment = (id?: string | number) => {
  const query = useQueryClient();

  const formik = useFormik({
    initialValues: {
      name: "",
      faculty: "",
    },
    onSubmit: (values) => {
      const emptyFields = findEmptyFields(values);

      if (emptyFields?.length > 0) {
        toast?.error(`Enter your ${emptyFields[0]}`);
      } else {
        if (id) {
          editMutate({
            ...formik.values,
            faculty: Number(formik?.values?.faculty),
          });
        } else {
          mutate({
            ...formik.values,
            faculty: Number(formik?.values?.faculty),
          });
        }
      }
    },
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (info: Record<string, string | number>) => httpService.post(`app_admin/departments/`, info),
    onError: (error: AxiosError<AdminErrorResponse>) => {
      console.log(error?.response?.data?.detail);
      toast?.error(
        error?.response?.data?.detail
          ? error?.response?.data?.detail
          : "Error Occured",
      );
    },
    onSuccess: async () => {
      await query?.invalidateQueries({ queryKey: ["departments"] });
      toast?.success("Created Department Successfully");
    },
  });

  const {
    mutate: editMutate,
    isPending: loadingEdit,
    isSuccess: editSuccess,
  } = useMutation({
    mutationFn: (info: Record<string, number | string>) =>
      httpService.put(`/app_admin/departments/${id}/`, info),
    onError: (error: AxiosError<AdminErrorResponse>) => {
      console.log(error?.response?.data?.detail);
      toast?.error(
        error?.response?.data?.detail
          ? error?.response?.data?.detail
          : "Error Occured",
      );
    },
    onSuccess: async () => {
      await query?.invalidateQueries({ queryKey: ["departments"] });
      toast?.success("Updated Department Successfully");
    },
  });

  return {
    formik,
    isLoading: isPending,
    isSuccess,
    loadingEdit,
    editSuccess,
  };
};

export default useAddDepartment;
