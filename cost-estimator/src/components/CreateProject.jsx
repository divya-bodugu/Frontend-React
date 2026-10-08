import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./CreateProject.css";

function CreateProject({ onAddProject }) {
  // Local state for each form field
  const [name, setName] = useState("");
  const [client, setClient] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  // useNavigate hook allows switching pages programmatically
  const navigate = useNavigate();

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Simple Validation: project name is required
    if (!name.trim()) {
      setError("Please provide a project name.");
      return;
    }

    // 2. Generate a unique project ID using uuid
    const newProject = {
      id: uuidv4(),
      name: name.trim(),
      client: client.trim() || "New Client",
      status: "In Progress",
      owner: "Divya",
      startDate: "2026-10-01",
      endDate: "2026-10-30",
      hours: 40,
      finalCost: 150000,
      description: description.trim() || "Brand new project created via CRM.",
      team: [{ name: "Divya", role: "Project Owner" }],
      estimateBreakdown: [
        { task: "Initial Setup & Requirements", hours: 20, rate: 1200 },
        { task: "MVP Implementation", hours: 20, rate: 1400 }
      ]
    };

    // 3. Add project to parent state
    onAddProject(newProject);

    // 4. Navigate directly to the estimate page of the new project
    navigate(`/projects/${newProject.id}/estimate`);
  };

  return (
    <div className="create-project-container">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>➕ Create New Project</h1>
          <p className="create-project-subtitle">
            Create a project and jump straight to its estimate breakdown.
          </p>
        </div>
        <Link to="/projects" className="btn-secondary">
          Cancel
        </Link>
      </div>

      {/* Form Card */}
      <div className="card">
        {error && <div className="create-project-error">⚠️ {error}</div>}

        <form onSubmit={handleSubmit} className="create-project-form">
          <div className="create-project-form-group">
            <label className="create-project-label">
              Project Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Mobile Banking App"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError("");
              }}
              className="search-input create-project-input"
            />
          </div>

          <div className="create-project-form-group">
            <label className="create-project-label">
              Client Name
            </label>
            <input
              type="text"
              placeholder="e.g. Apex Financial"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              className="search-input create-project-input"
            />
          </div>

          <div className="create-project-form-group">
            <label className="create-project-label">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Brief summary..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="search-input create-project-textarea"
            />
          </div>

          <div className="create-project-actions">
            <Link to="/projects" className="btn-secondary">
              Back to Projects
            </Link>
            <button type="submit" className="btn-primary">
              💾 Create Project & Go to Estimate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProject;
