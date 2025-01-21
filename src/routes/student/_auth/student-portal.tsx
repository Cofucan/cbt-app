import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";
import Header from "../../../student/Pages/StudentPortal/Header.tsx";
import AvailableTest from "../../../student/Pages/StudentPortal/AvailableTest.tsx";
import UpcomingTests from "../../../student/Pages/StudentPortal/UpcomingTests.tsx";
import StudentDetails from "../../../student/Pages/StudentPortal/StudentDetails.tsx";
import Footer from "../../../student/Components/Footer.tsx";

export const Route = createFileRoute("/student/_auth/student-portal")({
  component: RouteComponent,
});

function RouteComponent() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("student");
    // console.log("Stored Student:", storedUser);
    if (storedUser) {
      const userData = JSON.parse(storedUser);

      setUser(userData.student || userData);
    }
  }, []);

  if (!user) {
    return <p>No user details available.</p>;
  }

  return (
    <section className="bg-gray-50">
      <Header />
      <div className="mx-auto flex h-full min-h-screen w-full flex-col justify-center gap-8 p-5 md:p-8 lg:flex-row">
        {/* Left Section */}
        <div className="flex flex-col gap-6">
          <AvailableTest />
          <UpcomingTests />
        </div>

        {/* Right Section */}
        <div className="">
          <StudentDetails user={user} />
        </div>
      </div>
      <div className="mt-20">
        <Footer />
      </div>
    </section>
  );
}
