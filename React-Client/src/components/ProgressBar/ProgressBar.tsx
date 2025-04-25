import { cn } from '@/lib/utils';
import { Progress } from '../ui/progress';
import { Badge } from '@/components/ui/badge.tsx';
import { CSSProperties } from 'react';
import { HoverTooltip } from '../HoverTooltip/HoverTooltip';

type Props = {
    value: number;
    color?: string;
    hidePercentage?: boolean;
    columnPosition?: boolean;
    showTooltip?: boolean;
};

export const ProgressBar = ({ value, color, hidePercentage, columnPosition, showTooltip = false }: Props) => {
    const tooltipContent = `${value}%`;

    const progressBar = (
        <>
            <Progress
                value={value}
                className={cn(
                    !color && value <= 30 && '[&>div]:bg-red',
                    !color && value > 30 && value < 70 && '[&>div]:bg-orange',
                    !color && value >= 70 && '[&>div]:bg-green',
                    color && '[&>div]:bg-[var(--progress-custom-color)]',
                )}
            />
            {!hidePercentage && (
                <Badge
                    className={cn(
                        'progress-bar__value w-[3.31rem] shrink-0 justify-center bg-[#918F971A]',
                        !color && value <= 30 && 'text-red',
                        !color && value > 30 && value < 70 && 'text-orange',
                        !color && value >= 70 && 'text-green',
                        color && 'text-[var(--progress-custom-color)]',
                    )}
                    style={columnPosition ? { position: 'relative', left: `calc(${value}% - 2.5rem)` } : {}}
                >
                    {value}%
                </Badge>
            )}
        </>
    );

    return showTooltip ? (
        <HoverTooltip
            content={tooltipContent}
            classname="progress-bar w-full flex items-center gap-[1rem]"
            style={{ '--progress-custom-color': color } as CSSProperties}
        >
            {progressBar}
        </HoverTooltip>
    ) : (
        <div
            className="progress-bar w-full flex items-center gap-[1rem]"
            style={{ '--progress-custom-color': color } as CSSProperties}
        >
            {progressBar}
        </div>
    );
};
