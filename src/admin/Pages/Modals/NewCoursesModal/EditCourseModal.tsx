import { FC, useEffect, useState } from "react";
import ImportImgs from "../../../components/ImportImgs";
import { Input, Modal, Select } from "antd";
import SaveNewCourseModal from "./SaveNewCourseModal";
import useGetFaculty from "../../../hooks/getData/useGetFaculty";
import useGetDepartment from "../../../hooks/getData/useGetDepartment";
import useAddCourse from "../../../hooks/postData/useAddCourse";
import CustomButton from "../../../components/CustomButton";

interface EditCourseModalProps {
  data: Record<string, any> | undefined | null,
  EditModalOpen: boolean,
  handleCancel: () => void
}

const EditCourseModal: FC<EditCourseModalProps> = (props) => {
  const { data, EditModalOpen, handleCancel } = props;
  const images = ImportImgs();

  //Edit Course modal Logic
  const [openSaveEditCourseModal, setSaveEditCourseModal] = useState(false);
  const CancelSaveEditModal = () => setSaveEditCourseModal(false);

  const levels = ["100", "200", "300", "400"];

  const { data: facultyList } = useGetFaculty();

  const { formik, editSuccess, loadingEdit } = useAddCourse(data?.id);
  const { data: departmentList } = useGetDepartment(formik?.values?.faculty_id);

  console.log(data);

  const filteredData = () => {
    let value = facultyList.find(
      (faculty) => faculty.name === data?.faculty?.name
    );
    let depart = departmentList.find(
      (faculty) => faculty.name === data?.department?.name
    );
    console.log(value?.id);
    console.log(depart);
    formik?.setValues({
      ...formik?.values,
      // "email": data?.email,
      title: data?.title,
      code: data?.code,
      level: data?.level
    });
    formik.setFieldValue("faculty_id", value?.id);
    formik.setFieldValue("department_id", depart?.id);
  };

  useEffect(() => {
    if (!formik?.values?.faculty_id) {
      filteredData();
    }
  }, [facultyList]);

  useEffect(() => {
    if (editSuccess) {
      handleCancel();
    }
  }, [editSuccess]);

  return (
    <div>
      <Modal
        title="Edit Course"
        open={EditModalOpen} // Control modal visibility here
        onCancel={handleCancel} // Close modal on Cancel
        footer={null}
        width={500}
        closeIcon={
          <span className="text-lg text-gray-400">
            <img src={images.Times} alt="Times" />
          </span>
        }
      >
        <form className="p-4" onSubmit={formik?.handleSubmit}>
          {/* Faculty Name Dropdown */}

          <div className="mb-4">
            <label className="mb-2 block text-gray-700">Faculty Name</label>
            <Select
              placeholder="Select Faculty"
              className="w-full"
              value={
                formik?.values?.faculty_id ? formik?.values?.faculty_id : ""
              }
              onChange={(value) =>
                formik.setFieldValue("fafaculty_idculty", value)
              }
              options={facultyList.map(x => ({ value: x.id, label: <span>{x.name}</span> }))}
            >
            </Select>
          </div>

          {/* Departments Input */}
          <div className="mb-4">
            <label className="mb-2 block text-gray-700">Departments</label>
            <Select
              placeholder={
                data?.department?.name
                  ? data?.department?.name
                  : "Select Department"
              }
              className="w-full"
              value={formik?.values?.department_id}
              onChange={(value) => formik.setFieldValue("department_id", value)}
              options={departmentList.map(x => ({ value: x.id, label: <span>{x.name}</span> }))}
            >
            </Select>
          </div>

          {/* Level Dropdown */}
          <div className="mb-4">
            <label className="mb-2 block text-gray-700">Level</label>
            <Select
              placeholder="Select Level"
              className="w-full"
              value={formik?.values?.level}
              onChange={(value) => formik.setFieldValue("level", value)}
              options={levels.map(x => ({ value: x, label: <span>{x}</span> }))}
            >
            </Select>
          </div>

          {/* Course Title Input */}
          <div className="mb-4">
            <label className="mb-2 block text-gray-700">Course Title</label>
            <Input
              placeholder="Introduction to Programming"
              className="w-full"
              value={formik?.values?.title}
              name="title"
              onChange={formik.handleChange}
            />
          </div>

          {/* Course Code Input */}
          <div className="mb-6">
            <label className="mb-2 block text-gray-700">Course Code</label>
            <Input
              placeholder="COM 101"
              className="w-full"
              value={formik?.values?.code}
              name="code"
              onChange={formik.handleChange}
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
              title="Edit Student Data"
              isLoading={loadingEdit}
            />
          </div>
          {/* Save New Course Modal */}
          {openSaveEditCourseModal && (
            <SaveNewCourseModal CancelSaveModal={CancelSaveEditModal} />
          )}
        </form>
      </Modal>
    </div>
  );
};

export default EditCourseModal;
