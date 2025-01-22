import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { fetchUpcomingTest } from "../../api/auth";
import { toast } from "react-toastify";

const UpcomingTests = () => {
  const navigate = useNavigate();
  const [upcomingTest, setUpComingTest] = useState<{start_at: string, id: string, title: string}[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("No token found. Redirecting to login...");
      void navigate({ to: "/student/login" });
      return;
    }

    const getUpcomingTest = async () => {
      const data = await fetchUpcomingTest(token);
      // console.log("Fetched upcoming Test Data:", data);

      if (data?.results?.length > 0) {
        // Sort the tests by start_at (exam time) in ascending order
        const sortedTests = data.results.sort(
          (a: {start_at: string}, b: {start_at: string}) => new Date(a.start_at).valueOf() - new Date(b.start_at).valueOf(),
        );

        // Slice the array to get the first 2 tests
        const firstTwoTests = sortedTests.slice(0, 2);

        setUpComingTest(firstTwoTests);
      }
    };

    getUpcomingTest();
  }, [navigate]);

  // Format the date and time to match your required format
  const formatDateTime = (dateString: string) => {
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

    return `${formattedDate} - ${formattedTime}`;
  };

  if (upcomingTest.length === 0) {
    return (
      <p className="rounded-lg border-2 border-[#e9eaf0] bg-white px-5 py-3 text-[#ff6636] md:px-10 md:py-6">
        No available upcoming test found.
      </p>
    );
  }

  return (
    <div className="rounded-lg border-2 border-[#e9eaf0] bg-white px-5 py-5 md:px-10 md:py-6">
      <h2 className="mb-5 text-2xl font-semibold text-[#ff6636] lg:mb-10">
        Upcoming Tests
      </h2>
      {upcomingTest.map((test) => (
        <div key={test.id} className="mb-4">
          <h3 className="text-lg font-semibold md:text-2xl">{test.title}</h3>
          <p className="flex flex-col pt-3 text-lg text-black md:text-2xl lg:text-lg">
            {formatDateTime(test.start_at)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default UpcomingTests;
