import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { fetchCourseDetails, submitExam } from "../api/auth";

// Define types for the props
interface Answer {
  question_number: number;
  selected_option: string;
}

interface ExamHeaderProps {
  title: string;
  session:any ;
  studentId: number;
  examId: string;
  onExamEnd?: () => void;
  examStartTime: string;
  courseDuration: number;
  progressPercentage: number;
  totalQuestions: number;
  answeredQuestions: number;
  answers: Answer[];
  setAnswers: React.Dispatch<React.SetStateAction<Answer[]>>; // Assuming this is how you are passing the answers setter
}

const ExamHeader = ({
  title,
  studentId,
  examId,
  onExamEnd,
  examStartTime,
  courseDuration,
  progressPercentage,
  totalQuestions,
  answeredQuestions,
  answers,
  // setAnswers,
}: ExamHeaderProps) => {
  const token = localStorage.getItem("token");
  const INITIAL_TIME = courseDuration * 60;
  const STORAGE_KEY_START = `examStartTime_${studentId}_${title}`;
  const [timeRemaining, setTimeRemaining] = useState(INITIAL_TIME);
  const navigate = useNavigate();
  const [courseDetails, setCourseDetails] = useState<any>([]);

  useEffect(() => {
    const getCourseDetails = async () => {
      try {
        const data = await fetchCourseDetails(examId, token);
        setCourseDetails(data);
      } catch (error) {
        console.error("Failed to fetch course details:", error);
      }
    };
    getCourseDetails();
  }, [examId, token]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${String(hours).padStart(2, "0")} : ${String(minutes).padStart(2, "0")} : ${String(secs).padStart(2, "0")}`;
  };

  const submitAnswers = async () => {
    const requestBody = { attempted_questions: answers };

    try {
      const response = await submitExam(examId, requestBody, token);
      console.log("Exam submitted successfully:", response);

      localStorage.removeItem("token");
      localStorage.removeItem(STORAGE_KEY_START);
      navigate({ to: "/student" });

      if (onExamEnd) onExamEnd();
    } catch (error) {
      console.error("Error submitting exam:", error);
    }
  };

  useEffect(() => {
    if (!(localStorage.getItem(STORAGE_KEY_START))) {
      localStorage.setItem(STORAGE_KEY_START, examStartTime);
    }

    const calculateRemainingTime = () => {
      const elapsedTime = Math.floor((Date.now() - new Date(examStartTime).getTime()) / 1000);
      const remainingTime = INITIAL_TIME - elapsedTime;
      return remainingTime > 0 ? remainingTime : 0;
    };

    setTimeRemaining(calculateRemainingTime());

    const countdown = setInterval(() => {
      const newRemainingTime = calculateRemainingTime();
      if (newRemainingTime <= 0) {
        clearInterval(countdown);
        submitAnswers();
      } else {
        setTimeRemaining(newRemainingTime);
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [STORAGE_KEY_START, INITIAL_TIME, examStartTime]);

  return (
    <section className="mx-auto mt-10 w-[90%] bg-[#1d2026]">
      <div className="flex flex-col items-center justify-between gap-3 px-3 py-5 lg:flex-row lg:px-10">
        <div className="flex flex-col gap-2 text-white">
          <p className="font-light">{courseDetails.session} Session TEST</p>
          <h1 className="text-lg font-semibold lg:text-2xl">{title}</h1>
        </div>

        <div className="flex flex-col items-start gap-2 text-white">
          <p className="mr-4">Exam Progress</p>
          <div className="w-60 overflow-hidden rounded-xl bg-gray-300 lg:w-72">
            <div
              className="h-8 bg-[#ff6636] text-center text-sm text-white"
              style={{ width: `${progressPercentage}%` }}
            >
              <p className="py-2">{answeredQuestions} out of {totalQuestions}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-2 text-white">
          <p>Time Remaining</p>
          <p className="text-2xl font-semibold">{formatTime(timeRemaining)}</p>
        </div>
      </div>
    </section>
  );
};

export default ExamHeader;
