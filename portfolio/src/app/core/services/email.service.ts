import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import emailjs from '@emailjs/browser';
import { EMAIL_JS_CONFIG } from '../config/email-js.config';

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export const RATE_LIMIT_CODE = 'RATE_LIMIT';

/** Minimalny odstęp między wysyłkami (ms). */
const COOLDOWN_MS = 60_000;

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private lastSentAt = 0;

  /** Sprawdza, czy można wysłać kolejną wiadomość (po cooldownie). */
  canSend(): boolean {
    return Date.now() - this.lastSentAt >= COOLDOWN_MS;
  }

  /** Pozostały cooldown w sekundach (0 jeśli można wysłać). */
  getCooldownSeconds(): number {
    const elapsed = Date.now() - this.lastSentAt;
    if (elapsed >= COOLDOWN_MS) return 0;
    return Math.ceil((COOLDOWN_MS - elapsed) / 1000);
  }

  sendContactEmail(data: ContactPayload): Observable<void> {
    if (!this.canSend()) {
      return throwError(() => ({ code: RATE_LIMIT_CODE }));
    }

    const { serviceId, templateId, publicKey } = EMAIL_JS_CONFIG;

    const promise = emailjs
      .send(
        serviceId,
        templateId,
        {
          from_name: data.name.trim().slice(0, 100),
          reply_to: data.email.trim(),
          message: data.message.trim().slice(0, 2000),
        },
        { publicKey },
      )
      .then(() => {
        this.lastSentAt = Date.now();
        return void 0;
      });

    return from(promise);
  }
}

