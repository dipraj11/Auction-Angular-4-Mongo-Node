import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerTeamDetailsComponent } from './owner-team-details.component';

describe('OwnerTeamDetailsComponent', () => {
  let component: OwnerTeamDetailsComponent;
  let fixture: ComponentFixture<OwnerTeamDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerTeamDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerTeamDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
