import { Label } from '@radix-ui/react-label';
import { Chart, ArcElement, Tooltip, Legend, Colors } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { generatePieChartData } from '@/handlers/common/handleCommonChart';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../molecules/card';

Chart.register(ArcElement, Tooltip, Legend, Colors);

export type CommonChartProps = {
  title: string;
  subtitle?: string;
  count: number;
  data: { name: string; value: number }[];
};

const CommonChart: React.FC<CommonChartProps> = ({
  data,
  title,
  count,
  subtitle = '',
}) => {
  //generates chart data for a given dataset and colors.
  const chartData = generatePieChartData(data);

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          boxWidth: 16,
          padding: 10,
          usePointStyle: true,
          font: {
            size: 14,
            family: "'Inter', sans-serif",
          },
          boxHeight: 10,
          borderColor: 'transparent',
          borderWidth: 0,
        },
      },
    },
  };

  return (
    <Card className="h-full w-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center">
          <Label>{title}</Label>
          <Label className="ml-1 text-gray-600">({count})</Label>
        </CardTitle>
        {subtitle && <CardDescription>{subtitle}</CardDescription>}
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6 pb-2 pt-2">
        <Doughnut
          className={'max-h-[300px] w-full'}
          data={chartData}
          options={chartOptions}
        />
      </CardContent>
    </Card>
  );
};

export default CommonChart;
