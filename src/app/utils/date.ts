import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/es';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import isToday from 'dayjs/plugin/isToday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import isYesterday from 'dayjs/plugin/isYesterday';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

const tz = 'America/Santiago';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);
dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(isBetween);
dayjs.extend(isYesterday);
dayjs.extend(isToday);
dayjs.extend(isTomorrow);
dayjs.extend(relativeTime);
dayjs.locale('es');
dayjs.tz.setDefault(tz);

/**
 * The function getCurrentDate returns the current date and time.
 */
const getCurrentDate = (): Dayjs => dayjs();

/**
 * The `formatDate` function formats a given date object or the current date in a specified format
 * using the Dayjs library.
 * @param {string} format - A string representing the desired format for the date. It can include
 * placeholders such as "YYYY" for the year, "MM" for the month, "DD" for the day, and so on.
 * @param {Dayjs} [date] - The `date` parameter is an optional parameter of type `Dayjs`. It represents
 * the date that you want to format. If no `date` is provided, the current date and time will be used
 * instead.
 */
const formatDate = (format: string, date?: Dayjs): string => (date ? date.format(format) : dayjs().format(format));

/**
 * The function `validateAfterOrBeforeDate` checks if an initial date is after or before a final date
 * based on the specified type.
 * @param {Dayjs} initialDate - The initialDate parameter is a Dayjs object representing the starting
 * date for comparison.
 * @param {Dayjs} finalDate - The `finalDate` parameter is a `Dayjs` object representing the date that
 * you want to compare with the `initialDate`.
 * @param {'after' | 'before'} type - The `type` parameter is a string that can have two possible
 * values: 'after' or 'before'. It determines whether the validation should check if the `initialDate`
 * is after the `finalDate` (if `type` is 'after') or if the `finalDate` is before
 */
const validateAfterOrBeforeDate = (initialDate: Dayjs, finalDate: Dayjs, type: 'after' | 'before'): boolean =>
	type === 'after' ? initialDate.isAfter(finalDate) : finalDate.isBefore(initialDate);

export { dayjs, formatDate, getCurrentDate, validateAfterOrBeforeDate };
