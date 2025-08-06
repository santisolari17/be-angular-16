import { InjectionToken, Provider } from '@angular/core';
import { IExcelGenerator } from '@interfaces';
import { ExcelGeneratorService } from './implementations/excel-generator.service';

export const EXCEL_GENERATOR_SERVICE_TOKEN = new InjectionToken<IExcelGenerator>('ExcelGenerator');

export const EXCEL_GENERATOR_SERVICE_PROVIDER: Provider = {
	provide: EXCEL_GENERATOR_SERVICE_TOKEN,
	useExisting: ExcelGeneratorService,
};
