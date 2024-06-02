import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { SuperheroesService } from 'src/app/services/superheroes.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {
  private subscription?: Subscription

  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private superHeroService:SuperheroesService
  ) {}

  onSiClick(): void {
    this. subscription = this.superHeroService.deleteSuperHeroe(this.data.toString()).subscribe()
    this.dialogRef.close();
  } 

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe()
    }
  }
}


