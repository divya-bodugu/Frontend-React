/**
 * Team Component (Project Sub-tab)
 * --------------------------------
 * What this does:
 * - Shows all team members assigned to the project.
 * - Displays a circular avatar with their first initial, their name, and their project role.
 * 
 * Props:
 * - projects: Array of all projects
 */

import { useParams } from "react-router-dom";
import { findProject } from "./projectData";
import "./Team.css";

function Team({ projects }) {
  const { projectId } = useParams();
  const project = findProject(projects, projectId);

  if (!project) return null;

  const team = project.team || [];

  return (
    <div className="card">
      <h3 className="team-heading">👥 Assigned Team Members</h3>

      {/* Grid of Team Member Cards */}
      <div className="team-grid">
        {team.map((member, idx) => (
          <div key={idx} className="team-card">
            {/* Circular Avatar with Initial */}
            <div className="team-avatar">
              {member.name.charAt(0)}
            </div>

            {/* Member Details */}
            <div>
              <strong className="team-member-name">{member.name}</strong>
              <span className="team-member-role">{member.role}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Team;
