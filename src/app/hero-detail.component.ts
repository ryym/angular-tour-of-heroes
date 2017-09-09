import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { HeroService } from './hero.service';
import { Hero } from './hero';

@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html',
})
export class HeroDetailComponent {
  @Input() hero: Hero;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((pm: ParamMap) => {
        const heroId = Number(pm.get('id'))
        return this.heroService.getHero(heroId)
      })
      .subscribe(hero => this.hero = hero)
  }

  goBack() {
    this.location.back();
  }
}
