import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./compoments/comman/Navbar";
import OpenRoute from "./compoments/core/Auth/OpenRoute";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import ContactUsPage from "./pages/ContactUsPage";
import MyProfile from "./compoments/core/DashBoard/MyProfile";
import PrivateRoute from "./compoments/core/Auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/Error";
import Settings from "./compoments/core/DashBoard/Settings";
import EnrolledCourses from "./compoments/core/DashBoard/EnrolledCourses";
import Cart from "./compoments/core/DashBoard/Cart";
import { ACCOUNT_TYPE } from "./utils/constanst";
import { useSelector } from "react-redux";
import AddCourse from "./compoments/core/DashBoard/AddCourses/Index";
import MyCourses from "./compoments/core/DashBoard/MyCourses";
import EditCourseIns from "./compoments/core/DashBoard/EditCourse/EditCourseIns";
import { Catalog } from "./pages/Catalog";
import CourseDetailCataPage from "./pages/CourseDetailCataPage";
import { ViewCoures } from "./pages/ViewCoures";
import { ViewDetails } from "./compoments/core/View_Coures/ViewDetails";
import { InstructorDash } from "./compoments/core/DashBoard/InstructorDashboard/InstructorDash";



function App() {

  const { user } = useSelector((state) => state.profile);

  return (
    <div className="w-[100vw] min-h-[100vh] bg-richblack-900 flex flex-col font-Inter">
      {/* <Navbar /> */}
      <Routes>
        <Route element={<Navbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />}/>
          <Route path="catalog/:catalogName" element ={ <Catalog />} />
          <Route path="course/:courseId" element={<CourseDetailCataPage />} />
          <Route
            path="contact"
            element={
              <ContactUsPage />
            }
          />
          <Route element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }>
            <Route path="dashboard/my-profile" element={<MyProfile />} />
            <Route path="dashboard/settings" element={<Settings />} />
            {
              user?.accountType === ACCOUNT_TYPE.STUDENT && (
                <>
                  <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
                  <Route path="dashboard/cart" element={<Cart />} />
                </>
              )
            }
            {
              user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                <>
                  <Route path="dashboard/add-course" element={<AddCourse />} />
                  <Route path="dashboard/my-courses" element={<MyCourses />} />
                  <Route path="dashboard/edit-course/:courseId" element={<EditCourseIns />} />
                  <Route path="dashboard/instructor" element={<InstructorDash />} />
                </>
              )
            }
          </Route>
          <Route element={
            <PrivateRoute>
              <ViewCoures />
            </PrivateRoute>
          }>
            {
              user?.accountType === ACCOUNT_TYPE.STUDENT && (
                <>
                <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                  element={<ViewDetails />}
                />
                </>
              ) 
            }
          </Route>
        </Route>

        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          } />
        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
