import {AfterViewInit, Component, Input} from '@angular/core';
import {AuthServerProvider} from "../../core/auth/auth-jwt.service";
import {ApplicationConfigService} from "../../core/config/application-config.service";
import * as $ from 'jquery';

declare function Unlayersavehtml():any;

declare function getUnlayer():any;

@Component({
  selector: 'jhi-unlayer',
  templateUrl: './unlayer.component.html',
  styleUrls: ['./unlayer.component.scss']
})
export class UnlayerComponent implements   AfterViewInit {

  mydiv :any;
  unlayer:any;
  json='';
  html='';
  @Input() jsontemplate :any;
 constructor(
   private authServerProvider: AuthServerProvider,
   private applicationConfigService: ApplicationConfigService,
 ) {
 }
  ngAfterViewInit(): void {
   const endpoint= this.applicationConfigService.getEndpointFor('api/files/uploadFile');
   // unlayerInit(endpoint,this.authServerProvider.getToken());
    this.unlayer= getUnlayer();
    this.unlayer.init({
      id: 'editor-container',
      projectId: 1234,
      displayMode: 'email',
    });
    this.registerupload(endpoint,this.authServerProvider.getToken());
    this.unlayer.addEventListener('editor:ready', () => {
      console.log('editor:ready');
     const design=JSON.parse(this.jsontemplate);
     this.unlayer.loadDesign(design);
      this.mydiv = $("<div>");
      this.mydiv.attr('id','captured');
      this.mydiv.html(this.html);
      $('#htmlcontent').append(this.mydiv);
      this.savehtml();
    });
    this.unlayer.addEventListener('design:updated', () => {
      // Design is updated by the user

      this.unlayer.exportHtml((data) => {
        this.json = data.design; // design json
        this.html = data.html; // design html
         this.mydiv.html(this.html);
         console.log('editor updated');
      })
    });
    this.unlayer.setMergeTags({
      first_name: {
        name: "First Name",
        value: "{{first_name}}",
      },
      last_name: {
        name: "Last Name",
        value: "{{last_name}}",
      },
      company: {
        name: "Company",
        value: "{{company}}",
      }
    });

 }

 loadDesign(json) :void {
   if (json) {
     this.unlayer.loadDesign(JSON.parse(json));
   }else {
     this.unlayer.loadBlank({
       backgroundColor: '#e7e7e7'
     });
   }
 }

  savehtml() :void
  {
    const unlayer= Unlayersavehtml();
    unlayer.exportHtml((data)=> {
      this.json = data.design; // design json
      this.html = data.html; // design html
        this.mydiv.html(this.html);
        console.log('saved editor')
      }
    );

  }


   registerupload(endpoint,token):void{
    this.unlayer.registerCallback('image', function(file, done) {
      const fdata = new FormData()
      fdata.append('file', file.attachments[0])

      fetch(endpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer '.concat(token),
        },
        body: fdata
      }).then(response => {
        // Make sure the response was valid
        if (response.status >= 200 && response.status < 300) {
          return response
        } else {
          throw new Error(response.statusText)
        }
      }).then(response =>  response.json() ).then(data => {
        // Pass the URL back to Unlayer to mark this upload as completed

        done({ progress: 100, url: data.fileDownloadUri  })
      })
    })
  }






}
