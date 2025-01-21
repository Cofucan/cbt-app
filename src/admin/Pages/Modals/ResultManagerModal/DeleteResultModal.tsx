import ImportImgs from "../../../components/ImportImgs";

const DeleteResultModal = ({ closeResultDeleteModal }) => {
  const images = ImportImgs();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
      <div className="w-[35rem] bg-white shadow-lg">
        {/* Modal header */}
        <div className="flex items-center justify-between border-b px-6 py-2">
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
        <div className="flex justify-between space-x-4 p-6">
          <button
            onClick={closeResultDeleteModal}
            className="bg-gray-200 px-4 py-2 font-bold text-black"
          >
            Cancel
          </button>
          <button
            // onClick={ToggleOpenDeleteDept}
            className="bg-[#FF3636] px-4 py-2 text-white hover:bg-[#FF3636]"
          >
            Delete Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteResultModal;
