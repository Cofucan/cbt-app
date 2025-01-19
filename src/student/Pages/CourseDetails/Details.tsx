import React, { useState, useEffect } from "react";

import StartExamModal from "../Modal/StartExamModal";
import { BeatLoader } from "react-spinners";
import { startExam } from "../../api/auth";
import {useNavigate} from "@tanstack/react-router";

const Details = ({ courseDetails, loading, examId, semester }) => {
  const navigate = useNavigate();
  const [isOpenStartExamModal, setIsOpenStartExamModal] = useState(false);

  const ToggleStartExamModal = () => setIsOpenStartExamModal(true);
  const ToggleStartExamModalClose = () => setIsOpenStartExamModal(false);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="px-10 py-2 cursor-pointer text-white text-lg font-medium"
          disabled={loading}
        >
          <BeatLoader color="green" size={20} />
        </div>
      </div>
    );

  return (
    <section className="flex flex-col gap-6 mt-10">
      <div className="w-[90%] lg:w-[60%] mx-auto bg-white px-5 py-3 md:py-6 md:px-10 border-2 border-[#e9eaf0]">
        <h2 className="text-2xl font-semibold text-[#ff6636] mb-5 lg:mb-5">
          Course Details
        </h2>
        <div className="text-black md:text-lg flex flex-col gap-5 pb-5 xl:pb-0">
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
            <span className="font-semibold">Semester:</span>{" "}
            {semester || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Session:</span>{" "}
            {courseDetails?.session || "N/A"}
          </p>
        </div>
      </div>

      {/* Important Instructions */}
      <div className="w-[90%] lg:w-[60%] mx-auto bg-white px-5 py-3 md:py-6 md:px-10 border-2 border-[#e9eaf0]">
        <h2 className="text-2xl font-semibold text-[#ff6636] mb-5 lg:mb-5">
          Important Instructions
        </h2>
        <ul className="list-disc flex flex-col gap-2 text-lg">
          <li>
            The total number of questions is {courseDetails?.no_of_questions}
          </li>
          <li>Read each question carefully before answering</li>
          <li>You can review and change your answers before submitting</li>
          <li>Do not refresh the page during the exam</li>
          <li>{courseDetails?.instructions || "N/A"}</li>
        </ul>
      </div>

      <div className="flex justify-between items-center w-[90%] lg:w-[60%] mx-auto mb-10">
        <button
          onClick={() => navigate({to: "/student/student-portal"})}
          className="flex justify-center px-8 py-2 md:px-24 md:py-4 cursor-pointer text-lg lg:text-2xl font-semibold bg-[#FFEEE8] text-[#FF6636] hover:duration-700"
        >
          Back
        </button>
        <button
          onClick={ToggleStartExamModal}
          className="flex justify-center px-8 py-2 md:px-24 md:py-4 cursor-pointer text-white text-lg lg:text-2xl font-semibold bg-[#FF6636] hover:bg-[#f8733a] hover:duration-700"
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
