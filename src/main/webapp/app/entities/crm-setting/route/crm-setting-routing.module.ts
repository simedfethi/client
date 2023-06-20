import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CrmSettingComponent } from '../list/crm-setting.component';
import { CrmSettingDetailComponent } from '../detail/crm-setting-detail.component';
import { CrmSettingUpdateComponent } from '../update/crm-setting-update.component';
import { CrmSettingRoutingResolveService } from './crm-setting-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const crmSettingRoute: Routes = [
  {
    path: '',
    component: CrmSettingComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CrmSettingDetailComponent,
    resolve: {
      crmSetting: CrmSettingRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CrmSettingUpdateComponent,
    resolve: {
      crmSetting: CrmSettingRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CrmSettingUpdateComponent,
    resolve: {
      crmSetting: CrmSettingRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(crmSettingRoute)],
  exports: [RouterModule],
})
export class CrmSettingRoutingModule {}
