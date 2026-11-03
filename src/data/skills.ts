import type { ComponentType } from "react";
import { MonitorSmartphone } from "lucide-react";
import {
  SiCss,
  SiExpress,
  SiFramer,
  SiGit,
  SiGithub,
  SiGitlab,
  SiGreensock,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiNestjs,
  SiNextdotjs,
  SiNpm,
  SiOpenapiinitiative,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiReact,
  SiRedis,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
  SiVitest,
} from "react-icons/si";

export type SkillCategory =
  | "Frontend Development"
  | "Backend & APIs"
  | "Tools & Others";

export type Skill = {
  category: SkillCategory;
  icon: ComponentType<{ className?: string }>;
  id: string;
  name: string;
};

export const skills: Skill[] = [
  { id: "react", name: "React.js", category: "Frontend Development", icon: SiReact },
  { id: "next", name: "Next.js", category: "Frontend Development", icon: SiNextdotjs },
  { id: "javascript", name: "JavaScript", category: "Frontend Development", icon: SiJavascript },
  { id: "typescript", name: "TypeScript", category: "Frontend Development", icon: SiTypescript },
  { id: "html", name: "HTML5", category: "Frontend Development", icon: SiHtml5 },
  { id: "tailwind", name: "Tailwind CSS", category: "Frontend Development", icon: SiTailwindcss },
  { id: "css", name: "CSS", category: "Frontend Development", icon: SiCss },
  { id: "redux-toolkit", name: "Redux Toolkit", category: "Frontend Development", icon: SiRedux },
  { id: "react-native", name: "React Native", category: "Frontend Development", icon: SiReact },
  { id: "gsap", name: "GSAP", category: "Frontend Development", icon: SiGreensock },
  { id: "framer-motion", name: "Framer Motion", category: "Frontend Development", icon: SiFramer },
  { id: "nestjs", name: "NestJS", category: "Backend & APIs", icon: SiNestjs },
  { id: "express", name: "Express.js", category: "Backend & APIs", icon: SiExpress },
  { id: "rest-api", name: "REST API", category: "Backend & APIs", icon: SiOpenapiinitiative },
  { id: "prisma", name: "Prisma", category: "Backend & APIs", icon: SiPrisma },
  { id: "postgresql", name: "PostgreSQL", category: "Backend & APIs", icon: SiPostgresql },
  { id: "redis", name: "Redis", category: "Backend & APIs", icon: SiRedis },
  { id: "jwt", name: "JWT", category: "Backend & APIs", icon: SiJsonwebtokens },
  { id: "git", name: "Git", category: "Tools & Others", icon: SiGit },
  { id: "gitlab", name: "GitLab", category: "Tools & Others", icon: SiGitlab },
  { id: "github", name: "GitHub", category: "Tools & Others", icon: SiGithub },
  { id: "postman", name: "Postman", category: "Tools & Others", icon: SiPostman },
  { id: "npm", name: "npm", category: "Tools & Others", icon: SiNpm },
  { id: "vitest", name: "Vitest", category: "Tools & Others", icon: SiVitest },
  { id: "vercel", name: "Vercel", category: "Tools & Others", icon: SiVercel },
  { id: "responsive-design", name: "Responsive Design", category: "Tools & Others", icon: MonitorSmartphone },
  { id: "vite", name: "Vite", category: "Tools & Others", icon: SiVite },
];
