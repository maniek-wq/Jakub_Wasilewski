import type { Project } from './project.model';

export const PROJECTS: Project[] = [
  {
    id: 'etrainee',
    title: 'etrainee – platforma szkoleniowa',
    shortDescription:
      'Rozbudowana platforma e‑learningowa do zarządzania procesem szkoleń, rezerwacjami i komunikacją z kursantami.',
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
    title: 'DLS System – system grafików transportu',
    shortDescription:
      'Specjalistyczny system webowy do planowania grafików kierowców i pojazdów, z komunikacją w czasie rzeczywistym.',
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
    shortDescription:
      'Aplikacja do obsługi rezerwacji stolików w restauracji z dwoma lokalami, z panelem klienta i administracyjnym.',
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
    shortDescription:
      'Nowoczesna strona wizytówka gabinetu fizjoterapii z akcentem na czytelność oferty i prostą ścieżkę kontaktu.',
    longDescription:
      'Lekka, responsywna strona internetowa dla gabinetu fizjoterapii. Projekt skupia się na przejrzystej prezentacji usług, referencji oraz szybkiej ścieżce kontaktu (CTA do rezerwacji, mapa dojazdu). Zbudowana w Angularze z Tailwind CSS, przygotowana pod dalszą rozbudowę o moduł rezerwacji online.',
    techStack: ['Angular', 'Tailwind CSS', 'Responsive Design', 'SEO'],
    githubUrl: '',
    liveDemoUrl: 'https://be-harmony.vercel.app',
  },
  {
    id: 'wnetrze-kwadratu',
    title: 'Wnętrze do kwadratu – studio projektowania wnętrz',
    shortDescription:
      'Portfolio online studia projektowania wnętrz, prezentujące realizacje i proces współpracy z klientem.',
    longDescription:
      'Strona typu portfolio z naciskiem na prezentację zdjęć realizacji, opisów case‑study oraz klarownej ścieżki kontaktu. Zaimplementowana w Angularze z Tailwind CSS, z dbałością o detale UI (animacje, siatka projektów), przygotowana pod integrację z CMS lub panelem klienta.',
    techStack: ['Angular', 'Tailwind CSS', 'Responsive Design', 'SEO'],
    githubUrl: '',
    liveDemoUrl: 'https://www.wnetrzedokwadratu.pl',
  },
];

