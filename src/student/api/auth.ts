import axiosInstance from "./axiosConfig";

//Login User
export const loginUser = async (credentials) => {
  try {
    const { data } = await axiosInstance.post(
      "/user/student-login/",
      credentials
    );
    return data;
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    throw error;
  }
};

//Get user Profile iMage
export const getUserProfile = async (token: string) => {
  try {
    const response = await axiosInstance.get("/user/me/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Return only the profile image URL
    return response.data;
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
};

//Fetch Student Available test
export const fetchAvailableTest = async (token: string) => {
  const response = await axiosInstance.get("/student/exams/available/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

//Fetch student upcoming test
export const fetchUpcomingTest = async (token: string) => {
  const response = await axiosInstance.get("/student/exams/upcoming/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Fetch Student Exam Details
export const fetchCourseDetails = async (examId, token) => {
  try {
    // Axios handles response status and parsing JSON automatically
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

//Submit Answer
export const submitAnswer = async (examId, requestBody, token) => {
  try {
    // Ensure the request body is structured correctly
    console.log("Submitting answers with payload:", requestBody);

    const { data } = await axiosInstance.post(
      `/student/exams/questions/${examId}/save/`,
      requestBody, // Use requestBody directly
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return data;
  } catch (error) {
    console.error("Error in submitting Answers:", error);
    throw error;
  }
};

// Submit Exam
export const submitExam = async (examId, requestBody, token) => {
  try {
    // Ensure the request body is structured correctly
    console.log("Submitting exam with payload:", requestBody);

    const { data } = await axiosInstance.post(
      `/student/exams/${examId}/submit/`,
      requestBody, // Use requestBody directly
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return data;
  } catch (error) {
    console.error("Error in submitting exam:", error);
    throw error;
  }
};


export const startExam = async (examId, requestBody, token) => {
  try {
    const { data } = await axiosInstance.post(
      `/student/exams/${examId}/start/`,
      requestBody, // Include necessary details, like student ID if required
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return data; // Returns server response, which should contain start time or time remaining
  } catch (error) {
    console.error("Error in starting exam:", error);
    throw error;
  }
};


// School Config ....
export const getSchoolConfig = async () => {
  try {
    const response = await axiosInstance.get("/school/config/", {
    });

    return response.data;
  } catch (error) {
    console.error("Error getting school config:", error);
    throw error;
  }
};
