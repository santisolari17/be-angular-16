import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ParentInteractorService } from 'beche-utils-lib';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

jest.mock('beche-utils-lib');

describe('AppComponent', () => {
  let component: AppComponent;
  let parentInteractorService: jest.Mocked<ParentInteractorService>;

  beforeEach(() => {
    const parentInteractorServiceMock = {
      setEnvironment: jest.fn(),
      startRefreshing: jest.fn(),
      startMonitorInstana: jest.fn().mockReturnValue(of(null)),
    };

    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: ParentInteractorService, useValue: parentInteractorServiceMock },
      ],
    });

    component = TestBed.createComponent(AppComponent).componentInstance;
    parentInteractorService = TestBed.inject(ParentInteractorService) as jest.Mocked<ParentInteractorService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct title', () => {
    expect(component.title).toBe('ejemplo-angular-web-app');
  });

  describe('ngOnInit', () => {
    it('should call setEnvironment with the correct environment', () => {
      component.ngOnInit();

      expect(parentInteractorService.setEnvironment).toHaveBeenCalledWith(environment);
    });

    it('should call startRefreshing if environment.production is true', () => {
      Object.defineProperty(environment, 'production', { value: true });
      component.ngOnInit();

      expect(parentInteractorService.startRefreshing).toHaveBeenCalled();
    });

    it('should not call startRefreshing if environment.production is false', () => {
      Object.defineProperty(environment, 'production', { value: false });
      component.ngOnInit();

      expect(parentInteractorService.startRefreshing).not.toHaveBeenCalled();
    });
  });
});
