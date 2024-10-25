import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsGridFormComponent } from './transactions-grid-form.component';

describe('TransactionsGridFormComponent', () => {
  let component: TransactionsGridFormComponent;
  let fixture: ComponentFixture<TransactionsGridFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsGridFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsGridFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
