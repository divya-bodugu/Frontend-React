import "./ProjectCards.css";

// 1. Sample Projects Data
const projects = [
  {
    id: 1,
    name: "Online Grocery Store",
    client: "Daily Basket",
    status: "Completed",
    owner: "Divya",
    startDate: "2026-09-01",
    endDate: "2026-09-15",
    hours: 120,
    finalCost: 530332,
  },
  {
    id: 2,
    name: "FinTech Banking App",
    client: "GreenLeaf Solutions",
    status: "In Progress",
    owner: "Meena",
    startDate: "2026-09-05",
    endDate: "2026-09-25",
    hours: 180,
    finalCost: 0,
  },
  {
    id: 3,
    name: "E-commerce Project",
    client: "Fashion Hub Pvt Ltd",
    status: "Pending",
    owner: "Venkat",
    startDate: "2026-09-10",
    endDate: "2026-09-30",
    hours: 100,
    finalCost: 485000,
  },
  {
    id: 4,
    name: "Cloud Migration",
    client: "Apex Tech",
    status: "Review",
    startDate: "2026-08-01",
    endDate: "2026-08-20",
    hours: 80,
    finalCost: undefined,
  },
  {
    id: 5,
    name: "Healthcare Portal",
    client: "CarePlus Hospitals",
    status: "In Progress",
    owner: "Chandana",
    startDate: "2026-09-12",
    endDate: "2026-10-10",
    hours: 150,
    finalCost: 640000,
  },
  {
    id: 6,
    name: "Smart Inventory Tracker",
    client: "LogiTech Systems",
    status: "Completed",
    owner: "Mounika",
    startDate: "2026-08-15",
    endDate: "2026-09-18",
    hours: 135,
    finalCost: null,
  },
];

// Formats number into Indian currency"
function formatCurrency(amount) {
  if (!amount || Number(amount) <= 0) {
    return "Not estimated";
  }

  return "Rs " + Number(amount).toLocaleString("en-IN");
}

// Formats date into "01 Sep 2026"
function formatDate(dateString) {
  if (!dateString) {
    return "N/A";
  }

  return new Date(dateString)
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .replace("Sept", "Sep");
}

// 3. StatusBadge Component
function StatusBadge({ status }) {
  const currentStatus = status ?? "Unknown";
  // Creates CSS class: status-completed, status-in-progress, status-pending, etc.
  const statusClass = currentStatus.toLowerCase().replace(/\s+/g, "-");

  return (
    <span className={`status-badge status-${statusClass}`}>
      {currentStatus}
    </span>
  );
}

// 4. ProjectCard Component
function ProjectCard({ project, onSelect }) {
  const {
    name,
    client,
    status,
    owner,
    startDate,
    endDate,
    hours,
    finalCost,
  } = project;

  // Named condition
  const hasEstimate = Number(finalCost) > 0;

  return (
    <div className="project-card">
      {/* Header: Name and Status justified */}
      <div className="card-header">
        <h3
          className={`project-title ${onSelect ? "clickable-title" : ""}`}
          onClick={() => onSelect && onSelect(project)}
          title={onSelect ? "Click to view project details" : ""}
        >
          {name}
        </h3>
        <StatusBadge status={status} />
      </div>

      {/* Body: Key-value rows justified across the card */}
      <div className="card-body">
        <div className="card-row">
          <span className="label">Client</span>
          <span className="value">{client}</span>
        </div>

        <div className="card-row">
          <span className="label">Owner</span>
          <span className="value">{owner}</span>
        </div>

        <div className="card-row">
          <span className="label">Date Range</span>
          <span className="value">
            {formatDate(startDate)} – {formatDate(endDate)}
          </span>
        </div>

        <div className="card-row">
          <span className="label">Total Hours</span>
          <span className="value">{hours} hrs</span>
        </div>
      </div>

      {/* Footer: Estimated Cost justified */}
      <div className="card-cost">
        <span className="label">Estimated Cost</span>
        <span className={hasEstimate ? "cost-value" : "cost-value not-estimated"}>
          {formatCurrency(finalCost)}
        </span>
      </div>
    </div>
  );
}

// 5. App Component
function App() {
  return (
    <div className="app-container">
      <h1 className="page-heading">Projects</h1>

      <div className="project-container">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

export { ProjectCard };
export default App;