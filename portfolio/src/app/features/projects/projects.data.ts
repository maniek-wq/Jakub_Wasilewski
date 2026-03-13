import type { Project } from './project.model';

export const PROJECTS: Project[] = [
  {
    id: 'etrainee',
    title: 'etrainee – platforma szkoleniowa',
    titleEn: 'etrainee – training platform',
    shortDescription:
      'Rozbudowana platforma e‑learningowa do zarządzania procesem szkoleń, rezerwacjami i komunikacją z kursantami.',
    shortDescriptionEn:
      'A comprehensive e‑learning platform for managing training processes, bookings and communication with trainees.',
    longDescription:
      'System łączy panel administracyjny, panel trenera i widok kursanta. Umożliwia zarządzanie ofertą szkoleń, harmonogramami, listami uczestników, płatnościami oraz automatyczną komunikacją e‑mail i powiadomieniami web‑push. Frontend działa jako PWA w Angularze, backend w Node.js komunikuje się z bazą MongoDB i zewnętrznymi usługami (np. wysyłka e‑mail, analityka).',
    techStack: [
      'Angular',
      'Node.js',
      'Tailwind CSS',
      'MongoDB',
      'Docker',
      'GitHub',
      'Render',
      'Vercel',
      'PWA',
      'Web Push',
    ],
    githubUrl: '',
    liveDemoUrl: 'https://etrainee.pl',
  },
  {
    id: 'dls-system',
    title: 'Driver Logistics System – system grafików transportu',
    titleEn: 'Driver Logistics System – transport scheduling system',
    shortDescription:
      'Specjalistyczny system webowy do planowania grafików kierowców i pojazdów dla firmy transportowej (aplikacja wewnętrzna, bez publicznego podglądu).',
    shortDescriptionEn:
      'A specialised internal web system for planning driver and vehicle schedules for a transport company (private, not publicly accessible).',
    longDescription:
      'Aplikacja zaprojektowana dla firmy transportowej do codziennego zarządzania dostępnością kierowców i pojazdów. Obejmuje wielowymiarowy grafik, moduły do zarządzania zmianami, powiadomienia web‑push, komunikację w grupach oraz panel administracyjny z uprawnieniami. Backend w Node.js/Express wykorzystuje MongoDB, Socket.io i Web Push, a frontend w Angularze działa jako PWA hostowana w środowisku kontenerowym (Docker, Render/Vercel).',
    techStack: [
      'Angular',
      'Node.js',
      'Tailwind CSS',
      'MongoDB',
      'Socket.io',
      'Web Push',
      'Docker',
      'GitHub',
      'Render',
      'PWA',
    ],
    githubUrl: '',
    liveDemoUrl: '',
  },
  {
    id: 'res-uk',
    title: 'Res-UK – system rezerwacji restauracji',
    titleEn: 'Res‑UK – restaurant reservation system',
    shortDescription:
      'Aplikacja do obsługi rezerwacji stolików w restauracji z dwoma lokalami, z panelem klienta i administracyjnym.',
    shortDescriptionEn:
      'An application for handling table reservations in a restaurant with two locations, with customer and admin panels.',
    longDescription:
      'System umożliwia klientom składanie rezerwacji online, a obsłudze lokalu – zarządzanie obłożeniem sal, potwierdzeniami oraz powiadomieniami e‑mail/web‑push. Frontend w Angularze (PWA) zawiera widoki dla gości i panel administratora, backend Node.js/Express z MongoDB udostępnia API do zarządzania rezerwacjami, integruje wysyłkę maili (Resend) oraz testy API.',
    techStack: [
      'Angular',
      'Node.js',
      'SCSS',
      'MongoDB',
      'Web Push',
      'Docker',
      'GitHub',
      'Render',
      'PWA',
    ],
    githubUrl: '',
    liveDemoUrl: 'https://res-uk.vercel.app',
  },
  {
    id: 'be-harmony',
    title: 'Be Harmony – gabinet fizjoterapii',
    titleEn: 'Be Harmony – physiotherapy practice',
    shortDescription:
      'Nowoczesna strona wizytówka gabinetu fizjoterapii z akcentem na czytelność oferty i prostą ścieżkę kontaktu.',
    shortDescriptionEn:
      'A modern one‑page site for a physiotherapy practice with clear offer presentation and a simple contact path.',
    longDescription:
      'Lekka, responsywna strona internetowa dla gabinetu fizjoterapii. Projekt skupia się na przejrzystej prezentacji usług, referencji oraz szybkiej ścieżce kontaktu (CTA do rezerwacji, mapa dojazdu). Zbudowana w Angularze z Tailwind CSS, przygotowana pod dalszą rozbudowę o moduł rezerwacji online.',
    techStack: ['Angular', 'Tailwind CSS', 'Responsive Design', 'SEO'],
    githubUrl: '',
    liveDemoUrl: 'https://be-harmony.vercel.app',
  },
  {
    id: 'wnetrze-kwadratu',
    title: 'Wnętrze do kwadratu – studio projektowania wnętrz',
    titleEn: 'Wnętrze do kwadratu – interior design studio',
    shortDescription:
      'Portfolio online studia projektowania wnętrz, prezentujące realizacje i proces współpracy z klientem.',
    shortDescriptionEn:
      'An online portfolio for an interior design studio showcasing projects and the collaboration process with clients.',
    longDescription:
      'Strona typu portfolio z naciskiem na prezentację zdjęć realizacji, opisów case‑study oraz klarownej ścieżki kontaktu. Zaimplementowana w Angularze z Tailwind CSS, z dbałością o detale UI (animacje, siatka projektów), przygotowana pod integrację z CMS lub panelem klienta.',
    techStack: ['Angular', 'Tailwind CSS', 'Responsive Design', 'SEO'],
    githubUrl: '',
    liveDemoUrl: 'https://www.wnetrzedokwadratu.pl',
  },
];

