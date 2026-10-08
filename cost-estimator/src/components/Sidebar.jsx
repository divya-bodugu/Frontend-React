import { NavLink } from "react-router-dom";

function Sidebar({ user, onLogout, isOpen, onClose }) {
  // Helper to close drawer when a nav link is clicked on mobile
  const handleNavClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      {/* Brand Logo & Mobile Close Button */}
      <div className="sidebar-brand">
        <h2>⚡ ProjectCRM</h2>
        <button
          type="button"
          className="sidebar-close-btn"
          onClick={onClose}
          aria-label="Close sidebar menu"
        >
          ✕
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav">
        <NavLink
          to="/dashboard"
          onClick={handleNavClick}
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          📊 Dashboard
        </NavLink>

        <NavLink
          to="/projects"
          onClick={handleNavClick}
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          📁 Projects
        </NavLink>

        <NavLink
          to="/projects/new"
          onClick={handleNavClick}
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          ➕ New Project
        </NavLink>
      </nav>

      {/* Footer area showing current signed-in user */}
      {user && (
        <div className="sidebar-footer">
          <div className="sidebar-user-label">Signed in as:</div>
          <div className="sidebar-user-name">
            {user.name} ({user.role})
          </div>
          <button
            onClick={() => {
              handleNavClick();
              onLogout();
            }}
            className="btn-secondary sidebar-logout-btn"
          >
            🚪 Sign Out
          </button>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
