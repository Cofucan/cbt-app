import React, { useEffect, useState } from "react";
import ImportImgs from "../../components/ImportImgs";
import DeletedDepartment from "./SuccessModal/DeletedDepartment";
import useDeleteDepartment from "../../hooks/deleteData/useDeleteDepartment";
import { Button } from "antd";
import { data } from "autoprefixer";
import CustomButton from "../../components/CustomButton";
import useDeleteStudent from "../../../hooks/deleteData/useDeleteStudent";

const DeleteStudentModal = ({data ,handleCancelDelete }) => {
  const images = ImportImgs();
  const [openDeletedDept, setOpenDeletedDept] = useState(false);

  const ToggleOpenDeleteDept = () => {
    setOpenDeletedDept(true);
  };

  const { mutate, isLoading, isSuccess } = useDeleteStudent()

  useEffect(() => {
    if (isSuccess) {
      handleCancelDelete()
    }
  }, [isSuccess])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50">
      <div className="bg-white shadow-lg w-[35rem]">
        {/* Modal header */}
        <div className="flex justify-between items-center px-6 py-2 border-b">
          <h2 className="text-xl font-semibold">Delete Student</h2>
          <button
            onClick={handleCancelDelete}
            className="text-gray-500 hover:text-gray-800"
          >
            <img src={images.Times} alt="Times" />
          </button>
        </div>

        {/* Modal content */}
        <div className="p-6">
          <p>Are you sure you want to Delete this Student?</p>
        </div>

        {/* Modal footer */}
        {/* <div className="flex justify-between p-6 space-x-4">
          <button
            onClick={handleCancelDelete}
            className="px-4 py-2 bg-gray-200 font-bold text-black"
          >
            Cancel
          </button>
          <Button loading={isLoading} 
            onClick={mutate(data?.id)}
            className="px-4 py-2 !bg-[red] text-white hover:bg-[red]"
          >
            Delete Department
          </Button>
        </div> */}

        <div className="flex justify-between gap-4 p-6 items-center">
          <button
            onClick={handleCancelDelete}
            className="bg-gray-100 text-gray-500 border-none rounded-lg hover:bg-gray-200 px-4 h-[40px] w-full "
          >
            Cancel
          </button> 
          <CustomButton red={true} title="Delete Student" isLoading={isLoading} onClick={()=> mutate(data?.id)} />
        </div> 
      </div>
    </div>
  );
};

export default DeleteStudentModal;
