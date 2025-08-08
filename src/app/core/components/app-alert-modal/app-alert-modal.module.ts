import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppAlertModalComponent } from './app-alert-modal.component';
import { AsdModalAlertComponent } from 'asd';

@NgModule({
	declarations: [AppAlertModalComponent],
	imports: [CommonModule, AsdModalAlertComponent],
	exports: [AppAlertModalComponent],
})
export class AppAlertModalModule {}
