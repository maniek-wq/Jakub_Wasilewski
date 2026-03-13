import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { Project } from '../../features/projects/project.model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './project-card.component.html',
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;
  @Output() open = new EventEmitter<Project>();

  constructor(private translate: TranslateService) {}

  get displayTitle(): string {
    const lang = this.translate.currentLang || this.translate.getDefaultLang();
    return lang === 'en' && this.project.titleEn ? this.project.titleEn : this.project.title;
  }

  get displayShortDescription(): string {
    const lang = this.translate.currentLang || this.translate.getDefaultLang();
    return lang === 'en' && this.project.shortDescriptionEn
      ? this.project.shortDescriptionEn
      : this.project.shortDescription;
  }
}

