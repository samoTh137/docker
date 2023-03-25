import { HttpClientModule } from '@angular/common/http';
import { HtmlTagDefinition } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DbService } from '../db-service';

import { OverviewComponent } from './overview.component';

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;

  let service: DbService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewComponent ],
      providers: [ DbService ],
      imports: [HttpClientModule]
    })
    .compileComponents();

    service = TestBed.inject(DbService);
    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should store recieved applications in an array', () => {
  });
});
