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
      navigate({to: "/student/login"});
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
      <p className="bg-white px-5 py-3 text-[#ff6636] md:py-6 md:px-10 rounded-lg border-2 border-[#e9eaf0]">
        No available test found....
      </p>
    );
  }

  return (
    <div className="bg-white px-5 py-3 md:py-6 md:px-10 rounded-lg border-2 border-[#e9eaf0]">
      <h2 className="text-2xl font-semibold text-[#ff6636] mb-5 lg:mb-10">
        Available Test
      </h2>

      {/* Map over availableTest to create multiple buttons */}
      {availableTest.map((test) => (
        <div key={test.id}>
          <h3 className="text-lg md:text-2xl font-semibold">{test.title}</h3>
          <p className="text-black text-lg md:text-2xl lg:text-lg pt-3 flex flex-col">
            {formatDateTime(test.start_at)}
          </p>
          <p className="text-black text-lg md:text-2xl lg:text-lg mt-5">
            Click Here
          </p>
          <button
            className="text-[#ff6636] underline flex items-center mt-2 md:gap-2"
            onClick={() => navigate({to: "/student/course-details/$examId", params: {examId: test.id}})} // Navigate to Details with dynamic examId
          >
            <img src={images.thumbDirection} alt="Direction" />
            <span className="md:text-lg font-semibold">{test.title}</span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default AvailableTest;
