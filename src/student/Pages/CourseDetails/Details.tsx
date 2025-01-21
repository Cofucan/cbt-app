import React, { useState, useEffect } from "react";

import StartExamModal from "../Modal/StartExamModal";
import { BeatLoader } from "react-spinners";
import { startExam } from "../../api/auth";
import { useNavigate } from "@tanstack/react-router";

const Details = ({ courseDetails, loading, examId, semester }) => {
  const navigate = useNavigate();
  const [isOpenStartExamModal, setIsOpenStartExamModal] = useState(false);

  const ToggleStartExamModal = () => setIsOpenStartExamModal(true);
  const ToggleStartExamModalClose = () => setIsOpenStartExamModal(false);

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div
          className="cursor-pointer px-10 py-2 text-lg font-medium text-white"
          disabled={loading}
        >
          <BeatLoader color="green" size={20} />
        </div>
      </div>
    );

  return (
    <section className="mt-10 flex flex-col gap-6">
      <div className="mx-auto w-[90%] border-2 border-[#e9eaf0] bg-white px-5 py-3 md:px-10 md:py-6 lg:w-[60%]">
        <h2 className="mb-5 text-2xl font-semibold text-[#ff6636] lg:mb-5">
          Course Details
        </h2>
        <div className="flex flex-col gap-5 pb-5 text-black md:text-lg xl:pb-0">
          <p>
            <span className="font-semibold">Course Name:</span>{" "}
            {courseDetails?.name || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Title:</span>{" "}
            {courseDetails?.title || "N/A"}
          </p>

          <p>
            <span className="font-semibold">Course Code:</span>{" "}
            {courseDetails?.code || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Course Unit:</span>{" "}
            {courseDetails?.unit || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Instructor:</span>{" "}
            {courseDetails?.instructor_name || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Semester:</span> {semester || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Session:</span>{" "}
            {courseDetails?.session || "N/A"}
          </p>
        </div>
      </div>

      {/* Important Instructions */}
      <div className="mx-auto w-[90%] border-2 border-[#e9eaf0] bg-white px-5 py-3 md:px-10 md:py-6 lg:w-[60%]">
        <h2 className="mb-5 text-2xl font-semibold text-[#ff6636] lg:mb-5">
          Important Instructions
        </h2>
        <ul className="flex list-disc flex-col gap-2 text-lg">
          <li>
            The total number of questions is {courseDetails?.no_of_questions}
          </li>
          <li>Read each question carefully before answering</li>
          <li>You can review and change your answers before submitting</li>
          <li>Do not refresh the page during the exam</li>
          <li>{courseDetails?.instructions || "N/A"}</li>
        </ul>
      </div>

      <div className="mx-auto mb-10 flex w-[90%] items-center justify-between lg:w-[60%]">
        <button
          onClick={() => navigate({ to: "/student/student-portal" })}
          className="flex cursor-pointer justify-center bg-[#FFEEE8] px-8 py-2 text-lg font-semibold text-[#FF6636] hover:duration-700 md:px-24 md:py-4 lg:text-2xl"
        >
          Back
        </button>
        <button
          onClick={ToggleStartExamModal}
          className="flex cursor-pointer justify-center bg-[#FF6636] px-8 py-2 text-lg font-semibold text-white hover:bg-[#f8733a] hover:duration-700 md:px-24 md:py-4 lg:text-2xl"
        >
          Start Test
        </button>
      </div>

      {isOpenStartExamModal && (
        <StartExamModal
          ToggleStartExamModalClose={ToggleStartExamModalClose}
          courseDetails={courseDetails}
          examId={examId}
          totalQuestions={courseDetails?.no_of_questions}
        />
      )}
    </section>
  );
};

export default Details;
