import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Superhero } from '../models/super-heroe.model';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SuperheroesService } from '../services/superheroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from './delete/delete.component';
import { Observable, debounceTime, filter, tap } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-superheroes',
  templateUrl: './superheroes.component.html',
  styleUrls: ['./superheroes.component.css'],
})
export class SuperheroesComponent {
  displayColums = ['select', 'name', 'image', 'actions'];
  searchForm: FormGroup;

  superHeros: Superhero[] = [];
  superHerosFilter: Superhero[] = [];
  loading: boolean = false;

  constructor(
    private superHeroService: SuperheroesService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      searchBar: '',
    });
    this.loadSuperHeroes();
  }

  loadSuperHeroes() {
    this.superHeroService.getSuperHeroes().subscribe(
      (data: Superhero[]) => {
        this.superHeros = data;
        this.superHerosFilter = data;
      },
      () => alert('error al cargar la lista')
    );
  }
  ngOnInit() {
    this.searchForm
      .get('searchBar')
      ?.valueChanges.pipe(
        tap(() => (this.loading = true)),
        debounceTime(1000)
      )
      .subscribe((data) => {
        this.loading = false;
        if (data === '') {
          this.superHerosFilter = this.superHeros;
        } else {
          this.superHerosFilter = this.superHeros.filter((hero) =>
            hero.name.toLowerCase().includes(data.toLowerCase())
          );
        }
      });
  }

  searchClose() {
    this.searchForm.get('searchBar')?.setValue('');
  }
}
