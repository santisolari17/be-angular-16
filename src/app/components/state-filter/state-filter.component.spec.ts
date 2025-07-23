import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { IState } from '@interfaces/state.interface';
import { StateFilterComponent } from './state-filter.component';

describe('StateFilterComponent', () => {
	let component: StateFilterComponent;
	let fixture: ComponentFixture<StateFilterComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [],
			imports: [StateFilterComponent, FormsModule],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(StateFilterComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	// Tests that selecting a state emits the stateSelected event with the selected state.
	it('test_select_state_emits_event', () => {
		const stateSelectedSpy = jest.spyOn(component.stateSelected, 'emit');
		const state: IState = { codigo: 1, glosa: 'test', tipo: 'test' };
		component.selection = state;
		component.selectState();
		expect(stateSelectedSpy).toHaveBeenCalledWith(state);
	});

	// Tests that the component initializes with a null selection and a list of states.
	it('test_initialization', () => {
		expect(component.selection).toBeNull();
		expect(component.states).toEqual([]);
	});

	// Tests that the component does emit the stateSelected event if the selection is null when selectState is called.
	it('test_select_state_null_selection', () => {
		const stateSelectedSpy = jest.spyOn(component.stateSelected, 'emit');
		component.selectState();
		expect(stateSelectedSpy).toHaveBeenCalled();
	});
});
