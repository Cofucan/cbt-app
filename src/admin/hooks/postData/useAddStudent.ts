import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import httpService from "../../utils/httpService";
import findEmptyFields from "../../utils/findEmptyField";
import removeEmptyData from "../../utils/removingEmptyData";
import { AxiosError } from "axios";
import { AdminErrorResponse } from "../../utils";

const useAddStudent = (id?: string | number) => {
  const query = useQueryClient();
  const formik = useFormik({
    initialValues: {
      identifier: "",
      first_name: "",
      faculty: 0,
      department: 0,
      level: 0,
    },
    onSubmit: (values) => {
      const emptyFields = findEmptyFields(values);

      if (emptyFields?.length > 0 && !id) {
        toast?.error(`Enter your ${emptyFields[0]}`);
      } else {
        if (id) {
          let newObj = removeEmptyData(formik?.values);

          editMutate(newObj);
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
    mutationFn: (info: Record<string, string | number>) => httpService.post(`app_admin/students/`, info),
    onError: (error: AxiosError<AdminErrorResponse>) => {
      console.log(error?.response?.data?.detail);
      toast?.error(
        error?.response?.data?.detail
          ? error?.response?.data?.detail
          : "Error Occured",
      );
    },
    onSuccess: async () => {
      toast?.success("Created Student Successfully");
      await query?.invalidateQueries({ queryKey: ["students"] });
    },
  });

  const {
    mutate: editMutate,
    isPending: loadingEdit,
    isSuccess: editSuccess,
  } = useMutation({
    mutationFn: (info: Record<string, string | number>) => httpService.put(`app_admin/students/${id}/`, info),
    onError: (error: AxiosError<AdminErrorResponse>) => {
      console.log(error?.response?.data?.detail);
      toast?.error(
        error?.response?.data?.detail
          ? error?.response?.data?.detail
          : "Error Occured",
      );
    },
    onSuccess: async () => {
      toast?.success("Created Student Successfully");
      await query?.invalidateQueries({ queryKey: ["students"] });
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

export default useAddStudent;
