import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ListHeroesComponent } from './list-heroes.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SuperheroesService } from 'src/app/services/superheroes.service';
import { of } from 'rxjs';

describe('ListHeroesComponent', () => {
  let component: ListHeroesComponent;
  let fixture: ComponentFixture<ListHeroesComponent>;

  let mockSuperheroesService: jasmine.SpyObj<SuperheroesService>;

  beforeEach(() => {
    mockSuperheroesService = jasmine.createSpyObj('SuperheroesService', [
      'getSuperHeroes',
    ]);
    mockSuperheroesService.getSuperHeroes.and.returnValue(of([]));
    TestBed.configureTestingModule({
      declarations: [ListHeroesComponent],
      imports: [
        MatPaginatorModule,
        HttpClientTestingModule,
        MatDialogModule,
        MatCardModule,
        MatTableModule,
        BrowserAnimationsModule,
        MatIconModule,
      ],
      providers: [
        { provide: SuperheroesService, useValue: mockSuperheroesService },
        { provide: MatDialog, useValue: {} },
      ],
    });
    fixture = TestBed.createComponent(ListHeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load superheroes', () => {
    // Simulate loading superheroes
    const mockSuperheroes = [
      { id: '1', name: 'Superman' },
      { id: '2', name: 'Batman' },
    ];
    mockSuperheroesService.getSuperHeroes.and.returnValue(of(mockSuperheroes));

    // Call the loadSuperHeroes method
    component.loadSuperHeroes();

    // Verify that superheroes are correctly assigned to the data source
    expect(component.dataSource.data).toEqual(mockSuperheroes);
  });
});
