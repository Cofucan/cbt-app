import axiosInstance from "./axiosConfig";
import axios from "axios";
import { Answer } from "../Pages/MainExamPage/QuickNavigation.tsx";

interface LoginCredentials {
  identifier: string;
}

interface ExamSubmitResponse {
  success: boolean;
  message: string;
}

interface SubmitAnswerRequestBody {
  attempted_questions: Answer[];
}

interface ExamStartResponse {
  exam: { title: string; expected_end_at: string; started_at: string };
  start_time: string;
  remaining_time: string;
  attempted_questions: {
    selected_option: number | string;
    student_question_number: string;
    question: Record<string, string>;
  }[];
  expected_end_at: string;
  started_at: string;
}

interface SchoolConfig {
  logo: any;
  name: string;
  academic_year: string;
  semester: string;
}

// Login User
export const loginUser = async (credentials: LoginCredentials) => {
  try {
    console.log("Credentials being sent:", credentials);

    const { data } = await axiosInstance.post(
      "/user/student-login/",
      credentials,
    );

    console.log("Response Data:", data);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios Error:", error.response?.data || error.message);
    } else {
      console.error("Error:", error);
    }
    throw error;
  }
};

// Get user Profile Image
export const getUserProfile = async (token: string | null) => {
  try {
    const response = await axiosInstance.get("/user/me/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
};

// Fetch Student Available Tests
export const fetchAvailableTest = async (token: string | null) => {
  const response = await axiosInstance.get("/student/exams/available/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data; 
};

// Fetch Student Upcoming Tests
export const fetchUpcomingTest = async (token: string | null) => {
  const response = await axiosInstance.get("/student/exams/upcoming/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Fetch Student Exam Details
export const fetchCourseDetails = async (
  examId: string,
  token: string | null,
) => {
  try {
    const response = await axiosInstance.get(`/student/exams/${examId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching course details:", error);
    throw error;
  }
};

// Submit Answer
export const submitAnswer = async (
  examId: string,
  requestBody: SubmitAnswerRequestBody,
  token: string | null,
) => {
  try {
    const { data } = await axiosInstance.post(
      `/student/exams/questions/${examId}/save/`,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    return data;
  } catch (error) {
    console.error("Error in submitting Answers:", error);
    throw error;
  }
};

// Submit Exam
export const submitExam = async (
  examId: string,
  requestBody: SubmitAnswerRequestBody,
  token: string | null,
): Promise<ExamSubmitResponse> => {
  try {
    const { data } = await axiosInstance.post(
      `/student/exams/${examId}/submit/`,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    return data;
  } catch (error) {
    console.error("Error in submitting exam:", error);
    throw error;
  }
};

// Start Exam
export const startExam = async (
  examId: string,
  requestBody: object,
  token: string | null,
): Promise<ExamStartResponse> => {
  try {
    const { data } = await axiosInstance.post(
      `/student/exams/${examId}/start/`,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    return data; // Assuming the response contains exam start time and remaining time
  } catch (error) {
    console.error("Error in starting exam:", error);
    throw error;
  }
};

// Fetch School Config
export const getSchoolConfig = async (): Promise<SchoolConfig> => {
  try {
    const response = await axiosInstance.get("/school/config/");
    return response.data; // Assuming response contains school config details
  } catch (error) {
    console.error("Error getting school config:", error);
    throw error;
  }
};
