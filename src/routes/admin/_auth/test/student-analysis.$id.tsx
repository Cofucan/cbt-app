import { createFileRoute, useNavigate } from "@tanstack/react-router";
import ImportImgs from "../../../../admin/components/ImportImgs.tsx";
import { Key, useState } from "react";
import useGetExamData from "../../../../admin/hooks/getData/useGetExamData.ts";
import { dateFormat } from "../../../../admin/utils/dateFormat.ts";

export const Route = createFileRoute("/admin/_auth/test/student-analysis/$id")({
  component: RouteComponent
});
function RouteComponent() {
  const images = ImportImgs();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [facultyFilter, setFacultyFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [levelFilter, setLevelFilter] = useState("All");

  const params = Route.useParams();

  console.log(params);

  const { data } = useGetExamData(params.id);

  return (
    <section>
      <div className="px-6">
        <div
          onClick={() => navigate({ to: "/admin/manager" })}
          className="flex items-center gap-2 py-10"
        >
          <img src={images.arrowleft} alt="ArrowLeft" />
          <button className="text-2xl font-bold">Student Analysis</button>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex w-[45%] flex-col gap-2">
            <label className="text-sm font-medium text-[#6e7485]">Search</label>
            <div className="relative">
              <img
                src={images.SearchIcon}
                alt="search"
                className="absolute left-3 top-1/2 w-5 -translate-y-1/2 transform"
              />
              <input
                type="text"
                placeholder="Search test..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2 pl-10 placeholder:text-sm"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#6e7485]">
                Faculty
              </label>
              <select
                value={facultyFilter}
                onChange={(e) => setFacultyFilter(e.target.value)}
                className="rounded-md border border-gray-300 p-2 text-sm text-[#6e7485]"
              >
                <option value="All">All Faculties</option>
                <option value="Engineering">Engineering</option>
                <option value="Science">Science</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#6e7485]">
                Department
              </label>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="rounded-md border border-gray-300 p-2 text-sm text-[#6e7485]"
              >
                <option value="All">All Departments</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Chemical Engineering">
                  Chemical Engineering
                </option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#6e7485]">
                level
              </label>
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="rounded-md border border-gray-300 p-2 text-sm text-[#6e7485]"
              >
                <option value="All">All Levels</option>
                <option value="100">100</option>
                <option value="200">200</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-6 grid w-[85%] grid-cols-2 gap-4">
          {data.map((student: {
            student_name: string | number;
            student_identifier: string | number;
            student_start_time: string;
            faculty: string | number;
            department: string | number;
            status: string;
          }, index: Key) => (
            <div
              key={index}
              className="rounded-md border border-[#fffff] bg-white p-4"
            >
              <div className="flex">
                <img
                  src={images.Student}
                  alt="student profile"
                  className="mr-4 h-12 w-12 rounded-full"
                />
                <div>
                  <p className="">
                    Student Name:{" "}
                    <span className="font-semibold">
                      {student?.student_name}
                    </span>
                  </p>
                  <p>
                    Exam No:{" "}
                    <span className="font-semibold">
                      {student?.student_identifier}
                    </span>
                  </p>
                  <p>
                    Login Time:{" "}
                    <span className="font-semibold">
                      {dateFormat(student?.student_start_time)}
                    </span>
                  </p>
                  <p>
                    Faculty:{" "}
                    <span className="font-semibold">{student.faculty}</span>
                  </p>
                  <p>
                    Department:{" "}
                    <span className="font-semibold">{student.department}</span>
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="font-semibold text-black">
                      Test Status:
                    </span>
                    <p
                      className={`font-semibold ${getStatusClass(
                        student.status,
                      )}`}
                    >
                      {student.status}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Helper function to style test status
const getStatusClass = (status: string) => {
  switch (status) {
    case "Submitted":
      return "text-[#ffffff] bg-[#2ED47A] px-3 rounded-lg text-sm py-1";
    case "In progress":
      return "text-[#ffffff] bg-[#ffb946] px-3 rounded-lg text-sm py-1";
    case "Disconnected":
      return "text-[#ffffff] bg-[#ff4646] px-3 rounded-lg text-sm py-1";
    default:
      return "";
  }
};
