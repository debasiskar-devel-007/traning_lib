import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-add-update-answer',
  templateUrl: './add-update-answer.component.html',
  styleUrls: ['./add-update-answer.component.css']
})
export class AddUpdateAnswerComponent implements OnInit {
public paramsId:any;
public lessonId:any;
public listingPageRoute:any="/quiz/list/";
public serverDetails: any = {
  // "serverUrl": "https://obq0e0nxhk.execute-api.us-east-1.amazonaws.com/production/api/",
  "serverUrl": 'https://wfr9bu9th2.execute-api.us-east-1.amazonaws.com/dev/api8/',
  "jwttoken": ""
};
public formSource: any = {
  "source":'quiz_answer',
  "endpoint": "addorupdatelessonanswer",
  "showEndpoint":"datalist",
  "AddheaderText": "Add Training",
  "EditheaderText": "Edit Training",
  "formTitleName": 'Training'
}
public dnaFlag:any=true;
public jwtToken:any;
  constructor(public activatedRoute:ActivatedRoute,public cookie:CookieService) { 
    this.paramsId = activatedRoute.snapshot.params.id;
    this.lessonId = activatedRoute.snapshot.params.lessonid;
    this.jwtToken = cookie.get('jwtToken');
    this.serverDetails.jwttoken=this.jwtToken;
  }

  ngOnInit() {
  }

}
