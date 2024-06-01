import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Superhero } from '../models/super-heroe.model';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort';
import { SuperheroesService } from '../services/superheroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from './delete/delete.component';


@Component({
  selector: 'app-superheroes',
  templateUrl: './superheroes.component.html',
  styleUrls: ['./superheroes.component.css']
})
export class SuperheroesComponent {
  displayColums = ["select", "name", "image", "actions"]

  
  superHeros: Superhero[] = []
  dataSource = new MatTableDataSource(this.superHeros)
  selection =new SelectionModel(true, [])

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


constructor(private superHeroService:SuperheroesService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef

){
  this.loadSuperHeroes()
}

loadSuperHeroes() {
  this.superHeroService.getSuperHeroes().subscribe((data: Superhero[]) => {
    this.superHeros = data;
    this.dataSource.data = this.superHeros;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  });
}

  confirmDelete(id: number): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '250px',
      data: id
    }).afterClosed().subscribe((a)=>{
      this.loadSuperHeroes()
      this.cdr.detectChanges();
    })
    
}
}
