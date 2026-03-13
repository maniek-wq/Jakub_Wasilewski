import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { LoadingOverlayComponent } from '../loading/loading-overlay.component';
import { MatrixBackgroundComponent } from '../matrix/matrix-background.component';
import { ProjectModalService } from '../services/project-modal.service';
import { TypewriterDirective } from '../../shared/directives/typewriter.directive';
import type { Project } from '../../features/projects/project.model';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    LoadingOverlayComponent,
    MatrixBackgroundComponent,
    TypewriterDirective,
  ],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  currentSection: string | null = 'hero';
  isNavbarHidden = false;
  private lastScrollY = 0;

  constructor(
    readonly modal: ProjectModalService,
    private translate: TranslateService,
    private sanitizer: DomSanitizer,
  ) {}

  getProjectTitle(project: Project): string {
    const lang = this.translate.currentLang || this.translate.getDefaultLang();
    return lang === 'en' && project.titleEn ? project.titleEn : project.title;
  }

  getProjectDescription(project: Project): string {
    const lang = this.translate.currentLang || this.translate.getDefaultLang();
    return lang === 'en' && project.longDescriptionEn ? project.longDescriptionEn : project.longDescription;
  }

  getVideoSrc(path: string | undefined): SafeResourceUrl | null {
    if (!path) return null;
    const base = typeof window !== 'undefined' ? window.location.origin + '/' : '';
    const url = path.startsWith('http') ? path : base + path.replace(/^\//, '');
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  onSectionChange(section: string) {
    this.currentSection = section;
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    const currentY = window.scrollY || window.pageYOffset || 0;
    const scrollingDown = currentY > this.lastScrollY;
    const threshold = 80;

    this.isNavbarHidden = scrollingDown && currentY > threshold;
    this.lastScrollY = currentY;

    const ids = ['hero', 'about', 'collaboration', 'projects', 'contact'];
    let active: string | null = null;
    const offset = 120;

    for (const id of ids) {
      const el = document.getElementById(id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top <= offset && rect.bottom > offset) {
        active = id === 'hero' ? 'hero' : id;
        break;
      }
    }

    this.currentSection = active ?? this.currentSection;
  }
}

