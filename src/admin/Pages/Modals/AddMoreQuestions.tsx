import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import ImportImgs from "../../components/ImportImgs";
import BulkQuestionUpload from "./BulkQuestionUpload";
import useAddTest from "../../hooks/postData/useAddTest";
import CustomButton from "../../components/CustomButton";
import { MdInsertPhoto } from "react-icons/md";

interface AddMoreQuestionsProps {
  data:  { id: string } | null
  addMoreQuestions: boolean
  closeAddMoreQuestion: () => void
}

const AddMoreQuestions: FC<AddMoreQuestionsProps> = (props) => {
  const {
    data,
    addMoreQuestions,
    closeAddMoreQuestion
  } = props
  const [bulkUpload, setBulkUpload] = useState(false);

  const {
    addBulkFormik,
    successSingleQusetion,
    loadingSingleQuestion,
    numberOfQuestion,
    setNumberOfQuestion,
    image,
    setImage
  } = useAddTest(data?.id);

  const ToggleBulkUploadOpen = () => {
    setBulkUpload(true);
    // setAddMoreQuestions(false);
  };
  const ToggleBulkUploadClose = () => {
    setBulkUpload(false);
  };

  const images = ImportImgs();

  useEffect(() => {
    if (successSingleQusetion) {
      closeAddMoreQuestion();
    }
  }, [successSingleQusetion]);

  const handleBrowseQuest = (e) => {
    const selected = e.target.files[0];
    console.log(selected);
    setImage(selected);
  };

  function handleInputFocus() {
    const fileElem = document.querySelector("input[type=\"file\"]") as HTMLInputElement;
    fileElem.click();
  }

  return (
    <div>
      {/* Modal */}
      {addMoreQuestions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
          <div className="h-full w-[30rem] overflow-y-auto bg-white shadow-lg scrollbar-hide">
            {/* Modal header */}
            <div className="flex items-center justify-between border-b px-6 pb-3 pt-6">
              <h2 className="text-sm font-semibold">Add More Questions</h2>
              <button
                onClick={closeAddMoreQuestion}
                className="text-gray-500 hover:text-gray-800"
              >
                <img src={images.Times} alt="Close" />
              </button>
            </div>
            {/* Modal Sub Header */}
            <div className="flex items-center justify-between px-6 pb-3 pt-6">
              <h2 className="border-b border-[#ff6636] text-sm font-semibold leading-8">
                Single Upload
              </h2>
              <button
                onClick={ToggleBulkUploadOpen}
                className="bg-[#ff6636] px-6 py-2 text-white"
              >
                Bulk Upload
              </button>
            </div>
            {bulkUpload && (
              // <div className="bg-red-600 h-60 w-96 absolute"></div>
              <BulkQuestionUpload
                data={data}
                bulkUpload={bulkUpload}
                closeAddMoreQuestion={closeAddMoreQuestion}
                ToggleBulkUploadClose={ToggleBulkUploadClose}
              />
            )}
            ;{/* Modal content */}
            <div className="space-y-4 p-6">
              {/* Question Input */}
              <div>
                <label className="text-sm font-medium">Question</label>
                <textarea
                  name="text"
                  onChange={addBulkFormik.handleChange}
                  className="mt-2 w-full rounded border p-2 placeholder:text-sm"
                  rows={4}
                  placeholder="Write your question here..."
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="text-sm font-medium">
                  Add Image (Optional)
                </label>
                <div className="mt-2 flex items-center justify-center rounded border border-gray-300 p-2">
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleBrowseQuest}
                  />

                  {!image && (
                    <div className="flex w-full items-center justify-center gap-3">
                      <img
                        src={images.DownloadUp}
                        alt="Upload"
                        className="mr-2 cursor-pointer rounded-full bg-[#FFEEE8] p-1"
                        onClick={handleInputFocus}
                      />
                      <span className="text-sm text-[#BFBFBF]">
                        Drag and drop or{" "}
                        <span
                          onClick={handleInputFocus}
                          className="cursor-pointer font-bold text-[#ff6636]"
                        >
                          Browse
                        </span>{" "}
                        to upload image
                      </span>
                    </div>
                  )}

                  {image && (
                    <div className="flex w-full items-center justify-center gap-3">
                      <img
                        src={images.DownloadUp}
                        onClick={handleInputFocus}
                        alt="uploadIcon"
                        className="mr-2 cursor-pointer rounded-full border bg-[#e9eaf0] p-1"
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
                    className="mt-2 w-full rounded border p-2"
                    placeholder="Option A"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Option B</label>
                  <input
                    type="text"
                    name="option_2"
                    onChange={addBulkFormik.handleChange}
                    className="mt-2 w-full rounded border p-2"
                    placeholder="Option B"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Option C</label>
                  <input
                    type="text"
                    name="option_3"
                    onChange={addBulkFormik.handleChange}
                    className="mt-2 w-full rounded border p-2"
                    placeholder="Option C"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Option D</label>
                  <input
                    type="text"
                    name="option_4"
                    onChange={addBulkFormik.handleChange}
                    className="mt-2 w-full rounded border p-2"
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
                  className="mt-2 w-full rounded border p-2"
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
                  className="mt-2 w-full rounded border p-2"
                  placeholder="Question Number"
                />
              </div>
            </div>
            {/* Modal footer */}
            <div className="flex items-center justify-between gap-4 px-6 pb-8 pt-6">
              <button
                onClick={closeAddMoreQuestion}
                className="h-[40px] w-full rounded-lg border-none bg-gray-100 px-4 text-gray-500 hover:bg-gray-200"
              >
                Cancel
              </button>
              <CustomButton
                title="Add Question"
                isLoading={loadingSingleQuestion}
                onClick={() => addBulkFormik.handleSubmit()}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddMoreQuestions;
