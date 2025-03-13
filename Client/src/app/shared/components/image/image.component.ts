import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageModule } from 'primeng/image';
import { IImageProps } from '../../types/image.types';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [CommonModule, ImageModule],
  templateUrl: './image.component.html',
})
export class ImageComponent implements IImageProps {
  @Input() src = '';
  @Input() alt = '';
  @Input() width?: string;
  @Input() height?: string;
  @Input() preview = true;
  @Input() imageClass?: string;
  @Input() imageStyle?: Record<string, string> = {};
  @Input() appendTo: string | HTMLElement = 'body';
}
