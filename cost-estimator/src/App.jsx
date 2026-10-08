
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Import all components cleanly from the ./components folder
import {
  AppLayout,
  ProtectedRoute,
  Dashboard,
  Projects,
  CreateProject,
  ProjectDetail,
  Overview,
  Estimate,
  Team,
  Login,
  NotFound,
  initialProjects
} from "./components";
// import "./App.css";
import './index.css';

function App() {
  // Application State
  const [projects, setProjects] = useState(initialProjects);
  const [user, setUser] = useState({ name: "Divya", role: "Manager" });

  // Function to add a newly created project to the state
  const handleAddProject = (newProject) => {
    setProjects((prevProjects) => [...prevProjects, newProject]);
  };

  return (
    <Routes>
      {/* 1. Public Route: Login Screen */}
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" replace /> : <Login onLogin={setUser} />}
      />

      {/* 2. Protected Routes: Protected by ProtectedRoute and wrapped by AppLayout (TopBar + Sidebar) */}
      <Route
        element={
          <ProtectedRoute user={user}>
            <AppLayout user={user} onLogout={() => setUser(null)} />
          </ProtectedRoute>
        }
      >
        {/* Default redirect: "/" goes to "/dashboard" */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Dashboard page */}
        <Route path="/dashboard" element={<Dashboard projects={projects} />} />

        {/* Searchable projects directory */}
        <Route path="/projects" element={<Projects projects={projects} />} />

        {/* Create new project page */}
        <Route path="/projects/new" element={<CreateProject onAddProject={handleAddProject} />} />

        {/* Project Details with Nested Sub-routes (Tabs) */}
        <Route path="/projects/:projectId" element={<ProjectDetail projects={projects} />}>
          <Route index element={<Overview projects={projects} />} />
          <Route path="overview" element={<Overview projects={projects} />} />
          <Route path="estimate" element={<Estimate projects={projects} />} />
          <Route path="team" element={<Team projects={projects} />} />
        </Route>
      </Route>

      {/* 3. Fallback Route: Any unknown URL displays the 404 page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
