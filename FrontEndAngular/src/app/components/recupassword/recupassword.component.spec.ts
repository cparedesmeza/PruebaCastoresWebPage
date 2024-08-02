import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecupasswordComponent } from './recupassword.component';

describe('RecupasswordComponent', () => {
  let component: RecupasswordComponent;
  let fixture: ComponentFixture<RecupasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecupasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecupasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
