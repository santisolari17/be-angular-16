export type TCorpotateHeaderDataBlock = {
	subtitle: string;
	dataRows: TCorpotateHeaderDataBlockRow[];
};

export type TCorpotateHeaderDataBlockRow = {
	rowTitle: string;
	rowValue: string;
};

export type TServiceHeaderData = {
	subTitulo: string;
	tableBody: {
		nombre: string;
		valor: unknown;
	}[];
};

export type TMakeExcelFileParams = {
	corporateHeaderSheetName: string;
	corpotateHeaderSheetDataBlock: TCorpotateHeaderDataBlock[];
	dataSheetName: string;
	dataSheetHeaders: string[];
	dataSheetRows: string[][];
	filename: string;
	addHeaderUserRutToFilename: boolean;
	addDateStringToFilename: boolean;
};

export interface IExcelGenerator {
	makeExcelFile(fileParams: TMakeExcelFileParams): void;
}
