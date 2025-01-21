import ImportImgs from "../../../components/ImportImgs";

const SaveNewCourseModal = ({ CancelSaveModal }) => {
  const images = ImportImgs();
  return (
    <div>
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
        <div className="w-[31rem] bg-white shadow-lg">
          {/* Modal header */}
          <div className="flex items-center justify-between border-b px-6 py-2">
            <h2 className="text-lg font-semibold">Save New Course</h2>
            <button
              onClick={CancelSaveModal}
              className="text-gray-500 hover:text-gray-800"
            >
              <img src={images.Times} alt="Times" />
            </button>
          </div>

          {/* Modal content */}
          <div className="p-6">
            <p>Are you sure you want to Add a New Course?</p>
          </div>

          {/* Modal footer */}
          <div className="flex justify-between space-x-4 p-6">
            <button
              onClick={CancelSaveModal}
              className="bg-gray-200 px-4 py-2 text-black"
            >
              Cancel
            </button>
            <button
              // onClick={handleActivate}
              className="bg-[#ff6636] px-4 py-2 text-white hover:bg-[#ff6636]"
            >
              Add Course
            </button>
          </div>
        </div>
      </div>

      {/* {openSuccessModal && (
        <div>
          <ExamActivated TogglecloseSuccessModal={TogglecloseSuccessModal}/>
        </div>
      )} */}
    </div>
  );
};

export default SaveNewCourseModal;
