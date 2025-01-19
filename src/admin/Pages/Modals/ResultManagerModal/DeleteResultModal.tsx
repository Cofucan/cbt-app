
import ImportImgs from "../../../components/ImportImgs";

const DeleteResultModal = ({closeResultDeleteModal}) => {
  const images = ImportImgs();
  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50">
      <div className="bg-white shadow-lg w-[35rem]">
        {/* Modal header */}
        <div className="flex justify-between items-center px-6 py-2 border-b">
          <h2 className="text-xl font-semibold">Delete Result</h2>
          <button
            onClick={closeResultDeleteModal}
            className="text-gray-500 hover:text-gray-800"
          >
            <img src={images.Times} alt="Times" />
          </button>
        </div>

        {/* Modal content */}
        <div className="p-6">
          <p>Are you sure you want to Delete this Result?</p>
        </div>

        {/* Modal footer */}
        <div className="flex justify-between p-6 space-x-4">
          <button
            onClick={closeResultDeleteModal}
            className="px-4 py-2 bg-gray-200 font-bold text-black"
          >
            Cancel
          </button>
          <button
            // onClick={ToggleOpenDeleteDept}
            className="px-4 py-2 bg-[#FF3636] text-white hover:bg-[#FF3636]"
          >
            Delete Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteResultModal;
