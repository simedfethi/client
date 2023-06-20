import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ActiviteComponent } from './list/activite.component';
import { ActiviteDetailComponent } from './detail/activite-detail.component';
import { ActiviteUpdateComponent } from './update/activite-update.component';
import { ActiviteDeleteDialogComponent } from './delete/activite-delete-dialog.component';
import { ActiviteRoutingModule } from './route/activite-routing.module';
import { ActivitePlayerComponent } from './activite-player/activite-player.component';
import { AutosizeModule } from 'ngx-autosize';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  imports: [SharedModule, ActiviteRoutingModule, AutosizeModule],
  declarations: [
    ActiviteComponent,
    ActiviteDetailComponent,
    ActiviteUpdateComponent,
    ActiviteDeleteDialogComponent,
    ActivitePlayerComponent,
    NotificationComponent,
  ],
  exports: [ActivitePlayerComponent, NotificationComponent],
})
export class ActiviteModule {}
