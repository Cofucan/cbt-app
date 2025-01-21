import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import httpService from "../../utils/httpService";
import findEmptyFields from "../../utils/findEmptyField";
import React from "react";

const useAddStudentUpload = (id) => {
  const query = useQueryClient();

  const [file, setFile] = React.useState(null);

  const formik = useFormik({
    initialValues: {
      faculty_id: 0,
      department_id: 0,
      level: 0,
    },
    onSubmit: (values) => {
      const emptyFields = findEmptyFields(values);

      if (emptyFields?.length > 0 && !id) {
        toast?.error(`Enter your ${emptyFields[0]}`);
      }
      if (!file) {
        toast?.error(`Enter your Student File`);
      } else {
        let formData = new FormData();

        {
          Object.keys(formik?.values).map((key) => {
            formData?.append(key, formik?.values[key]);
          });
        }
        // formData?.append("images_file", question)
        formData?.append("file", file);
        mutate(formData);
      }
    },
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (info) => httpService.post(`app_admin/students/upload/`, info),
    onError: (error) => {
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
    file,
    setFile,
  };
};

export default useAddStudentUpload;
