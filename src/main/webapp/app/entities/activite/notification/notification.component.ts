import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActiviteService, RestActivite} from "../service/activite.service";
import {HttpClient, HttpResponse} from "@angular/common/http";
import { IActivite} from "../activite.model";
import dayjs from "dayjs/esm";
import {ApplicationConfigService} from "../../../core/config/application-config.service";
import {Account} from "../../../core/auth/account.model";
import {AccountService} from "../../../core/auth/account.service";
import {exNotification} from "../exnotification.model";


@Component({
  selector: 'jhi-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit{
  resourceUrl = this.applicationConfigService.getEndpointFor('api/activites');
  activiteCollection: exNotification[] = [];
  @Output() results = new EventEmitter<IActivite[]>();

  account: Account | null = null;

  constructor(
    protected activiteService:ActiviteService,
    protected http : HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    private accountService:AccountService
  ) {
  }
  ngOnInit(): void {
    (this.accountService.isAuthenticated())
    {
          this.loadNotification();

        }

  }
  loadNotification():void{

    const startdate=  dayjs().subtract(30,'day').toISOString();
    const enddate= dayjs().add(30,'day').toISOString();
    this.activiteService.query({
      'heureActivite.greaterThan': startdate ,
      'heureActivite.lessThan' : enddate
    }).subscribe({
      next: (res:HttpResponse<IActivite[]>)=>{
       this.activiteCollection= res.body ?? [] ;

      this.activiteCollection=this.activiteCollection.map((a) =>({
        ...a ,
        heureActiviteISO: dayjs(a.heureActivite).format('YYYY-MM-DDTHH:mm:ss')
      }) );

       this.sortActivities();
      }
    })
  }
  sortActivities():void{
    this.activiteCollection.sort((a,b)=> {
      if (!a.heureActivite) {return 0;}
      return a.heureActivite.diff(b.heureActivite);
    });
    this.results.emit(this.activiteCollection);
  }
  marquerLue(activite,event):void {
    event.preventDefault();
    activite.activiteVu=true;
    this.activiteService.partialUpdate(activite).subscribe();
    this.results.emit(this.activiteCollection);

  }
  marquerNonLue(activite,event):void {
    event.preventDefault();
    activite.activiteVu=false;
    this.activiteService.partialUpdate(activite).subscribe();
    this.results.emit(this.activiteCollection);

  }
  marquerAchever(activite,event):void {
    event.preventDefault();
    activite.activiteAcheve=true;
    activite.endDate=dayjs().toISOString();

    const copy = this.activiteService.convertDateFromClient(activite);
    this.http
      .patch<RestActivite>(`${this.resourceUrl}/${activite.id as number}`, copy, { observe: 'response' })
      .subscribe();

  }
  marquerNonAchever(activite,event):void {
    event.preventDefault();
    activite.activiteAcheve=false;
    activite.endDate=null;

    const copy = this.activiteService.convertDateFromClient(activite);
    this.http
      .patch<RestActivite>(`${this.resourceUrl}/${activite.id as number}`, copy, { observe: 'response' })
      .subscribe();

  }
  openRepousserActivite(activite,event):void {
    event.preventDefault();
     activite.scheduling=true;
  }
  repousserActivite(activite,event):void {
    event.preventDefault();
    activite.scheduling=false;
    activite.heureActivite=dayjs(activite.heureActiviteISO);
    const copy = this.activiteService.convertDateFromClient(activite);
    this.http
      .patch<RestActivite>(`${this.resourceUrl}/${activite.id as number}`, copy, { observe: 'response' })
      .subscribe();

     this.sortActivities();
  }




}
