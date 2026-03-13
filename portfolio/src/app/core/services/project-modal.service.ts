import { Injectable, signal } from '@angular/core';
import type { Project } from '../../features/projects/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectModalService {
  readonly selectedProject = signal<Project | null>(null);
  readonly isProjectClosing = signal(false);
  readonly modalShouldAnimate = signal(false);

  open(project: Project): void {
    this.isProjectClosing.set(false);
    this.modalShouldAnimate.set(false);
    this.selectedProject.set(project);
    document.body.classList.add('modal-active');
    setTimeout(() => this.modalShouldAnimate.set(true), 0);
  }

  close(): void {
    if (!this.selectedProject() || this.isProjectClosing()) return;
    this.isProjectClosing.set(true);
    setTimeout(() => {
      this.selectedProject.set(null);
      this.isProjectClosing.set(false);
      this.modalShouldAnimate.set(false);
      document.body.classList.remove('modal-active');
    }, 1800);
  }
}
