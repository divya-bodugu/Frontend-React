import { useParams, Link, NavLink, Outlet } from "react-router-dom";
import { findProject } from "./projectData";
import ProjectNotFound from "./ProjectNotFound";
import "./ProjectDetail.css";

function ProjectDetail({ projects }) {
  // 1. Get the :projectId parameter from the URL
  const { projectId } = useParams();

  // 2. Find the project object from the list
  const project = findProject(projects, projectId);

  // 3. Fallback if the ID doesn't exist
  if (!project) {
    return <ProjectNotFound projectId={projectId} />;
  }

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <div className="project-breadcrumb">
        <Link to="/projects" className="project-breadcrumb-link">
          ← Back to Projects
        </Link>
        <span className="project-breadcrumb-separator">/</span>
        <span>{project.name}</span>
      </div>

      {/* Project Header */}
      <div className="page-header project-detail-header">
        <div>
          <div className="project-title-row">
            <h1>{project.name}</h1>
            <span
              className={`badge ${project.status === "Completed" ? "badge-completed" : "badge-in-progress"
                }`}
            >
              {project.status}
            </span>
          </div>
          <p className="project-meta-text">
            Project ID: <strong className="project-id-highlight">{project.id}</strong> • Client: {project.client} • Owner: {project.owner}
          </p>
        </div>
      </div>

      {/* Sub-Tabs Navigation */}
      <div className="tabs-nav">
        <NavLink
          to={`/projects/${projectId}`}
          end
          className={({ isActive }) => (isActive ? "tab-link active" : "tab-link")}
        >
          📋 Overview
        </NavLink>

        <NavLink
          to={`/projects/${projectId}/estimate`}
          className={({ isActive }) => (isActive ? "tab-link active" : "tab-link")}
        >
          💰 Estimate
        </NavLink>

        <NavLink
          to={`/projects/${projectId}/team`}
          className={({ isActive }) => (isActive ? "tab-link active" : "tab-link")}
        >
          👥 Team
        </NavLink>
      </div>

      {/* Nested Route Outlet (renders Overview, Estimate, or Team) */}
      <Outlet context={{ project }} />
    </div>
  );
}

export default ProjectDetail;
