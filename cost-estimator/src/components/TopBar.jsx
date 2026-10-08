import { useLocation } from "react-router-dom";

function TopBar({ user, onLogout, onToggleMenu }) {
  const location = useLocation();

  const getPageTitle = (pathname) => {
    if (pathname.startsWith("/dashboard")) return "📊 Dashboard";
    if (pathname === "/projects/new") return "➕ Create Project";
    if (pathname.startsWith("/projects/")) return "📁 Project Details";
    if (pathname.startsWith("/projects")) return "📁 Projects Directory";
    return "⚡ ProjectCRM";
  };

  return (
    <header className="topbar">
      {/* Left side: Hamburger button + Page Title + Status Badge */}
      <div className="topbar-left">
        {/* Mobile menu hamburger toggle button */}
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={onToggleMenu}
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>

        <div className="topbar-title">
          <span>{getPageTitle(location.pathname)}</span>
        </div>
        <div className="topbar-badge">
          <span className="status-dot"></span>
          <span>Workspace Active</span>
        </div>
      </div>

      {/* Right side: User Profile */}
      <div className="topbar-right">
        {user && (
          <div className="user-profile-chip">
            {/* User Avatar Circle with first letter */}
            <div className="user-avatar">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            
            {/* User name and role label */}
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-role">{user.role}</span>
            </div>

            {/* Logout button */}
            <button
              onClick={onLogout}
              className="btn-logout"
              title="Sign Out"
              aria-label="Sign Out"
            >
              🚪 Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default TopBar;
