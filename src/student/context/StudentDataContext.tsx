import { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useState } from "react";
import { Answer } from "../Pages/MainExamPage/QuickNavigation.tsx";

export interface StudentData {
  selectedAnswers?: Answer[],
  totalQuestions?: number,
  examStartTime?: string,
}
export interface StudentDataProps {
  data: StudentData
  setData: Dispatch<SetStateAction<StudentData>>
}

const StudentDataContext = createContext<StudentDataProps | null>(null);

export const useStudentData = () => {
  const context = useContext(StudentDataContext);
  if (!context) throw new Error("Invalid Auth Context");
  return context;
};
export const StudentDataProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<StudentData>({})

  return <StudentDataContext.Provider value={{ data, setData }}>{children}</StudentDataContext.Provider>;
};
