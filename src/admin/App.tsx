import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "@tanstack/react-router";
import "./index.css";
import AdminLogin from "./Pages/Login/AdminLogin";
import LoggedInAuthenticator from "./Pages/LoggedInAuthenticator";
import Dashboard from "../src/Pages/Dashboard/Dashboard";
import NewTest from "./Pages/NewTestPage/NewTest";
import MyAccount from "./Pages/MyAccount/MyAccount";
import Settings from "./Pages/SettingPage/Settings";
import ActivityLogs from "./Pages/SettingPage/ActivityLogs";
import StudentAnalysis from "./Pages/StudentAnalysis";
import ClassManager from "./Pages/ClassManager";
import CourseManager from "./Pages/CourseManager";
import StudentManager from "./Pages/StudentManager/StudentManager";
import AdminManager from "./Pages/AdminManager/AdminManager";
import AddAdmin from "./Pages/AdminManager/AddAdmin";
import ManagerRoles from "./Pages/AdminManager/ManagerRoles";
import ResultManager from "./Pages/ResultManager/ResultManager";
import ViewResult from "./Pages/ResultManager/ViewResult";
import CreateNewRole from "./Pages/AdminManager/CreateNewRole";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<AdminLogin />}></Route>

      <Route path="/admin" element={<LoggedInAuthenticator />}>
        <Route index path="test-manager" element={<Dashboard />} />
        <Route
          index
          path="test-student-analysis/:id"
          element={<StudentAnalysis />}
        />
        <Route index path="new-test" element={<NewTest />} />
        <Route index path="class-manager" element={<ClassManager />} />
        <Route index path="course-manager" element={<CourseManager />} />
        <Route index path="student-manager" element={<StudentManager />} />
        <Route index path="result-manager" element={<ResultManager />} />
        <Route index path="result-viewResult" element={<ViewResult />} />
        <Route index path="result-CreateNewRole" element={<CreateNewRole />} />
        <Route index path="admin-manager" element={<AdminManager />} />
        <Route index path="admin-added" element={<AddAdmin />} />
        <Route index path="admin-manageRole" element={<ManagerRoles />} />
        <Route index path="my-account" element={<MyAccount />} />
        <Route index path="settings" element={<Settings />} />
        <Route index path="settings-ActivityLog" element={<ActivityLogs />} />
      </Route>
    </>,
  ),
);

const App = () => <RouterProvider router={router} />;

export default App;
