import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-training-centre-beto-paredes',
  templateUrl: './training-centre-beto-paredes.component.html',
  styleUrls: ['./training-centre-beto-paredes.component.css']
})
export class TrainingCentreBetoParedesComponent implements OnInit {

  public TrainingCentreData: any = {};
  public paramsId: any;
  public lessonData: any = [];
  public trainingName: any;
  public totalData: any = [];
  public trainingCeneterData: any = [];
  public quizQuestionSourceName: any = {
    "questionSourceName": "quiz_question",
    "answerSourceName": "quiz_answer"
  };
  public serverDetails: any = {
    "serverUrl": "https://z2oo2a8oq9.execute-api.us-east-1.amazonaws.com/dev/api1/",
    "jwttoken": ""
  };
  public trainingcatParamid = this.activatedRoute.snapshot.params.associated_training;
  public lessonParamId = '';
  public lessionFileEndpoint: any = {
    file_endpoint: 'updateusercompletelessonfiles',
    video_endpoint: 'updateusercompletelessonvideo',
    audio_endpoint: 'updateusercompletelessonaudio'

  }
  public lessonquizendpoint = 'addlessonquizdata'
  public formSource: any = {
    "source": 'manage_lession_view',
    "markedSourceName": "done_training_lesson",
    "endpoint": "addorupdatedata",
    "addMarkendpoint": "addmarkeddata",
    "showEndpoint": "getquestionanswerlistbylessonid",
    "formTitleName": 'Training Center',
    "getUpdatedTrainingPercentageByUserEndpoint": "getupdatedtrainingpercentagebyuserid",
    "trainingCompletEmailEndpoint": "trainingcompletemail",
    "trainingcatcompletemailendpoint": "trainingcatcompletemail",
    "complete_traing_data": "complete-traing-data",
    gettrainingcenterlistendpoint: 'gettrainingcenterlist',
    traingupdateendpoint: 'update-training-percentage',
    dashbord_route: '/technological-consultant/dashboard'
  }
  public traingupdateendpoint: any = 'done-training-sort-data'
  public trainingCenterRoute: any = "/training-center-beto-paredes/";
  public lessonplanmaterialRoute: any = "/lesson-plan-material/";
  public jwtToken: any;
  public googleScheduleRoute: any = '/calendar-management/manage-appointment/game-plan/book-appointment/';

  constructor(public activatedRoute: ActivatedRoute, public cookie: CookieService) {
    this.paramsId = this.activatedRoute.snapshot.params.associated_training;
    this.jwtToken = cookie.get('jwtToken');
    this.serverDetails.jwttoken = this.jwtToken;
    console.log(this.activatedRoute.snapshot);
    if (this.activatedRoute.snapshot.queryParams && this.activatedRoute.snapshot.queryParams.singletraining && typeof this.activatedRoute.snapshot.queryParams.singletraining != 'undefined' && this.activatedRoute.snapshot.queryParams.singletraining != null && this.activatedRoute.snapshot.queryParams.singletraining != '') {
      this.formSource.addMarkendpoint = 'getsingletraingcompletes'
    }
    if (this.activatedRoute.snapshot.queryParams && this.activatedRoute.snapshot.queryParams.catname && typeof this.activatedRoute.snapshot.queryParams.catname != 'undefined' && this.activatedRoute.snapshot.queryParams.catname != null && this.activatedRoute.snapshot.queryParams.catname != '') {
      this.cookie.set('catname', this.activatedRoute.snapshot.queryParams.catname, undefined, '/');
    }
  }

  ngOnInit() {
    this.activatedRoute.data.forEach(data => {
      // console.log(data, 'data')
      this.trainingName = data.trainingdata.trainingname;
      // console.log(data, "gettrainingcenterlist data", this.trainingName);
      let result: any;
      result = data.trainingdata.results;
      this.totalData = result;
      this.trainingCeneterData = data.trainingdata;
      this.lessonData = data.trainingdata.results.lessondata;
      this.TrainingCentreData = result;

    })

    // // console.log(this.activatedRoute.snapshot.params._id,'____app___________')
    // this.activatedRoute.snapshot.params._id='6006cf8b1dc1570009fe3bbf'
    // if (this.activatedRoute.snapshot.params._id != null) {
    //   this.lessonParamId = this.activatedRoute.snapshot.params._id
    // }
    // else {
    //   switch (this.activatedRoute.snapshot.params.associated_training) {
    //     case '6007d728411dbf000889b1ef':
    //       this.lessonParamId = '6006cf8b1dc1570009fe3bbf'
    //       break;
    //     case '6006b2a41d0b370008a3a7c9':
    //       this.lessonParamId = '6008061af84b9b0008f54ed5'

    //       break;
    //     case '6006a5247e9ff766ac7c776a':
    //       this.lessonParamId = '6006d17c7e5bd300062fa2a2'

    //       break;


    //   }
    //   // console.log(this.lessonParamId, '____app___________')

    //   // console.log('null')

    // }


  }

  trainingDataListener(val) {
    console.log(val, '+++++++++++-----------------------+++++')
  }

}
