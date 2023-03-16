import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageClassComponent } from './page-class.component';

describe('PageClassComponent', () => {
  let component: PageClassComponent;
  let fixture: ComponentFixture<PageClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
