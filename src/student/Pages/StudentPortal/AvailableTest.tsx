import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchAvailableTest } from "../../api/auth";
import ImportingImgs from "../../Components/ImportingImgs";

const AvailableTest = () => {
  const images = ImportingImgs();
  const navigate = useNavigate();
  const [availableTest, setAvailableTest] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("No token found. Redirecting to login...");
      navigate({ to: "/student/login" });
      return;
    }

    const getAvailableTest = async () => {
      try {
        const data = await fetchAvailableTest(token);
        // console.log("Fetched Available Test Data:", data);

        if (data?.results?.length > 0) {
          setAvailableTest(data.results);
        } else {
          toast.info("No available test details right now.");
        }
      } catch (error) {
        console.error("Error fetching available tests:", error);
        toast.error("Failed to load available tests.");
      }
    };

    getAvailableTest();
  }, [navigate]);

  // Format the date and time to match your required format
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return `${formattedDate}, ${formattedTime}`;
  };

  // Handle case when no available tests
  if (availableTest.length === 0) {
    return (
      <p className="rounded-lg border-2 border-[#e9eaf0] bg-white px-5 py-3 text-[#ff6636] md:px-10 md:py-6">
        No available test found....
      </p>
    );
  }

  return (
    <div className="rounded-lg border-2 border-[#e9eaf0] bg-white px-5 py-3 md:px-10 md:py-6">
      <h2 className="mb-5 text-2xl font-semibold text-[#ff6636] lg:mb-10">
        Available Test
      </h2>

      {/* Map over availableTest to create multiple buttons */}
      {availableTest.map((test) => (
        <div key={test.id}>
          <h3 className="text-lg font-semibold md:text-2xl">{test.title}</h3>
          <p className="flex flex-col pt-3 text-lg text-black md:text-2xl lg:text-lg">
            {formatDateTime(test.start_at)}
          </p>
          <p className="mt-5 text-lg text-black md:text-2xl lg:text-lg">
            Click Here
          </p>
          <button
            className="mt-2 flex items-center text-[#ff6636] underline md:gap-2"
            onClick={() =>
              navigate({
                to: "/student/course-details/$examId",
                params: { examId: test.id },
              })
            } // Navigate to Details with dynamic examId
          >
            <img src={images.thumbDirection} alt="Direction" />
            <span className="font-semibold md:text-lg">{test.title}</span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default AvailableTest;
