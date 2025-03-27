export interface IChartDataset {
  data: number[];
  backgroundColor: string[];
  hoverBackgroundColor?: string[];
  label?: string;
}

export interface IDonutChartData {
  labels: string[];
  datasets: IChartDataset[];
}

export interface IDonutChartOptions {
  cutout?: string;
  plugins?: {
    legend?: {
      labels?: {
        color?: string;
      };
      position?: 'top' | 'bottom' | 'left' | 'right';
    };
    title?: {
      display?: boolean;
      text?: string;
      color?: string;
      font?: {
        size?: number;
      };
    };
  };
}

export interface IDonutChartProps {
  data: IDonutChartData;
  options: IDonutChartOptions;
  width: string;
  height: string;
  responsive: boolean;
  chartClass: string;
  chartStyle: Record<string, string>;
  ariaLabel: string;
}
