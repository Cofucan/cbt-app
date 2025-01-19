

const StudentCard = ({
  id,
  score,
  regNo,
  name,
  courseName,
  courseCode,
  testDate,
}) => {
  return (
    <div className="border-2 border-[#fffff] p-4 bg-white">
      <div className="flex items-start">
        <span className="text-[#ff6636] bg-[#f5f7fa] px-4 py-2 font-bold text-sm mr-5">#{id}</span>
        <div>
          <p className="font-semibold">Score: {score}/100</p>
          <p>
            Reg No: <span className="font-semibold">{regNo}</span>
          </p>
          <p>
            Name: <span className="font-semibold">{name}</span>
          </p>
          <p>
            Course Name: <span className="font-semibold">{courseName}</span>
          </p>
          <p>
            Course Code: <span className="font-semibold">{courseCode}</span>
          </p>
          <p>Test Date: {testDate}</p>
        </div>
      </div>
    </div>
  );
};

const StudentResultList = () => {
  const students = [
    {
      id: 1,
      score: 75,
      regNo: "WCG023IV",
      name: "Oge Cynthia",
      courseName: "Algorithm",
      courseCode: "CSC 105",
      testDate: "24 Sep 2024 / 3:00 PM",
    },
    {
      id: 2,
      score: 75,
      regNo: "WCG023IV",
      name: "Oge Cynthia",
      courseName: "Algorithm",
      courseCode: "CSC 105",
      testDate: "24 Sep 2024 / 3:00 PM",
    },
    {
      id: 3,
      score: 75,
      regNo: "WCG023IV",
      name: "Oge Cynthia",
      courseName: "Algorithm",
      courseCode: "CSC 105",
      testDate: "24 Sep 2024 / 3:00 PM",
    },
    {
      id: 4,
      score: 75,
      regNo: "WCG023IV",
      name: "Oge Cynthia",
      courseName: "Algorithm",
      courseCode: "CSC 105",
      testDate: "24 Sep 2024 / 3:00 PM",
    },
    {
      id: 5,
      score: 75,
      regNo: "WCG023IV",
      name: "Oge Cynthia",
      courseName: "Algorithm",
      courseCode: "CSC 105",
      testDate: "24 Sep 2024 / 3:00 PM",
    },
    {
      id: 6,
      score: 75,
      regNo: "WCG023IV",
      name: "Oge Cynthia",
      courseName: "Algorithm",
      courseCode: "CSC 105",
      testDate: "24 Sep 2024 / 3:00 PM",
    },
    {
      id: 7,
      score: 75,
      regNo: "WCG023IV",
      name: "Oge Cynthia",
      courseName: "Algorithm",
      courseCode: "CSC 105",
      testDate: "24 Sep 2024 / 3:00 PM",
    },
    {
      id: 8,
      score: 75,
      regNo: "WCG023IV",
      name: "Oge Cynthia",
      courseName: "Algorithm",
      courseCode: "CSC 105",
      testDate: "24 Sep 2024 / 3:00 PM",
    },
  ];

  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {students.map((student) => (
          <StudentCard
            key={student.id}
            id={student.id}
            score={student.score}
            regNo={student.regNo}
            name={student.name}
            courseName={student.courseName}
            courseCode={student.courseCode}
            testDate={student.testDate}
          />
        ))}
      </div>
    </div>
  );
};

export default StudentResultList;
