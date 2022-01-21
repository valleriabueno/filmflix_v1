import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TmdbApiService {
  baseUrl = 'https://api.themoviedb.org/3/';

  options = {
    api_key: 'a94f9a145a387a40abcdd9a8830eefab',
    language: 'pt-BR'
  }

  constructor() { }
}
