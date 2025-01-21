// import 'antd/dist/reset.css'; // Ant Design reset CSS
import {
  createFileRoute,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  getUserProfile,
  startExam,
  submitAnswer,
} from "../../../student/api/auth.ts";
import { BeatLoader } from "react-spinners";
import QuestionCard from "../../../student/Pages/MainExamPage/QuestionCard.tsx";
import ExamHeader from "../../../student/Components/ExamHeader.tsx";
import Header from "../../../student/Components/MainHeader.tsx";
import QuickNavigation from "../../../student/Pages/MainExamPage/QuickNavigation.tsx";
import Footer from "../../../student/Components/Footer.tsx";

export const Route = createFileRoute("/student/_auth/exams/$examId")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { examId } = Route.useParams();
  const [examStartTime, setExamStartTime] = useState(null);
  const [buttonChange, setButtonChange] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [lastSubmittedCount, setLastSubmittedCount] = useState(0);

  const [error, setError] = useState<string | null>(null);
  const [courseTitle, setCourseTitle] = useState(null);
  const [courseDuration, setCourseDuration] = useState<number | null>(null);
  const [studentId, setStudentId] = useState(null);

  // Fetch token from localStorage
  const token = localStorage.getItem("token");

  // Fetch the session from the localStorage
  const session = JSON.parse(
    localStorage.getItem("schoolConfig"),
  ).current_session;

  // Fetch student profile to get studentId
  useEffect(() => {
    const fetchStudentId = async () => {
      try {
        if (token) {
          const profileData = await getUserProfile(token);
          const id = profileData?.result?.profile.id;
          setStudentId(id);
        } else {
          console.error("No token found");
        }
      } catch (error) {
        console.error("Error fetching student Id:", error);
      }
    };
    fetchStudentId();
  }, [token]);

  // Fetch exam questions from startExam endpoint
  useEffect(() => {
    const fetchExamData = async () => {
      if (!examId) {
        setError("Exam ID is undefined. Cannot fetch questions.");
        return;
      }
      try {
        const data = await startExam(examId, {}, token);
        if (data && data.attempted_questions) {
          setQuestions(
            data.attempted_questions.map((q) => ({
              student_question_number: q.student_question_number,
              ...q.question,
            })),
          );

          // Extract and set selected answers based on attempted questions
          setSelectedAnswers(
            data.attempted_questions
              .filter((q) => q.selected_option !== null) // Filter out questions with null selected_option
              .map((q) => ({
                question_number: q.student_question_number,
                selected_option: q.selected_option,
              })),
          );

          setCourseTitle(data.exam.title);

          // Calculate duration in minutes
          const durationInMs =
            new Date(data.expected_end_at) - new Date(data.started_at);
          const durationInMinutes = Math.floor(durationInMs / (1000 * 60));

          setExamStartTime(data.started_at);
          setCourseDuration(durationInMinutes); // Set duration in minutes
        } else {
          setError("No questions found in the response.");
        }
      } catch (error) {
        console.error("Error fetching exam data:", error);
        setError("Failed to load exam details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchExamData();
  }, [examId, token]);

  // Handle navigation between questions
  const handleNext = () => {
    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setButtonChange(currentQuestion + 1 === questions.length);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
      setButtonChange(false);
    }
  };

  const handleQuestionSelect = (num: number) => {
    setCurrentQuestion(num);
  };

  // Handle answer change
  const handleAnswerChange = (questionNumber, selectedOption) => {
    // Update selected answers
    setSelectedAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      const answerIndex = updatedAnswers.findIndex(
        (ans) => ans.question_number === questionNumber,
      );

      if (answerIndex > -1) {
        updatedAnswers[answerIndex].selected_option = selectedOption;
      } else {
        updatedAnswers.push({
          question_number: questionNumber,
          selected_option: selectedOption,
        });
      }

      // Check if 5 answers have been selected
      if (updatedAnswers.length % 5 === 0) {
        submitAnswers(updatedAnswers); // Call the submission function
      }
      console.log("updatedAnswers", updatedAnswers);
      return updatedAnswers;
    });
  };

  // Submit answers to the server
  const submitAnswers = async (answersToSubmit) => {
    const formattedAnswers = answersToSubmit.map((answer) => ({
      question_number: parseInt(answer.question_number, 10),
      selected_option: answer.selected_option || "",
    }));

    const requestBody = { attempted_questions: formattedAnswers };

    try {
      await submitAnswer(examId, requestBody, token);
      console.log("Answers submitted successfully:", formattedAnswers);
    } catch (error) {
      console.error("Failed to submit answers:", error);
    }
  };

  const progressPercentage = Math.floor(
    (selectedAnswers.length / questions.length) * 100,
  );

  // Render loader or error if applicable
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <BeatLoader color="#ff6636" size={20} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <section className="bg-gray-50">
      <Header />
      {courseTitle &&
        studentId &&
        examId &&
        courseDuration !== null &&
        examStartTime && (
          <ExamHeader
            title={courseTitle}
            studentId={studentId}
            examId={examId}
            examStartTime={examStartTime}
            courseDuration={courseDuration}
            progressPercentage={progressPercentage}
            totalQuestions={questions.length}
            answeredQuestions={selectedAnswers.length}
            answers={selectedAnswers}
            setAnswers={setSelectedAnswers}
            session={session}
          />
        )}
      <div className="min-h-screen lg:mx-20">
        <div className="mt-10 flex flex-col gap-10 lg:flex-row">
          <div className="w-full lg:w-3/4">
            <QuestionCard
              questionNumber={currentQuestion}
              onNext={handleNext}
              onPrev={handlePrev}
              buttonChange={buttonChange}
              questions={questions[currentQuestion - 1]}
              handleAnswerChange={handleAnswerChange}
              selectedAnswers={selectedAnswers}
              studentId={studentId}
              examId={examId}
              totalQuestions={questions.length}
              // examStartTime={examStartTime}
            />
          </div>
          <div className="w-full lg:w-1/4">
            <QuickNavigation
              currentQuestion={currentQuestion}
              onSelect={handleQuestionSelect}
              toggleOpenModal={() => setOpenModal(true)}
              totalQuestions={questions.length}
              selectedAnswers={selectedAnswers}
              loading={loading}
              examStartTime={examStartTime}
            />
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}
