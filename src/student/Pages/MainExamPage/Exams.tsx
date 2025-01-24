import React, { useEffect, useState } from "react";

import Header from "../../Components/MainHeader";
import ExamHeader from "../../Components/ExamHeader";
import QuestionCard from "./QuestionCard";
import QuickNavigation, { Answer } from "./QuickNavigation";
import Footer from "../../Components/Footer";
import { getUserProfile, startExam, submitAnswer } from "../../api/auth";
import { BeatLoader } from "react-spinners";

interface Question {
  question_text: string;
  student_question_number: number;
  text: string;
  option_1: string;
  option_2: string;
  option_3: string;
  option_4: string;
  options: string[];
}


interface AttemptedQuestion {
  student_question_number: number | string;
  selected_option: string | null;
  question: Question;
}

interface ExamsProps {
  examId: string;
}

const Exams: React.FC<ExamsProps> = ({ examId }) => {
  console.log("EXAMID", examId);
  const [examStartTime, setExamStartTime] = useState<string | undefined>();
  const [buttonChange, setButtonChange] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  // const [openModal, setOpenModal] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Partial<Question>[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedAnswers, setSelectedAnswers] = useState<Answer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [courseTitle, setCourseTitle] = useState<string | null>(null);
  const [courseDuration, setCourseDuration] = useState<number | null>(null);
  const [studentId, setStudentId] = useState<number | null>(null);

  const token = localStorage.getItem("token");
  const session = JSON.parse(
    localStorage.getItem("schoolConfig")!
  ).current_session;

  // Fetch Student ID
  useEffect(() => {
    const fetchStudentId = async () => {
      if (token) {
        try {
          const profileData = await getUserProfile(token);
          const id = profileData?.result?.profile.id;
          setStudentId(id);
        } catch (error) {
          console.error("Error fetching student Id:", error);
        }
      } else {
        console.error("No token found");
      }
    };
    fetchStudentId();
  }, [token]);

  // Fetch Exam Data
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
            // @ts-ignore
            data.attempted_questions.map(
              (q) => ({
                student_question_number: q.student_question_number,
                question_text: q.question.question_text,
                options: q.question.options
                // any other properties of the question you want to include
              })
            )
          );

          setSelectedAnswers(
            data.attempted_questions
              // @ts-ignore
              .filter((q: AttemptedQuestion) => q.selected_option !== null)
              // @ts-ignore
              .map((q: AttemptedQuestion) => ({
                question_number: q.student_question_number,
                selected_option: q.selected_option!
              }))
          );

          setCourseTitle(data.exam.title);

          const durationInMs =
            new Date(data.exam.expected_end_at).getTime() -
            new Date(data.exam.started_at).getTime();
          const durationInMinutes = Math.floor(durationInMs / (1000 * 60));
          setExamStartTime(data.exam.started_at);
          setCourseDuration(durationInMinutes);
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

  // Handle Next Question
  const handleNext = () => {
    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setButtonChange(currentQuestion + 1 === questions.length);
    }
  };

  // Handle Previous Question
  const handlePrev = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
      setButtonChange(false);
    }
  };

  // Handle Question Select
  const handleQuestionSelect = (num: number) => {
    setCurrentQuestion(num);
  };

  // Handle Answer Change
  // const handleAnswerChange = (
  //   questionNumber: number,
  //   selectedOption: string
  // ) => {
  //   setSelectedAnswers((prevAnswers) => {
  //     const updatedAnswers = [...prevAnswers];
  //     const answerIndex = updatedAnswers.findIndex(
  //       (ans) => ans.question_number === questionNumber
  //     );

  //     if (answerIndex > -1) {
  //       updatedAnswers[answerIndex].selected_option = selectedOption;
  //     } else {
  //       updatedAnswers.push({
  //         question_number: questionNumber,
  //         selected_option: selectedOption
  //       });
  //     }

  //    // Submit answers every 5 questions selected (optional)
  //     // if (updatedAnswers.length % 5 === 0) {
  //       // submitAnswers(updatedAnswers);
  //     // }
  //     submitAnswers(updatedAnswers);

  //     return updatedAnswers;
  //   });
  // };

  const handleAnswerChange = ( questionNumber: number,
    selectedOption: string) => {
    // Update selected answers
    setSelectedAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      const answerIndex = updatedAnswers.findIndex(
        (ans) => ans.question_number === questionNumber
      );

      if (answerIndex > -1) {
        updatedAnswers[answerIndex].selected_option = selectedOption;
      } else {
        updatedAnswers.push({
          question_number: questionNumber,
          selected_option: selectedOption,
        });
      }

      submitAnswers(updatedAnswers);

      console.log("updatedAnswers", updatedAnswers);
      return updatedAnswers;
    });
  };

  // Submit Answer Function
  const submitAnswers = async (answersToSubmit: Answer[]) => {
    const formattedAnswers = answersToSubmit.map((answer) => ({
      question_number: parseInt(answer.question_number.toString(), 10),
      selected_option: answer.selected_option || ""
    }));

    const requestBody = {
      attempted_questions: formattedAnswers
    };

    try {
      await submitAnswer(examId, requestBody, token);
      console.log("Answers submitted successfully:", formattedAnswers);
    } catch (error) {
      console.error("Failed to submit answers:", error);
    }
  };

  // Calculate Progress Percentage
  const progressPercentage = Math.floor(
    (selectedAnswers.length / questions.length) * 100
  );

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
            />
          </div>
          <div className="w-full lg:w-1/4">
            <QuickNavigation
              currentQuestion={currentQuestion}
              onSelect={handleQuestionSelect}
              // toggleOpenModal={() => setOpenModal(true)}
              totalQuestions={questions.length}
              selectedAnswers={selectedAnswers}
              loading={loading}
              examStartTime={examStartTime}
              examId={""}
            />
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Exams;
