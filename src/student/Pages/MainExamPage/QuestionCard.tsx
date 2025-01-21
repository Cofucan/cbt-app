import React, { useState } from "react";
import ImportingImgs from "../../Components/ImportingImgs";
import { useNavigate, useParams } from "@tanstack/react-router";
import { BeatLoader } from "react-spinners";
import { baseUrl } from "../../../lib/utils";

const QuestionCard = ({
  questions,
  onNext,
  onPrev,
  buttonChange,
  handleAnswerChange,
  selectedAnswers,
  totalQuestions,
  examId,
}: {
  examId: string;
}) => {
  const images = ImportingImgs();
  const navigate = useNavigate();
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
      navigate({ to: "/student/question-details/$examId", params: { examId } });
      // navigate(`/QuestionDetails/${examId}`, {
      //   state: { selectedAnswers, totalQuestions},
      // });

      setIsSubmitting(false);
    }, 5000);
  };

  if (!questions)
    return (
      <p className="bg-white p-8 text-[#ff6636]">No question available...</p>
    ); // Handle missing question

  const options = [
    questions.option_1,
    questions.option_2,
    questions.option_3,
    questions.option_4,
  ];

  return (
    <section>
      <div className="bg-white p-8">
        <h2 className="mb-4 md:text-lg">
          {/* {questions.number}. {questions.text} */}
          {questions.student_question_number}. {questions.text}
        </h2>

        {questions.image_url && (
          <img
            src={`${baseUrl}${questions.image_url}`}
            alt={`Question ${questions.number}`}
            className="mb-6 h-52 w-60"
          />
        )}

        <div className="space-y-4">
          {options.map((option, index) => {
            if (option === "nan") return null; // Skip if option is 'nan'
            const isChecked =
              handleChecked(questions.student_question_number) === option;

            return (
              <div key={index} className="flex items-center space-x-2">
                <div className="font-bold">
                  {String.fromCharCode(65 + index)}.
                </div>
                <div>
                  <input
                    type="radio"
                    name={`question-${questions.student_question_number}`} // Use questions.number for unique names
                    id={`option-${questions.student_question_number}-${index}`} // Unique ID for each option
                    className="h-5 w-5 accent-[#ff6636]"
                    checked={isChecked} // Set checked based on selectedAnswers
                    onChange={() =>
                      handleAnswerChange(
                        questions.student_question_number,
                        option,
                      )
                    } // Track selected answer
                  />
                </div>
                <label
                  htmlFor={`option-${questions.student_question_number}-${index}`}
                  className="text-gray-800"
                >
                  {option}
                </label>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mx-2 flex justify-between md:mx-10 lg:mx-0">
        {/* Previous Button */}
        <button
          onClick={onPrev}
          className="mt-6 flex items-center gap-2 bg-[#ffeee8] px-14 py-3 font-semibold text-[#ff6636]"
        >
          Previous
        </button>

        {/* Conditionally Render Next or Changed Button */}
        {buttonChange ? (
          <button
            onClick={GoToQuestionsDetails}
            className="mt-6 bg-[#ff6636] px-14 py-3 font-semibold text-white"
          >
            {isSubmitting ? <BeatLoader color="#fff" /> : " Review"}
          </button>
        ) : (
          <button
            onClick={onNext}
            className="mt-6 flex items-center gap-2 bg-[#ff6636] px-14 py-3 text-white"
          >
            Next
          </button>
        )}
      </div>
    </section>
  );
};

export default QuestionCard;
