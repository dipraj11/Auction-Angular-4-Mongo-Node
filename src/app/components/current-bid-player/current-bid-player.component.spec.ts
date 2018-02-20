import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentBidPlayerComponent } from './current-bid-player.component';

describe('CurrentBidPlayerComponent', () => {
  let component: CurrentBidPlayerComponent;
  let fixture: ComponentFixture<CurrentBidPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentBidPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentBidPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
