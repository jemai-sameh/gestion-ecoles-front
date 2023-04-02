import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTeacherComponent } from './page-teacher.component';

describe('PageTeacherComponent', () => {
  let component: PageTeacherComponent;
  let fixture: ComponentFixture<PageTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageTeacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
