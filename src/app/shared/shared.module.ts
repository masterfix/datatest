import { CacheService } from './cache-service';
import {MovieService} from './movie.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    MovieService,
    CacheService
  ]
})
export class SharedModule { }
