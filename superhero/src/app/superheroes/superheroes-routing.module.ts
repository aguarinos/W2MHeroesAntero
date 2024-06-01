import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperheroesComponent } from './superheroes.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { AddComponent } from './add/add.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

const routes: Routes = [{ path: '', component: SuperheroesComponent },
  {path: 'view/:id', component: ViewComponent},
  {path: 'edit/:id', component: EditComponent},
  {path: 'delete/:id', component: DeleteComponent},
  {path: 'add', component: AddComponent},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperheroesRoutingModule { }
