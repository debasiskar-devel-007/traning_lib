import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
public manageTrainingList : any=[];
public paramsId:any;
public lessonData:any=[];
public trainingName:any;
public totalData:any=[];
public quizQuestionSourceName:any={
  "questionSourceName":"quiz_question",
  "answerSourceName":"quiz_answer"
};
public serverDetails: any = {
  "serverUrl": "https://9ozbyvv5v0.execute-api.us-east-1.amazonaws.com/production/api/",
  "jwttoken": ""
};
public formSource: any = {
  "source":'manage_lession_view',
  "markedSourceName":"done_training_lesson",
  "endpoint": "addorupdatedata",
  "showEndpoint":"getquestionanswerlistbylessonid",
  "formTitleName": 'Training Center',
  "getUpdatedTrainingPercentageByUserEndpoint":"getupdatedtrainingpercentagebyuserid"
}
public trainingCenterRoute:any="/training-center/list/";
public jwtToken:any;

  constructor(public activatedRoute : ActivatedRoute,public cookie:CookieService) {
    this.paramsId = this.activatedRoute.snapshot.params.associated_training;
    this.jwtToken = cookie.get('jwtToken');
    this.serverDetails.jwttoken=this.jwtToken;
   }

  ngOnInit() {
    this.activatedRoute.data.forEach(data => {
      this.trainingName = data.trainingdata.trainingname;      
      let result: any;
      result = data.trainingdata.results;
      this.totalData=result;
      console.log("results",result);
      this.lessonData = data.trainingdata.results.lessondata;
      this.manageTrainingList = result;
      
    })
  }


}