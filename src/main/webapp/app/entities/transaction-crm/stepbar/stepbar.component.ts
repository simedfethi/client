import {AfterViewInit, Component, Input, OnInit, Renderer2} from '@angular/core';
import {TransactionEtapeService} from "../../transaction-etape/service/transaction-etape.service";
import {ITransactionEtape} from "../../transaction-etape/transaction-etape.model";
import {map} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";
import {MarkStHistoryService} from "../../mark-st-history/service/mark-st-history.service";
import {IMarkStHistory, NewMarkStHistory} from "../../mark-st-history/mark-st-history.model";
import dayjs, {Dayjs} from "dayjs";
import {ITransactionCRM} from "../transaction-crm.model";

@Component({
  selector: 'jhi-stepbar',
  templateUrl: './stepbar.component.html',
  styleUrls: ['./stepbar.component.scss']
})
export class StepbarComponent implements OnInit , AfterViewInit {

  transactionEtapesSharedCollection: ITransactionEtape[] = [];

   stepindex = 0;
    currentelement;
    firstclass;
    listSnapshot = [''];

    @Input() transactionCrm? : ITransactionCRM | null ;


  constructor(    protected transactionEtapeService: TransactionEtapeService,
                  private renderer: Renderer2 ,
                  protected markStHistoryService: MarkStHistoryService,
  ) { }

  ngOnInit(): void {

    this.transactionEtapeService
      .query()
      .pipe(map((res: HttpResponse<ITransactionEtape[]>) => res.body ?? []))
      .subscribe((transactionEtapes: ITransactionEtape[]) => {
        this.transactionEtapesSharedCollection = transactionEtapes;

      });
  }
  getClassOf(tr):string {
    let rt = 'step-li ';
     if (this.transactionEtapesSharedCollection.indexOf(tr)<= this.stepindex)
     {
      rt=rt.concat(<string>this.transactionEtapesSharedCollection[this.stepindex].tebgColor);

     }
    return rt;
  }
  onmouseenter(event,transactionetape):void {
    const ek = document.querySelectorAll('.step-li');
    const arr = Array.prototype.slice.call(ek);

    const element = event.target;

    const currentindex = arr.indexOf(event.target);
    let i=0;
    this.listSnapshot=[];
    ek.forEach(divi=> {
      this.listSnapshot[i] = divi.classList.value;
      i++;
    })
    ek.forEach(divi => {
      if (arr.indexOf(divi) <= currentindex) {
        if (divi.classList[1]) {
          this.firstclass = divi.classList[1];
        }
        divi.className = '';
        divi.classList.add('step-li');
        divi.classList.add(transactionetape.tebgColor);
      }
    });


  }
  saveMarkHist() : void {
    const options= {
      'transactionCRMId.equals':this.transactionCrm?.id,
      sort:['id','asc']
    };
    this.markStHistoryService.query(options).subscribe({
      next : (c: HttpResponse<IMarkStHistory[]>)=> {
      const markStlist= c.body ?? [];
      console.log(markStlist);
     const mark= markStlist[this.stepindex-1] ;
     const markupdate1 = Object.assign({}, mark, { endTime: dayjs() });
     this.markStHistoryService.update(markupdate1).pipe().subscribe();
     let endtim: dayjs.Dayjs | null =null;
     console.log(this.transactionEtapesSharedCollection.length-this.stepindex);
     if (this.stepindex===this.transactionEtapesSharedCollection.length-1)
     {
       endtim=dayjs();
     }
    const markStHistory = {startTime:dayjs(),endTime:endtim
      ,transactionCRM: this.transactionCrm,
      trEtape:this.transactionEtapesSharedCollection[this.stepindex]
       , createdby: this.transactionCrm?.chargeAffaire} as NewMarkStHistory;
     this.markStHistoryService.create(markStHistory).pipe().subscribe();

      }

    });
  }
  onclick(event,tr) :void {
    const ek = document.querySelectorAll('.step-li');
    const arr = Array.prototype.slice.call(ek);


    this.currentelement = event.target;
    const currentindex = arr.indexOf(event.target);
    if (currentindex<this.stepindex+1) {
     console.log('you can not return back');
     return;
    }
    this.stepindex = currentindex;
    let i = 0;
    ek.forEach(divi => {
      if (arr.indexOf(divi) > currentindex) {
        divi.className = '';
        divi.classList.add('step-li');
      }
      if (arr.indexOf(divi) <= currentindex) {
        divi.className = '';
        divi.classList.add('step-li');
        divi.classList.add(tr.tebgColor);
      }
      this.listSnapshot[i] = divi.classList.value;
      i++;
    });
    this.getstep();
    this.saveMarkHist();
  }
  onmouseleave(event,transactionetape):void {
    const element = event.target;
    const ek = document.querySelectorAll('.step-li');
    let i=0;

    ek.forEach(divi => {
      divi.className = this.listSnapshot[i];
      i++;
    });
  }
  setstep(step):void {
    this.stepindex = step;
    this.listSnapshot = [];
    this.onloadStep();
  }
  getstep():number {
    return this.stepindex;
  }
  onloadStep():void {
    const ek = document.querySelectorAll('.step-li');
    const arr = Array.prototype.slice.call(ek);
    const currentindex = this.stepindex;
    let i = 0;
    ek.forEach(divi => {
      if (arr.indexOf(divi) > currentindex) {
        divi.className = '';
        divi.classList.add('step-li');
        this.listSnapshot[i] = divi.classList.value;
      }
      if (arr.indexOf(divi) <= currentindex) {
        divi.className = '';
        divi.classList.add('step-li');
        divi.classList.add( <string>this.transactionEtapesSharedCollection[currentindex].tebgColor);
        this.listSnapshot[i] = divi.classList.value;
      }
      i++;
    });

  }

  ngAfterViewInit(): void {
    this.setstep(0);
    this.onloadStep();
  }
}
