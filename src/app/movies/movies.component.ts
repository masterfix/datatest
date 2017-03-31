import { Movie } from './../shared/models/movie';
import { MovieService } from './../shared/movie.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  private movies: Movie[];

  constructor(private movieService: MovieService) { }

  ngOnInit() {

    this.movieService.getMovies().subscribe(movies => {
      console.log("#1 got movies from service:", movies);
      this.movies = movies;
    });

    this.movieService.getMovie(2).subscribe(movie => {
      console.log("got single movie:", movie);
    });

    this.movieService.getMovies().subscribe(movies => {
      console.log("#2 got movies from service:", movies);
    });

    this.movieService.getMovies().subscribe(movies => {
      console.log("#3 got movies from service:", movies);
    });

  }

}
