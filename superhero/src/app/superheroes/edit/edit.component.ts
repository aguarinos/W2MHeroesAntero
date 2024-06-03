import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Superhero } from 'src/app/models/super-heroe.model';
import { SuperheroesService } from 'src/app/services/superheroes.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent {
  private subscription?: Subscription;

  editHeroForm: FormGroup;

  heroData?: Superhero;

  constructor(
    private fb: FormBuilder,
    private router: ActivatedRoute,
    private route: Router,
    private superHeroService: SuperheroesService
  ) {
    this.editHeroForm = this.fb.group({
      response: [''],
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(3),
        ],
      ],
      powerstats: this.fb.group({
        intelligence: ['', Validators.required],
        strength: ['', Validators.required],
        speed: ['', Validators.required],
        durability: ['', Validators.required],
        power: ['', Validators.required],
        combat: ['', Validators.required],
      }),
      image: this.fb.group({
        url: ['', [Validators.required, this.pngUrlValidator.bind(this)]],
      }),
    });
  }

  pngUrlValidator(control: AbstractControl): ValidationErrors | null {
    const url = control.value as string;
    if (url && !url.toLowerCase().endsWith('.jpg')) {
      return { invalidFormat: 'La URL debe terminar con .png' };
    }
    return null;
  }
  ngOnInit() {
    const id = this.router.snapshot.paramMap.get('id') || '';
    this.superHeroService.getSuperHeroeById(id).subscribe({
      next: (data) => {
        this.heroData = data;
        this.editHeroForm?.patchValue(this.heroData);
      },
      error: () => {
        alert('Error, ha ocurrido algo inesperado');
      },
    });
  }
  onSubmit() {
    if (this.editHeroForm.valid) {
      const updateFormData: Superhero = {
        ...this.editHeroForm.value,
        id: parseInt(this.router.snapshot.paramMap.get('id') || ''),
      };
      this.subscription = this.superHeroService
        .updateSuperHero(updateFormData)
        .subscribe(() => {
          this.route.navigate(['superheroes']);
          alert('Heroe editado correctamente');
        });
    }
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
