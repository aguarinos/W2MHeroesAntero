import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SuperheroesComponent } from './superheroes.component';
import { MatToolbarModule } from '@angular/material/toolbar';

describe('SuperheroComponent', () => {
  let component: SuperheroesComponent;
  let fixture: ComponentFixture<SuperheroesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuperheroesComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, MatToolbarModule],
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

  it('should apply filter when input value changes', () => {
    component.superHeros = [
      { id: '1', name: 'Superman' },
      { id: '2', name: 'Batman' },
    ];
    const searchBar = component.searchForm.get('searchBar');
    searchBar?.setValue('Super');

    fixture.detectChanges();

    expect(component.superHerosFilter.length).toBe(1);
    expect(component.superHerosFilter[0].name).toBe('Superman');
  });

  it('should apply filter when input value changes to empty string', () => {
    component.superHeros = [
      { id: '1', name: 'Superman' },
      { id: '2', name: 'Batman' },
    ];
    const searchBar = component.searchForm.get('searchBar');
    searchBar?.setValue('');

    fixture.detectChanges();

    expect(component.superHerosFilter.length).toBe(2);
  });
});
