import React, { useState } from "react";
import ImportingImgs from "../../Components/ImportingImgs";
import { useNavigate } from "@tanstack/react-router";
import { submitExam } from "../../api/auth";
import { Answer } from "../MainExamPage/QuickNavigation";


interface SubmitModalProps {
  ToggleCloseModal: () => void;  
  examId: string;  
  token: string | null; 
  selectedAnswers: Answer[];
  examStartTime: string;  
}

const SubmitModal: React.FC<SubmitModalProps> = ({
  ToggleCloseModal,
  examId,
  token,
  selectedAnswers,
  // examStartTime,
}) => {
  const images = ImportingImgs();
  const navigate = useNavigate();
  
  // Define types for the state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(""); 
  // Handle submit
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
       console.log("Raw answers:", selectedAnswers);

      if (selectedAnswers.length === 0) {
        throw new Error("No answers provided.");
      }

      const formattedAnswers = selectedAnswers.map((answer) => ({
        question_number: parseInt(answer.question_number.toString(), 10),
        selected_option: answer.selected_option || "",
      }));

       console.log("Formatted answers:", formattedAnswers);
      
      const requestBody = {
        attempted_questions: formattedAnswers,
      };

      console.log("Request body:", requestBody);
      
      const response = await submitExam(examId, requestBody, token);
      console.log("Submission response:", response);

      localStorage.removeItem("token");

      // Navigate to ExamFinished page
      navigate({ to: "/student/exam-success" });

    } catch (error: any) {
      console.error("Error submitting exam:", error);
      setErrorMessage(error.message || "Failed to submit the exam. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
        <div className="w-[47rem] bg-white shadow-lg">
          <div className="flex items-center justify-between border-b px-6 py-3">
            <h2 className="text-lg font-medium">Submit</h2>
            <button
              onClick={ToggleCloseModal}
              className="text-gray-500 hover:text-gray-800"
            >
              <img src={images.Times} alt="Close" />
            </button>
          </div>
          <div className="flex flex-col gap-5 p-6">
            <p>Are you sure you want to submit your test?</p>
            <p>
              Once submitted, you will not be able to make any further changes
              or answer additional questions.
            </p>
          </div>
          {errorMessage && (
            <div className="border-2 border-gray-200 bg-gray-200 px-4 py-2 font-semibold text-[#ff6636]">
              {errorMessage}
            </div>
          )}
          <div className="flex justify-between space-x-4 p-6">
            <button
              onClick={ToggleCloseModal}
              className="bg-gray-200 px-4 py-2 font-semibold text-black"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className={`bg-[#ff6636] px-5 py-3 font-semibold text-white hover:bg-[#e65c2f] ${
                isSubmitting ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit And Finish"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitModal;
