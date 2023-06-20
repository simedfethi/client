import {Component, Input, OnInit} from '@angular/core';
import {SendmailComponent} from "../../customer/sendmail/sendmail.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TypeActivite} from "../../enumerations/type-activite.model";
import dayjs from "dayjs/esm";
import {IActivite, NewActivite} from "../activite.model";
import {ActiviteService} from "../service/activite.service";
import {HttpResponse} from "@angular/common/http";
import {FilterOptions, IFilterOptions} from "../../../shared/filter/filter.model";
import {PAGE_HEADER, TOTAL_COUNT_RESPONSE_HEADER} from "../../../config/pagination.constants";
import {tap} from "rxjs";
import {ASC, DESC} from "../../../config/navigation.constants";

@Component({
  selector: 'jhi-activite-player',
  templateUrl: './activite-player.component.html',
  styleUrls: ['./activite-player.component.scss']
})
export class ActivitePlayerComponent implements OnInit {

  @Input() customer: any;
  sms='';
  comment='';
  tachecontent='';
  activitytype='';
  heureActiviteISO='';
  activiteCollection: IActivite[] = [];

  isLoading = false;

  predicate = 'id';
  ascending = false;
  filters: IFilterOptions = new FilterOptions();
  itemsPerPage =2;// ITEMS_PER_PAGE;
  totalItems = 0;
  page = 0;

  constructor(
   protected modalService:NgbModal,
   protected activiteService:ActiviteService,
  ) { }

  ngOnInit(): void {
     if (this.customer) {
       this.activitebyCustomerByid();
     }
  }

  activitebyCustomerByid() : void
  {
    this.isLoading = true;
    const queryObject: any = {
      page: this.page,
      size: this.itemsPerPage,
      sort: this.getSortQueryParam(this.predicate, this.ascending),
      'clientId.equals':this.customer?.id ,
    };

    this.activiteService.query(queryObject)
      .pipe(tap(() => (this.isLoading = false)))
      .subscribe({
      next: (res:HttpResponse<IActivite[]>)=>{
        const re= res.body ?? [];
        re.forEach((c)=> { this.activiteCollection.push(c)});
        const page = res.headers.get(PAGE_HEADER);
        this.page = this.page+1;
        this.totalItems = Number(res.headers.get(TOTAL_COUNT_RESPONSE_HEADER));
      }
    })
  }
  logdata():void {
    this.activitebyCustomerByid();
    console.log({total:this.totalItems,page:this.page,size:this.itemsPerPage})
  }


  openmodalEmail() :void {
    const modalRef = this.modalService.open(SendmailComponent, { size:'xl', backdrop: 'static' });
    modalRef.componentInstance.customer = this.customer;

  }
  setStatusSms() :void {
    this.activitytype='SMS';
  }
  setStatusComment() :void {
    this.activitytype='COMMENT';
  }
  setStatustache() :void {
    this.activitytype='TACHE';
  }
  insertCustomerActivity() :void
  {

    const xx= {
      client:this.customer,
      typeactivite:TypeActivite.SMS,
      note:this.sms,
      heureActivite:dayjs(),
    } as NewActivite;

    if (this.activitytype==='SMS') {
      xx.typeactivite=TypeActivite.SMS;
      xx.note=this.sms;
    }
    if (this.activitytype==='COMMENT') {
      xx.typeactivite=TypeActivite.COMMENTAIRE;
      xx.note=this.comment;
    }
    if (this.activitytype==='TACHE') {
      xx.typeactivite=TypeActivite.TACHE;
      xx.heureActivite=dayjs(this.heureActiviteISO);

      xx.note=this.tachecontent;
    }

    this.activiteService.create(xx).subscribe({
      next: (res)=> {
        console.log(res.body);
        this.activiteCollection.push(res.body as IActivite);
        this.sms='';

        //this.activitebyCustomerByid();
      }
    });
  }

  protected getSortQueryParam(predicate = this.predicate, ascending = this.ascending): string[] {
    const ascendingQueryParam = ascending ? ASC : DESC;
    if (predicate === '') {
      return [];
    } else {
      return [predicate + ',' + ascendingQueryParam];
    }
  }

}
