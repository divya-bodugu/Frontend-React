import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

function AppLayout({ user, onLogout }) {
  // Mobile drawer state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={`app-layout ${isMobileMenuOpen ? "menu-open" : ""}`}>
      {/* Semi-transparent dark overlay on mobile when sidebar drawer is open */}
      {isMobileMenuOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeMobileMenu}
          aria-label="Close menu overlay"
        />
      )}

      {/* 1. Left Sidebar Navigation */}
      <Sidebar
        user={user}
        onLogout={onLogout}
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
      />

      {/* 2. Main Content Wrapper */}
      <div className="main-wrapper">
        {/* Top Header Bar with mobile toggle */}
        <TopBar
          user={user}
          onLogout={onLogout}
          onToggleMenu={toggleMobileMenu}
        />

        {/* Dynamic page content rendered by React Router */}
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
