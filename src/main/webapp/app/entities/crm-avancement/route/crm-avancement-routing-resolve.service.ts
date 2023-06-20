import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICrmAvancement } from '../crm-avancement.model';
import { CrmAvancementService } from '../service/crm-avancement.service';

@Injectable({ providedIn: 'root' })
export class CrmAvancementRoutingResolveService implements Resolve<ICrmAvancement | null> {
  constructor(protected service: CrmAvancementService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICrmAvancement | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((crmAvancement: HttpResponse<ICrmAvancement>) => {
          if (crmAvancement.body) {
            return of(crmAvancement.body);
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
