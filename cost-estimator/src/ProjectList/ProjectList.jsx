import { useState, useEffect } from "react";
import { getProjects, getUsers } from "../services/projectService";
import { ProjectCard } from "../ProjectCards/ProjectCards";
import "./ProjectList.css";

const skeletonEntries = [
  "skeleton-card-1",
  "skeleton-card-2",
  "skeleton-card-3",
  "skeleton-card-4",
  "skeleton-card-5",
  "skeleton-card-6",
];
const skeletonRowEntries = ["client", "owner", "dates", "hours"];

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State to track which project is currently selected for single-card view
  const [selectedProject, setSelectedProject] = useState(null);

  // 2. Fetch projects and users using useEffect
  useEffect(() => {
    // Only run fetch if isLoading is true
    if (!isLoading) {
      return;
    }

    // AbortController allows us to cancel the fetch if the user leaves the page
    const controller = new AbortController();

    async function loadData() {
      try {
        setError(null);

        // Fetch projects and users in parallel using Promise.all
        const [projectsData, usersData] = await Promise.all([
          getProjects(controller.signal),
          getUsers(controller.signal),
        ]);

        // Build a user lookup map: id -> name
        const userLookup = {};
        usersData.forEach((user) => {
          userLookup[user.id] = user.name;
        });

        // Resolve owner name for each project
        const projectsWithOwner = projectsData.map((project) => ({
          ...project,
          owner: userLookup[project.ownerId] || "Unknown",
        }));

        // Only update state if request was not aborted
        if (!controller.signal.aborted) {
          setProjects(projectsWithOwner);
        }
      } catch (err) {
        // Ignore AbortError when unmounting
        if (err.name === "AbortError" || controller.signal.aborted) {
          return;
        }
        setError(err.message || "Failed to load projects. Please try again.");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadData();

    // Cleanup function: runs if component unmounts while fetching
    return () => {
      controller.abort();
    };
  }, [isLoading]);

  // Try again button handler
  function handleRetry() {
    setError(null);
    setIsLoading(true); // Setting isLoading to true triggers the useEffect again
  }

  // 3. Conditional Rendering (Single project view, Loading, Error, Empty, or List)
  return (
    <div className="project-list-page">
      <h1 className="page-title">Projects</h1>

      {/* SINGLE PROJECT VIEW: Displays when a user clicks on a project name */}
      {selectedProject ? (
        <div className="single-project-view">
          <button
            className="back-button"
            onClick={() => setSelectedProject(null)}
          >
            ← Back to all projects
          </button>

          <div className="single-card-wrapper">
            <ProjectCard project={selectedProject} />
          </div>
        </div>
      ) : isLoading ? (
        /* LOADING SKELETON STATE FOR ALL PROJECT CARDS */
        <div className="skeleton-container">
          {skeletonEntries.map((cardEntry) => (
            <div key={cardEntry} className="skeleton-card">
              <div className="skeleton-line skeleton-title"></div>
              {skeletonRowEntries.map((rowEntry) => (
                <div key={rowEntry} className="skeleton-line"></div>
              ))}
              <div className="skeleton-line skeleton-cost"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        /* ERROR STATE WITH WORKING TRY AGAIN BUTTON */
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button className="retry-button" onClick={handleRetry}>
            Try again
          </button>
        </div>
      ) : projects.length === 0 ? (
        /* EMPTY STATE WITH HELPFUL NEXT STEPS */
        <div className="empty-container">
          <p className="empty-message">No projects found.</p>
          <p className="empty-subtext">
            There are currently no projects in the system. Check back later or create a new project.
          </p>
        </div>
      ) : (
        /* SUCCESS STATE: Render all ProjectCards */
        <div className="project-container">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={setSelectedProject}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export { ProjectList };
export default ProjectList;
