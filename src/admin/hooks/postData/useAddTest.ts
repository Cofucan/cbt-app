import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "@tanstack/react-router";
import httpService from "../../utils/httpService";
import findEmptyFields from "../../utils/findEmptyField";
import { useState } from "react";
import useGetSettings from "../getData/useGetSettings";
import { AxiosError } from "axios";
import { AdminErrorResponse } from "../../utils";

const useAddTest = (id?: string) => {
  const navigate = useNavigate();

  const query = useQueryClient();
  const [question, setQuestion] = useState<File | undefined>();
  const [file, setFile] = useState<File | undefined>();
  const [image, setImage] = useState<File | undefined>();

  const { data, isLoading: loading } = useGetSettings();
  const [numberOfQuestion, setNumberOfQuestion] = useState("");

  const formik = useFormik({
    initialValues: {
      code: "",
      title: "",
      instructions: "",
      instructor_name: "",
      start_at: "",
      duration: "",
      // images_file: 0,
      // file: "",
      attempts_allowed: "",
      faculty_id: "",
      department_id: "",
      level: "",
      points_per_question: "",
      no_of_questions: "",
      session: "",
      overall_score: ""
    },
    onSubmit: (values) => {
      const emptyFields = findEmptyFields(values);
      const formData = new FormData();

      if (emptyFields?.length > 0) {
        if (emptyFields[0] === "start_at") {
          toast?.error(`Enter your Exam Date Time`);
        } else {
          toast?.error(`Enter your ${emptyFields[0]}`);
        }
      }
      if (!question) {
        toast?.error(`Add Question Or File`);
      } else {
        {
          (Object.keys(formik?.values) as (keyof typeof values)[]).forEach((key) => {
            if (key === "start_at") {
              formData?.append(
                key,
                new Date(formik?.values[key]).toISOString()
              );
            } else if (key === "session") {
              formData?.append(key, data?.current_session ?? "");
            } else {
              formData?.append(key, formik?.values[key].toString());
            }
          });
        }
        // formData?.append("images_file", question)
        formData?.append("file", question);
        mutate(formData);
      }
    }
  });

  // console.log(data);

  const addBulkFormik = useFormik({
    initialValues: {
      text: "",
      option_1: "",
      option_2: "",
      option_3: "",
      option_4: "",
      answer: ""
    },
    onSubmit: (values) => {
      const emptyFields = findEmptyFields(values);
      const formData = new FormData();

      if (emptyFields?.length > 0) {
        toast?.error(`Enter your ${emptyFields[0]}`);
      } else {
        {
          (Object.keys(values) as (keyof typeof values)[]).map((key) => {
            formData?.append(key, addBulkFormik?.values[key]);
          });
        }
        if (numberOfQuestion) {
          formData?.append("number", numberOfQuestion);
        }

        if (image) {
          formData?.append("image", image);
        }
        singleQuestionMutate(formData);
      }
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (info: FormData) =>
      httpService.post(`app_admin/exams/upload/`, info, {
        headers: { "Content-Type": question?.type }
      }),
    onError: (error: AxiosError<AdminErrorResponse>) => {
      console.log(error?.response?.data?.detail);
      toast?.error(
        error?.response?.data?.detail
          ? error?.response?.data?.detail
          : "Error occured Creating test"
      );
    },
    onSuccess: async () => {
      toast?.success("Exam Created Successfully");
      await navigate({ to: "/admin/test" });
      await query?.invalidateQueries({ queryKey: ["Exam"] });
    }
  });

  const {
    mutate: singleQuestionMutate,
    isPending: loadingSingleQuestion,
    isSuccess: successSingleQuestion
  } = useMutation({
    mutationFn: (info: FormData) =>
      httpService.post(`app_admin/exams/upload/${id}/single-question/`, info, {
        // headers: {'Content-Type': image.type ? image?.type : "" }
      }),
    onError: (error: AxiosError<AdminErrorResponse>) => {
      console.log(error?.response?.data?.detail);
      toast?.error(
        error?.response?.data?.detail
          ? error?.response?.data?.detail
          : "Error occured"
      );
    },
    onSuccess: async () => {
      toast?.success("Exam Updated Successfully");
      await query?.invalidateQueries({ queryKey: ["Exam"] });
    }
  });

  const {
    mutate: BulkMutate,
    isPending: loadingBulk,
    isSuccess: bulksuccess
  } = useMutation({
    mutationFn: (info: FormData) =>
      httpService.post(`/app_admin/exams/upload/${id}/bulk-questions/`, info, {
        headers: { "Content-Type": question?.type }
      }),
    onError: (error: AxiosError<AdminErrorResponse>) => {
      console.log(error?.response?.data?.detail);
      toast?.error(
        error?.response?.data?.detail
          ? error?.response?.data?.detail
          : "Error occured Creating test"
      );
    },
    onSuccess: async () => {
      toast?.success("Exam Updated Successfully");
      await query?.invalidateQueries({ queryKey: ["Exam"] });
    }
  });

  const handleBulkUpload = () => {
    const formData = new FormData();

    if (!question) {
      toast?.error(`Add Question Or File`);
    } else {
      if (file) {
        formData?.append("images_file", file);
      }
      formData?.append("file", question);
      BulkMutate(formData);
    }
  };

  return {
    formik,
    isLoading: isPending,
    question,
    setQuestion,
    file,
    setFile,
    handleBulkUpload,
    loadingBulk,
    bulksuccess,
    image,
    setImage,
    addBulkFormik,
    loadingSingleQuestion,
    successSingleQusetion: successSingleQuestion,
    setNumberOfQuestion,
    numberOfQuestion,
    data,
    loading
  };
};

export default useAddTest;
