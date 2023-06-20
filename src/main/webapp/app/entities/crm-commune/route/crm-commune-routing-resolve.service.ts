import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICrmCommune } from '../crm-commune.model';
import { CrmCommuneService } from '../service/crm-commune.service';

@Injectable({ providedIn: 'root' })
export class CrmCommuneRoutingResolveService implements Resolve<ICrmCommune | null> {
  constructor(protected service: CrmCommuneService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICrmCommune | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((crmCommune: HttpResponse<ICrmCommune>) => {
          if (crmCommune.body) {
            return of(crmCommune.body);
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
