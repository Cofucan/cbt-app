import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import CourseManagerTable from "../../../admin/Tables/CourseManagerTable";
import AddNewCourseModal from "../../../admin/Pages/Modals/NewCoursesModal/AddNewCourseModal";

export const Route = createFileRoute("/admin/_auth/course-manager")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  return (
    <section>
      <div className="ml-10 h-full w-[80%] py-10">
        <div className="mb-16 flex items-center justify-between">
          <h2 className="text-xl font-bold">Course List</h2>
          <button
            onClick={showModal}
            className="flex items-center gap-2 bg-[#ff6636] px-4 py-2 text-white shadow-md focus:outline-none"
          >
            Add Course
          </button>
        </div>

        <div className="Course-Table">
          <CourseManagerTable />
        </div>

        {/* Conditionally render the modal based on state */}
        {isModalOpen && (
          <AddNewCourseModal
            handleCancel={handleCancel}
            isModalOpen={isModalOpen}
          />
        )}
      </div>
    </section>
  );
}
