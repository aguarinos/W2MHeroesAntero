import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SuperheroesComponent } from './superheroes.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SuperheroesModule } from './superheroes.module';
import { ActivatedRoute } from '@angular/router';

describe('SuperheroComponent', () => {
  let component: SuperheroesComponent;
  let fixture: ComponentFixture<SuperheroesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuperheroesComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatToolbarModule,
        SuperheroesModule,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: {} }, // Proporciona un mock de ActivatedRoute
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperheroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply filter when input value changes', fakeAsync(() => {
    component.superHeros = [
      { id: '1', name: 'Superman' },
      { id: '2', name: 'Batman' },
    ];
    component.ngOnInit(); // Llama a ngOnInit para configurar las suscripciones

    const searchBar = component.searchForm.get('searchBar');
    searchBar?.setValue('Super');

    fixture.detectChanges();
    tick(1000); // Simula el paso del tiempo necesario para debounceTime

    fixture.detectChanges();

    expect(component.superHerosFilter.length).toBe(1);
    expect(component.superHerosFilter[0].name).toBe('Superman');
  }));

  it('should apply filter when input value changes to empty string', fakeAsync(() => {
    component.superHeros = [
      { id: '1', name: 'Superman' },
      { id: '2', name: 'Batman' },
    ];
    component.superHerosFilter = component.superHeros; // Asegúrate de que superHerosFilter esté inicializado
    component.ngOnInit(); // Asegúrate de llamar a ngOnInit para configurar las suscripciones

    const searchBar = component.searchForm.get('searchBar');
    searchBar?.setValue('');

    fixture.detectChanges();
    tick(1000); // Simula el paso del tiempo necesario para debounceTime

    fixture.detectChanges();

    expect(component.superHerosFilter.length).toBe(2);
  }));
});
