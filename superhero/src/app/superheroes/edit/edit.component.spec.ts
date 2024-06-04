import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { EditComponent } from './edit.component';
import { SuperheroesService } from '../../services/superheroes.service';
import { SuperheroesModule } from '../superheroes.module';
import { Superhero } from 'src/app/models/super-heroe.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let mockRouter: any;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = { snapshot: { paramMap: { get: () => '1' } } };
    const mockSuperheroesService = {
      getSuperHeroeById: () =>
        of({
          id: '1',
          name: 'Superman',
          response: '',
          image: {
            url: '',
          },
          powerstats: {
            intelligence: '',
            strength: '',
            speed: '',
            durability: '',
            power: '',
            combat: '',
          },
        }),
    };

    await TestBed.configureTestingModule({
      declarations: [EditComponent],
      imports: [
        ReactiveFormsModule,
        SuperheroesModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: SuperheroesService, useValue: mockSuperheroesService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate form with hero data on initialization', () => {
    const mockHeroData = {
      id: '1',
      name: 'Superman',
      response: '',
      powerstats: {
        intelligence: '',
        strength: '',
        speed: '',
        durability: '',
        power: '',
        combat: '',
      },
      image: {
        url: '',
      },
    };
    const mockHeroData2 = {
      name: 'Superman',
      response: '',
      powerstats: {
        intelligence: '',
        strength: '',
        speed: '',
        durability: '',
        power: '',
        combat: '',
      },
      image: {
        url: '',
      },
    };

    component.ngOnInit();

    expect(component.heroData).toEqual(mockHeroData);
    expect(component.editHeroForm.value).toEqual(mockHeroData2);
  });
});
