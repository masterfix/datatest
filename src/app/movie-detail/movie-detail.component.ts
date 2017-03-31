import { Movie } from './../shared/models/movie';
import { MovieService } from './../shared/movie.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  private movie: Movie;

  private previousMovie: Movie;
  private nextMovie: Movie;

  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit() {

    console.log("init of detail page");

    this.route.params.subscribe(params => {
      console.log("got params:", params);

      this.movieService.getMovie(params.id).subscribe(movie => {
        console.log("got movie detail for:", movie);
        this.movie = movie;

        this.movieService.getMovie(movie.id - 1).subscribe(movie => {
          this.previousMovie = movie
        }, error => this.previousMovie = null);

        this.movieService.getMovie(movie.id + 1).subscribe(movie => {
          this.nextMovie = movie
        }, error => this.nextMovie = null);

      }, error => console.error("got error:", error));

    });

  }

}
