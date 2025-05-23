import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]',
  standalone: true,
})
export class InfiniteScrollDirective implements OnInit, OnDestroy {
  @Output() scrolled = new EventEmitter<void>();
  @Input() scrollDistance = 200;
  @Input() disabled = false;

  private scrollEvent: (() => void) | null = null;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.scrollEvent = this.onScroll.bind(this);
    window.addEventListener('scroll', this.scrollEvent);
  }

  ngOnDestroy() {
    if (this.scrollEvent) {
      window.removeEventListener('scroll', this.scrollEvent);
    }
  }

  private onScroll() {
    if (this.disabled) return;

    const elementPosition = this.elementRef.nativeElement.getBoundingClientRect();
    const scrollPosition = window.innerHeight + window.scrollY;

    if (elementPosition.bottom <= scrollPosition + this.scrollDistance) {
      this.scrolled.emit();
    }
  }
}
