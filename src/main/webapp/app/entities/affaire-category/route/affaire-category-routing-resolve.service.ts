import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IAffaireCategory } from '../affaire-category.model';
import { AffaireCategoryService } from '../service/affaire-category.service';

@Injectable({ providedIn: 'root' })
export class AffaireCategoryRoutingResolveService implements Resolve<IAffaireCategory | null> {
  constructor(protected service: AffaireCategoryService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAffaireCategory | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((affaireCategory: HttpResponse<IAffaireCategory>) => {
          if (affaireCategory.body) {
            return of(affaireCategory.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
