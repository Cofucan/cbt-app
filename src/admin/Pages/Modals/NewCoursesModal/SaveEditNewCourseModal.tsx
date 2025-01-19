

const SaveEditNewCourseModal = ({CancelSaveEditModal}) => {
  const images = ImportImgs();
  return (
    <div>
      {/* Modal */}
      <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50">
        <div className="bg-white shadow-lg w-[31rem]">
          {/* Modal header */}
          <div className="flex justify-between items-center px-6 py-2 border-b">
            <h2 className="text-lg font-semibold">Save New Course</h2>
            <button
              onClick={CancelSaveEditModal}
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
          <div className="flex justify-between p-6 space-x-4">
            <button
              onClick={CancelSaveEditModal}
              className="px-4 py-2 bg-gray-200 text-black"
            >
              Cancel
            </button>
            <button
            //   onClick={handleActivate}
              className="px-4 py-2 bg-[#ff6636] text-white hover:bg-[#ff6636]"
            >
              Add Course
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveEditNewCourseModal;
