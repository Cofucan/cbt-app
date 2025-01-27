import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { baseUrl } from "../../lib/utils";


type DownloadTemplateResponse = Blob; 

export const useStudentDownloadTemplate = (): UseMutationResult<
  DownloadTemplateResponse,
  Error,
  void
> => {
  return useMutation({
    mutationFn: async (): Promise<DownloadTemplateResponse> => {
      const response = await fetch(
        `${baseUrl}/app_admin/students/upload/sample/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, 
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to download the template");
      }

      return response.blob();
    },
    onSuccess: (blob: DownloadTemplateResponse) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "StudentExamTemplate.xlsx"; // Adjust file name as needed
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    },
    onError: (error: Error) => {
      console.error("Error downloading template:", error.message);
    },
  });
};
