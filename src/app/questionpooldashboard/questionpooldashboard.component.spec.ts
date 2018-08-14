import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionpooldashboardComponent } from './questionpooldashboard.component';

describe('QuestionpooldashboardComponent', () => {
  let component: QuestionpooldashboardComponent;
  let fixture: ComponentFixture<QuestionpooldashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionpooldashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionpooldashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
