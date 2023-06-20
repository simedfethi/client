import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITransporter } from '../transporter.model';
import { TransporterService } from '../service/transporter.service';

@Injectable({ providedIn: 'root' })
export class TransporterRoutingResolveService implements Resolve<ITransporter | null> {
  constructor(protected service: TransporterService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITransporter | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((transporter: HttpResponse<ITransporter>) => {
          if (transporter.body) {
            return of(transporter.body);
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
