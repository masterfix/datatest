import { CacheService } from './cache-service';
import { Movie } from './models/movie';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ReplaySubject } from "rxjs/ReplaySubject";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from "@angular/http";

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

  public updateMovie(movie: Movie): Observable<boolean> {
    const data = JSON.stringify(movie);
    return this.http.put(BASE_URL + "/movies/" + movie.id, data, MovieService.getRequestOptionsJson()).map(response => {
      return true;
    });
  }

  public clearCache() {
    this.cache.clear();
  }

  private static getRequestOptionsJson(): RequestOptions {
    const headers = new Headers({'Accept': 'application/json', 'Content-Type': 'application/json'});
    return new RequestOptions({headers: headers});
  }

}
