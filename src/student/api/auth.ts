// import axiosInstance from "./axiosConfig";

// //Login User
// export const loginUser = async (credentials) => {
//   try {
//     const { data } = await axiosInstance.post(
//       "/user/student-login/",
//       credentials
//     );
//     return data;
//   } catch (error) {
//     console.error("Error:", error.response?.data || error.message);
//     throw error;
//   }
// };

// //Get user Profile iMage
// export const getUserProfile = async ( token: string | null) => {
//   try {
//     const response = await axiosInstance.get("/user/me/", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     // Return only the profile image URL
//     return response.data;
//   } catch (error) {
//     console.error("Error getting user profile:", error);
//     throw error;
//   }
// };

// //Fetch Student Available test
// export const fetchAvailableTest = async (token: string) => {
//   const response = await axiosInstance.get("/student/exams/available/", {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return response.data;
// };

// //Fetch student upcoming test
// export const fetchUpcomingTest = async (token: string) => {
//   const response = await axiosInstance.get("/student/exams/upcoming/", {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   return response.data;
// };

// // Fetch Student Exam Details
// export const fetchCourseDetails = async (examId, token) => {
//   try {
//     // Axios handles response status and parsing JSON automatically
//     const response = await axiosInstance.get(`/student/exams/${examId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//          "Content-Type": "application/json",
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.error("Error fetching course details:", error);
//     throw error;
//   }
// };

// //Submit Answer
// export const submitAnswer = async (examId, requestBody, token) => {
//   try {
//     // Ensure the request body is structured correctly
//     console.log("Submitting answers with payload:", requestBody);

//     const { data } = await axiosInstance.post(
//       `/student/exams/questions/${examId}/save/`,
//       requestBody, // Use requestBody directly
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     return data;
//   } catch (error) {
//     console.error("Error in submitting Answers:", error);
//     throw error;
//   }
// };

// // Submit Exam
// export const submitExam = async (examId, requestBody, token) => {
//   try {
//     // Ensure the request body is structured correctly
//     console.log("Submitting exam with payload:", requestBody);

//     const { data } = await axiosInstance.post(
//       `/student/exams/${examId}/submit/`,
//       requestBody, // Use requestBody directly
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     return data;
//   } catch (error) {
//     console.error("Error in submitting exam:", error);
//     throw error;
//   }
// };

// export const startExam = async (examId, requestBody, token) => {
//   try {
//     const { data } = await axiosInstance.post(
//       `/student/exams/${examId}/start/`,
//       requestBody, // Include necessary details, like student ID if required
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     return data; // Returns server response, which should contain start time or time remaining
//   } catch (error) {
//     console.error("Error in starting exam:", error);
//     throw error;
//   }
// };

// // School Config ....
// export const getSchoolConfig = async () => {
//   try {
//     const response = await axiosInstance.get("/school/config/", {
//     });

//     return response.data;
//   } catch (error) {
//     console.error("Error getting school config:", error);
//     throw error;
//   }
// };

import axiosInstance from "./axiosConfig";
import axios from "axios";

// Define the types for API responses, request body, etc.

interface LoginCredentials {
  username: string;
  error: string;
}

// interface ExamDetails {
//   id: string;
//   title: string;
//   description: string;
//   // Add other fields specific to your response
// }

// interface Answer {
//   question_number: string;
//   selected_option: string;
// }

interface ExamSubmitResponse {
  success: boolean;
  message: string;
}

interface SubmitAnswerRequestBody {
  attempted_questions: {
    question_number: number;
    selected_option: string;
  }[];
}

interface ExamStartResponse {
  start_time: string;
  remaining_time: string;
  // Add other fields returned on starting the exam
}

interface SchoolConfig {
  logo: any;
  name: string;
  academic_year: string;
  // Add other config fields
}

// Login User
export const loginUser = async (credentials: LoginCredentials) => {
  try {
    const { data } = await axiosInstance.post(
      "/user/student-login/",
      credentials,
    );
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
export const getUserProfile = async ( token: string | null) => {
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
export const fetchAvailableTest = async ( token: string | null) => {
  const response = await axiosInstance.get("/student/exams/available/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data; // Return test details from the API response
};

// Fetch Student Upcoming Tests
export const fetchUpcomingTest = async ( token: string | null) => {
  const response = await axiosInstance.get("/student/exams/upcoming/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Fetch Student Exam Details
export const fetchCourseDetails = async (examId: string,  token: string | null) => {
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
export const getSchoolConfig = async (token: string): Promise<SchoolConfig> => {
  try {
    const response = await axiosInstance.get("/school/config/");
    return response.data; // Assuming response contains school config details
  } catch (error) {
    console.error("Error getting school config:", error);
    throw error;
  }
};
