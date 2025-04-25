import { Card, CardContent } from '@/components/ui/card';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartTooltip } from '../ChartTooltip/ChartTooltip';

type Props = {
    data: Array<{ [key: string]: string | number }>;
};

export const LineChartMultiple = (props: Props) => {
    return (
        <Card className="relative w-full h-full text-white">
            <CardContent className="h-full flex flex-col pl-0">
                <ResponsiveContainer width="100%" className="max-h-100%">
                    <BarChart data={props.data} margin={{ top: 15, left: -5, right: -5, bottom: 0 }} barGap={7}>
                        <Tooltip
                            shared={false}
                            content={<ChartTooltip />}
                            allowEscapeViewBox={{ x: true, y: true }}
                            wrapperStyle={{
                                transform: 'translateY(10px)',
                            }}
                            cursor={{ fill: 'transparent' }}
                        />
                        <CartesianGrid strokeDasharray="5 7" vertical={false} stroke="#4d4949" />
                        <XAxis dataKey="phase" stroke="#918F97" fontSize={11} tickLine={false} />
                        <YAxis stroke="#918F97" fontSize={11} tickLine={false} axisLine={false} />
                        <Bar dataKey="budget" fill="#3863E3" radius={[6, 6, 0, 0]} barSize={6} />
                        <Bar dataKey="goal" fill="#E5A753" radius={[6, 6, 0, 0]} barSize={6} />
                        <Bar dataKey="spent" fill="#02A773" radius={[6, 6, 0, 0]} barSize={6} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};
