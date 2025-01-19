import {createFileRoute} from '@tanstack/react-router'
import React, {useState} from "react";
import CourseManagerTable from "../../../admin/Tables/CourseManagerTable";
import AddNewCourseModal from "../../../admin/Pages/Modals/NewCoursesModal/AddNewCourseModal";

export const Route = createFileRoute('/admin/_auth/course-manager')({
    component: RouteComponent,
})

function RouteComponent() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => setIsModalOpen(false)

    return (
        <section>
            <div className="w-[80%] ml-10 h-full py-10">
                <div className="flex justify-between items-center mb-16">
                    <h2 className="text-xl font-bold">Course List</h2>
                    <button
                        onClick={showModal}
                        className="px-4 py-2 flex items-center gap-2 text-white bg-[#ff6636] shadow-md focus:outline-none"
                    >
                        Add Course
                    </button>
                </div>

                <div className="Course-Table">
                    <CourseManagerTable/>
                </div>

                {/* Conditionally render the modal based on state */}
                {isModalOpen && (
                    <AddNewCourseModal handleCancel={handleCancel} isModalOpen={isModalOpen}/>
                )}
            </div>
        </section>
    );
}
