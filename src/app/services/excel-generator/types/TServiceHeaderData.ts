export type TServiceHeaderData = {
	subTitulo: string;
	tableBody: {
		nombre: string;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		valor: any;
	}[];
};
