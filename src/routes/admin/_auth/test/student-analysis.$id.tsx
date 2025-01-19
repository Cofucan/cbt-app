import { createFileRoute, useNavigate, useParams } from '@tanstack/react-router'
import ImportImgs from '../../../../admin/components/ImportImgs.tsx'
import { useState } from 'react'
import useGetExamData from '../../../../admin/hooks/getData/useGetExamData.ts'
import { dateFormat } from '../../../../admin/utils/dateFormat.ts'

export const Route = createFileRoute('/admin/_auth/test/student-analysis/$id')({
  component: RouteComponent,
})
const studentsData = [
  {
    name: 'Oge Cynthia',
    examNo: 'WGC023IV',
    loginTime: 'Sep 24 / 03:00 PM',
    faculty: 'Engineering',
    department: 'Civil Engineering',
    ipAddress: '230-A3B',
    testStatus: 'Submitted',
  },
  {
    name: 'Oge Cynthia',
    examNo: 'WGC023IV',
    loginTime: 'Sep 24 / 03:00 PM',
    faculty: 'Engineering',
    department: 'Chemical Engineering',
    ipAddress: '230-A3B',
    testStatus: 'In progress',
  },
  {
    name: 'Oge Cynthia',
    examNo: 'WGC023IV',
    loginTime: 'Sep 24 / 03:00 PM',
    faculty: 'Engineering',
    department: 'Civil Engineering',
    ipAddress: '230-A3B',
    testStatus: 'Disconnected',
  },
  {
    name: 'Oge Oke',
    examNo: 'WGC023IV',
    loginTime: 'Sep 24 / 03:00 PM',
    faculty: 'Engineering',
    department: 'Civil Engineering',
    ipAddress: '230-A3B',
    testStatus: 'Disconnected',
  },
  {
    name: 'Oge Cynthia',
    examNo: 'WGC023IV',
    loginTime: 'Sep 24 / 03:00 PM',
    faculty: 'Engineering',
    department: 'Civil Engineering',
    ipAddress: '230-A3B',
    testStatus: 'Submitted',
  },
  {
    name: 'Oge Cynthia',
    examNo: 'WGC023IV',
    loginTime: 'Sep 24 / 03:00 PM',
    faculty: 'Engineering',
    department: 'Civil Engineering',
    ipAddress: '230-A3B',
    testStatus: 'In progress',
  },
]

function RouteComponent() {
  const images = ImportImgs()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [facultyFilter, setFacultyFilter] = useState('All')
  const [departmentFilter, setDepartmentFilter] = useState('All')
  const [levelFilter, setLevelFilter] = useState('All')

  const params = Route.useParams()

  console.log(params)

  const { data } = useGetExamData(params.id)

  // Filter logic
  const filteredStudents = studentsData.filter((student) => {
    const matchesSearch = student.examNo
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesFaculty =
      facultyFilter === 'All' || student.faculty === facultyFilter
    const matchesDepartment =
      departmentFilter === 'All' || student.department === departmentFilter
    const matchesLevel = levelFilter === 'All' || student.level === levelFilter

    return matchesSearch && matchesFaculty && matchesDepartment && matchesLevel
  })

  return (
    <section>
      <div className="px-6">
        <div
          onClick={() => navigate({to: '/admin/manager'})}
          className="flex items-center gap-2 py-10"
        >
          <img src={images.arrowleft} alt="ArrowLeft" />
          <button className="text-2xl font-bold">Student Analysis</button>
        </div>
        <div className="flex gap-5 items-center">
          <div className="flex flex-col gap-2 w-[45%]">
            <label className="text-sm font-medium text-[#6e7485]">Search</label>
            <div className="relative">
              <img
                src={images.SearchIcon}
                alt="search"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5"
              />
              <input
                type="text"
                placeholder="Search test..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 p-2 pl-10 rounded-md w-full placeholder:text-sm"
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
                className="border border-gray-300 p-2 rounded-md text-sm text-[#6e7485]"
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
                className="border border-gray-300 p-2 rounded-md text-sm text-[#6e7485]"
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
                className="border border-gray-300 p-2 rounded-md text-sm text-[#6e7485]"
              >
                <option value="All">All Levels</option>
                <option value="100">100</option>
                <option value="200">200</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 w-[85%]">
          {data.map((student, index) => (
            <div
              key={index}
              className="border border-[#fffff] bg-white p-4 rounded-md"
            >
              <div className="flex">
                <img
                  src={images.Student}
                  alt="student profile"
                  className="rounded-full w-12 h-12 mr-4"
                />
                <div>
                  <p className="">
                    Student Name:{' '}
                    <span className="font-semibold">
                      {student?.student_name}
                    </span>
                  </p>
                  <p>
                    Exam No:{' '}
                    <span className="font-semibold">
                      {student?.student_identifier}
                    </span>
                  </p>
                  <p>
                    Login Time:{' '}
                    <span className="font-semibold">
                      {dateFormat(student?.student_start_time)}
                    </span>
                  </p>
                  <p>
                    Faculty:{' '}
                    <span className="font-semibold">{student.faculty}</span>
                  </p>
                  <p>
                    Department:{' '}
                    <span className="font-semibold">{student.department}</span>
                  </p>
                  <div className="flex items-center mt-2 gap-2">
                    <span className="text-black font-semibold">
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
  )
}

// Helper function to style test status
const getStatusClass = (status: string) => {
  switch (status) {
    case 'Submitted':
      return 'text-[#ffffff] bg-[#2ED47A] px-3 rounded-lg text-sm py-1'
    case 'In progress':
      return 'text-[#ffffff] bg-[#ffb946] px-3 rounded-lg text-sm py-1'
    case 'Disconnected':
      return 'text-[#ffffff] bg-[#ff4646] px-3 rounded-lg text-sm py-1'
    default:
      return ''
  }
}
