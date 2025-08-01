import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedAccountsListTestComponent } from './selected-accounts-list-test.component';

describe('SelectedAccountsListTestComponent', () => {
  let component: SelectedAccountsListTestComponent;
  let fixture: ComponentFixture<SelectedAccountsListTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SelectedAccountsListTestComponent]
    });
    fixture = TestBed.createComponent(SelectedAccountsListTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
