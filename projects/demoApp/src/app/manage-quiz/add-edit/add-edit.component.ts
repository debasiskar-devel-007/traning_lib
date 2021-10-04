import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  public lessonIdInedit:any;
  public quizQuestionSingleDataList:any=[];
  public lessonId:any
  public serverDetails: any = {
    // "serverUrl": "https://obq0e0nxhk.execute-api.us-east-1.amazonaws.com/production/api/",
    "serverUrl": "https://wfr9bu9th2.execute-api.us-east-1.amazonaws.com/dev/api8/",
    "jwttoken": ""
  };
  public formSource: any = {
    "source":"manage_quiz_question",
    "endpoint": "addorupdatelessonquestion",
    "showEndpoint":"datalist",
    "formTitleName": 'Training'
  }

  public configData: any = {
    baseUrl: "https://fileupload.influxhostserver.com/",
    endpoint: "uploads",
    size: "51200", // kb
    format:["jpg", "jpeg", "png"],  // use all small font
    type: "question-picture",
    path: "training-question",
    prefix: "question-picture_",
    formSubmit: false,
    conversionNeeded: 0,
    bucketName:"crmfiles.influxhostserver"
  }

  public listingPageRoute : any="/manage-quiz/list/";
  public jwtToken:any
  constructor(public activatedRoute : ActivatedRoute,public cookie:CookieService) { 
    console.log(this.activatedRoute.snapshot.params);
    this.lessonIdInedit=this.activatedRoute.snapshot.params.lesson_id;
    this.lessonId = this.activatedRoute.snapshot.params.id;
    this.serverDetails.jwttoken=this.jwtToken;
    this.jwtToken = cookie.get('jwtToken');

  }

  ngOnInit() {
    if(this.activatedRoute.snapshot.params._id){
      this.activatedRoute.data.forEach(data => {
        let result: any;
        result = data.quizQuestionData.res;
        this.quizQuestionSingleDataList = result;
  
      })
    }
  
  }

}
