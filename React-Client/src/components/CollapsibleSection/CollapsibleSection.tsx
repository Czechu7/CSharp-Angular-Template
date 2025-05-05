import * as Collapsible from '@radix-ui/react-collapsible';
import { ChevronUpIcon, ChevronDownIcon } from 'lucide-react';
import { PropsWithChildren, useState } from 'react';

type Props = PropsWithChildren<{
    title: string;
    isOpen: boolean;
}>;

export const CollapsibleSection = ({ title, children, isOpen }: Props) => {
    const [open, setOpen] = useState(isOpen);

    return (
        <Collapsible.Root open={open} onOpenChange={setOpen} className="group/collapse">
            <div className="group relative inline-flex items-center justify-between text-[#D6D1E2] text-[1.21rem] mb-[1rem] after:content-[''] after:block after:absolute after:top-[45%] after:left-[-2.5rem] after:w-[1.8rem] after:h-[2px] after:bg-blue after:rounded-tr-[15px] after:rounded-br-[15px]">
                <Collapsible.Trigger asChild>
                    <button className="flex items-center gap-[1rem]">
                        <span>{title}</span>
                        <div className="flex items-center justify-center w-[1.29rem] h-[1.29rem] bg-[#605F764D] border border-[#605F764D] transition-all duration-300 group-hover:border-blue rounded-[4px]">
                            {open ? (
                                <ChevronUpIcon className="text-blue w-[1.14rem] h-[1.14rem]" />
                            ) : (
                                <ChevronDownIcon className="text-blue w-[1.14rem] h-[1.14rem]" />
                            )}
                        </div>
                    </button>
                </Collapsible.Trigger>
            </div>
            <Collapsible.Content>
                <div className="text-[#D6D1E2] mb-[2.35rem] group-[:last-of-type]/collapse:mb-[1rem]">{children}</div>
            </Collapsible.Content>
        </Collapsible.Root>
    );
};
