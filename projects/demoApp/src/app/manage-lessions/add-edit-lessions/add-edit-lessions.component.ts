
// for dna backend start ---------------------------------------------

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { CookieService } from 'ngx-cookie-service';

// @Component({
//   selector: 'app-add-edit-lessions',
//   templateUrl: './add-edit-lessions.component.html',
//   styleUrls: ['./add-edit-lessions.component.css']
// })
// export class AddEditLessionsComponent implements OnInit {
//   title = 'demoApp';
//   public formdataval: any;
//   public recid: any;
//   public listingPageRoute: any = "/manage-lesson/list";
//   public pageName: any = "Manage Lesson";
//   public isitdna: any = true;

//   public bucket_url: any = {
//    url: 'https://training-centre-bucket.s3.amazonaws.com/lesson-files/'
//   }

//   public serverDetails: any = {
//     "serverUrl": "https://obq0e0nxhk.execute-api.us-east-1.amazonaws.com/production/api/",
//     "jwttoken": ""
//   };
//   // public formSource: any = {
//   //   "source": 'manage_lession',
//   //   "endpoint": "addorupdatelessondata",
//   //   "showEndpoint": "getlessondatabyid",
//   //   "AddheaderText": "Add Lesson",
//   //   "EditheaderText": "Edit Lesson",
//   //   "lessonDataEndpoint":"getlessondatabytrainingid"
//   // }

//   public formSource: any = {
//     source: 'manage_lession',
//     endpoint: 'addorupdatedata',
//     showEndpoint: 'datalist',
//     AddheaderText: 'Add Lesson',
//     EditheaderText: 'Edit Lesson',
//     lessonDataEndpoint: 'getlessondatabytrainingid'
//   };
//   public additionalData: any = {
//     objectId: 'associated_training',
//     objectId2: 'prerequisite_lession'
//   };

//   public configFileUpload: any = {
//     baseUrl: "https://fileupload.influxhostserver.com/",
//     endpoint: "uploads",
//     size: "51200", // kb
//     format: ["jpg", "jpeg", "png", "bmp", "zip", 'html', 'mp3','mp4','txt', 'mpeg', 'doc', 'ppt', 'pptx', 'pdf', 'docx','xlsx','ods','csv'], // use all small font
//     type: "lesson-file",
//     path: "lesson-files",
//     prefix: "lesson_file_",
//     formSubmit: false,
//     conversionNeeded: 1,
//     bucketName: "training-centre-bucket",
//   }
//   public lesson_attachment_flag:boolean=true;


//   public jwtToken: any;

//   constructor(public route: ActivatedRoute, public cookie: CookieService) {
//     this.jwtToken = cookie.get('jwtToken');
//     this.serverDetails.jwttoken = this.jwtToken;
//   }

//   ngOnInit() {
//     this.route.params.subscribe(params => {
//       this.recid = params['id'];
//       console.log(params['id'])
//       if (this.recid != null && this.recid != '' && this.recid != undefined) {
//         // this.geteditdata()
//       }
//     });

//     this.formdataval = [
//       { inputtype: 'text', name: 'lession_title', label: 'Lesson Title', placeholder: 'Enter Lesson Title', validationrule: { required: true }, validationerrormsg: 'is required' },

//       { inputtype: 'textarea', name: 'description', label: 'Lesson Description', placeholder: 'Enter Description' },

//       { inputtype: 'select', name: 'associated_training', label: 'Associated Training', defaultchoice: 'Select Training Category :', sourceview: 'training_category_management_view', endpoint: 'datalist', selectvalue: 'catagory_name', selectid: '_id', validationrule: { required: true }, validationerrormsg: 'is required' },

//       { inputtype: 'select', name: 'prerequisite_lession', label: 'Prerequisite Lesson', defaultchoice: 'Select a Prerequisite Lesson :', sourceview: 'manage_lession_null', endpoint: 'datalist', selectvalue: 'lession_title', selectid: '_id' },

//       // { inputtype: 'radio', name: 'test_associate_training', value: ["Yes", "No"], valuelabel: '', label: "Is there a test associated with training ", placeholder: "", validationrule: { required: true }, validationerrormsg: '', class: 'radioclass' },

//       { inputtype: 'checkbox', name: 'status', label: 'Active', placeholder: 'Enter Status', validationrule: { required: true }, validationerrormsg: 'is required' },

//       { inputtype: 'button', name: 'mediaType', label: 'Training Type', defaultchoice: 'Choose Training Type', sourceview: 'assets/mediaType.json', sourcetype: 'static', selectvalue: 'name', selectid: 'selectname', validationrule: { required: true }, validationerrormsg: 'is required', buttonflag: true },
//     ];


//   }

// }
// for dna backend end ---------------------------------------------


// for betoparedes backend start ---------------------------



import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
// import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-edit-lessions',
  templateUrl: './add-edit-lessions.component.html',
  styleUrls: ['./add-edit-lessions.component.css']
})
export class AddEditLessionsComponent implements OnInit {

  title = '';
  public formdataval: any;
  public recid: any;
  public listingPageRoute: any = "/manage-lesson/list";
  public pageName: any = "Manage Lesson";
  // public isitdna: any = true;
  public isitBetoparedes: any = true;
  public bucket_url: any = {
    url: 'https://beto-paredes-training-centre.s3.amazonaws.com/lesson-files/'
  }
  public showfieldflag: boolean = true;
  public traingaccessflag: boolean = false;
  public serverDetails: any = {
    "serverUrl": 'https://z2oo2a8oq9.execute-api.us-east-1.amazonaws.com/dev/api1/',
    "jwttoken": ""
  };
  public from_type: any = 'lesson';
  // public formSource: any = {
  //   "source": 'manage_lession',
  //   "endpoint": "addorupdatelessondata",
  //   "showEndpoint": "getlessondatabyid",
  //   "AddheaderText": "Add Lesson",
  //   "EditheaderText": "Edit Lesson",
  //   "lessonDataEndpoint":"getlessondatabytrainingid"
  // }

  public formSource: any = {
    source: 'manage_lession',
    endpoint: 'addorupdatelessondata',
    showEndpoint: 'getlessondatabyid',
    AddheaderText: 'Add Lesson',
    EditheaderText: 'Edit Lesson',
    lessonDataEndpoint: 'getlessondatabytrainingid',

  };
  public additionalData: any = {
    objectId: 'associated_training',
    objectId2: 'prerequisite_lession'
  };

  // public configFileUpload: any = {
  //   baseUrl: "https://fileupload.influxhostserver.com/",
  //   endpoint: "uploads",
  //   size: "51200", // kb
  //   format: ["jpg", "jpeg", "png", "bmp", "zip", 'html', 'mp3', 'mp4', 'txt', 'mpeg', 'doc', 'ppt', 'pptx', 'pdf', 'docx', 'xlsx', 'ods', 'csv'], // use all small font
  //   type: "lesson-file",
  //   path: "lesson-files",
  //   prefix: "lesson_file_",
  //   formSubmit: false,
  //   conversionNeeded: 1,
  //   bucketName: "pece-training-files",
  // }
  public configFileUpload: any ={
    label: 'Upload Image:',
    name: 'screenshots',
    type: 'file',
    prefix: 'image-' + Date.now(),
    path: "lesson-files/",
    baseurl: "lesson-files/",
    bucket: "beto-paredes-training-centre",
    apiurl: 'https://tge24bc2ne.execute-api.us-east-1.amazonaws.com/dev/requestUploadURL',
    apideleteurl: 'https://tge24bc2ne.execute-api.us-east-1.amazonaws.com/dev/deletefilefromBucket',
  }
  
  public lesson_attachment_flag: boolean = true;


  public jwtToken: any;

  constructor(public route: ActivatedRoute, public cookie: CookieService) {
    this.jwtToken = cookie.get('jwtToken');
    this.serverDetails.jwttoken = this.jwtToken;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.recid = params['id'];
      console.log(params['id'])
      if (this.recid != null && this.recid != '' && this.recid != undefined) {
        // this.geteditdata()
      }
    });

    this.formdataval = [
      { inputtype: 'text', name: 'lession_title', label: 'Lesson Title', placeholder: 'Enter Lesson Title', validationrule: { required: true }, validationerrormsg: 'is required' },

      { inputtype: 'textarea', name: 'description', label: 'Lesson Description', placeholder: 'Enter Description' },

      { inputtype: 'select', name: 'associated_training', label: 'Associated Training', defaultchoice: 'Select Training Category :', sourceview: 'training_category_management_view', endpoint: 'getlisttraining', selectvalue: 'catagory_name', selectid: '_id', validationrule: { required: true }, validationerrormsg: 'is required' },

      { inputtype: 'select', name: 'prerequisite_lession', label: 'Prerequisite Lesson', defaultchoice: 'Select a Prerequisite Lesson :', sourceview: 'manage_lession_null', endpoint: 'getlessondata', selectvalue: 'lession_title', selectid: '_id' },

      // { inputtype: 'radio', name: 'test_associate_training', value: ["Yes", "No"], valuelabel: '', label: "Is there a test associated with training ", placeholder: "", validationrule: { required: true }, validationerrormsg: '', class: 'radioclass' },

      { inputtype: 'checkbox', name: 'status', label: 'Active', placeholder: 'Enter Status', validationrule: { required: true }, validationerrormsg: 'is required' },

      { inputtype: 'button', name: 'mediaType', label: 'Training Type', defaultchoice: 'Choose Training Type', sourceview: 'assets/mediaType.json', sourcetype: 'static', selectvalue: 'name', selectid: 'selectname', validationrule: { required: true }, validationerrormsg: 'is required', buttonflag: true },
      // { inputtype: 'number', name: 'priority', label: 'Priority', placeholder: 'Enter Priority', validationrule: { required: true }, validationerrormsg: 'is required' },
    ];


  }
}

// for betoparedes backend end ---------------------------------------
