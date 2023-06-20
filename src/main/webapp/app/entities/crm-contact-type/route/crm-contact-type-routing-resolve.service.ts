import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICrmContactType } from '../crm-contact-type.model';
import { CrmContactTypeService } from '../service/crm-contact-type.service';

@Injectable({ providedIn: 'root' })
export class CrmContactTypeRoutingResolveService implements Resolve<ICrmContactType | null> {
  constructor(protected service: CrmContactTypeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICrmContactType | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((crmContactType: HttpResponse<ICrmContactType>) => {
          if (crmContactType.body) {
            return of(crmContactType.body);
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
