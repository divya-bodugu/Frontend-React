/**
 * Estimate Component (Project Sub-tab)
 * ------------------------------------
 * What this does:
 * - Displays a cost & effort calculation table for the project.
 * - Shows each deliverable task, estimated hours, and hourly rate.
 * - Automatically calculates:
 *     - Subtotal for each row: (hours * rate)
 *     - Total budget: sum of all subtotals
 * - Formats currency cleanly in Indian Rupees (₹).
 * 
 * Props:
 * - projects: Array of all projects
 */

import { useParams } from "react-router-dom";
import { findProject, formatCurrency } from "./projectData";
import "./Estimate.css";

function Estimate({ projects }) {
  const { projectId } = useParams();
  const project = findProject(projects, projectId);

  if (!project) return null;

  // Extract task list
  const items = project.estimateBreakdown || [];

  // Calculate grand total cost
  const totalCost = items.reduce((acc, curr) => acc + curr.hours * curr.rate, 0);

  return (
    <div className="card">
      {/* Title & Grand Total */}
      <div className="estimate-header">
        <h3>💰 Cost & Effort Breakdown</h3>
        <span className="estimate-total">
          Total: {formatCurrency(totalCost || project.finalCost)}
        </span>
      </div>

      {/* Responsive Table Wrapper */}
      <div className="table-responsive">
        <table className="estimate-table">
          <thead>
            <tr className="estimate-thead-row">
              <th className="estimate-th">Deliverable / Task</th>
              <th className="estimate-th">Hours</th>
              <th className="estimate-th">Hourly Rate</th>
              <th className="estimate-th-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx} className="estimate-row">
                <td className="estimate-td-task">{item.task}</td>
                <td className="estimate-td-muted">{item.hours} hrs</td>
                <td className="estimate-td-muted">₹{item.rate}/hr</td>
                <td className="estimate-td-subtotal">
                  ₹{(item.hours * item.rate).toLocaleString("en-IN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Estimate;
