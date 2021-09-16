import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-update-answer',
  templateUrl: './update-answer.component.html',
  styleUrls: ['./update-answer.component.css']
})
export class UpdateAnswerComponent implements OnInit {
public quizAnswerList : any=[];
public serverDetails: any = {
  "serverUrl": "https://wfr9bu9th2.execute-api.us-east-1.amazonaws.com/dev/api8/",
  // "serverUrl": 'https://obq0e0nxhk.execute-api.us-east-1.amazonaws.com/production/api/',
  "jwttoken": ""
};
public answerupdateEndpoint:any='setcorrectans'
public formSource: any = {
  "source":"quiz_answer",
  "endpoint": "addorupdatelessonanswer",
  "deleteendpoint": "lessonanswerdatadelete",
  "showEndpoint":"datalist",
  "formTitleName": 'Training'
}
public jwtToken:any;
public lessonId:any;
public ListingPageRoute:any='/quiz/list/'
  constructor(public activatedRoute : ActivatedRoute,public cookie:CookieService) { 
    this.jwtToken = cookie.get('jwtToken');
    this.serverDetails.jwttoken=this.jwtToken;
    this.lessonId = activatedRoute.snapshot.params.lessonid;
  }

  ngOnInit() {
    this.activatedRoute.data.forEach(data => {
      let result: any;
      result = data.quizQuestionData.res;
      this.quizAnswerList = result;
    })
  }

}
