import { CacheService } from './cache-service';
import { Movie } from './models/movie';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ReplaySubject } from "rxjs/ReplaySubject";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Http } from "@angular/http";

const BASE_URL = "http://localhost:3000";

@Injectable()
export class MovieService {

  constructor(private http: Http, private cache: CacheService) { }

  public getMovies(): Observable<Movie[]> {
    return this.cache.cacheable<Movie[]>(() => {
      return this.http.get(BASE_URL + "/movies").map(response => {
        let movies = [];
        response.json().forEach(movie => {
          movies.push(Movie.fromJson(movie));
        });
        return movies;
      })
    }, "getMovies");
  }

  public getMovie(id: number): Observable<Movie> {
    return this.cache.cacheable<Movie>(() => {
      return this.http.get(BASE_URL + "/movies/" + id).map(response => {
        return Movie.fromJson(response.json());
      });
    }, "getMovie" + id);
  }

  public clearCache() {
    this.cache.clear();
  }

}
