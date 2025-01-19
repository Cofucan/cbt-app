import {createFileRoute, useLocation, useNavigate} from '@tanstack/react-router'
import ImportingImgs from "../../../student/Components/ImportingImgs.tsx";
import {useEffect, useState} from "react";
import Header from "../../../student/Components/MainHeader.tsx";
import Footer from "../../../student/Components/Footer.tsx";

export const Route = createFileRoute('/student/_auth/exam-success')({
  component: RouteComponent,
})

function RouteComponent() {
    const location = useLocation();
    const navigate = useNavigate();
    const images = ImportingImgs();

    const [timeTaken, setTimeTaken] = useState("");

    useEffect(() => {
      // Get the exam start time from location state
      const { examStartTime } = location.state || {};

      console.log("examStartTime", examStartTime)

      if (examStartTime) {
        // Get the current time as the submission time
        const examEndTime = new Date();
        const startTime = new Date(examStartTime);

        // Calculate the time difference in milliseconds
        const timeDifference = examEndTime - startTime;

        // Convert milliseconds to minutes and seconds
        const minutes = Math.floor(timeDifference / 60000);
        const seconds = ((timeDifference % 60000) / 1000).toFixed(0);

        // Format time taken as "X minutes Y seconds"
        setTimeTaken(`${minutes} minutes ${seconds} seconds`);
      }
    }, [location.state]);

    return (
        <section className="bg-gray-50">
          <div>
            <Header />
          </div>
          <div className="bg-white flex items-center justify-center lg:w-[70%] 2xl:w-[50%] mx-auto my-20">
            <div className="">
              <div className="flex flex-col items-center py-10 gap-10">
                <img src={images.SuccessHand} alt="" />
                <h2 className="text-sm md:text-2xl text-[#ff6636] font-semibold">
                  Congratulation on completing your test! Well-done
                </h2>
              </div>
              <div className="flex flex-col gap-5 px-5 md:px-0 text-lg">

                <p className="font-medium text-center">
                  Time Taken: <span>{timeTaken || "Calculating..."}</span>
                </p>
                <div className="flex justify-center items-center py-10">
                  <button
                      onClick={() => navigate({to: "/student"})}
                      className="bg-[#ff6636] px-12 py-3 w-[50%] text-white font-semibold"
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
