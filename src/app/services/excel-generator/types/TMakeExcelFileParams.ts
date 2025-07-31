import { TCorpotateHeaderDataBlock } from './TCorpotateHeaderDataBlock';

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
