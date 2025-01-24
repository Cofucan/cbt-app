import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { BeatLoader } from "react-spinners";
import { useStudentData } from "../../context/StudentDataContext.tsx";

export interface Answer {
  question_number: number | string;
  selected_option: string | number;
}

interface QuickNavigationProps {
  currentQuestion: number;
  onSelect: (questionNumber: number) => void;
  totalQuestions: number;
  selectedAnswers: Answer[];
  examStartTime: string | undefined;
  examId: string;
  loading: boolean;
}

const QuickNavigation: React.FC<QuickNavigationProps> = ({
  currentQuestion,
  onSelect,
  totalQuestions,
  selectedAnswers,
  examStartTime,
  examId,
}) => {
  const studentData = useStudentData();

  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if the question has been answered
  const handleChecked = (questionNumber: number) => {
    return (
      selectedAnswers.find(
        (answer) => answer.question_number === questionNumber,
      )?.selected_option || ""
    );
  };

  const GoToQuestionsDetails = async () => {
    setIsSubmitting(true);
    studentData.setData({
      selectedAnswers,
      totalQuestions,
      examStartTime: examStartTime ?? undefined,
    });
    await navigate({
      to: `/student/question-details/${examId}`,
      params: { examId },
    });
    setIsSubmitting(false);
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
        {isSubmitting ? <BeatLoader color="#fff" /> : "Preview"}
      </button>
    </div>
  );
};

export default QuickNavigation;
