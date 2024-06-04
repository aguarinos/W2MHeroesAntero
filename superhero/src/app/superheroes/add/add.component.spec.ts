import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComponent } from './add.component';
import { SuperheroesService } from 'src/app/services/superheroes.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Superhero } from 'src/app/models/super-heroe.model';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;
  let mockSuperheroesService: jasmine.SpyObj<SuperheroesService>;

  beforeEach(() => {
    mockSuperheroesService = jasmine.createSpyObj('SuperheroesService', [
      'createSuperHeroe',
    ]);
    mockSuperheroesService.createSuperHeroe.and.returnValue(of());

    TestBed.configureTestingModule({
      declarations: [AddComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        MatInputModule,
      ],
      providers: [
        { provide: SuperheroesService, useValue: mockSuperheroesService },
      ],
    });
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call createSuperHeroe when saveHero is called', () => {
    const superhero: Superhero = {
      id: '1',
      name: 'Superman',
      image: { url: 'https://example.com/superman.jpg' },
      powerstats: {
        intelligence: '69',
        strength: '10',
        speed: '33',
        durability: '40',
        power: '37',
        combat: '50',
      },
    };
    component.superHero = superhero;

    component.saveHero();

    expect(mockSuperheroesService.createSuperHeroe).toHaveBeenCalledWith(
      superhero
    );
  });
});
