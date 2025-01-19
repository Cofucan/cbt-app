import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from 'react-hot-toast';
import httpService from "../../utils/httpService";

const useDeleteCourse = () => {
    const query = useQueryClient()  

    const { mutate, isPending, isSuccess } = useMutation({
        mutationFn: (id: string) => httpService.delete(`/app_admin/courses/${id}/`),
        onError: (error) => {
            console.log(error?.response?.data?.detail);
            toast?.error(error?.response?.data?.detail ? error?.response?.data?.detail : "Error occured")
        },
        onSuccess: async () => {
            await query?.invalidateQueries({ queryKey: ["course"] })
            toast?.success("Course Deleted Successfully") 
        }
    });

    return {
        mutate,
        isLoading: isPending,
        isSuccess
    };
}

export default useDeleteCourse
