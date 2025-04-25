import { ReactNode, PropsWithChildren } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, TooltipArrow } from '../ui/tooltip';

type Props = {
    content: ReactNode;
    classname?: string;
    style?: React.CSSProperties;
};

export const HoverTooltip = ({ children, content, classname, style }: PropsWithChildren<Props>) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={300}>
                <TooltipTrigger className={classname} style={style}>
                    {children}
                </TooltipTrigger>
                <TooltipContent>
                    <p>{content}</p>
                    <TooltipArrow />
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
