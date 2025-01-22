import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import httpService from "../../utils/httpService";
import { AxiosError } from "axios";
import { AdminErrorResponse } from "../../utils";

const useActivateExam = () => {
  const query = useQueryClient();

  const {
    mutate: activateMutate,
    isPending: loadingActivation,
    isSuccess: activateSuccess,
  } = useMutation({
    mutationFn: (info: string) =>
      httpService.post(`app_admin/exams/${info}/activate/`, {}),
    onError: (error: AxiosError<AdminErrorResponse>) => {
      console.log(error?.response?.data?.detail);
      toast?.error(
        error?.response?.data?.detail
          ? error?.response?.data?.detail
          : "Error Occured",
      );
    },
    onSuccess: async () => {
      toast?.success("Successful");
      await query?.invalidateQueries({ queryKey: ["Exam"] });
    },
  });

  const {
    mutate: completedMutate,
    isPending: loadingComplete,
    isSuccess: completeSuccess,
  } = useMutation({
    mutationFn: (info: Record<string, string | number>) =>
      httpService.post(`app_admin/exams/${info}/complete/`, {}),
    onError: (error: AxiosError<AdminErrorResponse>) => {
      console.log(error?.response?.data?.detail);
      toast?.error(
        error?.response?.data?.detail
          ? error?.response?.data?.detail
          : "Error Occured",
      );
    },
    onSuccess: async () => {
      toast?.success("Successful");
      await query?.invalidateQueries({ queryKey: ["Exam"] });
    },
  });

  return {
    loadingActivation,
    loadingComplete,
    completedMutate,
    activateMutate,
    completeSuccess,
    activateSuccess,
  };
};

export default useActivateExam;
