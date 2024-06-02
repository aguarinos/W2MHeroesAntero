import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort';
import { SuperheroesService } from '../../services/superheroes.service';

import { MatDialog } from '@angular/material/dialog';
import { Superhero } from 'src/app/models/super-heroe.model';
import { DeleteComponent } from '../delete/delete.component';


@Component({
  selector: 'app-list-heroes',
  templateUrl: './list-heroes.component.html',
  styleUrls: ['./list-heroes.component.css']
})
export class ListHeroesComponent {
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
      alert("Heroe borrado correctamente")
      this.cdr.detectChanges();
    })
    
}
}
