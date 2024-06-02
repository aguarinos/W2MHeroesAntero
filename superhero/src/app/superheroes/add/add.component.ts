import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Superhero } from 'src/app/models/super-heroe.model';
import { SuperheroesService } from 'src/app/services/superheroes.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnDestroy{

  private subscription?: Subscription
  constructor(private superHeroService: SuperheroesService,
    private router: Router
  ){
    
  }

  superHero : Superhero = {
  id: undefined,
  name: "",
  image: {
    url : ""
  },
  powerstats: {
    intelligence: "69",
    strength: "10",
    speed: "33",
    durability: "40",
    power: "37",
    combat: "50"
  }

}

  saveHero() {
   this.subscription=  this.superHeroService.createSuperHeroe(this.superHero).subscribe((data)=>{
      this.router.navigate(['superheroes'])
      alert("Heroe creado correctamente")
    })
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }

}
