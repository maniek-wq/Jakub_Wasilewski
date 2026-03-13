import { Directive, ElementRef, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[appInView]',
  standalone: true,
})
export class InViewDirective implements OnInit, OnDestroy {
  @Input('appInView') animationClass = 'in-view';
  @HostBinding('class.opacity-0') initialOpacity = true;
  @HostBinding('class.translate-y-8') initialTranslate = true;
  @HostBinding('class.transition') transitionClass = true;
  @HostBinding('class.duration-700') durationClass = true;
  @HostBinding('class.ease-out') easeClass = true;

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const classes = this.animationClass.split(/\s+/).filter(Boolean);
            this.el.nativeElement.classList.add(...classes);
            this.initialOpacity = false;
            this.initialTranslate = false;
            this.observer?.disconnect();
            break;
          }
        }
      },
      {
        threshold: 0.15,
      },
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}

