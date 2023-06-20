import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICrmContact } from '../crm-contact.model';
import { CrmContactService } from '../service/crm-contact.service';

@Injectable({ providedIn: 'root' })
export class CrmContactRoutingResolveService implements Resolve<ICrmContact | null> {
  constructor(protected service: CrmContactService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICrmContact | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((crmContact: HttpResponse<ICrmContact>) => {
          if (crmContact.body) {
            return of(crmContact.body);
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
