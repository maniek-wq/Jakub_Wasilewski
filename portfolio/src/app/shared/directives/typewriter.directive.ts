import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appTypewriter]',
  standalone: true,
})
export class TypewriterDirective implements OnChanges, OnDestroy {
  @Input('appTypewriter') text = '';
  /** Czas w ms na jedną literę */
  @Input() appTypewriterSpeed = 45;
  /** Opóźnienie startu w ms (np. po rozwinięciu modala) */
  @Input() appTypewriterDelay = 0;
  /** Czy pokazywać migający kursor */
  @Input() appTypewriterCursor = true;

  private textSpan: HTMLSpanElement | null = null;
  private cursorSpan: HTMLSpanElement | null = null;
  private delayTimeout: ReturnType<typeof setTimeout> | null = null;
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private index = 0;

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['text']) {
      this.stop();
      this.setText('');
      const value = this.text ?? '';
      if (!value) return;
      this.index = 0;
      this.delayTimeout = setTimeout(() => this.startTyping(), this.appTypewriterDelay);
    }
  }

  ngOnDestroy(): void {
    this.stop();
  }

  private stop(): void {
    if (this.delayTimeout != null) {
      clearTimeout(this.delayTimeout);
      this.delayTimeout = null;
    }
    if (this.intervalId != null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private setText(visible: string): void {
    this.ensureNodes();
    if (this.textSpan) {
      this.textSpan.textContent = visible;
    }
    if (this.cursorSpan) {
      this.renderer.setStyle(this.cursorSpan, 'display', visible.length < (this.text ?? '').length ? 'inline' : 'none');
    }
  }

  private ensureNodes(): void {
    const host = this.el.nativeElement;
    if (this.textSpan) return;
    this.renderer.setProperty(host, 'textContent', '');
    this.textSpan = this.renderer.createElement('span');
    this.renderer.appendChild(host, this.textSpan);
    if (this.appTypewriterCursor) {
      this.cursorSpan = this.renderer.createElement('span');
      this.renderer.addClass(this.cursorSpan, 'typewriter-cursor');
      this.renderer.setProperty(this.cursorSpan, 'textContent', '|');
      this.renderer.appendChild(host, this.cursorSpan);
    }
  }

  private startTyping(): void {
    this.delayTimeout = null;
    const full = this.text ?? '';
    if (!full) return;
    this.intervalId = setInterval(() => {
      this.index += 1;
      if (this.index >= full.length) {
        if (this.intervalId != null) clearInterval(this.intervalId);
        this.intervalId = null;
        this.setText(full);
        return;
      }
      this.setText(full.slice(0, this.index));
    }, this.appTypewriterSpeed);
  }
}
