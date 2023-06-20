import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'company',
        data: { pageTitle: 'scibscrmApp.company.home.title' },
        loadChildren: () => import('./company/company.module').then(m => m.CompanyModule),
      },
      {
        path: 'crm-country',
        data: { pageTitle: 'scibscrmApp.crmCountry.home.title' },
        loadChildren: () => import('./crm-country/crm-country.module').then(m => m.CrmCountryModule),
      },
      {
        path: 'crm-wilaya',
        data: { pageTitle: 'scibscrmApp.crmWilaya.home.title' },
        loadChildren: () => import('./crm-wilaya/crm-wilaya.module').then(m => m.CrmWilayaModule),
      },
      {
        path: 'crm-daira',
        data: { pageTitle: 'scibscrmApp.crmDaira.home.title' },
        loadChildren: () => import('./crm-daira/crm-daira.module').then(m => m.CrmDairaModule),
      },
      {
        path: 'crm-commune',
        data: { pageTitle: 'scibscrmApp.crmCommune.home.title' },
        loadChildren: () => import('./crm-commune/crm-commune.module').then(m => m.CrmCommuneModule),
      },
      {
        path: 'crm-avancement',
        data: { pageTitle: 'scibscrmApp.crmAvancement.home.title' },
        loadChildren: () => import('./crm-avancement/crm-avancement.module').then(m => m.CrmAvancementModule),
      },
      {
        path: 'departement',
        data: { pageTitle: 'scibscrmApp.departement.home.title' },
        loadChildren: () => import('./departement/departement.module').then(m => m.DepartementModule),
      },
      {
        path: 'employee',
        data: { pageTitle: 'scibscrmApp.employee.home.title' },
        loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule),
      },
      {
        path: 'mark-st-history',
        data: { pageTitle: 'scibscrmApp.markStHistory.home.title' },
        loadChildren: () => import('./mark-st-history/mark-st-history.module').then(m => m.MarkStHistoryModule),
      },
      {
        path: 'mark-compaign',
        data: { pageTitle: 'scibscrmApp.markCompaign.home.title' },
        loadChildren: () => import('./mark-compaign/mark-compaign.module').then(m => m.MarkCompaignModule),
      },
      {
        path: 'affaire-category',
        data: { pageTitle: 'scibscrmApp.affaireCategory.home.title' },
        loadChildren: () => import('./affaire-category/affaire-category.module').then(m => m.AffaireCategoryModule),
      },
      {
        path: 'supplier',
        data: { pageTitle: 'scibscrmApp.supplier.home.title' },
        loadChildren: () => import('./supplier/supplier.module').then(m => m.SupplierModule),
      },
      {
        path: 'supplier-category',
        data: { pageTitle: 'scibscrmApp.supplierCategory.home.title' },
        loadChildren: () => import('./supplier-category/supplier-category.module').then(m => m.SupplierCategoryModule),
      },
      {
        path: 'delivery-term',
        data: { pageTitle: 'scibscrmApp.deliveryTerm.home.title' },
        loadChildren: () => import('./delivery-term/delivery-term.module').then(m => m.DeliveryTermModule),
      },
      {
        path: 'supplier-offer',
        data: { pageTitle: 'scibscrmApp.supplierOffer.home.title' },
        loadChildren: () => import('./supplier-offer/supplier-offer.module').then(m => m.SupplierOfferModule),
      },
      {
        path: 'mark-segment',
        data: { pageTitle: 'scibscrmApp.markSegment.home.title' },
        loadChildren: () => import('./mark-segment/mark-segment.module').then(m => m.MarkSegmentModule),
      },
      {
        path: 'filter-list',
        data: { pageTitle: 'scibscrmApp.filterList.home.title' },
        loadChildren: () => import('./filter-list/filter-list.module').then(m => m.FilterListModule),
      },
      {
        path: 'email-template',
        data: { pageTitle: 'scibscrmApp.emailTemplate.home.title' },
        loadChildren: () => import('./email-template/email-template.module').then(m => m.EmailTemplateModule),
      },
      {
        path: 'transaction-crm',
        data: { pageTitle: 'scibscrmApp.transactionCRM.home.title' },
        loadChildren: () => import('./transaction-crm/transaction-crm.module').then(m => m.TransactionCRMModule),
      },
      {
        path: 'project-status',
        data: { pageTitle: 'scibscrmApp.projectStatus.home.title' },
        loadChildren: () => import('./project-status/project-status.module').then(m => m.ProjectStatusModule),
      },
      {
        path: 'crm-setting',
        data: { pageTitle: 'scibscrmApp.crmSetting.home.title' },
        loadChildren: () => import('./crm-setting/crm-setting.module').then(m => m.CrmSettingModule),
      },
      {
        path: 'crm-user-setting',
        data: { pageTitle: 'scibscrmApp.crmUserSetting.home.title' },
        loadChildren: () => import('./crm-user-setting/crm-user-setting.module').then(m => m.CrmUserSettingModule),
      },
      {
        path: 'crm-permission',
        data: { pageTitle: 'scibscrmApp.crmPermission.home.title' },
        loadChildren: () => import('./crm-permission/crm-permission.module').then(m => m.CrmPermissionModule),
      },
      {
        path: 'crm-role',
        data: { pageTitle: 'scibscrmApp.crmRole.home.title' },
        loadChildren: () => import('./crm-role/crm-role.module').then(m => m.CrmRoleModule),
      },
      {
        path: 'transaction-etape',
        data: { pageTitle: 'scibscrmApp.transactionEtape.home.title' },
        loadChildren: () => import('./transaction-etape/transaction-etape.module').then(m => m.TransactionEtapeModule),
      },
      {
        path: 'monnaie',
        data: { pageTitle: 'scibscrmApp.monnaie.home.title' },
        loadChildren: () => import('./monnaie/monnaie.module').then(m => m.MonnaieModule),
      },
      {
        path: 'customer',
        data: { pageTitle: 'scibscrmApp.customer.home.title' },
        loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),
      },
      {
        path: 'crm-concurrent',
        data: { pageTitle: 'scibscrmApp.crmConcurrent.home.title' },
        loadChildren: () => import('./crm-concurrent/crm-concurrent.module').then(m => m.CrmConcurrentModule),
      },
      {
        path: 'crm-contact',
        data: { pageTitle: 'scibscrmApp.crmContact.home.title' },
        loadChildren: () => import('./crm-contact/crm-contact.module').then(m => m.CrmContactModule),
      },
      {
        path: 'crm-contact-type',
        data: { pageTitle: 'scibscrmApp.crmContactType.home.title' },
        loadChildren: () => import('./crm-contact-type/crm-contact-type.module').then(m => m.CrmContactTypeModule),
      },
      {
        path: 'crm-c-ontact-source',
        data: { pageTitle: 'scibscrmApp.crmCOntactSource.home.title' },
        loadChildren: () => import('./crm-c-ontact-source/crm-c-ontact-source.module').then(m => m.CrmCOntactSourceModule),
      },
      {
        path: 'customer-category',
        data: { pageTitle: 'scibscrmApp.customerCategory.home.title' },
        loadChildren: () => import('./customer-category/customer-category.module').then(m => m.CustomerCategoryModule),
      },
      {
        path: 'employer-number',
        data: { pageTitle: 'scibscrmApp.employerNumber.home.title' },
        loadChildren: () => import('./employer-number/employer-number.module').then(m => m.EmployerNumberModule),
      },
      {
        path: 'product',
        data: { pageTitle: 'scibscrmApp.product.home.title' },
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
      },
      {
        path: 'product-category',
        data: { pageTitle: 'scibscrmApp.productCategory.home.title' },
        loadChildren: () => import('./product-category/product-category.module').then(m => m.ProductCategoryModule),
      },
      {
        path: 'productvariante',
        data: { pageTitle: 'scibscrmApp.productvariante.home.title' },
        loadChildren: () => import('./productvariante/productvariante.module').then(m => m.ProductvarianteModule),
      },
      {
        path: 'activite',
        data: { pageTitle: 'scibscrmApp.activite.home.title' },
        loadChildren: () => import('./activite/activite.module').then(m => m.ActiviteModule),
      },
      {
        path: 'crm-doc-type',
        data: { pageTitle: 'scibscrmApp.crmDocType.home.title' },
        loadChildren: () => import('./crm-doc-type/crm-doc-type.module').then(m => m.CrmDocTypeModule),
      },
      {
        path: 'crm-document',
        data: { pageTitle: 'scibscrmApp.crmDocument.home.title' },
        loadChildren: () => import('./crm-document/crm-document.module').then(m => m.CrmDocumentModule),
      },
      {
        path: 'transporter',
        data: { pageTitle: 'scibscrmApp.transporter.home.title' },
        loadChildren: () => import('./transporter/transporter.module').then(m => m.TransporterModule),
      },
      {
        path: 'transport-unit',
        data: { pageTitle: 'scibscrmApp.transportUnit.home.title' },
        loadChildren: () => import('./transport-unit/transport-unit.module').then(m => m.TransportUnitModule),
      },
      {
        path: 'crm-document-line',
        data: { pageTitle: 'scibscrmApp.crmDocumentLine.home.title' },
        loadChildren: () => import('./crm-document-line/crm-document-line.module').then(m => m.CrmDocumentLineModule),
      },
      {
        path: 'unite-mesure',
        data: { pageTitle: 'scibscrmApp.uniteMesure.home.title' },
        loadChildren: () => import('./unite-mesure/unite-mesure.module').then(m => m.UniteMesureModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
