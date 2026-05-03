import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../features/auth/authSlice";

// Pages
import LandingPage from "../modules/landing/LandingPage";
import DashboardPage from "../modules/dashboard/DashboardPage";
import ResumeAnalyzerPage from "../modules/resume-analyzer/pages/ResumeAnalyzerPage";
import JobMatcherPage from "../modules/job-matcher/pages/JobMatcherPage";
import Login from "../modules/auth/Login";
import Register from "../modules/auth/Register";
import OAuthCallback from "../modules/auth/OAuthCallback";
import ResetPassword from "../modules/auth/ResetPassword";
import VerifyEmail from "../modules/auth/VerifyEmail";
import ProfilePage from "../modules/profile/ProfilePage";
import RecruiterJobsPage from "../modules/recruiter-jobs/pages/RecruiterJobsPage";
import CreateJobPostingPage from "../modules/recruiter-jobs/pages/CreateJobPostingPage";
import JobBoardPage from "../modules/student-jobs/pages/JobBoardPage";
import ChatWidget from "../modules/ai-assistant/components/ChatWidget";

// Routing
import ProtectedRoute from "../shared/components/ProtectedRoute";
import PublicRoute from "../shared/components/PublicRoute";
import NotFound from "../shared/pages/NotFound";

function App() {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, token, user]);

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Routes>
        {/*  Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/job-matcher" element={<JobMatcherPage />} />

        {/*  Auth Routes (blocked if already logged in) */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/*  Other Public */}
        <Route path="/auth/callback" element={<OAuthCallback />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/*  Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/resume-analyzer" element={<ResumeAnalyzerPage />} />
          <Route path="/jobs" element={<JobBoardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* Recruiter Only */}
        <Route element={<ProtectedRoute requiredRole="recruiter" />}>
          <Route path="/recruiter/jobs" element={<RecruiterJobsPage />} />
          <Route path="/recruiter/jobs/new" element={<CreateJobPostingPage />} />
        </Route>

        {/*  404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Chat only for logged-in users */}
      {token && <ChatWidget />}
    </div>
  );
}

export default App;