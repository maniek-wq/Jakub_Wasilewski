import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PROJECTS } from '../projects/projects.data';
import type { Project } from '../projects/project.model';
import { ProjectCardComponent } from '../../shared/project-card/project-card.component';
import { InViewDirective } from '../../shared/directives/in-view.directive';
import { ProjectModalService } from '../../core/services/project-modal.service';
import { EmailService, RATE_LIMIT_CODE } from '../../core/services/email.service';

const MAX_NAME_LENGTH = 100;
const MAX_MESSAGE_LENGTH = 2000;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, ProjectCardComponent, InViewDirective],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnDestroy {
  projects = PROJECTS;
  /** Pozostałe sekundy cooldownu (odświeżane co 1 s przy limicie). */
  cooldownSecondsLeft = 0;
  private cooldownIntervalId: ReturnType<typeof setInterval> | null = null;

  contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(MAX_NAME_LENGTH)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(MAX_MESSAGE_LENGTH)]],
  });

  submitted = false;
  submitSuccess = false;
  isSending = false;
  submitError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private projectModal: ProjectModalService,
    private emailService: EmailService,
  ) {}

  scrollTo(sectionId: 'projects' | 'contact'): void {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  onProjectOpen(project: Project): void {
    this.projectModal.open(project);
  }

  /** Czy formularz jest zablokowany przez limiter (cooldown). */
  get isRateLimited(): boolean {
    return !this.emailService.canSend();
  }

  /** Pozostałe sekundy do końca cooldownu (do wyświetlenia). */
  get cooldownSeconds(): number {
    return this.cooldownSecondsLeft > 0 ? this.cooldownSecondsLeft : this.emailService.getCooldownSeconds();
  }

  private startCooldownTimer(): void {
    this.stopCooldownTimer();
    const tick = () => {
      const sec = this.emailService.getCooldownSeconds();
      this.cooldownSecondsLeft = sec;
      if (sec <= 0) this.stopCooldownTimer();
    };
    tick();
    this.cooldownIntervalId = setInterval(tick, 1000);
  }

  private stopCooldownTimer(): void {
    if (this.cooldownIntervalId != null) {
      clearInterval(this.cooldownIntervalId);
      this.cooldownIntervalId = null;
    }
    this.cooldownSecondsLeft = 0;
  }

  ngOnDestroy(): void {
    this.stopCooldownTimer();
  }

  onSubmit() {
    this.submitted = true;
    this.submitError = null;

    if (this.contactForm.invalid || this.isSending) {
      this.submitSuccess = false;
      return;
    }

    if (!this.emailService.canSend()) {
      this.submitSuccess = false;
      this.submitError = 'contact.rateLimit';
      this.startCooldownTimer();
      return;
    }

    const { name, email, message } = this.contactForm.value;
    this.isSending = true;

    this.emailService
      .sendContactEmail({
        name: (name ?? '').trim(),
        email: (email ?? '').trim(),
        message: (message ?? '').trim(),
      })
      .subscribe({
        next: () => {
          this.isSending = false;
          this.submitSuccess = true;
          this.contactForm.reset();
          this.submitted = false;
          this.startCooldownTimer();
        },
        error: (err: { code?: string }) => {
          this.isSending = false;
          this.submitSuccess = false;
          this.submitError = err?.code === RATE_LIMIT_CODE ? 'contact.rateLimit' : 'contact.sendError';
          if (err?.code === RATE_LIMIT_CODE) this.startCooldownTimer();
        },
      });
  }
}

