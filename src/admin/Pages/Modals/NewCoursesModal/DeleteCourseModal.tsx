import { FC, useEffect } from "react";
import ImportImgs from "../../../components/ImportImgs";
import useDeleteCourse from "../../../hooks/deleteData/useDeleteCourse";
import CustomButton from "../../../components/CustomButton";
interface DeleteCourseModalProps {
  data: Record<string, any> | null | undefined
  handleDeleteCancel: () => void
}
const DeleteCourseModal: FC<DeleteCourseModalProps> = (props) => {
  const { data, handleDeleteCancel } = props
  const images = ImportImgs();

  const { mutate, isLoading, isSuccess } = useDeleteCourse();

  useEffect(() => {
    if (isSuccess) {
      handleDeleteCancel();
    }
  }, [isSuccess]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
      <div className="w-[35rem] bg-white shadow-lg">
        {/* Modal header */}
        <div className="flex items-center justify-between border-b px-6 py-2">
          <h2 className="text-xl font-semibold">Delete Course</h2>
          <button
            onClick={handleDeleteCancel}
            className="text-gray-500 hover:text-gray-800"
          >
            <img src={images.Times} alt="Times" />
          </button>
        </div>

        {/* Modal content */}
        <div className="p-6">
          <p>Are you sure you want to Delete this Course?</p>
        </div>

        {/* Modal footer */}

        <div className="flex items-center justify-between gap-4 p-6">
          <button
            onClick={handleDeleteCancel}
            className="h-[40px] w-full rounded-lg border-none bg-gray-100 px-4 text-gray-500 hover:bg-gray-200"
          >
            Cancel
          </button>
          <CustomButton
            red={true}
            title="Delete Course"
            isLoading={isLoading}
            onClick={() => mutate(data?.id)}
          />
        </div>

        {/* {openDeletedDept && (
          // <div className="h-32 w-96 bg-red-700"></div>
          <DeletedDepartment handleCancelDelete={handleCancelDelete} />
        )} */}
      </div>
    </div>
  );
};

export default DeleteCourseModal;
