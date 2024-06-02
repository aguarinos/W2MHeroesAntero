import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Superhero } from '../models/super-heroe.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SuperheroesService {

  private apiUrl ="http://localhost:3000/heroes"
  constructor(private httpClient: HttpClient) { 

  }

  createSuperHeroe(superHeroe: Superhero): Observable<Superhero>{
    return this.httpClient.post<Superhero>(this.apiUrl, superHeroe)
  }

  getSuperHeroes(): Observable<Superhero[]>{
    return this.httpClient.get<Superhero[]>(this.apiUrl)
  }

  getSuperHeroeById(id: string): Observable<Superhero>{
  const url = `${this.apiUrl}/${id}`
    return this.httpClient.get<Superhero>(url)
  }

  updateSuperHero(superHero: Superhero): Observable<Superhero>{
    const url = `${this.apiUrl}/${superHero.id}`
    return this.httpClient.put<Superhero>(url, superHero)
  }

  deleteSuperHeroe(id: string) : Observable<void>{
    const url = `${this.apiUrl}/${id}`
    return this.httpClient.delete<void>(url)
  }
}
