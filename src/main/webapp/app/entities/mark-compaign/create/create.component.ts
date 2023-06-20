import {Component,  OnInit, ViewChild} from '@angular/core';
import {NewMarkCompaign} from "../mark-compaign.model";
import {CompaignType} from "../../enumerations/compaign-type.model";
import {IEmployee} from "../../employee/employee.model";
import {IMarkSegment} from "../../mark-segment/mark-segment.model";
import {Compaignpriority} from "../../enumerations/compaignpriority.model";
import {MarkCompaignService} from "../service/mark-compaign.service";
import {MarkCompaignFormService} from "../update/mark-compaign-form.service";
import {EmployeeService} from "../../employee/service/employee.service";
import {MarkSegmentService} from "../../mark-segment/service/mark-segment.service";
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";
import html2canvas from 'html2canvas';
import {IEmailTemplate} from "../../email-template/email-template.model";
import {EmailTemplateService} from "../../email-template/service/email-template.service";
import {DataUtils} from "../../../core/util/data-util.service";
import {UnlayerComponent} from "../../../shared/unlayer/unlayer.component";

@Component({
  selector: 'jhi-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {


  markCompaign :NewMarkCompaign ={id:null};

  emailTemplates?: IEmailTemplate[];
  tpm : IEmailTemplate ={id:1} ;
  // Track the current step of the form
  currentStep = 1;

  employeesSharedCollection: IEmployee[] = [];
  markSegmentsSharedCollection: IMarkSegment[] = [];
  compaignpriorityValues = Object.keys(Compaignpriority);
  @ViewChild(UnlayerComponent, { static: false }) private unlayercomponent?: UnlayerComponent;
  constructor(
    protected markCompaignService: MarkCompaignService,
    protected markCompaignFormService: MarkCompaignFormService,
    protected employeeService: EmployeeService,
    protected markSegmentService: MarkSegmentService,
    protected emailTemplateService: EmailTemplateService,
    protected dataUtils: DataUtils,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {

      this.loadRelationshipsOptions();

  }

  compareEmployee = (o1: IEmployee | null, o2: IEmployee | null): boolean => this.employeeService.compareEmployee(o1, o2);

  loadTemplate(emailtemplate , event):void {
    event.preventDefault();
   this.tpm=emailtemplate;

   this.unlayercomponent?.loadDesign(emailtemplate?.templateContent);

  }
  nextStep(event):void {
      event.preventDefault();
    this.currentStep++;
    if (this.currentStep===4)
    {
      this.emailTemplateService.query().subscribe((res:HttpResponse<IEmailTemplate[]>)=>{
        this.emailTemplates=res.body ?? [];
        this.tpm=this.emailTemplates[0];
      })
    }
  }
  openFile(email): string {
    return  'data:'.concat(email.attachmentsContentType).concat(';base64,').concat(email.attachments);
  }

  prevStep(event):void {
      event.preventDefault();
    this.currentStep--;
  }
  setStep(step,event):void {
    event.preventDefault();
    this.currentStep=step;
  }
  selectEmail():void{
      this.markCompaign.compaigntype=CompaignType.EMAIL;
    this.currentStep++;
  }
  selectSMS():void{
    this.markCompaign.compaigntype=CompaignType.SMS;
    this.currentStep++;
  }
  createcanva():void {

    html2canvas(document.querySelector("#steps-uid-4")!).then(canvas => {
      document.querySelector("#steps-uid-4")!.appendChild(canvas);
      const dataURL = canvas.toDataURL();
// Save the data URL to local storage
      localStorage.setItem("canvasData", dataURL);
      const target= document.createElement("canvas");

      const img = new Image();
      img.src = dataURL;
      img.onload = function() {
        const context = target.getContext("2d");
        target.width = img.width;
        target.height = img.height;
        context!.drawImage(img, 0, 0);
      };

      document.querySelector("#steps-uid-4")!.appendChild(target);
    });
  }

  protected loadRelationshipsOptions(): void {
    this.employeeService
      .query()
      .pipe(map((res: HttpResponse<IEmployee[]>) => res.body ?? []))
      .pipe(
        map((employees: IEmployee[]) =>
          this.employeeService.addEmployeeToCollectionIfMissing<IEmployee>(employees, this.markCompaign.sender)
        )
      )
      .subscribe((employees: IEmployee[]) => (this.employeesSharedCollection = employees));

    this.markSegmentService
      .query()
      .pipe(map((res: HttpResponse<IMarkSegment[]>) => res.body ?? []))
      .pipe(
        map((markSegments: IMarkSegment[]) =>
          this.markSegmentService.addMarkSegmentToCollectionIfMissing<IMarkSegment>(
            markSegments,
            ...(this.markCompaign.markSegments ?? [])
          )
        )
      )
      .subscribe((markSegments: IMarkSegment[]) => (this.markSegmentsSharedCollection = markSegments));
  }


}
