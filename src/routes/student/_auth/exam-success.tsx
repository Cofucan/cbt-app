import { createFileRoute, useNavigate } from "@tanstack/react-router";
import ImportingImgs from "../../../student/Components/ImportingImgs.tsx";
import { useEffect, useState } from "react";
import Header from "../../../student/Components/MainHeader.tsx";
import Footer from "../../../student/Components/Footer.tsx";
import { useStudentData } from "../../../student/context/StudentDataContext.tsx";

export const Route = createFileRoute("/student/_auth/exam-success")({
  component: RouteComponent,
});

function RouteComponent() {
  const studentData = useStudentData()
  const navigate = useNavigate();
  const images = ImportingImgs();

  const [timeTaken, setTimeTaken] = useState("");

  useEffect(() => {
    // Get the exam start time from location state
    const { examStartTime } = studentData.data;

    console.log("examStartTime", examStartTime);

    if (examStartTime) {
      // Get the current time as the submission time
      const examEndTime = new Date().valueOf();
      const startTime = new Date(examStartTime).valueOf();

      // Calculate the time difference in milliseconds
      const timeDifference = examEndTime - startTime;

      // Convert milliseconds to minutes and seconds
      const minutes = Math.floor(timeDifference / 60000);
      const seconds = ((timeDifference % 60000) / 1000).toFixed(0);

      // Format time taken as "X minutes Y seconds"
      setTimeTaken(`${minutes} minutes ${seconds} seconds`);
    }
  }, [studentData.data]);

  return (
    <section className="bg-gray-50">
      <div>
        <Header />
      </div>
      <div className="mx-auto my-20 flex items-center justify-center bg-white lg:w-[70%] 2xl:w-[50%]">
        <div className="">
          <div className="flex flex-col items-center gap-10 py-10">
            <img src={images.SuccessHand} alt="" />
            <h2 className="text-sm font-semibold text-[#ff6636] md:text-2xl">
              Congratulation on completing your test! Well-done
            </h2>
          </div>
          <div className="flex flex-col gap-5 px-5 text-lg md:px-0">
            <p className="text-center font-medium">
              Time Taken: <span>{timeTaken || "Calculating..."}</span>
            </p>
            <div className="flex items-center justify-center py-10">
              <button
                onClick={() => navigate({ to: "/" })}
                className="w-[50%] bg-[#ff6636] px-12 py-3 font-semibold text-white"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-32">
        <Footer />
      </div>
    </section>
  );
}
