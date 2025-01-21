import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "@tanstack/react-router";
import httpService from "../../utils/httpService";
import findEmptyFields from "../../utils/findEmptyField";
import { useState } from "react";
import removeEmptyData from "../../utils/removingEmptyData";

const useSettings = () => {
  const query = useQueryClient();
  const [file, setFile] = useState(null);
  const formik = useFormik({
    initialValues: {
      name: "",
      current_session: "",
      semester: "",
    },
    onSubmit: (values) => {
      const emptyFields = findEmptyFields(values);
      const formData = new FormData();

      {
        Object.keys(removeEmptyData(formik?.values)).map((key) => {
          formData?.append(key, removeEmptyData(formik?.values)[key]);
        });
      }
      if (file) {
        formData?.append("logo", file);
      }
      mutate(formData);
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (info) =>
      httpService.post(
        `school/update/`,
        info,
        file
          ? {
              headers: { "Content-Type": file.type },
            }
          : {},
      ),
    onError: (error) => {
      console.log(error?.response?.data?.detail);
      toast?.error(
        error?.response?.data?.detail
          ? error?.response?.data?.detail
          : "Error occured Creating test",
      );
    },
    onSuccess: async () => {
      toast?.success("Update School Details Successfully");
      await query?.invalidateQueries({ queryKey: ["settings"] });
    },
  });

  return {
    formik,
    isLoading: isPending,
    setFile,
    file,
  };
};

export default useSettings;
