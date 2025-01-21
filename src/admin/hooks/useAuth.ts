import { unsecureHttpService } from "../utils/httpService";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import findEmptyFields from "../utils/findEmptyField";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

const useAuth = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      identifier: "",
      password: "",
    },
    onSubmit: (values) => {
      const emptyFields = findEmptyFields(values);

      if (emptyFields?.length > 0) {
        toast?.error(`Enter your ${emptyFields[0]}`);
      } else {
        mutate(values);
      }
    },
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (info) => unsecureHttpService.post(`user/login/`, info),
    onError: (error) => {
      console.log(error?.response?.data?.detail);
      toast?.error(
        error?.response?.data?.detail
          ? error?.response?.data?.detail
          : "Error Login",
      );
    },
    onSuccess: async (data) => {
      localStorage.setItem("token", data?.data?.access_token);
      localStorage.setItem("id", data?.data?.user?.id);
      toast?.success("Login Successful");
      await navigate({ to: "/admin/test" });
    },
  });

  return {
    formik,
    isLoading: isPending,
    isSuccess,
  };
};

export default useAuth;
