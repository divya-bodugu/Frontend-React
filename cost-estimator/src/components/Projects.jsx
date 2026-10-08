/**
 * Projects Component
 * ------------------
 * What this does:
 * - Lists all projects with search filtering and pagination.
 * - Uses React Router's `useSearchParams()` to store search query `?q=...`
 *   and current page `?page=...` in the browser URL.
 * - This allows users to bookmark or share a search URL!
 * 
 * Props:
 * - projects: Array of all project objects
 */

import { useSearchParams, Link } from "react-router-dom";
import "./Projects.css";

function Projects({ projects }) {
  // Step 1: Read URL search parameters (like "?q=banking&page=1")
  const [params, setParams] = useSearchParams();
  const searchKeyword = params.get("q") ?? "";
  const pageFromUrl = Number(params.get("page") ?? 1);

  // Step 2: Filter projects based on project name, ID, or client name
  const filteredProjects = projects.filter((project) => {
    const query = searchKeyword.toLowerCase();
    const matchesName = project.name.toLowerCase().includes(query);
    const matchesId = project.id.toLowerCase().includes(query);
    const matchesClient = project.client && project.client.toLowerCase().includes(query);
    return matchesName || matchesId || matchesClient;
  });

  // Step 3: Pagination calculations (3 projects per page)
  const pageSize = 3;
  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / pageSize));
  const currentPage = Math.min(Math.max(1, pageFromUrl), totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + pageSize);

  // Handler for typing in the search box
  const handleSearchChange = (e) => {
    const newQuery = e.target.value;
    const newParams = new URLSearchParams(params);
    if (newQuery) {
      newParams.set("q", newQuery);
    } else {
      newParams.delete("q");
    }
    newParams.set("page", "1"); // Reset to page 1 on new search
    setParams(newParams);
  };

  // Handler for switching pages
  const handlePageChange = (newPage) => {
    const newParams = new URLSearchParams(params);
    newParams.set("page", String(newPage));
    setParams(newParams);
  };

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1>📁 Projects</h1>
          <p className="projects-subtitle">
            Search and manage company projects.
          </p>
        </div>
        <Link to="/projects/new" className="btn-primary">
          ➕ Create Project
        </Link>
      </div>

      {/* Search Input Box */}
      <div className="card projects-search-card">
        <div className="search-bar projects-search-bar">
          <input
            type="text"
            placeholder="Search by project name, ID, or client..."
            value={searchKeyword}
            onChange={handleSearchChange}
            className="search-input projects-search-input"
          />
        </div>
      </div>

      {/* Display Projects or Empty State */}
      {paginatedProjects.length === 0 ? (
        <div className="card projects-empty-state">
          <p className="projects-empty-text">
            No projects found matching "{searchKeyword}".
          </p>
          <button
            onClick={() => setParams({})}
            className="btn-secondary projects-clear-btn"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="projects-list">
          {paginatedProjects.map((project) => (
            <div
              key={project.id}
              className="card projects-list-item"
            >
              <div>
                <div className="projects-item-title-row">
                  <h3 className="projects-item-title">{project.name}</h3>
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
                <div className="projects-item-meta">
                  Project ID: <strong>{project.id}</strong> • Client: {project.client} • Owner: {project.owner} • Hours: {project.hours} hrs
                </div>
              </div>

              {/* Action Buttons */}
              <div className="projects-item-actions">
                <Link to={`/projects/${project.id}`} className="btn-secondary">
                  View Details
                </Link>
                <Link to={`/projects/${project.id}/estimate`} className="btn-primary">
                  Open Project
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="btn-secondary pagination-btn"
            disabled={currentPage <= 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            ← Previous
          </button>
          <span className="pagination-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn-secondary pagination-btn"
            disabled={currentPage >= totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

export default Projects;
