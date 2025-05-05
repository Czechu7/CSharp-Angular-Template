import { Card, CardContent } from '@/components/ui/card';
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartTooltip } from '../ChartTooltip/ChartTooltip';

type Props = {
    data: Array<{ [key: string]: string | number }>;
};

const getColor = (value: number | string) => {
    if (typeof value === 'number') {
        return;
    }

    switch (value) {
        case 'total':
            return '#3863E3';
        case 'goalPrice':
            return '#E5A753';
        case 'spent':
            return '#02A773';
    }
};

export const LineChart = (props: Props) => {
    return (
        <Card className="w-full h-full text-white">
            <CardContent className="h-full flex flex-col pl-0">
                <ResponsiveContainer width="100%" className="max-h-100%">
                    <BarChart data={props.data} margin={{ top: 0, left: -5, right: -5, bottom: 0 }}>
                        <Tooltip
                            content={<ChartTooltip />}
                            allowEscapeViewBox={{ x: true, y: true }}
                            wrapperStyle={{
                                transform: 'translateY(10px)',
                            }}
                            cursor={{ fill: 'transparent' }}
                        />
                        <CartesianGrid strokeDasharray="5 7" vertical={false} stroke="#605F7687" />
                        <XAxis dataKey="name" stroke="#918F97" fontSize={12} tickLine={false} tick={false} />
                        <YAxis stroke="#918F97" fontSize={11} tickLine={false} axisLine={false} />
                        <Bar dataKey="amount" fill="#7867E7" radius={[6, 6, 0, 0]} barSize={30}>
                            {props.data.map((entry, index) => (
                                <Cell key={index} fill={getColor(entry.name)} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};
