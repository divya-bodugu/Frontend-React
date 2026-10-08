/**
 * Overview Component (Project Sub-tab)
 * ------------------------------------
 * What this does:
 * - Shows the description, client, project owner, duration dates, and total hours.
 * 
 * Props:
 * - projects: Array of all projects
 */

import { useParams } from "react-router-dom";
import { findProject, formatDate } from "./projectData";
import "./Overview.css";

function Overview({ projects }) {
  const { projectId } = useParams();
  const project = findProject(projects, projectId);

  if (!project) return null;

  return (
    <div className="card">
      <h3 className="overview-heading">📋 Project Overview</h3>
      <p className="overview-description">
        {project.description}
      </p>

      {/* Grid of Key Info */}
      <div className="overview-grid">
        <div>
          <span className="overview-label">Client</span>
          <p className="overview-value">{project.client}</p>
        </div>
        <div>
          <span className="overview-label">Project Lead</span>
          <p className="overview-value">{project.owner}</p>
        </div>
        <div>
          <span className="overview-label">Duration</span>
          <p className="overview-value">
            {formatDate(project.startDate)} – {formatDate(project.endDate)}
          </p>
        </div>
        <div>
          <span className="overview-label">Total Hours</span>
          <p className="overview-value overview-value-accent">
            {project.hours} hrs
          </p>
        </div>
      </div>
    </div>
  );
}

export default Overview;
