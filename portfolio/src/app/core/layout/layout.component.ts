import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  currentSection: string | null = 'hero';

  onSectionChange(section: string) {
    this.currentSection = section;
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    const ids = ['hero', 'about', 'projects', 'contact'];
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

