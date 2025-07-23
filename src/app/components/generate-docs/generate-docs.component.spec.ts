import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenerateDocsComponent } from './generate-docs.component';
import { ExcelService } from '@services/documents/excel.service';
import { PdfService } from '@services/documents/pdf.service';
import { SignalsService } from '@services/signals.service';
import { AsdMenuButtonComponent, IconModule } from 'asd';
import { CommonModule } from '@angular/common';

class MockExcelService {
  createExcel = jest.fn();
}

class MockPdfService {
  createPdf = jest.fn();
}

describe('GenerateDocsComponent', () => {
  let component: GenerateDocsComponent;
  let fixture: ComponentFixture<GenerateDocsComponent>;
  let excelService: MockExcelService;
  let pdfService: MockPdfService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateDocsComponent, IconModule, AsdMenuButtonComponent, CommonModule],
      declarations: [],
      providers: [
        { provide: ExcelService, useClass: MockExcelService },
        { provide: PdfService, useClass: MockPdfService },
        SignalsService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GenerateDocsComponent);
    component = fixture.componentInstance;
    excelService = TestBed.inject(ExcelService) as unknown as MockExcelService;
    pdfService = TestBed.inject(PdfService) as unknown as MockPdfService;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createPdf when option is createPdf', () => {
    component.onOptionsSelected('createPdf');
    expect(pdfService.createPdf).toHaveBeenCalled();
  });

  it('should call createExcel when option is createExcel', () => {
    component.onOptionsSelected('createExcel');
    expect(excelService.createExcel).toHaveBeenCalled();
  });

  it('should not call any service when option is invalid', () => {
    component.onOptionsSelected('invalidOption');
    expect(pdfService.createPdf).not.toHaveBeenCalled();
    expect(excelService.createExcel).not.toHaveBeenCalled();
  });
});
