import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppAlertModalComponent } from '../app-alert-modal.component';
import { appAlertModalServiceMock } from './app-alert-modal.mocks';
import { AppAlertModalService } from '../app-alert-modal.service';

describe('AppAlertModalComponent', () => {
	let component: AppAlertModalComponent;
	let fixture: ComponentFixture<AppAlertModalComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [AppAlertModalComponent],
			providers: [{ provide: AppAlertModalService, useValue: appAlertModalServiceMock }],
			schemas: [CUSTOM_ELEMENTS_SCHEMA],
		});
		fixture = TestBed.createComponent(AppAlertModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		return Promise.resolve();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have the correct initial params', () => {
		expect(component.showModal).toEqual(false);
		expect(component['_initialRun']).toEqual(false);
		expect(component.alertConfig()).toEqual(appAlertModalServiceMock.alertConfig());
		expect(component.messages()).toEqual(appAlertModalServiceMock.alertConfig().messages);
	});

	it('should set "showModal" to true after the first effect run', () => {
		component['_mainEffectAction']();
		expect(component.showModal).toEqual(true);
	});

	it('should emit an output value when the modal is closed', () => {
		const emitSpy = jest.spyOn(component.modalClosed, 'emit');

		component.closeModalHanlder();

		expect(emitSpy).toHaveBeenCalledWith({ closed: true });
	});
});
