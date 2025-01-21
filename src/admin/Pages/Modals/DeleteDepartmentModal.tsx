import React, { useEffect, useState } from "react";
import ImportImgs from "../../components/ImportImgs";
import DeletedDepartment from "./SuccessModal/DeletedDepartment";
import useDeleteDepartment from "../../hooks/deleteData/useDeleteDepartment";
import { Button } from "antd";
import { data } from "autoprefixer";
import CustomButton from "../../components/CustomButton";
import useDeleteStudent from "../../hooks/deleteData/useDeleteStudent";

const DeleteDepartmentModal = ({ data, handleCancelDelete }) => {
  const images = ImportImgs();
  const [openDeletedDept, setOpenDeletedDept] = useState(false);

  const ToggleOpenDeleteDept = () => {
    setOpenDeletedDept(true);
  };

  const { mutate, isLoading, isSuccess } = useDeleteStudent();

  useEffect(() => {
    if (isSuccess) {
      handleCancelDelete();
    }
  }, [isSuccess]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
      <div className="w-[35rem] bg-white shadow-lg">
        {/* Modal header */}
        <div className="flex items-center justify-between border-b px-6 py-2">
          <h2 className="text-xl font-semibold">Delete Department</h2>
          <button
            onClick={handleCancelDelete}
            className="text-gray-500 hover:text-gray-800"
          >
            <img src={images.Times} alt="Times" />
          </button>
        </div>

        {/* Modal content */}
        <div className="p-6">
          <p>Are you sure you want to Delete this Department?</p>
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

        <div className="flex items-center justify-between gap-4 p-6">
          <button
            onClick={handleCancelDelete}
            className="h-[40px] w-full rounded-lg border-none bg-gray-100 px-4 text-gray-500 hover:bg-gray-200"
          >
            Cancel
          </button>
          <CustomButton
            red={true}
            title="Delete Department"
            isLoading={isLoading}
            onClick={() => mutate(data?.id)}
          />
        </div>

        {openDeletedDept && (
          // <div className="h-32 w-96 bg-red-700"></div>
          <DeletedDepartment handleCancelDelete={handleCancelDelete} />
        )}
      </div>
    </div>
  );
};

export default DeleteDepartmentModal;
