import { FC, useEffect } from "react";
import { Input, Modal, Select } from "antd";
import ImportImgs from "../../components/ImportImgs";
import SaveNewDepartment from "./ClassManagerModal/SaveNewDepartment";
import useAddDepartment from "../../hooks/postData/useAddDepartment";
import useGetFaculty from "../../hooks/getData/useGetFaculty";
import CustomButton from "../../components/CustomButton";

const { Option } = Select;

interface EditDepartmentModalProps {
  data: Record<string, any> | undefined | null
  visible: boolean
  handleCancel: () => void
}

const EditDepartmentModal: FC<EditDepartmentModalProps> = (props) => {
  const { data, visible, handleCancel } = props;
  const images = ImportImgs();
  const openSaveNewDepartment = false
  // const [openSaveNewDepartment, setopenSaveNewDepartment] = useState(false);

  const { data: facultyList } = useGetFaculty();

  const { editSuccess, formik, loadingEdit } = useAddDepartment(data?.id);

  const filteredData = () => {
    let value = facultyList.find(
      (faculty) => faculty.name === data?.faculty_name
    );
    formik.setFieldValue("faculty", value?.id);
    // return value
  };

  useEffect(() => {
    filteredData();
    formik.setFieldValue("name", data?.name);
  }, [facultyList]);

  useEffect(() => {
    if (editSuccess) {
      handleCancel();
    }
  }, [editSuccess]);

  return (
    <div>
      <Modal
        title="Edit Department"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
        width={500} // Adjust width if needed
        closeIcon={
          <span className="text-lg text-gray-400">
            <img src={images.Times} alt="Times" />
          </span>
        } // Custom close icon
      >
        {/* Modal Content */}
        <form className="p-4" onSubmit={formik?.handleSubmit}>
          {/* Faculty Name Dropdown */}
          <div className="mb-4">
            <label className="mb-2 block text-gray-700">Faculty Name</label>
            <Select
              placeholder={"Select Faculty"}
              className="w-full"
              onChange={formik.handleChange}
              value={formik?.values?.faculty}
            >
              {facultyList.map((facultyOption) => (
                <Option key={facultyOption?.id} value={facultyOption?.id}>
                  {facultyOption?.name}
                </Option>
              ))}
            </Select>
          </div>

          {/* Departments Input */}
          <div className="mb-6">
            <label className="mb-2 block text-gray-700">Departments</label>
            <Input
              placeholder="Department"
              className="w-full py-2"
              name="name"
              onChange={formik.handleChange}
              value={formik?.values.name}
            />
          </div>
          <div className="flex items-center justify-between gap-4 pt-6">
            <button
              onClick={handleCancel}
              className="h-[40px] w-full rounded-lg border-none bg-gray-100 px-4 text-gray-500 hover:bg-gray-200"
            >
              Cancel
            </button>
            <CustomButton
              title="Save Department"
              isLoading={loadingEdit}
            />
          </div>

          <div>
            {openSaveNewDepartment && (
              <SaveNewDepartment handleCancel={handleCancel} />
            )}
          </div>
        </form>
      </Modal>
    </div>
    // <div className="bg-green0600 h-32 w-96"></div>
  );
};

export default EditDepartmentModal;
