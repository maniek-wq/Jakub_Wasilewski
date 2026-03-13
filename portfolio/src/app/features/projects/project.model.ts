export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  techStack: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  thumbnail?: string;
}

