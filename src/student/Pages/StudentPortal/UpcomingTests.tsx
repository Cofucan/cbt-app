import React, { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { fetchUpcomingTest } from "../../api/auth";
import { toast } from "react-toastify";

const UpcomingTests = () => {
  const navigate = useNavigate();
  const [upcomingTest, setUpComingTest] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("No token found. Redirecting to login...");
      navigate({to: "/student/login"});
      return;
    }

    const getUpcomingTest = async () => {
      const data = await fetchUpcomingTest(token);
      // console.log("Fetched upcoming Test Data:", data);

      if (data?.results?.length > 0) {
        // Sort the tests by start_at (exam time) in ascending order
        const sortedTests = data.results.sort(
          (a, b) => new Date(a.start_at) - new Date(b.start_at)
        );

        // Slice the array to get the first 2 tests
        const firstTwoTests = sortedTests.slice(0, 2);

        setUpComingTest(firstTwoTests);
      }
    };

    getUpcomingTest();
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

    return `${formattedDate} - ${formattedTime}`;
  };

  if (upcomingTest.length === 0) {
    return <p className="bg-white px-5 text-[#ff6636] py-3 md:py-6 md:px-10 rounded-lg border-2 border-[#e9eaf0]">No available upcoming test found.</p>;
  }

  return (
    <div className="bg-white px-5 py-5 md:py-6 md:px-10 rounded-lg border-2 border-[#e9eaf0]">
      <h2 className="text-2xl font-semibold text-[#ff6636] mb-5 lg:mb-10">
        Upcoming Tests
      </h2>
      {upcomingTest.map((test) => (
        <div key={test.id} className="mb-4">
          <h3 className="text-lg md:text-2xl font-semibold">{test.title}</h3>
          <p className="text-black text-lg md:text-2xl lg:text-lg pt-3 flex flex-col">
            {formatDateTime(test.start_at)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default UpcomingTests;
