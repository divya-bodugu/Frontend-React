import React from "react";
import "./ProjectCards.css";

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
    name: "Mobile App Development",
    client: "GreenLeaf Solutions",
    status: "In Progress",
    owner: "Meena",
    startDate: "2026-09-05",
    endDate: "2026-09-25",
    hours: 180,
    finalCost: 750000,
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
    finalCost: 900000,
  }
];


function formatCurrency(amount) {
  if (!amount) {
    return "Not estimated";
  }
  return "Rs " + amount.toLocaleString("en-IN");
}


function formatDate(date)
{
  return new Date(date).toLocaleDateString("en-GB");
}


function StatusBadge({ status }) 
{
  return <span>{status}</span>;
}


function ProjectCard({ project }) 
{
  return (
    <div className="project-card">
      <h3>{project.name}</h3>
      <p>Client: {project.client}</p>
      <p>Status: <StatusBadge status={project.status} /></p>
      <p>Owner: {project.owner}</p>
      <p>Date: {formatDate(project.startDate)} - {formatDate(project.endDate)}</p>
      <p>Hours: {project.hours}</p>
      <p>Cost: {formatCurrency(project.finalCost)}</p>
    </div>
  );
}


function App()
{
  return (
    <div>
      <h1>Projects</h1>
      <div className="project-container">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project}/>
        ))}
      </div>
    </div>
  );
}

export default App;