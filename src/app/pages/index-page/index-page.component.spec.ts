import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchPageComponent } from './index-page.component';
import { ExampleBffService } from '@services/example-bff.service';
import { SignalsService } from '@services/signals.service';
import { of } from 'rxjs';
import { IState } from '@interfaces/state.interface';
import { StateFilterComponent } from '@components/state-filter/state-filter.component';
import { NgIf } from '@angular/common';
import { AsdButtonComponent, AsdCardComponent } from 'asd';

class MockExampleBffService {
	getFilters() {
		return of({
			estados: [
				{ codigo: 1, glosa: 'glosa1', tipo: 'tipo2' },
				{ codigo: 2, glosa: 'glosa2', tipo: 'tipo2' },
			],
		});
	}
}

class MockSignalsService {
	showExportBtn = jest.fn();
}

describe('SearchPageComponent', () => {
	let component: SearchPageComponent;
	let fixture: ComponentFixture<SearchPageComponent>;
	let mockExampleBffService: MockExampleBffService;
	let mockSignalsService: MockSignalsService;

	beforeEach(() => {
		mockExampleBffService = new MockExampleBffService();
		mockSignalsService = new MockSignalsService();

		TestBed.configureTestingModule({
			imports: [SearchPageComponent, StateFilterComponent, NgIf, AsdButtonComponent, AsdCardComponent],
			declarations: [],
			providers: [
				{ provide: ExampleBffService, useValue: mockExampleBffService },
				{ provide: SignalsService, useValue: mockSignalsService },
			],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(SearchPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create the component', () => {
		expect(component).toBeTruthy();
	});

	it('should call getFilters on ngOnInit', () => {
		const spy = jest.spyOn(component, 'getFilters');
		component.ngOnInit();
		expect(spy).toHaveBeenCalled();
	});

	it('should update states when getFilters is called', () => {
		component.getFilters();
		expect(component.states.length).toBe(2);
		expect(component.states[0].glosa).toBe('glosa1');
	});

	it('should call showExcelBtn and showExportBtn when getFilters is called', () => {
		component.getFilters();
		expect(mockSignalsService.showExportBtn).toHaveBeenCalledWith(true);
	});

	it('should set stateSelected when saveStateSelected is called', () => {
		const state: IState = { codigo: 1, glosa: 'glosa', tipo: 'tipo' };
		component.saveStateSelected(state);
		expect(component.stateSelected).toBe(state);
	});
});
