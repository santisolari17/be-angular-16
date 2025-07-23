import { TestBed } from '@angular/core/testing';
import { ModalErrorComponent } from './modal-error.component';
import { ErrorHandlerService } from '@services/commons/error-handler.service';

describe('ModalErrorComponent', () => {
  let component: ModalErrorComponent;
  let errorHandlerServiceMock: jest.Mocked<ErrorHandlerService>;

  beforeEach(() => {
    errorHandlerServiceMock = {
		handleError: jest.fn(), 
	} as unknown as jest.Mocked<ErrorHandlerService>;

    TestBed.configureTestingModule({
      imports: [ModalErrorComponent],
      providers: [
        { provide: ErrorHandlerService, useValue: errorHandlerServiceMock },
      ],
    });

    const fixture = TestBed.createComponent(ModalErrorComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should inject the ErrorHandlerService', () => {
    expect(component.errorHandler).toBe(errorHandlerServiceMock);
  });
});