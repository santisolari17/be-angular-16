/**
 * The function `getFormattedNumber` takes a string value, parses it as a number, and returns a
 * formatted string representation of the number with German number formatting.
 * @param {string} value - A string representing a number that needs to be formatted.
 * @returns The function `getFormattedNumber` returns a string that represents the formatted number.
 */
export const getFormattedNumber = (value: string): string => {
	const parsed = Number(value);
	const formatted = parsed.toLocaleString('de-DE');
	return String(formatted.split(',').join('.'));
};
