export interface IImageProps {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
  preview?: boolean;
  imageClass?: string;
  imageStyle?: Record<string, string>;
  appendTo?: string | HTMLElement;
}
