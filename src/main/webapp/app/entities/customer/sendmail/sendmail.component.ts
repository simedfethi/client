import {AfterViewInit, Component, ElementRef, Input, OnDestroy, Renderer2, ViewChild} from '@angular/core';
import {getGreeting } from "../../../../content/js/custom";
import {HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest, HttpResponse} from "@angular/common/http";
import {ApplicationConfigService} from "../../../core/config/application-config.service";
import {Observable, sample} from "rxjs";
import {ICustomer} from "../customer.model";
import {DomSanitizer} from "@angular/platform-browser";
import {map} from "rxjs/operators";
import axios from "axios";
import {ActiviteService} from "../../activite/service/activite.service";
import {TypeActivite} from "../../enumerations/type-activite.model";
import dayjs from "dayjs/esm";
import {IActivite, NewActivite} from "../../activite/activite.model";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {IEmployee, NewEmployee} from "../../employee/employee.model";
import {IUpoad} from "../IUpoad.model";

declare function unlayerInit():void;
declare function savehtml():any;
declare function loadtemplate(data: any):void;


@Component({
  selector: 'jhi-sendmail',
  templateUrl: './sendmail.component.html',
  styleUrls: ['./sendmail.component.scss']
})


export class SendmailComponent implements  AfterViewInit {

  resourceUrl = this.applicationConfigService.getEndpointFor('api/files');

  myelement : HTMLScriptElement = document.createElement("script");

  selectedFiles?: File[];
  currentFile?: File;
  progress = 0;
  message = '';
  uploadlist:IUpoad[]=[];

  @Input() public customer ;

  @ViewChild('emailto') emailto?: ElementRef<HTMLInputElement>;
  @ViewChild('subject') subject?: ElementRef<HTMLInputElement>;

  constructor(
    protected renderer: Renderer2 ,
     protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    private domSanitizer: DomSanitizer,
    protected activiteService: ActiviteService,
    protected modalService: NgbActiveModal,
  ) {
  }




  ngAfterViewInit(): void {
    this.renderer.setAttribute(this.emailto?.nativeElement, 'innerText', this.customer?.emailAddress);

    console.log(this.customer?.emailAddress);
    this.myelement.src = "content/js/mail.js";
     //document.body.appendChild(this.myelement);
    unlayerInit();

    const unlayer= savehtml();

  }


  insertCustomerEmail(dat:any) :void
  {
    const json = dat.design; // design json
    const html = dat.html; // final html
    const subject=this.subject?.nativeElement.innerText;
    const mailContent = html;
    const custo: ICustomer=this.customer;
    const empl : IEmployee =custo.commercial as IEmployee;
    const data={
      to: custo.emailAddress,
      from: empl.emailAdress,
      mdetail: mailContent,
      attachement: this.uploadlist,
      subject:subject
    };

    const xx= {
      client:this.customer,
      typeactivite:TypeActivite.EMAIL,
      note: JSON.stringify(data),
      heureActivite:dayjs(),
      dateEcheance:dayjs(),
      employee: empl,
    } as NewActivite;
    this.activiteService.create(xx).subscribe({
      next: (res)=> {
        console.log(res.body);

      }
    });

    this.modalService.close();

  }
    sendmail() :void
    {
      const unlayer= savehtml();
      unlayer.exportHtml((data)=> this.insertCustomerEmail(data));

    }

    download(fileurl:string):void {

      const req = new HttpRequest('GET', fileurl);
      this.http.request(req).subscribe();

    }

  getimg(file:string) :void
  {
    axios({
      method: 'get',
      url: file,
      responseType: 'blob',
      headers: {'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJST0xFX0FETUlOLFJPTEVfVVNFUiIsImV4cCI6MTY3NDY3NzI1M30.xUCsCHuBJXO2A3nMlzg2MKlB_mkp91-dFELL6XPep1NkZXC0VGdz5azgpnudvAUMoryiYYGTueXpZKLO27kEdw'}
    })
      .then(function (response) {
        const fileURL = window.URL.createObjectURL(response.data);
        const win = window.open(fileURL);
      });
  }
  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.resourceUrl}/uploadFile`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
    UploadFiles(e) :void {
      const files = e.target.files;
      this.selectedFiles=files;
      const data = document.querySelector('#files') as HTMLElement;
      const formData: FormData = new FormData();

      for (let i = 0; i < files.length; i++) {
        const file = files[i] as File;
        this.currentFile = file;
        this.progress=0;
        this.upload(file).subscribe({
            next:(event:any) => {
              if (event.type === HttpEventType.UploadProgress) {
                this.progress = Math.round(100 * event.loaded / event.total);
              } else if (event instanceof HttpResponse) {
                const res= event.body;
                this.uploadlist.push(res);
              }
            }
          });

      }
    }
}
