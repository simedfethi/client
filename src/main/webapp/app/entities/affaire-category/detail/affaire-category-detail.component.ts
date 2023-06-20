import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAffaireCategory } from '../affaire-category.model';

@Component({
  selector: 'jhi-affaire-category-detail',
  templateUrl: './affaire-category-detail.component.html',
})
export class AffaireCategoryDetailComponent implements OnInit {
  affaireCategory: IAffaireCategory | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ affaireCategory }) => {
      this.affaireCategory = affaireCategory;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
