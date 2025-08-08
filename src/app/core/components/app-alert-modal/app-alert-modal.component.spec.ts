import { of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppAlertModalComponent } from './app-alert-modal.component';
import { AppAlertModalService } from './app-alert-modal.service';
import { AsdModalAlertComponent } from 'asd';

describe('AppAlertModalComponent', () => {
	let component: AppAlertModalComponent;
	let fixture: ComponentFixture<AppAlertModalComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [AppAlertModalComponent],
			imports: [AsdModalAlertComponent],
			providers: [{ provide: AppAlertModalService, useValue: { alertConfig$: of({ messages: [], title: '', status: 'warning' }) } }],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(AppAlertModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
