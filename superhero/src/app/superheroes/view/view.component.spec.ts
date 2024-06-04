import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewComponent } from './view.component';

import { SuperheroesService } from 'src/app/services/superheroes.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Superhero } from 'src/app/models/super-heroe.model';
import { ActivatedRoute } from '@angular/router';
describe('ViewComponent', () => {
  let component: ViewComponent;
  let fixture: ComponentFixture<ViewComponent>;
  let mockSuperheroesService: jasmine.SpyObj<SuperheroesService>;
  let mockActivatedRoute: any;
  beforeEach(() => {
    mockSuperheroesService = jasmine.createSpyObj('SuperheroesService', [
      'getSuperHeroeById',
    ]);
    mockSuperheroesService.getSuperHeroeById.and.returnValue(of());

    TestBed.configureTestingModule({
      declarations: [ViewComponent],
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
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get() {
                  return '1';
                },
              },
            },
          },
        },
      ],
    });
    fixture = TestBed.createComponent(ViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
