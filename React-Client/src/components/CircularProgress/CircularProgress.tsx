import { ChartContainer } from '@/components/ui/chart';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { IoCheckmarkOutline } from 'react-icons/io5';
import { Cell, Pie, PieChart } from 'recharts';

type Props = {
    value: number;
    label: string;
    color?: string;
};

export const CircularProgress = ({ value, label, color }: Props) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setProgress(value), 500);
        return () => clearTimeout(timer);
    }, [value]);

    const determineColor = () => {
        if (color) return color;
        if (value <= 30) return '#E8697D';
        if (value > 30 && value < 70) return '#E5A753';
        return '#02A773';
    };

    const backgroundData = [{ name: '', value: 100 }];

    const progressData = [
        { name: 'Progress', value: progress },
        { name: 'Remaining', value: 100 - progress },
    ];

    const computedColor = determineColor();

    return (
        <div className="flex flex-col items-center">
            <p className="w-[8.5rem] h-[3.65rem] flex items-center text-center mb-[.5rem] text-[1.07rem] leading-[1.36rem] text-[#DBDBEB]">
                {label}
            </p>

            <div className="w-[8.5rem] h-[8.5rem] relative">
                {value === 100 ? (
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="flex items-center justify-center w-[4.21rem] h-[4.21rem] rounded-[50%] border-[3px] border-green text-green">
                            <IoCheckmarkOutline size="3rem" />
                        </div>
                    </div>
                ) : (
                    <>
                        <ChartContainer config={{}} className="w-full h-full">
                            <PieChart className="w-[8.5rem] h-[8.5rem] absolute top-0 left-0">
                                <Pie
                                    data={backgroundData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius="89%"
                                    outerRadius="100%"
                                    dataKey="value"
                                    stroke="none"
                                    fill="#333342"
                                />
                                <Pie
                                    data={progressData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius="89%"
                                    outerRadius="100%"
                                    startAngle={90}
                                    endAngle={-270}
                                    dataKey="value"
                                    stroke="none"
                                    cornerRadius={50}
                                    paddingAngle={0}
                                    labelLine={false}
                                    isAnimationActive={true}
                                >
                                    <Cell fill={computedColor} />
                                    <Cell fill="transparent" />
                                </Pie>
                            </PieChart>
                        </ChartContainer>
                        <div className="absolute top-[15%] bottom-[15%] left-[15%] right-[15%] flex items-center justify-center">
                            <div
                                className={cn(
                                    'relative w-full h-full flex items-center justify-center text-[1.29rem] after:absolute after:block after:top-0 after:left-0 after:w-full after:h-full after:border-2 after:opacity-30 after:border-2 after:border-dotted after:rounded-full',
                                    {
                                        'text-red after:border-red': !color && value <= 30,
                                        'text-orange after:border-orange': !color && value > 30 && value < 70,
                                        'text-green after:border-green': !color && value >= 70,
                                        'text-[var(--progress-custom-color)] after:border-[var(--progress-custom-color)]':
                                            color,
                                    },
                                )}
                                style={{ borderColor: computedColor, color: computedColor }}
                            >
                                {progress}
                                <sub className="mb-[.35rem]">%</sub>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
