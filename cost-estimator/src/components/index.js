// 1. Navigation & Layout Structure
export { default as TopBar } from "./TopBar";
export { default as Sidebar } from "./Sidebar";
export { default as AppLayout } from "./AppLayout";
export { default as ProtectedRoute } from "./ProtectedRoute";

// 2. Main Pages
export { default as Dashboard } from "./Dashboard";
export { default as Projects } from "./Projects";
export { default as CreateProject } from "./CreateProject";
export { default as Login } from "./Login";
export { default as NotFound } from "./NotFound";
export { default as ProjectNotFound } from "./ProjectNotFound";

// 3. Project Detail Tabs (Nested Sub-routes)
export { default as ProjectDetail } from "./ProjectDetail";
export { default as Overview } from "./Overview";
export { default as Estimate } from "./Estimate";
export { default as Team } from "./Team";

// 4. Sample Data & Helper Utilities
export {
  initialProjects,
  findProject,
  formatCurrency,
  formatDate
} from "./projectData";
