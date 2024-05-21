import { Component, OnInit } from '@angular/core';
import { distinctUntilChanged, Observable, Subject, switchMap, debounceTime } from 'rxjs';
import { Hero } from '../shared/hero';
import { HeroService } from '../shared/hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent implements OnInit {

  heroes$!: Observable<Hero[]>
  private searchTerms = new Subject<string>()

  constructor(private heroService: HeroService) { }

  search(term: string): void {
    this.searchTerms.next(term)
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.heroService.searchHeroes(term))
    )
  }

}
