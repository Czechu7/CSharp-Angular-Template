import { LuCalendarDays, LuReply } from 'react-icons/lu';
import { AvatarProfile } from '@/components/AvatarProfile/AvatarProfile.tsx';
import { ReactNode } from 'react';
import { DateTime } from 'luxon';
import './Comment.scss';

type Props = {
    username: string;
    avatarSrc: string;
    commentText: string;
    date: DateTime;
    reply: () => void;
    children?: ReactNode;
};

export const Comment = ({ username, avatarSrc, commentText, date, reply, children }: Props) => {
    return (
        <div className="comment-container flex flex-col max-w-[57rem]">
            <div className="comment flex flex-col border border-[#605F764D] px-[1.3rem] pt-[0.93rem] pb-[0.75rem] rounded-[0.86rem]">
                <div className="comment__row w-full flex items-center gap-[0.71rem]">
                    <div className="comment__user flex items-center gap-[0.71rem] flex-1 overflow-hidden">
                        <AvatarProfile src={avatarSrc} />
                        <p className="comment__user-name text-[#918F97] text-[0.93rem] leading-[1.43rem] truncate">
                            {username}
                        </p>
                    </div>
                    <div className="comment__date flex gap-[0.5rem] items-center text-[#918F97] text-[0.93rem]">
                        <LuCalendarDays className="h-[1rem] w-[1rem] text-blue shrink-0" />
                        <span className="text-[0.93rem] leading-[1.43rem]">{date.toFormat('yyyy-MM-dd')}</span>
                    </div>
                </div>
                <p className="comment__text text-[#DBDBEB] mt-[0.65rem] mb-[0.9rem] text-[0.93rem] leading-[1.23rem] break-all">
                    {commentText}
                </p>

                <div className="comment__reply flex items-center gap-[0.5rem] text-blue cursor-pointer" onClick={reply}>
                    <LuReply className="w-[1.3rem] h-auto" />
                    <span className="text-[0.86rem]">Odpowiedz</span>
                </div>
            </div>

            {children && <div className="comment-nested relative mt-[0.75rem] mb-[1rem] pl-[6.4rem]">{children}</div>}
        </div>
    );
};
