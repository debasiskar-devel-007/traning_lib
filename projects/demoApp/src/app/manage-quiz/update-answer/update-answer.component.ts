import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-answer',
  templateUrl: './update-answer.component.html',
  styleUrls: ['./update-answer.component.css']
})
export class UpdateAnswerComponent implements OnInit {
public quizAnswerList : any=[];
public serverDetails: any = {
  "serverUrl": "https://9ozbyvv5v0.execute-api.us-east-1.amazonaws.com/production/api/",
  "jwttoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1ODAzNzA2MjYsImlhdCI6MTU4MDI4NDIyNn0.XvqHVBr35oS0afZVKKq_vPEhEI3P4X_hDaOJTei-4JM"
};
public formSource: any = {
  "source":"quiz_answer",
  "endpoint": "addorupdatedata",
  "deleteendpoint": "deletesingledata",
  "showEndpoint":"datalist",
  "formTitleName": 'Training'
}
  constructor(public activatedRoute : ActivatedRoute) { 

  }

  ngOnInit() {
    this.activatedRoute.data.forEach(data => {
      console.log("update answer",data);
      let result: any;
      result = data.quizQuestionData.res;
      this.quizAnswerList = result;
    })
  }

}
