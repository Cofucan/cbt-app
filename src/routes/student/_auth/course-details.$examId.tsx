import { createFileRoute, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  fetchCourseDetails,
  getSchoolConfig,
  getUserProfile,
} from "../../../student/api/auth.ts";
import { BeatLoader } from "react-spinners";
import Header from "../../../student/Components/MainHeader.tsx";
import Details from "../../../student/Pages/CourseDetails/Details.tsx";
import Footer from "../../../student/Components/Footer.tsx";

export const Route = createFileRoute("/student/_auth/course-details/$examId")({
  component: RouteComponent,
});

function RouteComponent() {
  const [courseDetails, setCourseDetails] = useState(null);
  const [semester, setSemester] = useState(null);
  const [loading, setLoading] = useState(true);
  const [studentId, setStudentId] = useState(null);

  const token = localStorage.getItem("token");
  const { examId } = Route.useParams();

  useEffect(() => {
    const getCourseDetails = async () => {
      try {
        const data = await fetchCourseDetails(examId, token);
        // console.log("Course Details:", data);
        setCourseDetails(data);
      } catch (error) {
        console.error("Failed to fetch course details:", error);
      } finally {
        setLoading(false);
      }
    };
    getCourseDetails();
  }, [examId, token]);

  //Getting semester from schoolConfig
  useEffect(() => {
    const getSemester = async () => {
      try {
        const data = await getSchoolConfig(token);

        setSemester(data.semester);
      } catch (error) {
        console.error("Failed to fetch Semester:", error);
      } finally {
        setLoading(false);
      }
    };
    getSemester();
  }, [examId, token]);

  //getting student Id from User/me
  useEffect(() => {
    const fetchStudentId = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const profileData = await getUserProfile(token);
          const id = profileData?.result?.profile.id;
          console.log("Student Profile Id:", id);
          setStudentId(id);
        } else {
          console.error("No token found");
        }
      } catch (error) {
        console.error("Error fetching student Id:", error);
      }
    };

    fetchStudentId();
  }, []);

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div
          className="cursor-pointer px-10 py-2 text-lg font-medium text-white"
          disabled={loading}
        >
          <BeatLoader color="#ff6636" size={20} />
        </div>
      </div>
    );

  return (
    <section className="bg-gray-50">
      <div>
        <Header
          courseDetails={courseDetails}
          // examId={examId}
          // logout={logout}
          // studentId={studentId}
        />
      </div>
      <div>
        {courseDetails && semester && (
          <Details
            courseDetails={courseDetails}
            semester={semester}
            loading={loading}
            examId={examId}
          />
        )}
      </div>
      <div className="mt-20">
        <Footer />
      </div>
    </section>
  );
}
