import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-add-edit-quiz',
  templateUrl: './add-edit-quiz.component.html',
  styleUrls: ['./add-edit-quiz.component.css']
})
export class AddEditQuizComponent implements OnInit {
  public lessonIdInedit: any;
  public quizQuestionSingleDataList: any = [];
  public lessonId: any;
  public serverDetails: any = {
    // 'serverUrl': 'https://obq0e0nxhk.execute-api.us-east-1.amazonaws.com/production/api/',
    serverUrl: 'https://wfr9bu9th2.execute-api.us-east-1.amazonaws.com/dev/api8/',
    jwttoken: ''
  };
  public formSource: any = {
    source: 'manage_quiz',
    endpoint: 'addorupdatelessonquestion',
    showEndpoint: 'datalist',
    formTitleName: 'Training'
  };

  public listingPageRoute: any = '/quiz/list/';
  public jwtToken: any;
  constructor(public activatedRoute: ActivatedRoute, public cookie: CookieService) {
    // console.log(this.activatedRoute.snapshot.params.lesson_id_object);
    this.lessonIdInedit = this.activatedRoute.snapshot.params.lesson_id;
    this.lessonId = this.activatedRoute.snapshot.params.lesson_id;
    this.jwtToken = cookie.get('jwtToken');
    this.serverDetails.jwttoken = this.jwtToken;
  }

  ngOnInit() {
    if (this.activatedRoute.snapshot.params._id) {
      this.activatedRoute.data.forEach(data => {
        let result: any;
        result = data.quizData.res;
        this.quizQuestionSingleDataList = result;

      });
    }

  }
}
