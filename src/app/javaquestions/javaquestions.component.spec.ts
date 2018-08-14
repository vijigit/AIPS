import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JavaquestionsComponent } from './javaquestions.component';

describe('JavaquestionsComponent', () => {
  let component: JavaquestionsComponent;
  let fixture: ComponentFixture<JavaquestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JavaquestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JavaquestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
