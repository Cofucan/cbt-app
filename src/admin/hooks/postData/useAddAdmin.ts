import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "@tanstack/react-router";
import httpService from "../../utils/httpService";
import findEmptyFields from "../../utils/findEmptyField";
import removeEmptyData from "../../utils/removingEmptyData";

const useAddAdmin = (id) => {
  const query = useQueryClient();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      identifier: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      type: "",
    },
    onSubmit: (values) => {
      const emptyFields = findEmptyFields(values);

      if (emptyFields?.length > 0 && !id) {
        toast?.error(`Enter your ${emptyFields[0]}`);
      } else {
        if (id) {
          let payload = removeEmptyData(formik?.values);
          console.log("hello");
          editMutate(payload);
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
    mutationFn: (info) => httpService.post(`app_admin/admins/`, info),
    onError: (error) => {
      console.log(error?.response?.data?.detail);
      toast?.error(
        error?.response?.data?.detail
          ? error?.response?.data?.detail
          : "Error Occured",
      );
    },
    onSuccess: async () => {
      toast?.success("Created Admin Successfully");
      await navigate({ to: "/admin/manager" });
      await query?.invalidateQueries({ queryKey: ["Profile"] });
    },
  });

  const {
    mutate: editMutate,
    isPending: loadingEdit,
    isSuccess: editSuccess,
  } = useMutation({
    mutationFn: (info) => httpService.patch(`app_admin/admins/${id}/`, info),
    onError: (error) => {
      console.log(error?.response?.data?.detail);
      toast?.error(
        error?.response?.data?.detail
          ? error?.response?.data?.detail
          : "Error Occured",
      );
    },
    onSuccess: async () => {
      toast?.success("Update Profile Successfully");
      await query?.invalidateQueries({ queryKey: ["Profile"] });
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

export default useAddAdmin;
