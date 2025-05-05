import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { ReactNode } from 'react';
import { Cell, LabelList, Pie, PieChart, ResponsiveContainer, Sector } from 'recharts';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';

type DataItem = {
    name: string;
    value: number;
    color: string;
};

type Props = {
    data: DataItem[];
    title?: ReactNode;
    subTitle?: ReactNode;
    description?: ReactNode;
    dataKey: string;
    nameKey: string;
    activeIndex?: number;
    withTooltip?: boolean;
};

export const PerformanceChart = ({ data, title, subTitle, description, dataKey, nameKey, activeIndex }: Props) => {
    return (
        <Card className="chart w-full h-full flex flex-col bg-darkGray">
            <CardHeader className="items-center pb-0">
                <CardTitle>{title}</CardTitle>
                <CardDescription>{subTitle}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ResponsiveContainer width="100%" className="max-h-100%">
                    <ChartContainer
                        config={data.reduce(
                            (acc, item) => ({
                                ...acc,
                                [item.name]: {
                                    label: item.name,
                                    color: item.color,
                                },
                            }),
                            {},
                        )}
                        className="h-full"
                    >
                        <PieChart className="h-full" margin={{ top: -5, left: -5, right: -5, bottom: -15 }}>
                            <Pie
                                data={data}
                                dataKey={dataKey}
                                nameKey={nameKey}
                                innerRadius={45}
                                strokeWidth={5}
                                activeIndex={activeIndex}
                                activeShape={({ outerRadius = 0, innerRadius = 0, ...props }: PieSectorDataItem) => (
                                    <Sector {...props} outerRadius={outerRadius + 5} innerRadius={innerRadius - 5} />
                                )}
                                fill="#8884d8"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                                <LabelList
                                    dataKey={dataKey}
                                    formatter={(value: string) => `${value}%`}
                                    position="inside"
                                    fill="#FFF"
                                    style={{
                                        fontSize: '12px',
                                        textShadow: 'none',
                                        stroke: 'none',
                                    }}
                                />
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                </ResponsiveContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="leading-none text-muted-foreground">{description}</div>
            </CardFooter>
        </Card>
    );
};

export default PerformanceChart;
