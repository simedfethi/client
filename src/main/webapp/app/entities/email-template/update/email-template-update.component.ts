import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';

import {EmailTemplateFormGroup, EmailTemplateFormService} from './email-template-form.service';
import {IEmailTemplate} from '../email-template.model';
import {EmailTemplateService} from '../service/email-template.service';
import {AlertError} from 'app/shared/alert/alert-error.model';
import {EventManager, EventWithContent} from 'app/core/util/event-manager.service';
import {DataUtils, FileLoadError} from 'app/core/util/data-util.service';
import {TemplateType} from 'app/entities/enumerations/template-type.model';
import {UnlayerComponent} from "../../../shared/unlayer/unlayer.component";
import html2canvas from "html2canvas";
import * as $ from 'jquery';

@Component({
  selector: 'jhi-email-template-update',
  templateUrl: './email-template-update.component.html',
})
export class EmailTemplateUpdateComponent implements OnInit {
  isSaving = false;
  emailTemplate: IEmailTemplate | null = null;
  templateTypeValues = Object.keys(TemplateType);

  editForm: EmailTemplateFormGroup = this.emailTemplateFormService.createEmailTemplateFormGroup();
  @ViewChild(UnlayerComponent, { static: false }) private unlayercomponent?: UnlayerComponent;

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected emailTemplateService: EmailTemplateService,
    protected emailTemplateFormService: EmailTemplateFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ emailTemplate }) => {
      this.emailTemplate = emailTemplate;
      if (emailTemplate) {
        this.updateForm(emailTemplate);
        this.unlayercomponent?.loadDesign(this.emailTemplate?.templateContent);
      }
    });

  }

  createcanva():void {
    const htmlcontent=$('#htmlcontent')[0];
    html2canvas(htmlcontent).then(canvas => {
      if (this.emailTemplate) {
        const data = canvas.toDataURL();
        this.emailTemplate.attachments = data;
      }
    });

  }


  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('scibscrmApp.error', { ...err, key: 'error.file.' + err.key })),
    });
  }

  previousState(): void {
    window.history.back();
  }

  onTempTypeChange(event):void {
    console.log(event.target.value);
    const emailTemplate = this.emailTemplateFormService.getEmailTemplate(this.editForm);
     this.emailTemplate=emailTemplate as IEmailTemplate;
  }

  save(): void {
    //this.isSaving = true;
     const emailTemplate = this.emailTemplateFormService.getEmailTemplate(this.editForm);
    console.log(this.editForm);

    if(emailTemplate.tempType===TemplateType.EMAIL) {
      const htmlcontent = $('#htmlcontent')[0];
      html2canvas(htmlcontent).then(canvas => {
        const data = canvas.toDataURL();
        emailTemplate.templateContent = JSON.stringify(this.unlayercomponent?.json);
        emailTemplate.htmlContent = this.unlayercomponent?.html;
        emailTemplate.attachments = data.split(";")[1].split(",")[1];
        emailTemplate.attachmentsContentType = data.split(";")[0].split(':')[1];

        if (emailTemplate.id !== null) {
          this.subscribeToSaveResponse(this.emailTemplateService.update(emailTemplate));
        } else {
          this.subscribeToSaveResponse(this.emailTemplateService.create(emailTemplate));
        }
      });
    }

    if(emailTemplate.tempType===TemplateType.SMS) {
        emailTemplate.templateContent = emailTemplate.htmlContent;
        if (emailTemplate.id !== null) {
          this.subscribeToSaveResponse(this.emailTemplateService.update(emailTemplate));
        } else {
          this.subscribeToSaveResponse(this.emailTemplateService.create(emailTemplate));
        }
      }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmailTemplate>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(emailTemplate: IEmailTemplate): void {
    this.emailTemplate = emailTemplate;
    this.emailTemplateFormService.resetForm(this.editForm, emailTemplate);
  }
}
