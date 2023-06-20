import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICrmWilaya } from '../crm-wilaya.model';
import { CrmWilayaService } from '../service/crm-wilaya.service';

@Injectable({ providedIn: 'root' })
export class CrmWilayaRoutingResolveService implements Resolve<ICrmWilaya | null> {
  constructor(protected service: CrmWilayaService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICrmWilaya | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((crmWilaya: HttpResponse<ICrmWilaya>) => {
          if (crmWilaya.body) {
            return of(crmWilaya.body);
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
