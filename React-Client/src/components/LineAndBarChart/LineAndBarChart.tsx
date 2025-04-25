import { Bar, ComposedChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, LabelList } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ReactNode } from 'react';
import { PiCircleBold } from 'react-icons/pi';

type Props = {
    data: Array<{ [key: string]: string | number }>;
    dataKey1: string;
    dataKey2: string;
    dataKey3: string;
    barLabel1: string;
    barLabel2: string;
    lineLabel: string;
    barColor1?: string;
    barColor2?: string;
    lineColor?: string;
    cardTitle?: ReactNode;
    cardDescription?: ReactNode;
};

export const LineAndBarChart = ({
    data,
    barLabel1,
    barLabel2,
    lineLabel,
    dataKey1,
    dataKey2,
    dataKey3,
    barColor1 = '#3863E3',
    barColor2 = '#02A773',
    lineColor = '#02A773',
    cardTitle,
    cardDescription,
}: Props) => {
    return (
        <Card className="relative w-full max-w-[79.2rem] h-[26.78rem] text-white py-[2rem] px-0">
            {(cardTitle || cardDescription) && (
                <CardHeader>
                    {cardTitle && <CardTitle className="mb-[1rem]">{cardTitle}</CardTitle>}
                    {cardDescription && <CardDescription className="text-white">{cardDescription}</CardDescription>}
                </CardHeader>
            )}
            <CardContent className="h-full flex flex-col pl-0">
                <div className="w-full flex items-center justify-end gap-[4rem] mb-[1rem]">
                    <div className="flex items-center gap-2 text-[#3863E3]">
                        <PiCircleBold strokeWidth={40} />
                        <span className="text-[.86rem] text-[#9C9EA1]">Liczba godzin</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#02A773]">
                        <PiCircleBold strokeWidth={40} />
                        <span className="text-[.86rem] text-[#9C9EA1]">Postęp</span>
                    </div>
                </div>
                <ResponsiveContainer width="100%" className="max-h-100%">
                    <ComposedChart data={data} barGap={7} margin={{ left: -10, }}>
                        <XAxis
                            dataKey={dataKey1}
                            stroke="#888888"
                            fontSize=".86rem"
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={value => `${value}`}
                            tickCount={7}
                            domain={[0, 'dataMax + 10']}
                        />
                        <CartesianGrid vertical={false} stroke="#393949" strokeDasharray="5 8" />
                        <Bar dataKey={dataKey2} fill={barColor1} radius={[6, 6, 0, 0]} name={barLabel1} barSize="12">
                            <LabelList dataKey={dataKey2} fill={barColor1} position="top" fontSize="1rem" offset={8} />
                        </Bar>
                        <Bar dataKey={dataKey3} fill={barColor2} radius={[6, 6, 0, 0]} name={barLabel2} barSize="12">
                            <LabelList dataKey={dataKey3} fill={barColor2} position="top" fontSize="1rem" offset={8} />
                        </Bar>
                        <Line
                            type="monotone"
                            dataKey={dataKey3}
                            stroke={lineColor}
                            strokeWidth={1}
                            strokeDasharray="5 8"
                            dot={false}
                            name={lineLabel}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};
