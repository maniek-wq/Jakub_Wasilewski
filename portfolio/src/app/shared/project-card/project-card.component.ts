import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { Project } from '../../features/projects/project.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-card.component.html',
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;
}

