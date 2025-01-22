import { Key, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ImportImgs from "../../components/ImportImgs";
import TestFormFileUpload from "./TestFormFileUpload";
import useAddTest from "../../hooks/postData/useAddTest";
import useGetFaculty from "../../hooks/getData/useGetFaculty";
import useGetDepartment from "../../hooks/getData/useGetDepartment";
import useGetCourse from "../../hooks/getData/useGetCourse";
import CustomButton from "../../components/CustomButton";

const AddTestForm = () => {
  const images = ImportImgs();

  const {
    formik,
    isLoading,
    question,
    setQuestion,
    file,
    setFile,
    data,
    loading
  } = useAddTest();

  const { data: facultyList } = useGetFaculty();
  const { data: departmentList } = useGetDepartment(formik?.values?.faculty_id);
  const { data: courseList } = useGetCourse(
    undefined,
    formik?.values?.department_id
  );

  const datePickerRef = useRef<DatePicker>(null);

  const changeHandler = (item: { target: { value: string; }; }) => {
    const dataInfo = JSON.parse(item?.target?.value);
    console.log(dataInfo);
    formik.setFieldValue("title", dataInfo?.title);
    formik.setFieldValue("code", dataInfo?.code);
  };

  console.log(formik?.values);

  useEffect(() => {
    formik.setFieldValue("session", data?.current_session);
  }, [loading, data]);

  return (
    <section>
      <div className="w-full bg-white p-6 shadow-md">
        <h2 className="mb-6 border-b pb-5 text-lg font-semibold">New Test</h2>
        <form className="grid grid-cols-1 gap-6 md:grid-cols-2" onSubmit={formik?.handleSubmit}>
          {/* Faculty */}
          <div className="flex flex-col">
            <label className="pb-2 text-[#1d2026]">Faculty</label>
            <select
              onChange={(e) =>
                formik?.setFieldValue("faculty_id", Number(e.target.value))
              }
              className="rounded border px-3 py-2 text-[#8c94a3]"
            >
              <option value={""}>Select Faculty</option>
              {facultyList?.map((item) => {
                return <option value={item?.id}>{item?.name}</option>;
              })}
            </select>
          </div>

          {/* Exam Date */}
          <div className="flex flex-col">
            <label className="pb-2 text-[#1d2026]">Exam Date(Time)</label>
            <div className="relative flex w-full items-center rounded border px-3 py-2 text-[#8c94a3]">
              {/* Use ref to control DatePicker */}
              <DatePicker
                ref={datePickerRef} // Reference to DatePicker
                selected={
                  formik?.values?.start_at
                    ? new Date(formik?.values?.start_at)
                    : new Date()
                }
                showTimeSelect
                onChange={(date) => formik.setFieldValue("start_at", date)}
                className="w-full outline-none" // Remove border styling from DatePicker
                dateFormat="MMM d, yyyy h:mm aa"
              />
              {/* Calendar image with onClick to trigger DatePicker */}
              <img
                src={images.Calendar}
                alt="Calendar"
                className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 transform cursor-pointer" // Make the image clickable
                onClick={() => datePickerRef.current?.setFocus()} // Programmatically open DatePicker
              />
            </div>
          </div>

          {/* Department */}
          <div className="flex flex-col">
            <label className="pb-2 text-[#1d2026]">Department</label>
            <select
              onChange={(e) =>
                formik?.setFieldValue("department_id", Number(e.target.value))
              }
              className="rounded border px-3 py-2 text-[#8c94a3]"
            >
              <option value={""}>Select Department</option>
              {departmentList?.map((item) => {
                return <option value={item?.id}>{item?.name}</option>;
              })}
            </select>
          </div>

          {/* Course Title */}
          <div className="flex flex-col">
            <label className="pb-2 text-[#1d2026]">Course Title</label>
            <select
              onChange={changeHandler}
              className="rounded border px-3 py-2 text-[#8c94a3]"
            >
              <option value={""}>Select Course</option>
              {courseList?.map((item: { id: Key, title: string }) => {
                return (
                  <option key={item.id} value={JSON.stringify(item)}>
                    {item?.title}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Duration */}
          <div className="flex flex-col">
            <label className="pb-2 text-[#1d2026]">Duration(minute)</label>
            <input
              type="text"
              name="duration"
              onChange={formik.handleChange}
              value={formik.values.duration}
              className="rounded border px-3 py-2 text-[#8c94a3]"
            />
          </div>

          {/* Session */}
          {!data?.current_session && !loading && (
            <div className="flex flex-col">
              <label className="pb-2 text-[#1d2026]">Session</label>
              <select
                onChange={formik.handleChange}
                name="session"
                value={formik.values.session}
                className="rounded border px-3 py-2 text-[#8c94a3]"
              >
                <option value={""}>Select Session</option>
                <option>2023/2024</option>
                <option>2022/2023</option>
                <option>2021/2022</option>
              </select>
            </div>
          )}

          {/* Question Number */}
          <div className="flex flex-col">
            <label className="pb-2 text-[#1d2026]">Number Of Questions</label>
            <input
              type="number"
              onChange={formik.handleChange}
              name="no_of_questions"
              value={formik.values.no_of_questions}
              className="rounded border px-3 py-2 text-[#8c94a3]"
            />
          </div>

          {/* Level */}
          <div className="flex flex-col">
            <label className="pb-2 text-[#1d2026]">Level</label>
            <select
              onChange={(e) => formik?.setFieldValue("level", e.target.value)}
              className="rounded border px-3 py-2 text-[#8c94a3]"
            >
              <option value={""}>Select Level</option>
              <option>400</option>
              <option>300</option>
              <option>200</option>
              <option>100</option>
            </select>
          </div>

          {/* Number of attempts */}
          <div className="flex flex-col">
            <label className="pb-2 text-[#1d2026]">Number of attempts</label>
            <select
              onChange={(e) =>
                formik?.setFieldValue("attempts_allowed", e.target.value)
              }
              value={formik.values.attempts_allowed}
              className="rounded border px-3 py-2 text-[#8c94a3]"
            >
              <option value={""}>Select attempts</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>

          {/* Examiner */}
          <div className="flex flex-col">
            <label className="pb-2 text-[#1d2026]">Examiner</label>
            <input
              type="text"
              name="instructor_name"
              onChange={formik.handleChange}
              value={formik.values.instructor_name}
              className="rounded border px-3 py-2 text-[#8c94a3]"
              placeholder="Examiner"
            />
          </div>

          {/* points per question */}
          <div className="flex flex-col">
            <label className="pb-2 text-[#1d2026]">Point Per Question</label>
            <input
              type="text"
              name="points_per_question"
              onChange={formik.handleChange}
              value={formik.values.overall_score}
              className="rounded border px-3 py-2 text-[#8c94a3]"
              placeholder="0"
            />
          </div>

          {/* Instructions */}
          <div className="flex flex-col md:col-span-2">
            <label className="pb-2 text-[#1d2026]">Instructions</label>
            <textarea
              name="instructions"
              onChange={formik.handleChange}
              value={formik.values.instructions}
              className="h-32 rounded border px-3 py-2 text-[#8c94a3]"
              placeholder="Write your instructions here..."
            ></textarea>
            <TestFormFileUpload
              setQuestion={setQuestion}
              question={question}
              file={file}
              setFile={setFile}
            />
          </div>

          {/* Submit button */}
        </form>
      </div>
      <div className="flex items-center justify-between gap-4">
        <button className="h-[40px] w-full rounded-lg border-none bg-gray-100 px-4 text-gray-500 hover:bg-gray-200">
          Cancel
        </button>
        <CustomButton
          title="Save Test"
          isLoading={isLoading}
        />
      </div>
    </section>
  );
};

export default AddTestForm;
