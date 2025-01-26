export type Admin = {
  identifier: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  name: string;
  type: string;
  email: string;
  phone_number: string;
  profile_image: null;
  profile: null;
  last_login: string;
  last_login_ip: null;
};
export type Faculty = {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  is_deleted: boolean;
  departments: Department[];
};
export type Department = {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  faculty_name: string;
};

export type Exam = {
  id: number;
  created_at: string;
  updated_at: string;
  code: string;
  title: string;
  duration: number;
  start_at: string;
  instructor_name: string;
  instructions: string;
  department_name: string | null;
  faculty_name: string | null;
  level: string | null;
  session: string | null;
  status: string;
  file_url: string | null;
  questions_count: number;
  no_of_questions: number;
  attempts_allowed: number;
};

export type SettingResponse = {
  name: string;
  type: string;
  code: string;
  current_session: string;
  semester: string;
  logo_url: string;
  result_after_test: boolean;
};

export type UserResponse = {
  result: {
    identifier: string;
    first_name: string;
    last_name: string;
    middle_name: string | null;
    name: string;
    type: string;
    email: string;
    phone_number: string | null;
    profile_image: string | null;
    profile: string | null;
    last_login: string;
    last_login_ip: string | null;
  };
}



export type AdminUser = {
  id: number;
  created_at: string;
  updated_at: string;
  identifier: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  klass_name: null;
  faculty_name: string;
  department_name: string;
  level: number;
};

export type AdminErrorResponse = {
  detail: string;
};
