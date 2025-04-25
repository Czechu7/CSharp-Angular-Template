import { cn } from '@/lib/utils';
import './ChartTooltip.scss';

type TooltipProps = {
    active?: boolean;
    payload?: Array<{
        value?: number;
    }>;
    coordinate?: {
        x: number;
        y: number;
    };
};

export const ChartTooltip = ({ active, payload, coordinate }: TooltipProps) => {
    if (!active || !payload?.length || !coordinate) {
        return null;
    }

    return (
        <div
            style={{
                left: coordinate.x,
                top: coordinate.y - 40,
                transform: 'translate(-50%, -100%)',
                zIndex: 50,
            }}
            className={cn(
                'tooltip-chart z-50 max-w-[20rem] rounded-[0.43rem] bg-[#7867E74D] px-[1.07rem] py-[0.45rem]',
                'text-[0.86rem] text-white leading-[1rem]',
                'animate-in fade-in-0 zoom-in-95',
                'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
                'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
                'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            )}
        >
            <div className="flex flex-col gap-1.5">
                {payload.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <span className="font-medium text-white">
                            {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
