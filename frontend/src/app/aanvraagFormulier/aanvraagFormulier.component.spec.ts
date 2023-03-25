import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule} from '@angular/common/http'
import { AanvraagFormulierComponent } from './aanvraagFormulier.component';
import { FormsModule } from '@angular/forms';

describe('AanvraagFormulierComponent', () => {
  let component: AanvraagFormulierComponent;
  let fixture: ComponentFixture<AanvraagFormulierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AanvraagFormulierComponent ],
      imports : [HttpClientModule, FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AanvraagFormulierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
