import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICrmSetting } from '../crm-setting.model';
import { CrmSettingService } from '../service/crm-setting.service';

@Injectable({ providedIn: 'root' })
export class CrmSettingRoutingResolveService implements Resolve<ICrmSetting | null> {
  constructor(protected service: CrmSettingService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICrmSetting | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((crmSetting: HttpResponse<ICrmSetting>) => {
          if (crmSetting.body) {
            return of(crmSetting.body);
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
