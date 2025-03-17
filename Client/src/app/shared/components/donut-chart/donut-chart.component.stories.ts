import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { DonutChartComponent } from './donut-chart.component';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { IDonutChartData, IDonutChartOptions } from '../../types/donut-chart.type';

const meta: Meta<DonutChartComponent> = {
  title: 'Components/Charts/DonutChart',
  component: DonutChartComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ChartModule],
    }),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A configurable donut chart component based on PrimeNG Chart with Chart.js',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      description: 'Chart data including labels and datasets',
      control: 'object',
    },
    options: {
      description: 'Chart configuration options',
      control: 'object',
    },
    width: {
      description: 'Width of the chart',
      control: 'text',
    },
    height: {
      description: 'Height of the chart',
      control: 'text',
    },
    responsive: {
      description: 'Whether the chart should be responsive',
      control: 'boolean',
    },
    chartClass: {
      description: 'CSS class for the chart',
      control: 'text',
    },
    chartStyle: {
      description: 'Inline styles for the chart',
      control: 'object',
    },
    ariaLabel: {
      description: 'ARIA label for accessibility',
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<DonutChartComponent>;

const basicChartData: IDonutChartData = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
  datasets: [
    {
      data: [300, 50, 100, 75, 125],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      label: 'Dataset 1',
    },
  ],
};

const basicChartOptions: IDonutChartOptions = {
  cutout: '60%',
  plugins: {
    legend: {
      labels: {
        color: '#495057',
      },
      position: 'top',
    },
    title: {
      display: true,
      text: 'Basic Donut Chart',
      color: '#495057',
      font: {
        size: 16,
      },
    },
  },
};

const salesData: IDonutChartData = {
  labels: ['Electronics', 'Clothing', 'Food', 'Books', 'Other'],
  datasets: [
    {
      data: [30000, 25000, 20000, 15000, 10000],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      hoverBackgroundColor: ['#FF8384', '#56B2EB', '#FFDE76', '#6BD0D0', '#B986FF'],
      label: 'Sales Distribution',
    },
  ],
};

export const Default: Story = {
  args: {
    data: basicChartData,
    options: basicChartOptions,
    width: '',
    height: '',
    responsive: true,
    chartClass: 'w-full md:w-30rem',
    chartStyle: {},
    ariaLabel: 'Basic Donut Chart',
  },
};

export const SalesDistribution: Story = {
  args: {
    data: salesData,
    options: {
      cutout: '70%',
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: '#344054',
          },
        },
        title: {
          display: true,
          text: 'Sales Distribution by Category',
          color: '#101828',
          font: {
            size: 18,
          },
        },
      },
    },
    width: '400px',
    height: '400px',
    responsive: false,
    chartClass: 'sales-chart',
    chartStyle: {
      'box-shadow': '0px 2px 10px rgba(0, 0, 0, 0.1)',
      'border-radius': '8px',
      padding: '16px',
    },
    ariaLabel: 'Sales Distribution Chart',
  },
};

export const TrafficSources: Story = {
  args: {
    data: {
      labels: ['Direct', 'Search', 'Social', 'Email', 'Affiliates', 'Other'],
      datasets: [
        {
          data: [25, 40, 15, 10, 7, 3],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#C9CBCF'],
          hoverBackgroundColor: ['#FF8384', '#56B2EB', '#FFDE76', '#6BD0D0', '#B986FF', '#D9DBDF'],
        },
      ],
    },
    options: {
      cutout: '85%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#344054',
          },
        },
        title: {
          display: true,
          text: 'Website Traffic Sources (%)',
          color: '#101828',
          font: {
            size: 16,
          },
        },
      },
    },
    chartClass: 'traffic-chart',
    ariaLabel: 'Traffic Sources Chart',
  },
};

export const MultipleDatasets: Story = {
  args: {
    data: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          data: [300, 250, 400, 350],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
          label: '2022',
        },
        {
          data: [250, 300, 350, 450],
          backgroundColor: ['#FF9F40', '#4BC0C0', '#9966FF', '#C9CBCF'],
          label: '2023',
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Quarterly Sales Comparison',
          font: {
            size: 16,
          },
        },
      },
    },
    chartClass: 'comparison-chart',
    ariaLabel: 'Quarterly Sales Comparison Chart',
  },
};

export const DarkTheme: Story = {
  args: {
    data: {
      labels: ['Completed', 'In Progress', 'Backlog', 'On Hold'],
      datasets: [
        {
          data: [14, 8, 12, 6],
          backgroundColor: ['#4CAF50', '#2196F3', '#FFC107', '#F44336'],
          hoverBackgroundColor: ['#66BB6A', '#42A5F5', '#FFCA28', '#EF5350'],
        },
      ],
    },
    options: {
      cutout: '65%',
      plugins: {
        legend: {
          labels: {
            color: '#E0E0E0',
          },
          position: 'bottom',
        },
        title: {
          display: true,
          text: 'Project Tasks Status',
          color: '#FFFFFF',
          font: {
            size: 18,
          },
        },
      },
    },
    chartStyle: {
      'background-color': '#121212',
      'border-radius': '8px',
      padding: '16px',
    },
    chartClass: 'dark-theme-chart',
    ariaLabel: 'Project Tasks Status Chart',
  },
};

export const MinimalNoLegend: Story = {
  args: {
    data: {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [33, 33, 34],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    },
    options: {
      cutout: '75%',
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: '#495057',
          },
        },
        title: {
          display: false,
        },
      },
    },
    width: '200px',
    height: '200px',
    responsive: false,
    chartClass: 'minimal-chart',
    ariaLabel: 'Minimal Chart',
  },
};
