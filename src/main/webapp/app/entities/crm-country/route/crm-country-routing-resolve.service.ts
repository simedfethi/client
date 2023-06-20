import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICrmCountry } from '../crm-country.model';
import { CrmCountryService } from '../service/crm-country.service';

@Injectable({ providedIn: 'root' })
export class CrmCountryRoutingResolveService implements Resolve<ICrmCountry | null> {
  constructor(protected service: CrmCountryService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICrmCountry | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((crmCountry: HttpResponse<ICrmCountry>) => {
          if (crmCountry.body) {
            return of(crmCountry.body);
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
