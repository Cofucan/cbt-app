import React, { useState } from "react";
import ImportImgs from "../components/ImportImgs";
import { Table, Button, Select, Input, Menu, Dropdown } from "antd";
import EditCourseModal from "../Pages/Modals/NewCoursesModal/EditCourseModal";
import DeleteCourseModal from "../Pages/Modals/NewCoursesModal/DeleteCourseModal";
import useGetCourse from "../hooks/getData/useGetCourse";
import LoadingAnimation from "../components/loadingAnimation";
import useGetFaculty from "../hooks/getData/useGetFaculty";
import useGetDepartment from "../hooks/getData/useGetDepartment";

const { Option } = Select;

const CourseManagerTable = () => {
  const images = ImportImgs();
  const [searchText, setSearchText] = useState("");
  const [singleData, setSingleData] = useState(null);
  const [selectedFaculty, setSelectedFaculty] = useState("Engineering");
  const [selectedDepartment, setSelectedDepartment] = useState("Chemical");
  const [selectedLevel, setSelectedLevel] = useState("200");
  const [visibleDropdown, setVisibleDropdown] = useState(null); // Track visible dropdown by course key
  const [EditModalOpen, setEditModalOpen] = useState(false);
  const [DeleteModalOpen, setDeleteModalOpen] = useState(false);

  //OPEN EDIT MODAL LOGIC
  const handleOpenEditModal = () => {
    setVisibleDropdown(null)
    setEditModalOpen(true);
  };
  const handleCancel = () => setEditModalOpen(false);

  //OPEN DELETE MODAL LOGIC
  const handleDeleteShow = () => {
    setVisibleDropdown(null)
    setDeleteModalOpen(true)
  }
  const handleDeleteCancel = () => setDeleteModalOpen(false);
  //Table Dropdwon Action
  const toggleDropdown = (key) => {
    if (visibleDropdown === key?.id) {
      setVisibleDropdown(null); // Close if the same dropdown is clicked
    } else {
      setVisibleDropdown(key?.id); // Open the clicked dropdown
    }
    setSingleData(key)
  };

  const [facultyId, setFacultyId] = useState("")
  const [departmentId, setDepartmentId] = useState("")
  const [level, setLevel] = useState("")

  const { data: facultyList } = useGetFaculty()
  const { data: departmentList } = useGetDepartment(facultyId)


  const { data, isLoading, isRefetching } = useGetCourse(facultyId, departmentId, level)


  const courses = [
    {
      key: 1,
      faculty: "Management Science",
      department: "Mass Comm",
      title: "Communication Principles",
    },
    {
      key: 2,
      faculty: "Management Sciences",
      department: "Mass Comm",
      title: "Communication Principles",
    },
    { key: 3, faculty: "Arts", department: "History", title: "Mansa Musa" },
    { key: 4, faculty: "Science", department: "Computer", title: "Algorithms" },
    { key: 5, faculty: "Language", department: "English", title: "Concord" },
  ];

  const menu = (
    <div className="">
      <Menu>
        <Menu.Item key="1" onClick={handleOpenEditModal}>
          Edit Course
        </Menu.Item>
        {/* <Menu.Item key="2" onClick={handleDeleteShow}>Delete Course</Menu.Item> */}
      </Menu>
    </div>
  );

  const columns = [
    {
      title: "Faculty",
      key: "faculty",
      render: (item) => (
        <p>{item?.faculty?.name}</p>
      )
    },
    {
      title: "Department",
      key: "department",
      render: (item) => (
        <p>{item?.department?.name}</p>
      )
    },
    {
      title: "Course Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Dropdown
          overlay={menu}
          visible={visibleDropdown === text.id}
          onVisibleChange={() => toggleDropdown(text)}
          trigger={["click"]}
          className=""
        >
          <button>
            <img src={images.DotsThree} alt="Action" />
          </button>
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      {/* Filters and Search */}
      <div className="flex w-fit gap-4 items-center mb-6">
        {/* <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-[#6e7485]">Search</label>
          <Input
            placeholder="Search test..."
            value={searchText}
            style={{
              width: 400,
              marginBottom: 16,
              fontSize: "14px",
              fontWeight: "400",
            }}
            onChange={(e) => setSearchText(e.target.value)}
            prefix={<img src={images.SearchIcon} alt="search" />}
          />
        </div> */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-[#6e7485]">Faculty</label>
          <select
            onChange={(e) => setFacultyId(e.target.value)}
            placeholder={"Select Faculty"}
            className="border px-3 py-2 w-[200px] rounded text-[#8c94a3]"
          >
            <option value={""} >Select Faculty</option>
            {facultyList?.map((item) => {
              return (
                <option value={item?.id} >{item?.name}</option>
              )
            })}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-[#6e7485]">
            Department
          </label>

          <select
            onChange={(e) => setDepartmentId(e.target.value)}
            className="border px-3 py-2 w-[200px] rounded text-[#8c94a3]"
          >
            <option value={""} >Select Department</option>
            {departmentList?.map((item) => {
              return (
                <option value={item?.id} >{item?.name}</option>
              )
            })}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-[#6e7485]">Level</label>
          <select
            onChange={(e) => setLevel(e.target.value)}
            className="border px-3 py-2 w-[200px] rounded text-[#8c94a3]"
          >
            <option value={""} >Select Level</option>
            <option>400</option>
            <option>300</option>
            <option>200</option>
            <option>100</option>
          </select>
        </div>
      </div>

      {/* Course Table */}
      <LoadingAnimation loading={isLoading} refetching={isRefetching} >
        <Table
          className="custom-table"
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      </LoadingAnimation>

      {EditModalOpen && (
        <EditCourseModal
          data={singleData}
          EditModalOpen={EditModalOpen}
          handleCancel={handleCancel}
        />
      )}

      {DeleteModalOpen && (
        <DeleteCourseModal data={singleData} handleDeleteCancel={handleDeleteCancel} />
      )}
    </div>
  );
};

export default CourseManagerTable;
