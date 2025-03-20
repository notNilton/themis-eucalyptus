export interface Task {
  id: number;
  name: string;
  duration: number;
  startDate: string;
  endDate: string;
  status: "pending" | "in-progress" | "completed";
  completionPercentage: number;
  dependencies?: number[];
}

export interface GanttProject {
  id: number;
  owner: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  tasks: Task[]; // Mudança aqui: tasks é agora um array de Task
}


export const projectData: GanttProject[] = [
  {
    id: 1,
    owner: "Alice Johnson",
    name: "Website Redesign",
    description: "A complete redesign of the company's main website, improving UX and performance.",
    startDate: "2025-04-01",
    endDate: "2025-06-30",
    tasks: [
      { id: 1, name: "Research & Planning", duration: 10, startDate: "2025-04-01", endDate: "2025-04-10", status: "completed", completionPercentage: 100 },
      { id: 2, name: "Wireframing", duration: 7, startDate: "2025-04-11", endDate: "2025-04-17", status: "completed", completionPercentage: 100, dependencies: [1] },
      { id: 3, name: "UI Design", duration: 14, startDate: "2025-04-18", endDate: "2025-05-01", status: "in-progress", completionPercentage: 50, dependencies: [2] },
      { id: 4, name: "Development", duration: 30, startDate: "2025-05-02", endDate: "2025-06-01", status: "pending", completionPercentage: 0, dependencies: [3] },
      { id: 5, name: "Testing & Deployment", duration: 15, startDate: "2025-06-02", endDate: "2025-06-17", status: "pending", completionPercentage: 0, dependencies: [4] },
    ],
  },
  {
    id: 2,
    owner: "Carlos Mendes",
    name: "Mobile App Development",
    description: "Building a cross-platform mobile application for e-commerce.",
    startDate: "2025-05-01",
    endDate: "2025-08-31",
    tasks: [
      { id: 6, name: "Requirement Analysis", duration: 14, startDate: "2025-05-01", endDate: "2025-05-14", status: "completed", completionPercentage: 100 },
      { id: 7, name: "UI/UX Design", duration: 21, startDate: "2025-05-15", endDate: "2025-06-04", status: "in-progress", completionPercentage: 30, dependencies: [6] },
      { id: 8, name: "Backend Development", duration: 45, startDate: "2025-06-05", endDate: "2025-07-19", status: "pending", completionPercentage: 0, dependencies: [7] },
      { id: 9, name: "Frontend Development", duration: 40, startDate: "2025-06-20", endDate: "2025-07-30", status: "pending", completionPercentage: 0, dependencies: [7] },
      { id: 10, name: "Testing & Launch", duration: 30, startDate: "2025-08-01", endDate: "2025-08-31", status: "pending", completionPercentage: 0, dependencies: [8, 9] },
    ],
  },
];
