import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-matrix-background',
  standalone: true,
  template: `<canvas #canvas class="fixed inset-0 -z-10 block"></canvas>`,
})
export class MatrixBackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D | null = null;
  private animationId: number | null = null;
  private columns: { y: number; speed: number }[] = [];
  private readonly fontSize = 14;
  private readonly chars = ['0', '1'];

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }
    this.ctx = ctx;

    this.resize();
    this.start();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.resize();
  }

  ngOnDestroy(): void {
    if (this.animationId != null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  private resize(): void {
    const canvas = this.canvasRef.nativeElement;
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    // gęstość jak w klasycznym Matrixie: kolumny co ok. fontSize
    const columnsCount = Math.floor(width / (this.fontSize * 0.9));
    this.columns = Array.from({ length: columnsCount }, () => ({
      // start powyżej ekranu (różne wysokości, żeby kolumny były rozstrzelone)
      y: Math.random() * -40,
      // jeszcze wolniejszy spadek: 0.02–0.06 wiersza na klatkę
      speed: 0.02 + Math.random() * 0.04,
    }));
  }

  private start(): void {
    const canvas = this.canvasRef.nativeElement;

    const draw = () => {
      if (!this.ctx) {
        return;
      }

      // bardzo ciemne tło z lekkim śladem, jak na zrzucie Matrixa
      this.ctx.fillStyle = 'rgba(0,0,0,0.35)';
      this.ctx.fillRect(0, 0, canvas.width, canvas.height);

      this.ctx.font = `${this.fontSize}px monospace`;

      // długość „ogona” kolumny (ile znaków pod rząd w jednej kolumnie)
      const trailLength = 20;

      for (let i = 0; i < this.columns.length; i++) {
        const column = this.columns[i];
        const headY = column.y;

        // klasyczny odstęp poziomy ~fontSize
        const xPos = i * this.fontSize * 0.9;

        // rysujemy całą sekwencję znaków w dół jednej kolumny
        for (let k = 0; k < trailLength; k++) {
          const y = headY - k;
          const yPos = y * this.fontSize;
          if (yPos < 0 || yPos > canvas.height) {
            continue;
          }

          const text = this.chars[Math.random() < 0.5 ? 0 : 1];

          // im dalej od „główki”, tym ciemniej i bardziej wyblakle
          const t = k / trailLength;
          const isHighlight = k === 0;
          this.ctx.globalAlpha = isHighlight ? 0.8 : 0.25 * (1 - t);
          this.ctx.fillStyle = isHighlight ? '#a7ff7c' : '#00ff41';

          this.ctx.fillText(text, xPos, yPos);
        }

        this.ctx.globalAlpha = 1;

        const headYPos = headY * this.fontSize;
        if (headYPos > canvas.height + this.fontSize && Math.random() > 0.98) {
          column.y = Math.random() * -40;
        } else {
          column.y = headY + column.speed;
        }
      }

      this.animationId = requestAnimationFrame(draw);
    };

    this.animationId = requestAnimationFrame(draw);
  }
}

