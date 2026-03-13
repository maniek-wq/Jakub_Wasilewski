import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PROJECTS } from '../projects/projects.data';
import type { Project } from '../projects/project.model';
import { ProjectCardComponent } from '../../shared/project-card/project-card.component';
import { InViewDirective } from '../../shared/directives/in-view.directive';
import { TypewriterDirective } from '../../shared/directives/typewriter.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, ProjectCardComponent, InViewDirective, TypewriterDirective],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  projects = PROJECTS;
  selectedProject: Project | null = null;
  isProjectClosing = false;
  /** Ustawiane z opóźnieniem 1 klatki, żeby animacja unfold/zoom startowała przy pierwszym otwarciu */
  modalShouldAnimate = false;

  contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  submitted = false;
  submitSuccess = false;

  constructor(private fb: FormBuilder, private translate: TranslateService) {}

  scrollTo(sectionId: 'projects' | 'contact'): void {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  onProjectOpen(project: Project): void {
    this.isProjectClosing = false;
    this.modalShouldAnimate = false;
    this.selectedProject = project;
    document.body.classList.add('modal-active');
    setTimeout(() => (this.modalShouldAnimate = true), 0);
  }

  closeProjectModal(): void {
    if (!this.selectedProject || this.isProjectClosing) {
      return;
    }
    this.isProjectClosing = true;
    /* zoomOut 0.5s + unfoldOut delay 0.3s + unfoldOut 1s = 1.8s */
    setTimeout(() => {
      this.selectedProject = null;
      this.isProjectClosing = false;
      this.modalShouldAnimate = false;
      document.body.classList.remove('modal-active');
    }, 1800);
  }

  getProjectDescription(project: Project): string {
    const lang = this.translate.currentLang || this.translate.getDefaultLang();
    return lang === 'en' && project.longDescriptionEn ? project.longDescriptionEn : project.longDescription;
  }

  onSubmit() {
    this.submitted = true;
    if (this.contactForm.invalid) {
      this.submitSuccess = false;
      return;
    }
    // Tu można podpiąć realne API / email service.
    console.log('Contact form payload', this.contactForm.value);
    this.submitSuccess = true;
    this.contactForm.reset();
  }
}

