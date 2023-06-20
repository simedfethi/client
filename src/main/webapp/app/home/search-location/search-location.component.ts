import {Component, OnInit} from '@angular/core';
import {HttpResponse} from "@angular/common/http";
import {ISearchResult} from "../../layouts/mainsearch/mainsearch.model";
import {MainsearchService} from "../../layouts/mainsearch/mainsearch.service";
import {ITransactionCRM} from "../../entities/transaction-crm/transaction-crm.model";


declare function loadMap(lat: any, long: any, customer: any): void;
declare function MapLib(lat: any, long: any, customer: any): void;


@Component({
  selector: 'jhi-search-location',
  templateUrl: './search-location.component.html',
  styleUrls: ['./search-location.component.scss']
})
export class SearchLocationComponent implements OnInit  {

  latitude=0;
  longitude=0;
   map:any;
   message='';
  transactionlist : ITransactionCRM[] =[];
  constructor(protected mainsearchService:MainsearchService) { }

  ngOnInit(): void {
    this.map= new MapLib('35.73639720', '-0.56857340','ma position')
    this.latitude=35.73639720;
    this.longitude=-0.56857340;
    //this.getLocation();

  }
  pointCustomer(event,transaction) :void {
    this.map.setview(transaction.latitude,transaction.longitude);
  }
  getLocation():void {

    navigator.geolocation.getCurrentPosition(
      position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;

         this.message=`Latitude: ${this.latitude}, Longitude: ${this.longitude}`;
        console.log(`Latitude: ${this.latitude}, Longitude: ${this.longitude}`);
      },
      error => {
        console.error(error.message);
        this.message=error.message;
      }
    );

  }


  searchByLocation() :void {



    const options1= {
      'latitude':this.latitude,
      'longitude':this.longitude
    }

    this.mainsearchService.searchbylocation(options1).subscribe({
      next:(res:HttpResponse<ISearchResult>) => {

        this.transactionlist=res.body?.transactionCRMList ?? [];

        for (let i = 0; i < this.transactionlist.length; i++) {
          const c=this.transactionlist[i];
          const htmlContent = this.generateHTMLWithImageAndText('https://media.cnn.com/api/v1/images/stellar/prod/201230111539-barcelona.jpg', 'Some text', this.onContainerDivClick);
          const htmlContentL = this.generateHTMLWithImageAndTextLarge('https://media.cnn.com/api/v1/images/stellar/prod/201230111539-barcelona.jpg', 'Some text');

          this.map.addMarker(c.latitude, c.longitude,htmlContent,htmlContentL);

        }

      }

    });
  }
  onContainerDivClick():void {
   alert('hhhhh');
  }

  generateHTMLWithImageAndText(imageLink: string, text: string, onClickFunction: () => void): string {

    return `
    <div class="my-container p-0" >
      <img class="my-image p-0" src="${imageLink}">
      <p class="my-text">${text}</p>
    </div>
  `;
  }
  generateHTMLWithImageAndTextLarge(imageLink: string, text: string): string {
    return `
  <div>
    <div style="position: absolute;  top: 0; left: 0; width: 100%; height: 100%; display: flex; flex-direction: column; ">
      <div style="background-color: white; padding: 1px;">
        <img class="my-image" style="width: 100%; " src="${imageLink}" alt="Your Image">
        <p class="my-text" >${text}</p>

      </div>
    </div>
  </div>
`;
  }



}
