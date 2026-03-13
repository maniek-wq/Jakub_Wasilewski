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
  /** Ścieżka do wideo podglądu – widok desktopowy */
  previewVideoDesktop?: string;
  /** Ścieżka do wideo podglądu – widok mobilny */
  previewVideoMobile?: string;
  /** Ścieżka do wideo podglądu – panel admina */
  previewVideoAdmin?: string;
  /** Ścieżka do zrzutu ekranu strony głównej (jak podgląd na Vercel) */
  previewImage?: string;
}

