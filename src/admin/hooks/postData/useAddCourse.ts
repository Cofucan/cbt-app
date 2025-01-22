import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import httpService from "../../utils/httpService";
import findEmptyFields from "../../utils/findEmptyField";
import removeEmptyData from "../../utils/removingEmptyData";
import { AxiosError } from "axios";
import { AdminErrorResponse } from "../../utils";

const useAddCourse = (id?: string | number) => {
  const query = useQueryClient();

  const formik = useFormik({
    initialValues: {
      department_id: 0,
      faculty_id: 0,
      title: "",
      code: "",
      faculty: "",
      level: 0,
    },
    onSubmit: (values) => {
      const emptyFields = findEmptyFields(values);

      if (emptyFields?.length > 0 && !id) {
        toast?.error(`Enter your ${emptyFields[0]}`);
      } else {
        if (id) {
          const obj = removeEmptyData(formik.values);
          editMutate(obj);
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
    mutationFn: (info: Record<string, string | number>) => httpService.post(`app_admin/courses/`, info),
    onError: (error: AxiosError<AdminErrorResponse>) => {
      console.log(error?.response?.data?.detail);
      toast?.error(
        error?.response?.data?.detail
          ? error?.response?.data?.detail
          : "Error Occured",
      );
    },
    onSuccess: async () => {
      await query?.invalidateQueries({ queryKey: ["course"] });
      toast?.success("Created Course Successfully");
    },
  });

  const {
    mutate: editMutate,
    isPending: loadingEdit,
    isSuccess: editSuccess,
  } = useMutation({
    mutationFn: (info: Record<string, string | number>) => httpService.put(`app_admin/courses/${id}/`, info),
    onError: (error: AxiosError<AdminErrorResponse>) => {
      console.log(error?.response?.data?.detail);
      toast?.error(
        error?.response?.data?.detail
          ? error?.response?.data?.detail
          : "Error Occured",
      );
    },
    onSuccess: async () => {
      await query?.invalidateQueries({ queryKey: ["course"] });
      toast?.success("Updated Course Successfully");
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

export default useAddCourse;
