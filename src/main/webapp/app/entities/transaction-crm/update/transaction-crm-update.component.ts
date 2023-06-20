import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import {concatMap, filter, forkJoin, Observable, of, switchMap} from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { TransactionCRMFormGroup, TransactionCRMFormService } from './transaction-crm-form.service';
import { ITransactionCRM } from '../transaction-crm.model';
import {EntityArrayResponseType, TransactionCRMService} from '../service/transaction-crm.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IMonnaie } from 'app/entities/monnaie/monnaie.model';
import { MonnaieService } from 'app/entities/monnaie/service/monnaie.service';
import { IEmployee } from 'app/entities/employee/employee.model';
import { EmployeeService } from 'app/entities/employee/service/employee.service';
import { ICustomer } from 'app/entities/customer/customer.model';
import { CustomerService } from 'app/entities/customer/service/customer.service';
import { IActivite } from 'app/entities/activite/activite.model';
import { ActiviteService } from 'app/entities/activite/service/activite.service';

import { TransactionSource } from 'app/entities/enumerations/transaction-source.model';
import { ICrmDocument, NewCrmDocument } from '../../crm-document/crm-document.model';
import {CrmDocumentService, PartialUpdateCrmDocument} from '../../crm-document/service/crm-document.service';
import { ICrmDocType } from '../../crm-doc-type/crm-doc-type.model';
import { CrmDocTypeService } from '../../crm-doc-type/service/crm-doc-type.service';
import { ICrmDocumentLine, NewCrmDocumentLine } from '../../crm-document-line/crm-document-line.model';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CrmDocumentLineFormGroup, CrmDocumentLineFormService } from '../../crm-document-line/update/crm-document-line-form.service';
import { UniteMesureService } from '../../unite-mesure/service/unite-mesure.service';
import { IUniteMesure } from '../../unite-mesure/unite-mesure.model';
import { TransactionproduitService } from './transactionproduitService';
import { CrmDocumentLineService } from '../../crm-document-line/service/crm-document-line.service';
import { MessageService } from './messageService';
import { ICrmContact, NewCrmContact } from '../../crm-contact/crm-contact.model';
import { CrmContactService } from '../../crm-contact/service/crm-contact.service';
import {ITransactionEtape} from "../../transaction-etape/transaction-etape.model";
import {TransactionEtapeService} from "../../transaction-etape/service/transaction-etape.service";
import {StepbarComponent} from "../stepbar/stepbar.component";
import {SearchCustomerComponent} from "../../customer/search-customer/search-customer.component";
import {TransactionCRMDeleteDialogComponent} from "../delete/transaction-crm-delete-dialog.component";
import {ITEM_DELETED_EVENT} from "../../../config/navigation.constants";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {
  CrmDocumentLineDeleteDialogComponent
} from "../../crm-document-line/delete/crm-document-line-delete-dialog.component";
import { IProduct } from 'app/entities/product/product.model';
import { ProductService } from 'app/entities/product/service/product.service';
import {ICrmConcurrent} from "../../crm-concurrent/crm-concurrent.model";
import {CrmConcurrentService} from "../../crm-concurrent/service/crm-concurrent.service";
import dayjs from "dayjs/esm";
import { ProjectStatusService } from 'app/entities/project-status/service/project-status.service';
import {IProjectStatus} from "../../project-status/project-status.model";
import {ICrmWilaya} from "../../crm-wilaya/crm-wilaya.model";
import { CrmWilayaService } from 'app/entities/crm-wilaya/service/crm-wilaya.service';
import {ICrmCommune} from "../../crm-commune/crm-commune.model";
import {CrmCommuneService} from "../../crm-commune/service/crm-commune.service";
import {CrmDairaService} from "../../crm-daira/service/crm-daira.service";
import {ICrmDaira} from "../../crm-daira/crm-daira.model";
import {ICrmAvancement} from "../../crm-avancement/crm-avancement.model";
import {CrmAvancementService} from "../../crm-avancement/service/crm-avancement.service";


declare function loadMap(lat: any, long: any, customer: any): void;

type CrmDocumentLine = ICrmDocumentLine | NewCrmDocumentLine ;

type CrmDocument = ICrmDocument | NewCrmDocument| PartialUpdateCrmDocument ;
@Component({
  selector: 'jhi-transaction-crm-update',
  templateUrl: './transaction-crm-update.component.html',
})
export class TransactionCRMUpdateComponent implements OnInit, AfterViewInit {
  crmWilayas?: ICrmWilaya[];
  crmCommune?: ICrmCommune[];
  crmDaira? : ICrmDaira[];
  isSaving = false;
  crmAvancementsSharedCollection: ICrmAvancement[] = [];
  transactionCRM: ITransactionCRM | null = null;
  transactionEtapeValues = ['A','B'];// Object.keys(TransactionEtape);
  transactionEtapesSharedCollection: ITransactionEtape[] = [];

  transactionSourceValues = Object.keys(TransactionSource);
  uniteMesuresSharedCollection: IUniteMesure[] = [];
  monnaiesSharedCollection: IMonnaie[] = [];
  employeesSharedCollection: IEmployee[] = [];
  customersSharedCollection: ICustomer[] = [];
  crmDocumentsSharedCollection: ICrmDocument[] = [];
  activitesSharedCollection: IActivite[] = [];
  doclinelist: NewCrmDocumentLine[] = [];
  crmdoctypeCollection: ICrmDocType[] = [];
  crmContactsSharedCollection: ICrmContact[] = [];
  productsSharedCollection: IProduct[] = [];
  crmConcurrentsSharedCollection: ICrmConcurrent[] = [];
  projectStatusesSharedCollection: IProjectStatus[] = [];
  latitude=0;
  longitude=0;

  editForm: TransactionCRMFormGroup = this.transactionCRMFormService.createTransactionCRMFormGroup();
  @ViewChild('mtnl') mtnl?: ElementRef<HTMLElement>;

  Produits = {} as ICrmDocument | NewCrmDocument;
  crmdoclineCollection: NewCrmDocumentLine[] = [];
  producteditf: CrmDocumentLineFormGroup = this.crmdoclineEditformService.createCrmDocumentLineFormGroup();
  productfa = new FormArray<CrmDocumentLineFormGroup>([]);


  invoiceForm: FormGroup<any> = new FormGroup<any>([]);
  crmContactList: ICrmContact[] = [];

  crmdocumentpro : ICrmDocument | undefined;
  @ViewChild('stepbarComponent') stepbar? :StepbarComponent;

  @ViewChild('stepbarComponent') searchCustomerComponent? :SearchCustomerComponent;



  constructor(
    protected crmWilayaService: CrmWilayaService,
    protected crmCommuneService: CrmCommuneService,
    protected crmDairaService: CrmDairaService,
    protected crmAvancementService: CrmAvancementService,
    protected dataUtils: DataUtils,
    protected http: HttpClient ,
    protected modalService: NgbModal,
    protected eventManager: EventManager,
    protected transactionCRMService: TransactionCRMService,
    protected transactionCRMFormService: TransactionCRMFormService,
    protected transactionEtapeService: TransactionEtapeService,
    protected monnaieService: MonnaieService,
    protected employeeService: EmployeeService,
    protected customerService: CustomerService,
    protected activiteService: ActiviteService,
    protected crmDocumentService: CrmDocumentService,
    protected crmDocTypeService: CrmDocTypeService,
    protected crmdoclineEditformService: CrmDocumentLineFormService,
    protected uniteMesureService: UniteMesureService,
    protected productService: ProductService,
    protected crmConcurrentService: CrmConcurrentService,
    protected activatedRoute: ActivatedRoute,
    protected crmContactService: CrmContactService,
    protected transactionproduitService: TransactionproduitService,
    protected crmDocumentLineService: CrmDocumentLineService,
    protected messageService: MessageService,
    protected projectStatusService: ProjectStatusService,
    private _fb: FormBuilder,
    private renderer: Renderer2
  ) {

  }

  compareCrmAvancement = (o1: ICrmAvancement | null, o2: ICrmAvancement | null): boolean =>
    this.crmAvancementService.compareCrmAvancement(o1, o2);

  compareProjectStatus = (o1: IProjectStatus | null, o2: IProjectStatus | null): boolean =>
    this.projectStatusService.compareProjectStatus(o1, o2);

  compareCrmConcurrent = (o1: ICrmConcurrent | null, o2: ICrmConcurrent | null): boolean =>
    this.crmConcurrentService.compareCrmConcurrent(o1, o2);

  compareMonnaie = (o1: IMonnaie | null, o2: IMonnaie | null): boolean => this.monnaieService.compareMonnaie(o1, o2);

  compareEmployee = (o1: IEmployee | null, o2: IEmployee | null): boolean => this.employeeService.compareEmployee(o1, o2);

  compareCustomer = (o1: ICustomer | null, o2: ICustomer | null): boolean => this.customerService.compareCustomer(o1, o2);

  compareCrmDocument = (o1: ICrmDocument | null, o2: ICrmDocument | null): boolean => this.crmDocumentService.compareCrmDocument(o1, o2);

  compareActivite = (o1: IActivite | null, o2: IActivite | null): boolean => this.activiteService.compareActivite(o1, o2);

  compareUniteMesure = (o1: IUniteMesure | null, o2: IUniteMesure | null): boolean => this.uniteMesureService.compareUniteMesure(o1, o2);

  compareCrmContact = (o1: ICrmContact | null, o2: ICrmContact | null): boolean => this.crmContactService.compareCrmContact(o1, o2);

  compareProduct = (o1: IProduct | null, o2: IProduct | null): boolean => this.productService.compareProduct(o1, o2);

  ngOnInit(): void {
    this.messageService.message$.subscribe(message => {

   console.log('message');
    });
    this.activatedRoute.data.subscribe(({ transactionCRM }) => {
      this.transactionCRM = transactionCRM;
      if (transactionCRM) {
        this.updateForm(transactionCRM);
        this.crmContactList = transactionCRM.crmContacts;
       console.log(this.transactionCRM);
       this.crmdocumentpro= this.transactionCRM?.crmDocuments?.find((c)=> c.crmdoctype?.cdtname==='PRO');

      }


      this.loadRelationshipsOptions();
    });

    this.invoiceForm = this._fb.group({
      Rows: this._fb.array([]),
    });

    this.lessons.valueChanges.subscribe(s => {
      this.onProductsChanges(s);
    });
  }
  ajouterContact(): void {
    const contact = { id: 0 };
    this.crmContactList.push(contact);
  }

  onProductsChanges(s: any): void {
    for (let i = 0; i < s.length; i++) {
      const crmline = s[i] as ICrmDocumentLine;
      const form = this.lessons.controls[i];
      const ctr = form.get('lignePos') as FormControl;
      ctr.setValue(i + 1, { emitEvent: false });
    }
  }

  get lessons(): FormArray  {
    return this.invoiceForm.controls['Rows'] as FormArray;
  }

  addligne(): void {
    const jj = this.crmdoclineEditformService.createCrmDocumentLineFormGroup();
    this.lessons.push(jj);
  }

  deletelignecrm(editform): void {
    const crmDocumentLine =this.crmdoclineEditformService.getCrmDocumentLine(editform);

    const modalRef = this.modalService.open(CrmDocumentLineDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.crmDocumentLine = crmDocumentLine;
    modalRef.result.then((result) => {
      if (result === ITEM_DELETED_EVENT) {
        // Perform the delete operation
        console.log(editform);
        const crmdocument  = this.transactionCRM?.crmDocuments?.find((c => c.crmdoctype?.cdtname === 'PRO')) as ICrmDocument;
          crmdocument.crmDocumentLines= crmdocument.crmDocumentLines?.filter(c=>c.id !==crmDocumentLine.id);
         this.lessons.removeAt(this.lessons.controls.indexOf(editform));
      }
    }, (reason) => {
      // Handle cancel or dismissal of the dialog
    });

  }


  LoadCrmProductLine(): void {
    const options = {
      'crmDocumentId.equals': this.transactionproduitService.ProduitsFromDocumentlist(this.crmDocumentsSharedCollection)?.id,
    };
    this.crmDocumentLineService.query(options).subscribe({
      next: (res: HttpResponse<ICrmDocumentLine[]>) => {
        this.LoadDocLineFormGroup(res.body ?? []);
      },
    });
  }
  LoadDocLineFormGroup(CrmDocumentLines: ICrmDocumentLine[] | null): void {
    if (CrmDocumentLines !== null){
    for (let i = 0; i < CrmDocumentLines.length; i++) {
      const CrmDocumentLineFGp = this.crmdoclineEditformService.createCrmDocumentLineFormGroup();

      this.crmdoclineEditformService.resetForm(CrmDocumentLineFGp, CrmDocumentLines[i]);
      this.lessons.push(CrmDocumentLineFGp);
    }
    }
  }

  setstep():void {
    if (this.transactionCRM?.trEtape) {
      const etape= this.transactionEtapesSharedCollection.find((c)=> c.id===this.transactionCRM?.trEtape?.id);
      let i=0;
      if (etape) {
         i=this.transactionEtapesSharedCollection.indexOf(etape);
      }
      this.stepbar?.setstep(i);
    }
  }
  ngAfterViewInit(): void {

    if ((this.transactionCRM?.latitude) && (this.transactionCRM.longitude)) {
      this.latitude=this.transactionCRM.latitude;
      this.longitude=this.transactionCRM.longitude;
      loadMap(this.transactionCRM.latitude, this.transactionCRM.longitude, this.transactionCRM.client?.company);

    }else {
      this.getLocation();
    }

    if (this.transactionCRM?.crmDocuments?.[0]?.crmDocumentLines) {
      this.LoadDocLineFormGroup(this.transactionCRM.crmDocuments[0].crmDocumentLines);
    }


  }

  logcrmdoc(): any {
    console.log(this.crmContactList);
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




  savelignes(): void {

    if (!this.crmdocumentpro){
      this.transactionproduitService.CreateCrmDoc(this.transactionCRM,this.crmdoctypeCollection)
        .subscribe({next:(c:HttpResponse<ICrmDocument>)=>{
            if (c.body) {
              this.crmdocumentpro=c.body;
              this.savedocline();
            }

          }});
    }else {
      this.savedocline();
    }



  }
  savedocline():void {
    for (let i = 0; i < this.lessons.controls.length; i++) {
      const formgroup = this.lessons.controls[i] as CrmDocumentLineFormGroup;
      const res = this.crmdoclineEditformService.getCrmDocumentLine(formgroup);

      res.crmDocument = this.crmdocumentpro;
      if (res.id !== null) {
        this.crmDocumentLineService.update(res).subscribe();
      }else {
        this.crmDocumentLineService.create(res).subscribe({
          next:(resp:HttpResponse<ICrmDocumentLine>)=> {
            const crmdocline=resp.body as ICrmDocumentLine;
            this.crmdoclineEditformService.resetForm(formgroup,crmdocline);
            console.log(crmdocline);
          }
        });
      }

    }

  }




  save(): void {
    this.isSaving = true;

    const transactionCRM = this.transactionCRMFormService.getTransactionCRM(this.editForm);
    if (this.stepbar){
      transactionCRM.trEtape = this.transactionEtapesSharedCollection[this.stepbar.getstep()];
    }
    if ( this.isStringValid(transactionCRM.locationUrl))
    {
      const url= transactionCRM.locationUrl ?? '';
      const latLong1= this.extractLatLongFromUrl(url);

      this.latitude=latLong1!.latitude ;
      this.longitude=latLong1!.longitude;
    }
    transactionCRM.crmContacts=this.crmContactList;
    transactionCRM.latitude=this.latitude;
    transactionCRM.longitude=this.longitude;
    transactionCRM.trValidated=false;
    if (!transactionCRM.crmDocuments?.find((c)=> c.crmdoctype?.cdtname==='PRO')){
      if (this.crmdocumentpro) {
        transactionCRM.crmDocuments?.push(this.crmdocumentpro);
      }

    }
    if (transactionCRM.id !== null) {
      this.subscribeToSaveResponse(this.transactionCRMService.update(transactionCRM));
    } else {
      this.subscribeToSaveResponse(this.transactionCRMService.create(transactionCRM));
    }

  }
  isStringValid(str: string | undefined | null): boolean {
    return str !== undefined && str !== null && str.trim().length !== 0;
  }

  getLocation():void {

      navigator.geolocation.getCurrentPosition(
        position => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          console.log(`Latitude: ${this.latitude}, Longitude: ${this.longitude}`);
        },
        error => {
          console.error(error.message);
        }
      );

  }
  validerTransaction():void {
    if (this.transactionCRM) {
      this.transactionCRMService.validate({id: this.transactionCRM.id, trValidated: true}).subscribe(
        {
          next:(res:HttpResponse<ITransactionCRM>)=> {
            if ((res.body) && (this.transactionCRM)){
            this.transactionCRM.trValidated=res.body.trValidated;
          }
          }
        }
      );
    }
  }

  extractLatLongFromUrl(url: string ): { latitude; longitude } | null {
    let pattern: RegExp;
    let match: RegExpMatchArray | null;
    // Check if the URL matches the first case
    pattern = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
    match = url.match(pattern);

    if (match) {
      const [_, latitude, longitude] = match;
      return { latitude: latitude, longitude: longitude };
    }
    pattern = /^@(-?\d+(\.\d+)?),(-?\d+(\.\d+)?),(\d+)z$/;
    match = url.match(pattern);

    if (match) {
      const [_, latitude, longitude] = match;
      return { latitude:  latitude , longitude: longitude  };
    }
    // Check if the URL matches the second case
    pattern = /q=([\d-]+),([\d-]+)/;
    match = url.match(pattern);

    if (match) {
      const [_, latitude, longitude] = match;
      return { latitude: latitude , longitude:  longitude };
    }
    // Check if the URL matches the second case
    pattern = /^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/;
    match = url.replace(/\s+/g, "").match(pattern);

    if (match) {

      return { latitude: match[1] , longitude:  match[3] };
    }

    // If neither case matches, return null
    return null;
  }


  handleResults(crmcontact): void {
    console.log('crmcontact');
  }
  handledeleteContact(crmcontact): void {
    this.crmContactList=this.crmContactList.filter((c)=> c.id !== crmcontact.id);

  }
  handleNewContact(contact: ICrmContact): void {
    // Replace contact with ID of 0 in the list with the saved contact

    const index = this.crmContactList.findIndex(c => c.id === 0);
    if (index !== -1) {
      this.crmContactList[index] = contact;
    } else {
      // Add saved contact to end of list if ID was not 0
     // this.crmContactList.push(contact);
    }

  }
  handleCustomer(customer): void {

    if (this.transactionCRM !== null) {
      this.transactionCRM.client = customer;
    }
    this.editForm.controls.client.setValue(customer);

  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITransactionCRM>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: (c) => this.onSaveSuccess(c.body),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(transactioncrm): void {
   this.transactionCRM=transactioncrm;
    this.transactionCRMFormService.resetForm(this.editForm,transactioncrm);
    //this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }


  protected updateForm(transactionCRM: ITransactionCRM): void {
    this.transactionCRM = transactionCRM;
    this.transactionCRMFormService.resetForm(this.editForm, transactionCRM);

    this.monnaiesSharedCollection = this.monnaieService.addMonnaieToCollectionIfMissing<IMonnaie>(
      this.monnaiesSharedCollection,
      transactionCRM.monnaie
    );
    this.transactionEtapesSharedCollection = this.transactionEtapeService.addTransactionEtapeToCollectionIfMissing<ITransactionEtape>(
      this.transactionEtapesSharedCollection,
      transactionCRM.trEtape
    );
    this.employeesSharedCollection = this.employeeService.addEmployeeToCollectionIfMissing<IEmployee>(
      this.employeesSharedCollection,
      transactionCRM.chargeAffaire
    );
    this.customersSharedCollection = this.customerService.addCustomerToCollectionIfMissing<ICustomer>(
      this.customersSharedCollection,
      transactionCRM.client
    );
    this.crmContactsSharedCollection = this.crmContactService.addCrmContactToCollectionIfMissing<ICrmContact>(
      this.crmContactsSharedCollection,
      ...(transactionCRM.crmContacts ?? [])
    );
    this.crmDocumentsSharedCollection = this.crmDocumentService.addCrmDocumentToCollectionIfMissing<ICrmDocument>(
      this.crmDocumentsSharedCollection,
      ...(transactionCRM.crmDocuments ?? [])
    );
  }


  protected loadRelationshipsOptions(): void {
    this.crmAvancementService
      .query()
      .pipe(map((res: HttpResponse<ICrmAvancement[]>) => res.body ?? []))
      .pipe(
        map((crmAvancements: ICrmAvancement[]) =>
          this.crmAvancementService.addCrmAvancementToCollectionIfMissing<ICrmAvancement>(crmAvancements, this.transactionCRM?.avancement)
        )
      )
      .subscribe((crmAvancements: ICrmAvancement[]) => (this.crmAvancementsSharedCollection = crmAvancements));


    this.crmWilayaService.query().pipe(map((res: HttpResponse<ICrmWilaya[]>) => res.body ?? []))
      .subscribe((crmwilaya: ICrmWilaya[]) => (this.crmWilayas = crmwilaya));

    this.crmCommuneService.query().pipe(map((res: HttpResponse<ICrmCommune[]>) => res.body ?? []))
      .subscribe((crmcommune: ICrmCommune[]) => (this.crmCommune = crmcommune));
    this.crmDairaService.query().pipe(map((res: HttpResponse<ICrmDaira[]>) => res.body ?? []))
      .subscribe((crmdaira: ICrmDaira[]) => (this.crmDaira = crmdaira));


    this.projectStatusService
      .query()
      .pipe(map((res: HttpResponse<IProjectStatus[]>) => res.body ?? []))
      .subscribe((projectStatuses: IProjectStatus[]) => (this.projectStatusesSharedCollection = projectStatuses));

    this.crmConcurrentService
      .query()
      .pipe(map((res: HttpResponse<ICrmConcurrent[]>) => res.body ?? []))

      .subscribe((crmConcurrents: ICrmConcurrent[]) => (this.crmConcurrentsSharedCollection = crmConcurrents));

    this.productService
      .query()
      .pipe(map((res: HttpResponse<IProduct[]>) => res.body ?? []))
      .subscribe((products: IProduct[]) => (this.productsSharedCollection = products));


    this.uniteMesureService
      .query()
      .pipe(map((res: HttpResponse<IUniteMesure[]>) => res.body ?? []))
      .subscribe((uniteMesures: IUniteMesure[]) => (this.uniteMesuresSharedCollection = uniteMesures));


    this.crmDocTypeService
      .query()
      .pipe(map((res: HttpResponse<ICrmDocType[]>) => res.body ?? []))
      .subscribe((crmDocTypes: ICrmDocType[]) => (this.crmdoctypeCollection = crmDocTypes));


    this.monnaieService
      .query()
      .pipe(map((res: HttpResponse<IMonnaie[]>) => res.body ?? []))
      .pipe(
        map((monnaies: IMonnaie[]) => this.monnaieService.addMonnaieToCollectionIfMissing<IMonnaie>(monnaies, this.transactionCRM?.monnaie))
      )
      .subscribe((monnaies: IMonnaie[]) => (this.monnaiesSharedCollection = monnaies));

    this.transactionEtapeService
      .query()
      .pipe(map((res: HttpResponse<ITransactionEtape[]>) => res.body ?? []))
      .pipe(
        map((transactionEtapes: ITransactionEtape[]) =>
          this.transactionEtapeService.addTransactionEtapeToCollectionIfMissing<ITransactionEtape>(
            transactionEtapes,
            this.transactionCRM?.trEtape
          )
        )
      )
      .subscribe((transactionEtapes: ITransactionEtape[]) => {

        this.transactionEtapesSharedCollection = transactionEtapes;
        this.setstep();
      });

    this.employeeService
      .query()
      .pipe(map((res: HttpResponse<IEmployee[]>) => res.body ?? []))
      .pipe(
        map((employees: IEmployee[]) =>
          this.employeeService.addEmployeeToCollectionIfMissing<IEmployee>(employees, this.transactionCRM?.chargeAffaire)
        )
      )
      .subscribe((employees: IEmployee[]) => (this.employeesSharedCollection = employees));

    this.customerService
      .query()
      .pipe(map((res: HttpResponse<ICustomer[]>) => res.body ?? []))
      .pipe(
        map((customers: ICustomer[]) =>
          this.customerService.addCustomerToCollectionIfMissing<ICustomer>(customers, this.transactionCRM?.client)
        )
      )
      .subscribe((customers: ICustomer[]) => (this.customersSharedCollection = customers));

    this.crmContactService
      .query()
      .pipe(map((res: HttpResponse<ICrmContact[]>) => res.body ?? []))
      .pipe(
        map((crmContacts: ICrmContact[]) =>
          this.crmContactService.addCrmContactToCollectionIfMissing<ICrmContact>(crmContacts, ...(this.transactionCRM?.crmContacts ?? []))
        )
      )
      .subscribe((crmContacts: ICrmContact[]) => (this.crmContactsSharedCollection = crmContacts));

    this.crmDocumentService
      .query()
      .pipe(map((res: HttpResponse<ICrmDocument[]>) => res.body ?? []))
      .pipe(
        map((crmDocuments: ICrmDocument[]) =>
          this.crmDocumentService.addCrmDocumentToCollectionIfMissing<ICrmDocument>(
            crmDocuments,
            ...(this.transactionCRM?.crmDocuments ?? [])
          )
        )
      )
      .subscribe((crmDocuments: ICrmDocument[]) => (this.crmDocumentsSharedCollection = crmDocuments));
  }
}
