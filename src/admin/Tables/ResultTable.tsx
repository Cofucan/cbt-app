import { useState } from "react";
import { Dropdown, Input, Menu, Select, Table } from "antd"; // Import Ant Design Table
import ImportImgs from "../components/ImportImgs";
import DownloadResult from "../Pages/Modals/ResultManagerModal/DownloadResult";
import DeleteResultModal from "../Pages/Modals/ResultManagerModal/DeleteResultModal";
import useGetResult from "../hooks/getData/useGetResult";
import LoadingAnimation from "../components/LoadingAnimation.tsx";
import { dateFormat } from "../utils/dateFormat";

const { Option } = Select;

const ResultTable = () => {
  const images = ImportImgs();
  const [faculty, setFaculty] = useState("Engineering");
  const [department, setDepartment] = useState("Chemical");
  const [level, setLevel] = useState("200");
  const [singleData, setSingleData] = useState<{ title: string; department_name: string; id: string; } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleDropdown, setVisibleDropdown] = useState<string | null>(null); // Track visible dropdown by course key
  const [downloadResult, setDownloadResult] = useState(false);
  const [resultDeleted, setResultDeleted] = useState(false);

  //open downloadResult Modal.......
  const openDownloadModal = () => {
    setDownloadResult(true);
    setVisibleDropdown(null);
  };
  const closeDownloadModal = () => setDownloadResult(false);

  const closeResultDeleteModal = () => setResultDeleted(false);

  const toggleDropdown = (key: string) => {
    if (visibleDropdown === key) {
      setVisibleDropdown(null); // Close if the same dropdown is clicked
    } else {
      setVisibleDropdown(key); // Open the clicked dropdown
    }
  };

  const { data, isLoading, isRefetching } = useGetResult();

  const clickHandler = (item: { title: string; department_name: string; id: string; }) => {
    setSingleData(item);
    toggleDropdown(item.id);
  };


  const menu = (
    <div className="">
      <Menu>
        <Menu.Item key="1" onClick={openDownloadModal}>
          Download Result
        </Menu.Item>
      </Menu>
    </div>
  );

  // Table columns
  const columns = [
    { title: "Faculty", dataIndex: "faculty_name", key: "faculty_name" },
    {
      title: "Department",
      dataIndex: "department_name",
      key: "department_name"
    },
    { title: "Course Title", dataIndex: "title", key: "title" },
    { title: "Course Code", dataIndex: "code", key: "code" },
    {
      title: "Date",
      key: "start_at",
      render: (data: string) => <p>{dateFormat(data)}</p>
    },
    {
      title: "Action",
      key: "action",
      render: (text: { title: string; department_name: string; id: string; }) => (
        <Dropdown
          overlay={menu}
          visible={visibleDropdown === text.id}
          onVisibleChange={() => clickHandler(text)}
          trigger={["click"]}
          className=""
        >
          <button>
            <img src={images.DotsThree} alt="Action" />
          </button>
        </Dropdown>
      )
    }
  ];

  return (
    <>
      <div className="w-[85%] p-4">
        {/* Search and Filters */}
        <div className="flex space-x-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#6e7485]">Search</label>
            <Input
              placeholder="Search test..."
              value={searchTerm}
              style={{
                width: 400,
                marginBottom: 16,
                fontSize: "14px",
                fontWeight: "400"
              }}
              onChange={(e) => setSearchTerm(e.target.value)}
              prefix={<img src={images.SearchIcon} alt="search" />}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#6e7485]">
              Faculty
            </label>
            <Select
              style={{ width: 170, marginBottom: 16 }}
              value={faculty}
              onChange={(value) => setFaculty(value)}
              className="w-[20%]"
            >
              <Option>Engineering</Option>
              <Option>Arts</Option>
              <Option>Science</Option>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#6e7485]">
              Department
            </label>
            <Select
              style={{ width: 170, marginBottom: 16 }}
              className="w-[20%]"
              value={department}
              onChange={(value) => setDepartment(value)}
            >
              <Option>Chemical</Option>
              <Option>Mass Comm</Option>
              <Option>Physics</Option>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#6e7485]">Level</label>
            <Select
              style={{ width: 170, marginBottom: 16 }}
              className="w-[20%]"
              value={level}
              onChange={(value) => setLevel(value)}
            >
              <Option>200</Option>
              <Option>300</Option>
              <Option>400</Option>
            </Select>
          </div>
        </div>

        {/* Ant Design Table */}
        <LoadingAnimation loading={isLoading} isRefetching={isRefetching}>
          <Table
            dataSource={data}
            columns={columns}
            pagination={{
              pageSize: 10
            }}
            className="custom-table mt-4"
          />
        </LoadingAnimation>
      </div>

      {/*Download Result Modal */}
      {downloadResult && singleData && (
        <DownloadResult
          resultData={singleData}
          closeDownloadModal={closeDownloadModal}
        />
      )}

      {/*Delete Result Modal */}
      {resultDeleted && (
        <DeleteResultModal closeResultDeleteModal={closeResultDeleteModal} />
      )}
    </>
  );
};

export default ResultTable;
