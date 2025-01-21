import {
  createFileRoute,
  useLocation,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import React, { useEffect, useState } from "react";
import { fetchCourseDetails } from "../../../student/api/auth.ts";
import Header from "../../../student/Components/MainHeader.tsx";
import ExamTable from "../../../student/Pages/ExamTable/ExamTable.tsx";
import SubmitModal from "../../../student/Pages/Modal/SubmitModal.tsx";
import Footer from "../../../student/Components/Footer.tsx";

export const Route = createFileRoute("/student/_auth/question-details/$examId")(
  {
    component: RouteComponent,
  },
);

function RouteComponent() {
  //getting selectedAnswers from useNavigation in QuickNavigation
  const location = useLocation();
  const { selectedAnswers, totalQuestions, examStartTime } =
    location.state || {};

  console.log("questions", totalQuestions);
  console.log("Selected Answerss:", selectedAnswers);
  console.log("ExamStartTimeINQuestion", examStartTime);

  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [courseDetails, setCourseDetails] = useState(null);
  const [courseTitle, setCourseTitle] = useState(null);
  const [courseDuration, setCourseDuration] = useState(null);

  const token = localStorage.getItem("token");
  const { examId } = Route.useParams(); // Extract examId from route params
  // console.log("Exam ID:", examId);

  useEffect(() => {
    const getCourseDetails = async () => {
      try {
        const data = await fetchCourseDetails(examId, token);
        // console.log("Course Details:", data);
        setCourseDetails(data);
        setCourseTitle(data.title);
      } catch (error) {
        console.error("Failed to fetch course details:", error);
      } finally {
        // setLoading(false);
      }
    };
    getCourseDetails();
  }, [examId, token]);

  const ToggleOpenModal = () => {
    setOpenModal(true);
  };
  const ToggleCloseModal = () => {
    setOpenModal(false);
  };

  const backToExamsPage = () => {
    console.log("back to exams");
    navigate({ to: `/student/exams/$examId`, params: { examId } });
  };
  return (
    <section className="bg-gray-50">
      <div>
        <Header />
        {/* <ExamHeader title={courseTitle} courseDuration={courseDuration}/> */}
      </div>

      <div className="mt-10">
        <ExamTable
          courseDetails={courseDetails}
          selectedAnswers={selectedAnswers}
          totalQuestions={totalQuestions}
        />
        <div className="mx-auto flex w-[90%] items-center justify-between py-5">
          <button
            onClick={backToExamsPage}
            className="mt-6 flex items-center gap-2 bg-[#ffeee8] px-7 py-3 font-semibold text-[#ff6636] lg:px-14"
          >
            Go Back
          </button>
          <button
            onClick={ToggleOpenModal}
            className="mt-6 flex items-center gap-2 bg-[#ff6636] px-7 py-3 font-semibold text-white lg:px-14"
          >
            Submit Test
          </button>
        </div>
      </div>

      {openModal && (
        <div>
          <SubmitModal
            ToggleCloseModal={ToggleCloseModal}
            selectedAnswers={selectedAnswers}
            token={token}
            examId={examId}
            examStartTime={examStartTime}
          />
        </div>
      )}

      <div className="mt-40">
        <Footer />
      </div>
    </section>
  );
}
