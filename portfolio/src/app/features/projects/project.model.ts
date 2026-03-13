export interface Project {
  id: string;
  title: string;
  titleEn?: string;
  shortDescription: string;
  shortDescriptionEn?: string;
  longDescription: string;
  longDescriptionEn?: string;
  techStack: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  thumbnail?: string;
}

