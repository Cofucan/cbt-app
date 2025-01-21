import React, { useState } from "react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { BeatLoader } from "react-spinners";

const QuickNavigation = ({
  currentQuestion,
  onSelect,
  toggleOpenModal,
  totalQuestions,
  selectedAnswers,
  examStartTime,
}) => {
  const navigate = useNavigate();
  const { examId } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChecked = (questionNumber) => {
    return (
      selectedAnswers.find(
        (answer) => answer.question_number === questionNumber,
      )?.selected_option || ""
    );
  };

  const GoToQuestionsDetails = () => {
    setIsSubmitting(true);

    console.log("Navigating with selectedAnswers:", selectedAnswers);

    setTimeout(() => {
      // navigate(`/QuestionDetails/${examId}`, {
      //   state: { selectedAnswers, totalQuestions, examStartTime }
      // });
      navigate({ to: "/student/question-details/$examId", params: { examId } });

      console.log("ExamStartTimeINQuestion", examStartTime);

      setIsSubmitting(false);
    }, 5000);
  };

  return (
    <div className="bg-white p-8">
      <h3 className="mb-4 font-semibold text-[#ff6636]">Quick Navigation</h3>
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => onSelect(num)}
            aria-label={`Go to question ${num}`}
            className={`flex h-10 w-10 items-center justify-center rounded ${
              currentQuestion === num
                ? "bg-[#ff6636] text-white"
                : handleChecked(num) // Check if question has been answered
                  ? "bg-[#ff6636] text-white" // Highlight answered questions
                  : "bg-[#f5f7fa] text-lg font-semibold text-black"
            }`}
          >
            {num}
          </button>
        ))}
      </div>

      <button
        onClick={GoToQuestionsDetails}
        className="mt-6 w-[70%] bg-[#ff6636] py-3 font-semibold text-white lg:w-full"
      >
        {isSubmitting ? <BeatLoader color="#fff" /> : " Submit Test"}
      </button>
    </div>
  );
};

export default QuickNavigation;
