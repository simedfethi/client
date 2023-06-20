import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IProductvariante } from '../productvariante.model';
import { ProductvarianteService } from '../service/productvariante.service';

@Injectable({ providedIn: 'root' })
export class ProductvarianteRoutingResolveService implements Resolve<IProductvariante | null> {
  constructor(protected service: ProductvarianteService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProductvariante | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((productvariante: HttpResponse<IProductvariante>) => {
          if (productvariante.body) {
            return of(productvariante.body);
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
