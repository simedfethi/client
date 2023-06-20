import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IEmailTemplate } from '../email-template.model';
import { EmailTemplateService } from '../service/email-template.service';

@Injectable({ providedIn: 'root' })
export class EmailTemplateRoutingResolveService implements Resolve<IEmailTemplate | null> {
  constructor(protected service: EmailTemplateService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEmailTemplate | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((emailTemplate: HttpResponse<IEmailTemplate>) => {
          if (emailTemplate.body) {
            return of(emailTemplate.body);
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
