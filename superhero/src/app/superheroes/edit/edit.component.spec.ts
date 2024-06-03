import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { EditComponent } from './edit.component';
import { SuperheroesService } from '../../services/superheroes.service';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let mockRouter: any;
  let mockActivatedRoute: any;
  let mockSuperheroesService: jasmine.SpyObj<SuperheroesService>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = { snapshot: { paramMap: { get: () => '1' } } };
    mockSuperheroesService = jasmine.createSpyObj('SuperheroesService', [
      'getSuperHeroeById',
      'updateSuperHero',
    ]);

    await TestBed.configureTestingModule({
      declarations: [EditComponent],
      imports: [ReactiveFormsModule],
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
      id: '2',
      name: 'Superman',
      image: { url: 'superman.jpg' },
    };
    mockSuperheroesService.getSuperHeroeById.and.returnValue(of(mockHeroData));

    component.ngOnInit();

    expect(component.heroData).toEqual(mockHeroData);
    expect(component.editHeroForm.value).toEqual(mockHeroData);
  });
});
