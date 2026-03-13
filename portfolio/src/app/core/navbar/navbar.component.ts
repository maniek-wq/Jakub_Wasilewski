import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  @Input() currentSection: string | null = null;
  @Input() isHidden = false;
  @Output() sectionChange = new EventEmitter<string>();

  isMenuOpen = false;
  currentLang = 'pl';

  constructor(private translate: TranslateService, private host: ElementRef<HTMLElement>) {
    this.currentLang = (localStorage.getItem('lang') as 'pl' | 'en' | null) ?? 'pl';
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  navigateTo(section: string) {
    this.sectionChange.emit(section);
    this.isMenuOpen = false;
  }

  switchLanguage(lang: 'pl' | 'en') {
    this.currentLang = lang;
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.isMenuOpen) return;
    const target = event.target as Node | null;
    if (target && !this.host.nativeElement.contains(target)) {
      this.isMenuOpen = false;
    }
  }
}

