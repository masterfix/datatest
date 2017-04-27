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

    /*
    let obs1 = this.movieService.getMovies();
    let obs2 = this.movieService.getMovies();
    let obs3 = this.movieService.getMovies();

    setTimeout(() => {
      console.log("timeout 1");

      obs1.subscribe(movies => {
      console.log("#2 got movies from service:", movies);

      setTimeout(() => {
        console.log("timeout 2");
          
        obs2.subscribe(movies => {
          console.log("#2 got movies from service:", movies);
        });

        this.movieService.getMovies().subscribe(movies => {
          console.log("#2.1 got movies from service:", movies);
        });

        setTimeout(() => {
          console.log("timeout 3");

          this.movieService.clearCache();

          obs2.subscribe(movies => {
            console.log("#22 got movies from service:", movies);
          });

          this.movieService.getMovies().subscribe(movies => {
            console.log("#4 got movies from service:", movies);
          }, error => console.error(error), () => console.log("completed"));

        }, 5000);

      }, 5000);

    });

    }, 5000);
    */

    
    
    this.movieService.getMovies().subscribe(movies => {
      console.log("#1 got movies from service:", movies);
      this.movies = movies;
    });

    this.movieService.getMovie(2).subscribe(movie => {
      console.log("got single movie:", movie);

      movie.name = "Passengers";
      movie.year = 2016;

      this.movieService.updateMovie(movie).subscribe(success => {
        console.log("movie has been updated...");
      })

    });

    this.movieService.getMovies().subscribe(movies => {
      console.log("#2 got movies from service:", movies);
    });

    this.movieService.getMovies().subscribe(movies => {
      console.log("#3 got movies from service:", movies);
    });
    
    


  }

}
