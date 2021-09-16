
// for dna backend start------------------------------------

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { CookieService } from 'ngx-cookie-service';

// @Component({
//   selector: 'app-list-lession',
//   templateUrl: './list-lession.component.html',
//   styleUrls: ['./list-lession.component.css']
// })
// export class ListLessionComponent implements OnInit {
// public manageLessionList : any=[];
// public isitdna:any=true;
// public manageTrainingList : any = [];
// public editPageRoute : any="/manage-lesson/edit/";
// public addPageRoute : any="/manage-lesson/add";
// public manageQuizRoute:any="/manage-quiz/list/";
// public QuizPageRoute:any='/quiz/list/';
// public bucket_url: any = {
//   url: 'https://training-centre-bucket.s3.amazonaws.com/lesson-files/'
//  };
//  public preview_url:any = 'https://obq0e0nxhk.execute-api.us-east-1.amazonaws.com/production/'
//  public preview_endpoint= 'lesson-preview-data'
// public serverDetails: any = {
//   "serverUrl": "https://obq0e0nxhk.execute-api.us-east-1.amazonaws.com/production/api/",
//   "jwttoken": ""
// };
// // public formSource: any = {
// //   "source":'manage_lession',
// //   "endpoint": "lessondelete",
// //   "deleteManyEndpoint":"lessondeletemany",
// //   "searchEndpoint":"getlessondata",
// //   "associatedTrainingSourceName":"training_category_management",
// //   "statusUpdateEndpoint":"lessonstatusupdate",
// //   "statusUpdateManyEndpoint":"lessonstatusupdate",
// //   "statusUpdateSourceName":"manage_lession",
// //   "trashDataSource":"manage_lession_view",
// //   "retriveTrashDataEndpoint":"lessonrestoredata",
// //   "retriveTrashDataSourceName":"manage_lession",
// //   "trainingCountEndpoint" : "trainingcounts"
// // }

// public formSource: any = {
//   source: 'manage_lession',
//   endpoint: 'singledeletetrainingdata',
//   deleteManyEndpoint: 'multipledeletetrainingdata',
//   searchEndpoint: 'datalistwithouttoken',
//   associatedTrainingSourceName: 'manage_lession_view',
//   statusUpdateEndpoint: 'statusChange',
//   statusUpdateManyEndpoint: 'statusupdate',
//   statusUpdateSourceName: 'manage_lession',
//   trashDataSource: 'manage_lession_view',
//   retriveTrashDataEndpoint: 'restoretrashdata',
//   retriveTrashDataSourceName: 'manage_lession',
//   trainingCountEndpoint : 'trainingcounts'
// };
// public jwtToken:any;
// public searchSourceName :any="manage_lession_view";
//   constructor(public activatedRoute : ActivatedRoute,public cookie:CookieService) { 
//     this.jwtToken = cookie.get('jwtToken');
//     this.serverDetails.jwttoken=this.jwtToken;
//   }

//   ngOnInit() {
//     this.activatedRoute.data.forEach(data => {
//       let result: any;
//       result = data.lessionData.res;
//       this.manageLessionList = result;      
//     })
//   }

// }

// for dna backend end ------------------------------------
// for beto paredes  backend start ------------------------------------

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
// import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-lession',
  templateUrl: './list-lession.component.html',
  styleUrls: ['./list-lession.component.css']
})
export class ListLessionComponent implements OnInit {
  public manageLessonList: any = [];
  // public isitdna:any=false;
  public isitBetoparedes = true;
  public manageTrainingList: any = [];
  public editPageRoute: any = "/manage-lesson/edit/";
  public addPageRoute: any = "/manage-lesson/add";
  public manageQuizRoute: any = "/manage-quiz/list/";
  public QuizPageRoute: any = '/quiz/list/';
  public bucket_url: any = {
    url: 'https://pece-training-files.s3.amazonaws.com/dev-files/'
  };
  public preview_url: any = 'https://wfr9bu9th2.execute-api.us-east-1.amazonaws.com/dev/api8/'
  public preview_endpoint = 'lesson-preview-data'
  public serverDetails: any = {
    "serverUrl": 'https://wfr9bu9th2.execute-api.us-east-1.amazonaws.com/dev/api8/',
    "jwttoken": ""
  };
  public formSource: any = {
    "source": 'manage_lession',
    "endpoint": "lessondelete",
    "deleteManyEndpoint": "api1/lessondelete",
    "searchEndpoint": "getlessonlist",
    "associatedTrainingSourceName": "training_category_management",
    "statusUpdateEndpoint": "api1/lessonstatusupdate",
    "statusUpdateManyEndpoint": "api1/lessonstatusupdate",
    "statusUpdateSourceName": "manage_lession",
    "trashDataSource": "manage_lession_view",
    "retriveTrashDataEndpoint": "lessonrestoredata",
    "retriveTrashDataSourceName": "manage_lession",
    "trainingCountEndpoint": "trainingcounts"
  }

  
  public jwtToken: any;
  public searchSourceName: any = "manage_lession_view";
  constructor(public activatedRoute: ActivatedRoute, public cookie: CookieService) {
    this.jwtToken = cookie.get('jwtToken');
    this.serverDetails.jwttoken = this.jwtToken;
  }

  ngOnInit() {
    this.activatedRoute.data.forEach(data => {
      console.log(data)
      let result: any;
      result = data.lessionData.res;
      this.manageLessonList = result;
    })
  }


}

