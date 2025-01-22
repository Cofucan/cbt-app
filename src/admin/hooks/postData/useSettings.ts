import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { AdminErrorResponse } from "../../utils";
import httpService from "../../utils/httpService";
import removeEmptyData from "../../utils/removingEmptyData";

const useSettings = () => {
  const query = useQueryClient();
  const [file, setFile] = useState<File | null>(null);
  const formik = useFormik({
    initialValues: {
      name: "",
      current_session: "",
      semester: "",
      result_after_test: ""
    },
    onSubmit: () => {
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
    mutationFn: (info: FormData) =>
      httpService.post(
        `school/update/`,
        info,
        file
          ? {
              headers: { "Content-Type": file.type },
            }
          : {},
      ),
    onError: (error: AxiosError<AdminErrorResponse>) => {
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
