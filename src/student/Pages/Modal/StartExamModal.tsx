import React, { useState } from "react";
import ImportingImgs from "../../Components/ImportingImgs";
import { useNavigate } from "@tanstack/react-router";
import { startExam } from "../../api/auth";
import { BeatLoader } from "react-spinners";

const StartExamModal = ({
  ToggleStartExamModalClose,
  courseDetails,
  examId,
  totalQuestions
}) => {
  const images = ImportingImgs();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const startExamFn = async () => {
    const token = localStorage.getItem("token");

    setLoading(true);
    try {
      await startExam(examId, {}, token);
      ToggleStartExamModalClose();
      navigate({to: "/student/exams/$examId", params: {examId}})
    } catch (error) {
      setError("unable to start exam");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Modal */}
      <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50">
        <div className="bg-white shadow-lg w-[47rem] ">
          {/* Modal header */}
          <div className="flex justify-between items-center px-6 py-3 border-b">
            <h2 className="text-lg font-medium">Confirm Test Attempt</h2>
            <button
              onClick={ToggleStartExamModalClose}
              className="text-gray-500 hover:text-gray-800"
            >
              <img src={images.Times} alt="Times" />
            </button>
          </div>

          {/* Modal content */}
          <div className="p-6">
            <p>
              Are you sure you are ready to start the test? Make sure you have
              read all instructions.
            </p>
            <div className="flex flex-col gap-2 pt-4">
              <div className="flex items-center gap-2">
                <img src={images.Clock} alt="Clock" />
                <p>
                  The duration is{" "}
                  {courseDetails.duration % 1 === 0
                    ? courseDetails.duration
                    : courseDetails.duration.toFixed(2)}{" "}
                  minutes
                </p>
              </div>
              <div className="flex items-center gap-2">
                <img src={images.Document} alt="Document" />
                <p>Questions: {totalQuestions}</p>
              </div>
              <div className="flex items-center gap-2 border-2 px-5 py-3 mt-2 border-[#febb79] bg-[#febb79] bg-opacity-20">
                <img src={images.octagon} alt="Document" />
                <p>
                  Once you start, the timer will begin and you cannot pause the
                  test
                </p>

                {error && <p className="text-[#ff6636]">{error}</p>}
              </div>
            </div>
          </div>

          {/* Modal footer */}
          <div className="flex justify-between p-6 space-x-4">
            <button
              onClick={ToggleStartExamModalClose}
              className="px-4 py-2 font-semibold bg-gray-200 text-black"
            >
              Cancel
            </button>
            <button
              onClick={startExamFn}
              className="px-5 py-3 bg-[#ff6636] text-white hover:bg-[#ff6636]"
            >
              {loading ? <BeatLoader color="#fff" /> : "Start Test"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartExamModal;
