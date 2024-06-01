import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Superhero } from 'src/app/models/super-heroe.model';
import { SuperheroesService } from 'src/app/services/superheroes.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {

  superHeroDetails$ : Observable<Superhero> | undefined;

  constructor(private superHeroService: SuperheroesService,
    private route: ActivatedRoute
  ){
    this.superHeroDetails$ = this.superHeroService.getSuperHeroeById(parseInt(this.route.snapshot.paramMap.get("id") || ""))
  }
}
