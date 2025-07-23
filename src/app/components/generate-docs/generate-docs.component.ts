import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ExcelService } from '@services/documents/excel.service';
import { PdfService } from '@services/documents/pdf.service';
import { SignalsService } from '@services/signals.service';
import { AsdButtonComponent, AsdMenuButtonComponent, IconModule } from 'asd';

const ARANDANO = [IconModule, AsdButtonComponent, AsdMenuButtonComponent];

@Component({
	selector: 'be-generate-docs',
	standalone: true,
	imports: [...ARANDANO, NgIf, CommonModule],
	templateUrl: './generate-docs.component.html',
	styleUrls: ['./generate-docs.component.scss'],
})
export class GenerateDocsComponent {
	public signals: SignalsService = inject(SignalsService);
	private excelService = inject(ExcelService);
	private pdfService = inject(PdfService);

	public menuItems = [
		{ id: 'createPdf', icon: 'asd_file_pdf', label: 'A PDF' },
		{ id: 'createExcel', icon: 'asd_file_excel', label: 'A Excel' },
	];

	onOptionsSelected(option: string): void {
		if (option === 'createPdf') this.pdfService.createPdf();
		else if (option === 'createExcel') this.excelService.createExcel();
		return;
	}
}
