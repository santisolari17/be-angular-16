import { of } from 'rxjs';
import { ExampleBffService } from './example-bff.service';
import { TestBed } from '@angular/core/testing';
import { HttpHandlerService } from './commons/http-handler.service';
import { ENDPOINTS } from '@utils/constants';

describe('ExampleBffService', () => {
	let service: ExampleBffService;
  let httpHandlerServiceMock: any;

  beforeEach(() => {
    httpHandlerServiceMock = {
      get: jest.fn(),
      post: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        ExampleBffService,
        { provide: HttpHandlerService, useValue: httpHandlerServiceMock }
      ]
    });

    service = TestBed.inject(ExampleBffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getSaldos', () => {
    it('should get companyChange and map the response', (done) => {
      const JWT = { jwt: "test" };
      jest.spyOn(httpHandlerServiceMock, 'post').mockReturnValue(of(JWT));

      service.getFilters().subscribe(() => {
        expect(httpHandlerServiceMock.post).toHaveBeenCalledWith('filtros', ENDPOINTS.getFilters, null);
        done();
      });
    });
  });
});
