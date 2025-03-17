import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import {
  IDonutChartData,
  IDonutChartOptions,
  IDonutChartProps,
} from '../../types/donut-chart.type';

@Component({
  selector: 'app-donut-chart',
  standalone: true,
  imports: [ChartModule, CommonModule],
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss'],
})
export class DonutChartComponent implements OnInit, OnChanges, IDonutChartProps {
  @Input() data: IDonutChartData = { labels: [], datasets: [] };
  @Input() options: IDonutChartOptions = {};
  @Input() width = '';
  @Input() height = '';
  @Input() responsive = true;
  @Input() chartClass = 'w-full md:w-[30rem]';
  @Input() chartStyle: Record<string, string> = {};
  @Input() ariaLabel = 'Donut Chart';

  chartData: IDonutChartData = { labels: [], datasets: [] };
  chartOptions: IDonutChartOptions = {
    cutout: '60%',
    plugins: {
      legend: {
        labels: {
          color: '#495057',
        },
        position: 'top',
      },
    },
  };

  ngOnInit(): void {
    this.updateChart();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ngOnChanges(_changes: SimpleChanges): void {
    this.updateChart();
  }

  private updateChart(): void {
    this.chartData = JSON.parse(JSON.stringify(this.data));

    this.chartOptions = {
      ...this.chartOptions,
      ...this.options,
    };

    if (!this.options.cutout) {
      this.chartOptions.cutout = '60%';
    }
  }
}
