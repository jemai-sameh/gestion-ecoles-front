import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageStudentComponent } from './page-student.component';

describe('PageStudentComponent', () => {
  let component: PageStudentComponent;
  let fixture: ComponentFixture<PageStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
