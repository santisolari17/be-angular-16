import { ExcelCabecera, ExcelDocument, ParentInteractorService } from 'beche-utils-lib';
import { ExcelGeneratorService } from './ExcelGenerator.service';
import { TMakeExcelFileParams } from './types/TMakeExcelFileParams';
import { environment } from 'src/environments/environment';

const MOCK_LOGIN_DATA = {
  personaNatural: {
    rut: '12241017',
    digito: 'K',
  },
  personaEmpresa: {
    rut: '60805000',
    digito: '0',
  },
  rut: '12241017',
  digitoVerificador: 'K',
  idSesion: 'fb9b2461-ee52-4fec-8516-e1df4aaf14e9',
  extra: {
    nombreUsuario: 'CLIENTE DE PRUEBA CHRIS',
    razonSocial: 'ZXOSX',
    nombreDeFantasia: 'UMBRELLA CORP',
    nombreEjecutivo: 'ALBERT WESKER',
    emailEjecutivo: 'AWESKER',
    codOficina: '1',
    oficina: 'STGO. PRINCIPAL',
  },
  iat: 1732126975,
  exp: 2732134175,
  canal: 'NWE',
  token:
    'ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SndaWEp6YjI1aFRtRjBkWEpoYkNJNmV5SnlkWFFpT2lJeE1qSTBNVEF4TnlJc0ltUnBaMmwwYnlJNklrc2lmU3dpY0dWeWMyOXVZVVZ0Y0hKbGMyRWlPbnNpY25WMElqb2lOakE0TURVd01EQWlMQ0prYVdkcGRHOGlPaUl3SW4wc0luSjFkQ0k2SWpFeU1qUXhNREUzSWl3aVpHbG5hWFJ2Vm1WeWFXWnBZMkZrYjNJaU9pSkxJaXdpYVdSVFpYTnBiMjRpT2lKbVlqbGlNalEyTVMxbFpUVXlMVFJtWldNdE9EVXhOaTFsTVdSbU5HRmhaakUwWlRraUxDSmxlSFJ5WVNJNmV5SnViMjFpY21WVmMzVmhjbWx2SWpvaVEweEpSVTVVUlNCRVJTQlFVbFZGUWtFZ1JsSkJUa05KVTBOUElpd2ljbUY2YjI1VGIyTnBZV3dpT2lKYVdFOVRXQ0lzSW01dmJXSnlaVVJsUm1GdWRHRnphV0VpT2lKVVJWTlBVa1ZTU1VFZ1IxSkJUQ0JFUlNCTVFTQlNSVkJWUWt4SlEwRWlMQ0p1YjIxaWNtVkZhbVZqZFhScGRtOGlPaUpXU1VSQlRDQlNUMFJTU1VkVlJWb2lMQ0psYldGcGJFVnFaV04xZEdsMmJ5STZJa05XU1VSQlRDSXNJbU52WkU5bWFXTnBibUVpT2pFc0ltOW1hV05wYm1FaU9pSlRWRWRQTGlCUVVrbE9RMGxRUVV3aWZTd2lhV0YwSWpveE56TXlNVEkyT1RjMUxDSmxlSEFpT2pJM016SXhNelF4TnpVc0ltTmhibUZzSWpvaVRsZEZJbjAub0FJTVBVU3lLbmdpaE5HUXgtMC1VSlRSLXE4SGxJV1I2Sk5tS0tYUnNGbw==',
};

describe('ExcelGenerator Service test cases', () => {
  const parentInteractorServiceMock = {
    getLoginData: jest.fn().mockReturnValue(MOCK_LOGIN_DATA),
  };

  const excelDriverMock: Partial<ExcelDocument> = {
    addHojaFormato1Multi: jest.fn(),
    addHojaFormato1: jest.fn(),
    addHojaData: jest.fn(),
    download: jest.fn(),
  };

  const headerMock: ExcelCabecera = {
    nombreEmpresa: 'BusinessName',
    rutEmpresa: '77.777.777-K',
    nombreUsuario: 'User Name',
    rutUsuario: '11.111.111-1',
    ejecutivo: 'John Doe',
    oficina: 'The Office 123',
    telefono: '555-555-5555',
    correo: 'some@mail.com',
  };

  const dataSheetHeadersMock = ['Column1Header', 'Column2Header', 'Column3Header'];
  const dataSheetRowsMock = [
    ['Row1Column1', 'Row1Column2', 'Row1Column3'],
    ['Row2Column1', 'Row2Column2', 'Row2Column3'],
    ['Row3Column1', 'Row3Column2', 'Row3Column3'],
  ];

  const makeExcelFileParamsMock: TMakeExcelFileParams = {
    corporateHeaderSheetName: 'header-sheet-name',
    dataSheetName: 'data-sheet-name',
    dataSheetHeaders: dataSheetHeadersMock,
    dataSheetRows: dataSheetRowsMock,
    filename: 'thefilename',
    addHeaderUserRutToFilename: false,
    addDateStringToFilename: false,
    corpotateHeaderSheetDataBlock: [],
  };

  let service: ExcelGeneratorService;

  beforeEach(() => {
    service = new ExcelGeneratorService(parentInteractorServiceMock as unknown as ParentInteractorService);
    Reflect.set(service, '_driver', excelDriverMock);
    environment.mockEnvironment = true;

    jest.resetAllMocks();
  });

  it('Should create', () => {
    expect(service).toBeTruthy();
  });

  describe('makeExcelFile method', () => {
    it(`Should call the driver's "addHojaFormato1Multi" methods with the corresponding properties of "TMakeExcelFileParams"`, () => {
      const expectedParamsInOrder = [makeExcelFileParamsMock.corporateHeaderSheetName, service['_corporateHeader'], []];

      service.makeExcelFile(makeExcelFileParamsMock);

      expect(excelDriverMock.addHojaFormato1Multi).toHaveBeenCalledWith(...expectedParamsInOrder);
    });

    it(`Should call the driver's "addHojaData" methods with the corresponding properties of "TMakeExcelFileParams"`, () => {
      const expectedParamsInOrder = [
        makeExcelFileParamsMock.dataSheetName,
        makeExcelFileParamsMock.dataSheetHeaders,
        makeExcelFileParamsMock.dataSheetRows,
      ];

      service.makeExcelFile(makeExcelFileParamsMock);

      expect(excelDriverMock.addHojaData).toHaveBeenCalledWith(...expectedParamsInOrder);
    });

    describe('Download method call and filename variants', () => {
      it(`Filename should be only the filename if "addHeaderUserRutToFilename" and "addDateStringToFilename" are set to false`, () => {
        const mockFilename = 'someFileName';
        const expectedFilename = mockFilename;

        const justFilenameParams: TMakeExcelFileParams = {
          ...makeExcelFileParamsMock,
          filename: mockFilename,
          addHeaderUserRutToFilename: false,
          addDateStringToFilename: false,
        };

        service.makeExcelFile(justFilenameParams);

        expect(excelDriverMock.download).toHaveBeenCalledWith(expectedFilename);
      });

      it(`Filename should have the user RUT if "addHeaderUserRutToFilename" is true`, () => {
        const mockFilename = 'someFileName';
        const expectedFilename = `someFileName_${MOCK_LOGIN_DATA.personaNatural.rut}${MOCK_LOGIN_DATA.personaNatural.digito}`;

        const rutFilenameParams: TMakeExcelFileParams = {
          ...makeExcelFileParamsMock,
          filename: mockFilename,
          addHeaderUserRutToFilename: true,
          addDateStringToFilename: false,
        };

        service.makeExcelFile(rutFilenameParams);

        expect(excelDriverMock.download).toHaveBeenCalledWith(expectedFilename);
      });

      it(`Filename should have current date in string format if "addDateStringToFilename" is true`, () => {
        let originalDateConstructor = Date;
        const mockCurrentDate = '1999-09-22T13:30:10';
        (globalThis as any).Date = jest.fn(() => new originalDateConstructor(mockCurrentDate)) as unknown as typeof Date;

        const mockFilename = 'someFileName';
        const expectedFilename = `someFileName_19990922133010`;

        const dateFilenameParams: TMakeExcelFileParams = {
          ...makeExcelFileParamsMock,
          filename: mockFilename,
          addHeaderUserRutToFilename: false,
          addDateStringToFilename: true,
        };

        service.makeExcelFile(dateFilenameParams);

        expect(excelDriverMock.download).toHaveBeenCalledWith(expectedFilename);

        (globalThis as any).Date = originalDateConstructor;
      });

      it(`Filename should have current date and user rut in string format if both "addDateStringToFilename" and "addHeaderUserRutToFilename" are true`, () => {
        let originalDateConstructor = Date;
        const mockCurrentDate = '1999-09-22T13:30:10';
        (globalThis as any).Date = jest.fn(() => new originalDateConstructor(mockCurrentDate)) as unknown as typeof Date;

        const mockFilename = 'someFileName';
        const expectedFilename = `someFileName_${MOCK_LOGIN_DATA.personaNatural.rut}${MOCK_LOGIN_DATA.personaNatural.digito}_19990922133010`;

        const rutAndDateFilenameParams: TMakeExcelFileParams = {
          ...makeExcelFileParamsMock,

          filename: mockFilename,
          addHeaderUserRutToFilename: true,
          addDateStringToFilename: true,
        };

        service.makeExcelFile(rutAndDateFilenameParams);

        expect(excelDriverMock.download).toHaveBeenCalledWith(expectedFilename);

        (globalThis as any).Date = originalDateConstructor;
      });
    });

    describe('Error cases', () => {
      it('Should throw the corresponding error when the data row arrays are not all of the same size', () => {
        const dataSheetHeadersMock = ['Column1Header', 'Column2Header', 'Column3Header'];
        const dataSheetRowsMock = [
          ['Row1Column1', 'Row1Column2', 'Row1Column3'],
          ['Row2Column1', 'Row2Column2'],
          ['Row3Column1', 'Row3Column2', 'Row3Column3'],
        ];

        const paramsMock: TMakeExcelFileParams = {
          ...makeExcelFileParamsMock,
          dataSheetRows: dataSheetRowsMock,
          dataSheetHeaders: dataSheetHeadersMock,
        };

        expect(() => service.makeExcelFile(paramsMock)).toThrow(
          new Error('[ExcelGeneratorService] All data rows must be of the same length')
        );
      });

      it('Should throw the corresponding error when the data row headers are not of the same size as the rows', () => {
        const dataSheetHeadersMock = ['Column1Header', 'Column2Header'];
        const dataSheetRowsMock = [
          ['Row1Column1', 'Row1Column2', 'Row1Column3'],
          ['Row2Column1', 'Row2Column2', 'Row2Column3'],
          ['Row3Column1', 'Row3Column2', 'Row3Column3'],
        ];

        const paramsMock: TMakeExcelFileParams = {
          ...makeExcelFileParamsMock,
          dataSheetRows: dataSheetRowsMock,
          dataSheetHeaders: dataSheetHeadersMock,
        };

        expect(() => service.makeExcelFile(paramsMock)).toThrow(
          new Error('[ExcelGeneratorService] Data headers must be of the same length as each data row.')
        );
      });
    });
  });
});
