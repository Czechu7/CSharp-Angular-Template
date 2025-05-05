import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx';
import { cn } from '@/lib/utils.ts';

type Props = {
    src: string;
    className?: string;
    alt?: string;
};

export const AvatarProfile = ({ className, src, alt }: Props) => {
    return (
        <Avatar className={cn(className)}>
            <AvatarImage src={src} alt={alt} />
            <AvatarFallback className="bg-darkGray">
                <img src="/AvatarDefault.svg" alt="" className="w-full h-full" />
            </AvatarFallback>
        </Avatar>
    );
};
