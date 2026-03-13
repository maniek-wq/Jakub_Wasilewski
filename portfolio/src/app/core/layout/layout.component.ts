import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { LoadingOverlayComponent } from '../loading/loading-overlay.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent, LoadingOverlayComponent],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  currentSection: string | null = 'hero';
  isNavbarHidden = false;
  private lastScrollY = 0;

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

