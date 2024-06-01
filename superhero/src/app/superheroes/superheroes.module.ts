import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperheroesRoutingModule } from './superheroes-routing.module';
import { SuperheroesComponent } from './superheroes.component';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { DeleteComponent } from './delete/delete.component';
import { EditComponent } from './edit/edit.component';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule} from '@angular/material/paginator'
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';






@NgModule({
  declarations: [
    SuperheroesComponent,
    AddComponent,
    ViewComponent,
    DeleteComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    SuperheroesRoutingModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class SuperheroesModule { }
