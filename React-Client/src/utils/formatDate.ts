import { DateTime } from 'luxon';

export const formatDate = (date: Date | DateTime | undefined | null) => {
    if (!date) return '';
    const isoDate = date instanceof Date ? date.toISOString() : date.toString();
    return DateTime.fromISO(isoDate).toFormat('yyyy.MM.dd');
};

export const getDaysFromNow = (date: Date | DateTime | undefined | null) => {
    if (!date) return NaN;
    const isoDate = date instanceof Date ? date.toISOString() : date.toString();
    const targetDate = DateTime.fromISO(isoDate);
    const currentDate = DateTime.now();
    return Math.round(targetDate.diff(currentDate, 'days').days);
};
