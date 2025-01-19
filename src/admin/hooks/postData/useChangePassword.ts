
import { useMutation } from "@tanstack/react-query";
import { useFormik } from 'formik';
import toast from 'react-hot-toast'; 
import httpService from "../../utils/httpService";
import findEmptyFields from "../../utils/findEmptyField";

const useChangePassword = () => { 

    const formik = useFormik({
        initialValues: {
            "current_password": "",
            "new_password": ""
        },
        onSubmit: values => {

            const emptyFields = findEmptyFields(values); 

            if (emptyFields?.length > 0) {
                toast?.error(`Enter your ${emptyFields[0]}`)
            } else { 
                mutate({
                    ...formik.values, 
                    faculty: Number(formik?.values?.faculty)
                })
            }
        },
    }); 

    const { mutate, isPending, isSuccess } = useMutation({
        mutationFn: (info) => httpService.post(`user/change-password/`, info),
        onError: (error) => {
            console.log(error?.response?.data?.current_password[0]);
            toast?.error(error?.response?.data?.current_password[0] ? error?.response?.data?.current_password[0] : "Error Occured")
        },
        onSuccess: () => {
            toast?.success("Update Password Successfully")  
        }

    });

    return {
        formik,
        isLoading: isPending,
        isSuccess
    };
}

export default useChangePassword