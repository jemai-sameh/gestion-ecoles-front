import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSubjectComponent } from './page-subject.component';

describe('PageSubjectComponent', () => {
  let component: PageSubjectComponent;
  let fixture: ComponentFixture<PageSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageSubjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
