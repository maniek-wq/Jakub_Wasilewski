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
    longDescriptionEn:
      'The system combines an admin panel, trainer panel and trainee view. It enables managing the training catalogue, schedules, attendee lists, payments and automated e‑mail and web‑push communication. The frontend runs as an Angular PWA, while the Node.js backend communicates with MongoDB and external services (e.g. e‑mail delivery, analytics).',
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
    previewImage: 'assets/images/etrainee.png',
    thumbnail: 'assets/images/Thumbnails/etrainee.png',
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
    longDescriptionEn:
      'An application built for a transport company to manage daily availability of drivers and vehicles. It includes a multi‑dimensional schedule, shift management modules, web‑push notifications, group communication and an admin panel with permissions. The Node.js/Express backend uses MongoDB, Socket.io and Web Push, while the Angular frontend runs as a PWA hosted in a containerised environment (Docker, Render/Vercel).',
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
    thumbnailPlaceholder: true,
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
    longDescriptionEn:
      'The system lets guests place table reservations online, while the restaurant staff manages room occupancy, confirmations and e‑mail/web‑push notifications. The Angular PWA frontend provides guest views and an admin panel, and the Node.js/Express backend with MongoDB exposes an API for managing reservations, integrates e‑mail delivery (Resend) and API tests.',
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
    previewVideoDesktop: 'assets/videos/Res-UK/Res_UK_Desk_CL.mp4',
    previewVideoMobile: 'assets/videos/Res-UK/Res_Mob.mp4',
    previewVideoAdmin: 'assets/videos/Res-UK/Admin_res_uk.mp4',
    thumbnail: 'assets/images/Thumbnails/Thumbnail_Res_UK.png',
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
    longDescriptionEn:
      'A lightweight, responsive website for a physiotherapy practice. The design focuses on clear presentation of services, testimonials and a fast contact path (booking CTAs, directions map). Built in Angular with Tailwind CSS and prepared for future extension with an online booking module.',
    techStack: ['Angular', 'Tailwind CSS', 'Responsive Design', 'SEO'],
    githubUrl: '',
    liveDemoUrl: 'https://be-harmony.vercel.app',
    previewVideoDesktop: 'assets/videos/be-harmony/Beh_2_Des.mp4',
    previewVideoMobile: 'assets/videos/be-harmony/Beh_Mob.mp4',
    thumbnail: 'assets/images/Thumbnails/Thumbnail_Be_harmony.png',
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
    longDescriptionEn:
      'A portfolio‑style site focused on showcasing project photos, case‑study descriptions and a clear contact path. Implemented in Angular with Tailwind CSS, with attention to UI details (animations, project grid), prepared for integration with a CMS or a client panel.',
    techStack: ['Angular', 'Tailwind CSS', 'Responsive Design', 'SEO'],
    githubUrl: '',
    liveDemoUrl: 'https://www.wnetrzedokwadratu.pl',
    previewVideoDesktop: 'assets/videos/wnetrze-kwadratu/WDK_Desk.mp4',
    previewVideoMobile: 'assets/videos/wnetrze-kwadratu/WDK_Mob.mp4',
    thumbnail: 'assets/images/Thumbnails/Thumbnail_WDK.png',
  },
];

