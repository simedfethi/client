import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IUniteMesure } from '../unite-mesure.model';
import { UniteMesureService } from '../service/unite-mesure.service';

@Injectable({ providedIn: 'root' })
export class UniteMesureRoutingResolveService implements Resolve<IUniteMesure | null> {
  constructor(protected service: UniteMesureService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IUniteMesure | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((uniteMesure: HttpResponse<IUniteMesure>) => {
          if (uniteMesure.body) {
            return of(uniteMesure.body);
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
