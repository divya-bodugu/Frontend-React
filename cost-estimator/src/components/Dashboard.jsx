import { Link } from "react-router-dom";
import { formatCurrency, formatDate } from "./projectData";
import "./Dashboard.css";

function Dashboard({ projects }) {
  // Step 1: Calculate metrics using simple array methods
  const total = projects.length;
  const inProgress = projects.filter((p) => p.status === "In Progress").length;
  const completed = projects.filter((p) => p.status === "Completed").length;

  return (
    <div className="dashboard-container">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1>📊 CRM Dashboard</h1>
          <p className="dashboard-subtitle">
            Overview of your active client projects and quick metrics.
          </p>
        </div>
        <Link to="/projects/new" className="btn-primary">
          ➕ New Project
        </Link>
      </div>

      {/* Metrics Row (3 Summary Cards) */}
      <div className="dashboard-metrics-grid">
        <div className="card dashboard-metric-card">
          <span className="dashboard-metric-label">Total Projects</span>
          <h2 className="dashboard-metric-value total">{total}</h2>
        </div>
        <div className="card dashboard-metric-card">
          <span className="dashboard-metric-label">In Progress</span>
          <h2 className="dashboard-metric-value in-progress">{inProgress}</h2>
        </div>
        <div className="card dashboard-metric-card">
          <span className="dashboard-metric-label">Completed</span>
          <h2 className="dashboard-metric-value completed">{completed}</h2>
        </div>
      </div>

      {/* Project Cards Section */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h3>🗂️ Project Cards</h3>
          <span className="dashboard-section-hint">
            Click any card to open its project details
          </span>
        </div>

        <div className="dashboard-cards-grid">
          {projects.map((project) => (
            <div
              key={project.id}
              className="card dashboard-project-card"
            >
              {/* Card Header (Project Title & Status Badge) */}
              <div className="dashboard-card-top">
                <div>
                  <h3 className="dashboard-card-title">{project.name}</h3>
                  <span className="dashboard-card-id">
                    ID: {project.id}
                  </span>
                </div>
                <span
                  className={`badge ${
                    project.status === "Completed"
                      ? "badge-completed"
                      : project.status === "In Progress"
                      ? "badge-in-progress"
                      : "badge-pending"
                  }`}
                >
                  {project.status}
                </span>
              </div>

              {/* Card Body Details */}
              <div className="dashboard-card-body">
                <div className="dashboard-card-row">
                  <span className="dashboard-card-label">Client</span>
                  <span className="dashboard-card-val">{project.client}</span>
                </div>
                <div className="dashboard-card-row">
                  <span className="dashboard-card-label">Owner</span>
                  <span className="dashboard-card-val">{project.owner}</span>
                </div>
                <div className="dashboard-card-row">
                  <span className="dashboard-card-label">Duration</span>
                  <span className="dashboard-card-val-muted">
                    {formatDate(project.startDate)} – {formatDate(project.endDate)}
                  </span>
                </div>
                <div className="dashboard-card-row">
                  <span className="dashboard-card-label">Total Hours</span>
                  <span className="dashboard-card-val">{project.hours} hrs</span>
                </div>
                <div className="dashboard-card-row-cost">
                  <span className="dashboard-card-label">Estimated Cost</span>
                  <span className="dashboard-card-val-cost">
                    {formatCurrency(project.finalCost)}
                  </span>
                </div>
              </div>

              {/* Action Buttons to navigate to details */}
              <div className="dashboard-card-actions">
                <Link
                  to={`/projects/${project.id}`}
                  className="btn-secondary dashboard-card-btn"
                >
                  Overview
                </Link>
                <Link
                  to={`/projects/${project.id}/estimate`}
                  className="btn-primary dashboard-card-btn"
                >
                  Estimate
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
