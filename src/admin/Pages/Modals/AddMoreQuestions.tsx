import React, { useEffect, useState } from "react";
import ImportImgs from "../../components/ImportImgs";
import BulkQuestionUpload from "./BulkQuestionUpload";
import useAddTest from "../../hooks/postData/useAddTest";
import CustomButton from "../../components/CustomButton";
import { MdInsertPhoto } from "react-icons/md";

const AddMoreQuestions = ({
  data,
  addMoreQuestions,
  setAddMoreQuestions,
  closeAddMoreQuestion,
}) => {
  const [bulkUpload, setBulkUpload] = useState(false);

  const { addBulkFormik, successSingleQusetion, loadingSingleQuestion, numberOfQuestion, setNumberOfQuestion, image, setImage } = useAddTest(data?.id)

  const ToggleBulkUploadOpen = () => {
    setBulkUpload(true);
    // setAddMoreQuestions(false);
  };
  const ToggleBulkUploadClose = () => {
    setBulkUpload(false);
  };

  const images = ImportImgs();
  const handleAddMoreQuestions = () => {
    // Handle the exam activation logic here
    console.log("Exam Added");
    setAddMoreQuestions(false);
  };

  useEffect(() => {
    if (successSingleQusetion) {
      closeAddMoreQuestion()
    }
  }, [successSingleQusetion])

  const handleBrowseQuest = (e) => {
    const selected = e.target.files[0];
    console.log(selected);
    setImage(selected)
  };

  return (
    <div>
      {/* Modal */}
      {addMoreQuestions && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50">
          <div className="bg-white shadow-lg w-[30rem] h-full overflow-y-auto scrollbar-hide">
            {/* Modal header */}
            <div className="flex justify-between items-center px-6 pb-3 pt-6 border-b">
              <h2 className="text-sm font-semibold">Add More Questions</h2>
              <button
                onClick={closeAddMoreQuestion}
                className="text-gray-500 hover:text-gray-800"
              >
                <img src={images.Times} alt="Close" />
              </button>
            </div>
            {/* Modal Sub Header */}
            <div className="flex justify-between items-center px-6 pb-3 pt-6">
              <h2 className="text-sm font-semibold border-b border-[#ff6636] leading-8">
                Single Upload
              </h2>
              <button
                onClick={ToggleBulkUploadOpen}
                className="text-white bg-[#ff6636] px-6 py-2"
              >
                Bulk Upload
              </button>
            </div>
            {bulkUpload && (
              // <div className="bg-red-600 h-60 w-96 absolute"></div>
              <BulkQuestionUpload
                data={data}
                setBulkUpload={setBulkUpload}
                bulkUpload={bulkUpload}
                closeAddMoreQuestion={closeAddMoreQuestion}
                ToggleBulkUploadClose={ToggleBulkUploadClose}
              />
            )}
            ;{/* Modal content */}
            <div className="p-6 space-y-4">
              {/* Question Input */}
              <div>
                <label className="text-sm font-medium">Question</label>
                <textarea
                  name="text"
                  onChange={addBulkFormik.handleChange}
                  className="w-full border rounded mt-2 p-2 placeholder:text-sm"
                  rows="4"
                  placeholder="Write your question here..."
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="text-sm font-medium">
                  Add Image (Optional)
                </label>
                <div
                  className="mt-2 p-2 border border-gray-300 rounded flex justify-center items-center">
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleBrowseQuest} />

                  {!image && (
                    <div className=" w-full flex gap-3 justify-center items-center " >
                      <img
                        src={images.DownloadUp}
                        alt="Upload"
                        className="mr-2 p-1 rounded-full bg-[#FFEEE8] cursor-pointer "
                        onClick={() =>
                          document.querySelector('input[type="file"]').click()
                        }
                      />
                      <span className="text-[#BFBFBF] text-sm">
                        Drag and drop or{" "}
                        <span onClick={() =>
                          document.querySelector('input[type="file"]').click()
                        } className="text-[#ff6636] font-bold cursor-pointer">
                          Browse
                        </span>{" "}
                        to upload image
                      </span>
                    </div>
                  )}

                  {image && (
                    <div className=" w-full flex gap-3 justify-center items-center " >
                      <img
                        src={images.DownloadUp}
                        onClick={() => document.querySelector('input[type="file"]').click() }
                        alt="uploadIcon"
                        className="p-1 rounded-full mr-2 cursor-pointer border bg-[#e9eaf0]"
                      />{" "}
                      <MdInsertPhoto size={"40px"} />
                      <div>
                        <p>{image.name}</p>
                        <p>{(image?.size / 1024).toFixed(2)}kb</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Options A - D */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Option A</label>
                  <input
                    type="text"
                    name="option_1"
                    onChange={addBulkFormik.handleChange}
                    className="w-full border rounded mt-2 p-2"
                    placeholder="Option A"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Option B</label>
                  <input
                    type="text"
                    name="option_2"
                    onChange={addBulkFormik.handleChange}
                    className="w-full border rounded mt-2 p-2"
                    placeholder="Option B"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Option C</label>
                  <input
                    type="text"
                    name="option_3"
                    onChange={addBulkFormik.handleChange}
                    className="w-full border rounded mt-2 p-2"
                    placeholder="Option C"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Option D</label>
                  <input
                    type="text"
                    name="option_4"
                    onChange={addBulkFormik.handleChange}
                    className="w-full border rounded mt-2 p-2"
                    placeholder="Option D"
                  />
                </div>
              </div>

              {/* Correct Option */}
              <div>
                <label className="text-sm font-medium">Correct Option</label>
                <input
                  type="text"
                  name="answer"
                  onChange={addBulkFormik.handleChange}
                  className="w-full border rounded mt-2 p-2"
                  placeholder="Correct Option"
                />
              </div>
              {/* Correct Option */}
              <div>
                <label className="text-sm font-medium">Question Number</label>
                <input
                  type="number"
                  value={numberOfQuestion}
                  onChange={(e) => setNumberOfQuestion(e.target.value)}
                  className="w-full border rounded mt-2 p-2"
                  placeholder="Question Number"
                />
              </div>
            </div>
            {/* Modal footer */}


            <div className="flex justify-between gap-4 px-6 pb-8 pt-6 items-center">
              <button
                onClick={closeAddMoreQuestion}
                className="bg-gray-100 text-gray-500 border-none rounded-lg hover:bg-gray-200 px-4 h-[40px] w-full "
              >
                Cancel
              </button>
              <CustomButton title="Add Question" isLoading={loadingSingleQuestion} onClick={() => addBulkFormik.handleSubmit()} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddMoreQuestions;
