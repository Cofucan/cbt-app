import { useState } from "react";
import { Dropdown, Input, Menu, Table } from "antd";
import { useMediaQuery } from "react-responsive";
import ImportImgs from "../components/ImportImgs";
import ActivateExamModal from "../Pages/Modals/ActivateExamModal";
import DeactivateExam from "../Pages/Modals/DeactivateExam";
import DelateExamModal from "../Pages/Modals/DelateExamModal";
import AddMoreQuestions from "../Pages/Modals/AddMoreQuestions";
import { useNavigate } from "@tanstack/react-router";
import useGetExam from "../hooks/getData/useGetExam";
import LoadingAnimation from "../components/LoadingAnimation.tsx";
import useGetFaculty from "../hooks/getData/useGetFaculty";
import useGetDepartment from "../hooks/getData/useGetDepartment";


// const faculties = ["Science", "Language", "Engineering"];
// const departments = {
//   Science: ["Biology", "Computer science"],
//   Engineering: ["Chemistry", "Physics", "Computer"],
//   Language: ["English", "French", "Yoruba", "Igbo"],
// };
// const levels = ["100", "200", "300", "400"];

const TestManager = () => {
  const [facultyId, setFacultyId] = useState("");
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");
  const [keyword, setKeyword] = useState("");

  const { data: facultyList } = useGetFaculty();
  const { data: departmentList } = useGetDepartment(facultyId);

  const navigate = useNavigate();
  const images = ImportImgs();
  // const [filteredData, setFilteredData] = useState(coursesData);
  // const [faculty, setFaculty] = useState<string | null>(null);
  const [singleData, setSingleData] = useState<{ id: string } | null>(null);
  // const [searchText, setSearchText] = useState("");
  const [visibleDropdown, setVisibleDropdown] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDeactivateExam, setIsOpenDeactivateExam] = useState(false);
  const [isOpenDeleteExam, setIsOpenDeleteExam] = useState(false);
  const [addMoreQuestions, setAddMoreQuestions] = useState(false);

  const {
    isLoading,
    data: filteredData,
    isRefetching
  } = useGetExam(facultyId, department, keyword, level);

  //Activate Exam Modal IsOpen
  const openModal = () => {
    setVisibleDropdown(null);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  //deactivate exam modal logic
  const openDeactivateExamModal = () => {
    setVisibleDropdown(null);
    setIsOpenDeactivateExam(true);
  };

  const closeDeactivateExamModal = () => {
    setIsOpenDeactivateExam(false);
  };

  const closeDeleteExamModal = () => {
    setIsOpenDeleteExam(false);
  };

  //Add More Questions Modal
  const openAddMoreQuestion = () => {
    setVisibleDropdown(null);
    setAddMoreQuestions(true);
  };
  const closeAddMoreQuestion = () => {
    setAddMoreQuestions(false);
  };

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 970px)" });

  // const handleSearch = (value) => {
  //   setSearchText(value);
  // };
  //
  // const handleFacultyChange = (value) => {
  //   setFaculty(value);
  //   setDepartment(null); // Reset department when faculty changes
  // };
  //
  // const handleDepartmentChange = (value) => {
  //   setDepartment(value);
  // };
  //
  // const handleLevelChange = (value) => {
  //   setLevel(value);
  // };

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const toggleDropdown = (key: { id: string } | null) => {
    if (visibleDropdown === key?.id) {
      setVisibleDropdown(null); // Close if the same dropdown is clicked
    } else {
      setVisibleDropdown(key?.id ?? null); // Open the clicked dropdown
    }
    console.log(key);
    setSingleData(key);
  };

  const menu = (
    <div className="">
      <Menu>
        <Menu.Item key="1" onClick={openModal}>
          Activate Exam
        </Menu.Item>
        <Menu.Item key="2" onClick={openDeactivateExamModal}>
          Deactivate Exam
        </Menu.Item>
        {/* <Menu.Item key="3" onClick={() => navigate("/admin/test-student-analysis/" + singleData?.id)}>Student Analysis</Menu.Item> */}
        <Menu.Item
          key="3"
          onClick={async () => {
            if (!singleData?.id) return;
            await navigate({
              to: "/admin/test/student-analysis/$id",
              params: { id: singleData.id }
            });
          }
          }
        >
          Student Analysis
        </Menu.Item>
        <Menu.Item key="4" onClick={openAddMoreQuestion}>
          Add More Questions
        </Menu.Item>
        {/* <Menu.Item key="5" onClick={openDeleteExamModal}>
          Delete Exam
        </Menu.Item> */}
      </Menu>
    </div>
  );

  // Pagination logic
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

  const columns = [
    {
      title: "Course Title",
      dataIndex: "title",

      key: "title"
    },
    {
      title: "Course Code",
      width: isTabletOrMobile ? 260 : 180,
      dataIndex: "code",
      key: "code"
    },
    {
      title: "Faculty",
      dataIndex: "faculty_name",
      key: "faculty_name"
    },
    {
      title: "Department",
      dataIndex: "department_name",
      key: "department_name"
    },
    {
      title: "Examiner",
      dataIndex: "instructor_name",
      key: "instructor_name"
    },
    {
      title: "Status",
      dataIndex: "status",
      width: isTabletOrMobile ? 260 : 180,
      key: "status",
      render: (status: string) => {
        let img = <img src={images.StatusGreen} alt="Green" />;
        if (status === "Postponed") {
          img = <img src={images.StatusOrange} alt="Green" />;
        } else if (status === "Ended" || status === "") {
          img = <img src={images.StatusRed} alt="Green" />;
        }
        return (
          <div className="flex items-center gap-2">
            <span>{img}</span> {status ? status : "Postponed"}
          </div>
        );
      }
    },
    {
      title: "Action",
      key: "action",
      render: (text: {id: string}) => {
        return (
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
        );
      }
    }
  ];

  return (
    <div>
      {isOpen && (
        <ActivateExamModal
          data={singleData}
          isOpen={isOpen}
          closeModal={closeModal}
          setIsOpen={setIsOpen}
        />
      )}

      {isOpenDeactivateExam && (
        <DeactivateExam
          data={singleData}
          isOpenDeactivateExam={isOpenDeactivateExam}
          setIsOpenDeactivateExam={setIsOpenDeactivateExam}
          closeDeactivateExamModal={closeDeactivateExamModal}
        />
      )}

      {isOpenDeleteExam && (
        <DelateExamModal
          isOpenDeleteExam={isOpenDeleteExam}
          setIsOpenDeleteExam={setIsOpenDeleteExam}
          closeDeleteExamModal={closeDeleteExamModal}
        />
      )}

      {addMoreQuestions && (
        <AddMoreQuestions
          data={singleData}
          addMoreQuestions={addMoreQuestions}
          closeAddMoreQuestion={closeAddMoreQuestion}
        />
      )}

      <div className="flex gap-5 pt-10">
        {/* Search Input */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-medium text-[#6e7485]">Search</label>
          <Input
            prefix={<img src={images.SearchIcon} alt="search" />}
            placeholder="Search test..."
            onChange={(e) => setKeyword(e.target.value)}
            style={{
              width: "100%",
              marginBottom: 16,
              fontSize: "14px",
              fontWeight: "400"
            }}
          />
        </div>

        <div className="flex space-x-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-[#6e7485]">
              Faculty
            </label>
            <select
              onChange={(e) => setFacultyId(e.target.value)}
              className="w-[200px] rounded border px-3 py-2 text-[#8c94a3]"
            >
              <option value={""}>Select Faculty</option>
              {facultyList?.map((item, index) => {
                return (
                  <option key={index} value={item?.id}>
                    {item?.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-[#6e7485]">
              Department
            </label>

            <select
              onChange={(e) => setDepartment(e.target.value)}
              className="w-[200px] rounded border px-3 py-2 text-[#8c94a3]"
            >
              <option value={""}>Select Department</option>
              {(departmentList ?? []).map((item, index) => {
                return (
                  <option key={index} value={item?.id}>
                    {item?.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-[#6e7485]">Level</label>
            <select
              onChange={(e) => setLevel(e.target.value)}
              className="w-[200px] rounded border px-3 py-2 text-[#8c94a3]"
            >
              <option value={""}>Select Level</option>
              <option>400</option>
              <option>300</option>
              <option>200</option>
              <option>100</option>
            </select>
          </div>
        </div>
      </div>
      {/* Table */}
      <LoadingAnimation loading={isLoading} isRefetching={isRefetching}>
        <Table
          className="custom-table"
          columns={columns}
          dataSource={paginatedData} // Use paginated data
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: filteredData.length,
            onChange: handlePageChange,
            showSizeChanger: false, // Hide the page size changer
            // itemRender: (page, type, originalElement) => {
            //   if (type === "prev") {
            //     return (
            //       <button className="prev-btn flex items-center">
            //         <img src={images.ArrowLeft} alt="previous" /> Previous
            //       </button>
            //     );
            //   }
            //   if (type === "next") {
            //     return (
            //       <button className="next-btn flex items-center">
            //         <img src={images.ArrowRight} alt="previous" /> Next
            //       </button>
            //     );
            //   }
            //   if (type === "page" && page === currentPage) {
            //     return (
            //       <button className="pagination-btn active-btn">{page}</button>
            //     );
            //   }
            //   return <button className="pagination-btn">{page}</button>;
            // },
            style: {
              display: "flex",
              justifyContent: "center",
              paddingTop: "20px",
              gap: "20px"
            }
          }}
        />
      </LoadingAnimation>
    </div>
  );
};

export default TestManager;
