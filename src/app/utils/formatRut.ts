import { getFormattedNumber } from '@utils/formatNumber';

/**
 * The `formatRUT` function takes a RUT (Chilean identification number) as input and returns it in a
 * formatted string with a hyphen and uppercase DV (verification digit).
 * @param {string} rut - The `rut` parameter is a string representing a Chilean identification number,
 * also known as RUT (Rol Único Tributario).
 * @returns The function `formatRUT` returns a formatted RUT (Rol Único Tributario) string.
 */
export const formatRUT = (rut: string): string => {
	const id = rut.substring(0, rut.length - 1);
	let dv = rut.slice(-1);
	if (dv === 'k') {
		dv = dv.toUpperCase();
	}
	const formattedNumber = getFormattedNumber(id);
	return `${formattedNumber}-${dv}`;
};
