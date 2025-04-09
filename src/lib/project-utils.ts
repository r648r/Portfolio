import projectsData from '../../public/data/projects.json';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: "Red Team" | "Blue Team" | "DevSecOps";
  tags: string[];
  techStack: string[];
  features: string[];
  link: string;
}

export const getAllProjects = (): Project[] => {
  return projectsData.projects as Project[];
};

export const getProjectsByCategory = (category: "Red Team" | "Blue Team" | "DevSecOps"): Project[] => {
  return getAllProjects().filter(project => project.category === category);
};

export const getCategoryCount = () => {
  const allProjects = getAllProjects();
  return {
    all: allProjects.length,
    redTeam: allProjects.filter(p => p.category === "Red Team").length,
    blueTeam: allProjects.filter(p => p.category === "Blue Team").length,
    devSecOps: allProjects.filter(p => p.category === "DevSecOps").length
  };
};
