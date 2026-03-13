import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PROJECTS } from '../projects/projects.data';
import { ProjectCardComponent } from '../../shared/project-card/project-card.component';
import { InViewDirective } from '../../shared/directives/in-view.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, ProjectCardComponent, InViewDirective],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  projects = PROJECTS;

  contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  submitted = false;
  submitSuccess = false;

  constructor(private fb: FormBuilder) {}

  scrollTo(sectionId: 'projects' | 'contact'): void {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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

