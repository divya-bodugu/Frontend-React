export function findProject(projects, id) {
  if (!id) return null;
  return projects.find(
    (p) =>
      p.id === id ||
      String(p.numericId) === id ||
      `p${p.numericId}` === id
  );
}

export function formatCurrency(amount) {
  if (!amount || Number(amount) <= 0) return "Not estimated";
  return "₹" + Number(amount).toLocaleString("en-IN");
}

export function formatDate(dateStr) {
  if (!dateStr) return "N/A";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

export const initialProjects = [
  {
    id: "p1",
    numericId: 1,
    name: "Online Grocery Store",
    client: "Daily Basket",
    status: "Completed",
    owner: "Divya",
    startDate: "2026-09-01",
    endDate: "2026-09-15",
    hours: 120,
    finalCost: 530332,
    description: "Online Grocery Store for Daily Basket. Managed by Divya.",
    team: [
      { name: "Divya", role: "Project Lead" },
      { name: "Meena", role: "Frontend Developer" },
      { name: "Venkat", role: "Backend Developer" }
    ],
    estimateBreakdown: [
      { task: "UI Design & Requirements", hours: 36, rate: 1200 },
      { task: "Core Implementation", hours: 60, rate: 1400 },
      { task: "Testing & Deployment", hours: 24, rate: 1000 }
    ]
  },
  {
    id: "p2",
    numericId: 2,
    name: "FinTech Banking App",
    client: "GreenLeaf Solutions",
    status: "In Progress",
    owner: "Meena",
    startDate: "2026-09-05",
    endDate: "2026-09-25",
    hours: 180,
    finalCost: 240000,
    description: "FinTech Banking App for GreenLeaf Solutions. Managed by Meena.",
    team: [
      { name: "Meena", role: "Project Lead" },
      { name: "Venkat", role: "Backend Developer" },
      { name: "Chandana", role: "Security Auditor" }
    ],
    estimateBreakdown: [
      { task: "UI Design & Requirements", hours: 54, rate: 1200 },
      { task: "Core Implementation", hours: 90, rate: 1400 },
      { task: "Testing & Deployment", hours: 36, rate: 1000 }
    ]
  },
  {
    id: "p3",
    numericId: 3,
    name: "E-commerce Project",
    client: "Fashion Hub Pvt Ltd",
    status: "Pending",
    owner: "Venkat",
    startDate: "2026-09-10",
    endDate: "2026-09-30",
    hours: 100,
    finalCost: 130000,
    description: "E-commerce Project for Fashion Hub Pvt Ltd. Managed by Venkat.",
    team: [
      { name: "Venkat", role: "Project Lead" },
      { name: "Mounika", role: "UI/UX Designer" }
    ],
    estimateBreakdown: [
      { task: "UI Design & Requirements", hours: 30, rate: 1200 },
      { task: "Core Implementation", hours: 50, rate: 1400 },
      { task: "Testing & Deployment", hours: 20, rate: 1000 }
    ]
  },
  {
    id: "p4",
    numericId: 4,
    name: "Cloud Migration",
    client: "Apex Tech",
    status: "Review",
    owner: "Govind",
    startDate: "2026-08-01",
    endDate: "2026-08-20",
    hours: 80,
    finalCost: 105000,
    description: "Cloud Migration for Apex Tech. Managed by Govind.",
    team: [
      { name: "Govind", role: "DevOps Engineer" },
      { name: "Venkat", role: "Systems Architect" }
    ],
    estimateBreakdown: [
      { task: "Architecture & Planning", hours: 24, rate: 1200 },
      { task: "Migration & Scripting", hours: 40, rate: 1400 },
      { task: "Post-Migration Verification", hours: 16, rate: 1000 }
    ]
  },
  {
    id: "p5",
    numericId: 5,
    name: "Healthcare Portal",
    client: "CarePlus Hospitals",
    status: "In Progress",
    owner: "Chandana",
    startDate: "2026-09-12",
    endDate: "2026-10-10",
    hours: 150,
    finalCost: 640000,
    description: "Healthcare Portal for CarePlus Hospitals. Managed by Chandana.",
    team: [
      { name: "Chandana", role: "Project Lead" },
      { name: "Divya", role: "Frontend Lead" },
      { name: "Meena", role: "QA Engineer" }
    ],
    estimateBreakdown: [
      { task: "UI Design & Requirements", hours: 45, rate: 1200 },
      { task: "Core Implementation", hours: 75, rate: 1400 },
      { task: "Testing & Deployment", hours: 30, rate: 1000 }
    ]
  },
  {
    id: "p6",
    numericId: 6,
    name: "Smart Inventory Tracker",
    client: "LogiTech Systems",
    status: "Completed",
    owner: "Mounika",
    startDate: "2026-08-15",
    endDate: "2026-09-18",
    hours: 135,
    finalCost: 485000,
    description: "Smart Inventory Tracker for LogiTech Systems. Managed by Mounika.",
    team: [
      { name: "Mounika", role: "Project Lead" },
      { name: "Venkat", role: "Full Stack Engineer" }
    ],
    estimateBreakdown: [
      { task: "UI Design & Requirements", hours: 40, rate: 1200 },
      { task: "Core Implementation", hours: 68, rate: 1400 },
      { task: "Testing & Deployment", hours: 27, rate: 1000 }
    ]
  }
];
