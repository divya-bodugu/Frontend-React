import { Link } from "react-router-dom";
import "./ProjectNotFound.css";

function ProjectNotFound({ projectId }) {
  return (
    <div className="error-box">
      <h2>⚠️ Project Not Found</h2>
      <p className="project-notfound-text">
        No project exists with the ID: <strong className="project-notfound-id">"{projectId}"</strong>.
      </p>
      <div className="project-notfound-actions">
        <Link to="/projects" className="btn-primary">
          📁 View All Projects
        </Link>
        <Link to="/dashboard" className="btn-secondary">
          📊 Go to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default ProjectNotFound;
