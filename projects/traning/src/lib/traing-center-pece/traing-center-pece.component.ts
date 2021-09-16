import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalForButtomSearch } from 'listing-angular7';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../api.service';


export interface DialogData {
  data: any;
  flag: any;
  quiz_data: any;
  lesson_data: any;
  server_url: any;
  user_id: any;
}

@Component({
  selector: 'lib-traing-center-pece',
  templateUrl: './traing-center-pece.component.html',
  styleUrls: ['./traing-center-pece.component.css']
})
export class TraingCenterPeceComponent implements OnInit {
  public trainingCategoryData = [];
  public paramsTrainingId: any;
  public trainingCenterRoute: any;
  public trainingLessonData: any = [];
  public paramslessonId: any;
  public training_cat_name: any = '';
  public lesson_content_data: any = [];
  public shwmorevideoflg: boolean = false;
  public video_base_url: any = 'https://www.youtube.com/embed/';
  public serverDetailsVal: any;
  public progressSpinner: any = {
    mode: 'indeterminate',
    loading: false,
    bookingStatus: 'Sending request'
  };
  public formSourcedata: any;
  public donedata: any = [];
  public done_cat_data: any = [];
  public percentageprogressLoader: boolean = true;
  public allDonedata: any = 0;
  public divisor = 0;
  public quizflag: boolean = false;
  public quizdata: any = [];
  public userId: any;
  public next_button_access: boolean = false;
  public userType: any;
  

  @Input()
  set formSource(val: any) {
    this.formSourcedata = val;
    this.serverDetailsVal = this.formSourcedata.serverurl
    console.log(val);

  }
  //all traing category data
  @Input()
  set TrainingCentreData(val) {
    this.trainingCategoryData = val.trainingcenterlist;
    this.paramsTrainingId = this.activatedRoute.snapshot.params.associated_training;
    this.trainingLessonData = val.alllessondata;
    this.lesson_content_data = val.lesson_content;
    this.divisor = val.total_lesson;
    this.quizflag = false;
    console.log(val);
    if (this.activatedRoute.snapshot.params._id != null && typeof this.activatedRoute.snapshot.params._id != 'undefined' && this.activatedRoute.snapshot.params._id) {
      this.paramslessonId = this.activatedRoute.snapshot.params._id;

    } else {
      // this.paramslessonId = this.lessonParamId;

    }
    if (this.trainingCategoryData.length > 0) {
      for (const key in this.trainingCategoryData) {
        if (this.trainingCategoryData[key]._id == this.paramsTrainingId) {
          console.log(this.trainingCategoryData[key].catagory_name);
          this.training_cat_name = this.trainingCategoryData[key].catagory_name;
        }
      }

    }
    this.progressSpinner.loading = false;
    this.donedata = val.donealllessondata;
    if (this.donedata && this.donedata.length > 0) {
      for (const key in this.donedata) {
        if (this.activatedRoute.snapshot.params.associated_training == this.donedata[key].associated_training) {
          for (const keys in this.trainingLessonData) {
            if (this.trainingLessonData[keys]._id == this.donedata[key].lesson_id) {
              this.trainingLessonData[keys].is_done = true;
            }

          }
        }
      }
    }
    this.done_cat_data = val.done_lesson_cat_user;
    this.allDonedata = 0
    if (this.done_cat_data && this.done_cat_data.length > 0) {
      for (const key in this.done_cat_data) {

        for (const keys in this.trainingCategoryData) {
          if (this.trainingCategoryData[keys]._id == this.done_cat_data[key].associated_training) {

            this.trainingCategoryData[keys].percentage = this.done_cat_data[key].percent;
            this.trainingCategoryData[keys].count = this.done_cat_data[key].lessondata;
            this.trainingCategoryData[keys].done = this.done_cat_data[key].total_done_lesson;
          }

        }

        this.allDonedata += this.done_cat_data[key].total_done_lesson
      }
    }


    if (this.activatedRoute.snapshot.params._id != null && typeof this.activatedRoute.snapshot.params._id != 'undefined' && this.activatedRoute.snapshot.params._id) {
      let data = {
        lesson_id: this.paramslessonId
      }
      let link1 = this.formSourcedata.serverurl + this.formSourcedata.quizdataendpoint
      this.apiService.postDatawithoutToken(link1, data).subscribe((res: any) => {
        console.log(res);
        if (res.status == 'success' && res.quiz_data.length > 0) {
          this.quizflag = true;
          this.quizdata = res
        }

      })

    }
  }

  @Input()
  set TrainingCenterRoute(id: any) {
    this.trainingCenterRoute = (id) || '<no name set>';
  }


  constructor(public router: Router, public snakBar: MatSnackBar, public activatedRoute: ActivatedRoute, public apiService: ApiService, public cookieService: CookieService, public dialog: MatDialog, public sanitizer: DomSanitizer) {
    console.log(this.donedata);
    if (this.cookieService.get('user_details') && JSON.parse(this.cookieService.get('user_details')) != null && typeof JSON.parse(this.cookieService.get('user_details')) != undefined && JSON.parse(this.cookieService.get('user_details')) != '') {
      console.log(JSON.parse(this.cookieService.get('user_details')));

      // this.userId = JSON.parse(this.cookieService.get('userid'));

    }

  }

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.params,
      'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk', this.donedata
    );
    if (this.donedata && this.donedata.length > 0) {
      for (const key in this.donedata) {
        if (this.activatedRoute.snapshot.params.associated_training == this.donedata[key].associated_training) {
          for (const keys in this.trainingLessonData) {
            if (this.trainingLessonData[keys]._id == this.donedata[key].lesson_id) {
              this.trainingLessonData[keys].is_done = true;
            }

          }
        }
      }
    }


  }

  // for traing click
  clicktrcataining(val, catagory_name: any, i) {


    this.training_cat_name = this.trainingCategoryData[i].catagory_name;

    this.router.navigateByUrl(this.trainingCenterRoute + val);
  }

  // for openinglesson
  openlesson(item, flag, i) {
    if (flag == 'click') {
      console.log(item);
      this.router.navigateByUrl(this.trainingCenterRoute + item.associated_training_id + '/' + item._id);
    }
  }

  // for mark as done

  nextbutton(val, flag, i) {
    this.progressSpinner.loading = true;
    console.log(this.trainingLessonData[i], i);
    let ind = 0;
    let ind2 = 0;
    console.log(i + 1, this.trainingLessonData[i + 1]);
    let userdata = JSON.parse(this.cookieService.get('user_details'));


    let data = {
      data: {
        "user_id": userdata._id,
        "current_lesson_id": "",
        "current_lesson_name": "",
        "associated_training": val.associated_training_id,
        "lesson_id": val._id,
        "status": 1,
        "previous_lesson_name": val.lession_title,
        "previous_lesson_id": val._id,
        "use_type": userdata.user_type
      }
    }
    if (this.trainingLessonData[i + 1]) {
      data.data.current_lesson_id = this.trainingLessonData[i + 1]._id;
      data.data.current_lesson_name = this.trainingLessonData[i + 1].lession_title;
    } else {
      if (this.trainingCategoryData.length > 0) {
        for (const key in this.trainingCategoryData) {
          if (this.trainingCategoryData[key]._id == val.associated_training_id) {
            ind2 = (parseInt(key) + 1);

            if (this.trainingCategoryData[ind2]) {
              data.data.current_lesson_id = this.trainingCategoryData[ind2].fistlesson_id;
              data.data.current_lesson_name = this.trainingCategoryData[ind2].fistlesson;


            }

          }
        }
      }
    }

    let link1 = this.formSourcedata.serverurl + this.formSourcedata.addMarkendpoint
    this.apiService.postDatawithoutToken(link1, data).subscribe((res: any) => {
      console.log(res);
      if (i + 1 >= this.trainingLessonData.length) {

        if (this.trainingCategoryData.length > 0) {
          for (const key in this.trainingCategoryData) {
            if (this.trainingCategoryData[key]._id == val.associated_training_id) {
              console.log(key, typeof key);
              ind = (parseInt(key) + 1);
              console.log(ind);
              if (ind && this.trainingCategoryData[ind] && this.trainingCategoryData[ind]._id != null && typeof this.trainingCategoryData[ind]._id != 'undefined' && this.trainingCategoryData[ind]._id != '') {
                this.router.navigateByUrl(this.trainingCenterRoute + this.trainingCategoryData[ind]._id + '/' + this.trainingLessonData[0]._id);

              } else {
                this.router.navigateByUrl(this.trainingCenterRoute + this.trainingCategoryData[0]._id + '/' + this.trainingLessonData[0]._id);

              }
            }
          }

        }
      } else {
        this.router.navigateByUrl(this.trainingCenterRoute + val.associated_training_id + '/' + this.trainingLessonData[i + 1]._id);
      }
    })






  }

  // for video open modal
  openLessonVideo(val: any) {
    console.log(val);
    var url = this.video_base_url + val.video_url + '?modestbranding=1&autohide=0&showinfo=0&controls=0&listType=playlist&rel=0';
    var server_url = this.serverDetailsVal.serverUrl

    const safe_url = this.sanitizer.bypassSecurityTrustResourceUrl(url);

    if (val.video_skippable == true) {
      var video_url = val.video_url + '?rel=0&modestbranding=1&autoplay=1&showinfo=0&controls=1&listType=playlist';
    } else {
      var video_url = val.video_url + '?rel=0&modestbranding=1&autoplay=1&showinfo=0&controls=0&listType=playlist';
    }

  }

  // for lesson quiz modal  
  lessonQuiz() {

    var server_url: any = this.serverDetailsVal.serverUrl + this.formSourcedata.addlessonquizdataendpoint;

    const dialogRef = this.dialog.open(LessonQuizPeceModalComponent, {
      panelClass: 'schedule_modal',
      height: 'auto',
      data: { quiz_data: this.quizdata.quiz_data, lesson_data: this.lesson_content_data, user_id: this.userId, server_url: server_url }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe((result: any) => {
      // // console.log(result, 'result')
      if (result == 'yes') {
        this.next_button_access = true;
        this.quizflag = false;
        // // console.log("next_button_access true++++",this.quizflag)


        // if (this.lesson_content.is_done == null) {
        // 
        // }
        if (this.quizflag == false) {
          this.next_button_access = true;
          // // // // console.log("next_button_access true")
        }
        else {
          this.next_button_access = false;
          // // // // console.log("next_button_access false")
        }
        this.getTrainingCenterlistFunctionwithLessonId(this.userType, this.userId, this.paramslessonId)

        this.progressSpinner.loading = false;
      }
    }
    )

  }
  getTrainingCenterlistFunctionwithLessonId( type: any, user_id: any, _id: any) {
    // // // // // // console.log('associated_training', associated_training, 'type', type, 'user_id', user_id, '_id', _id)
    // // console.log("mahitosh")
    // const link = this.serverDetailsVal.serverUrl + this.formSourceVal.gettrainingcenterlistendpoint;
    // let data: any = {
    //   "condition": {
    //     "associated_training": this.paramsTrainingId,
    //     "_id": _id,
    //     lessionId: this.paramslessonId
    //   },
    //   "user_id": this.userId,
    //   "type": type,
    //   "associated_training": associated_training
    // }
    // this.progressSpinner.loading = true
    // // // // // // console.log(this.userId, 'this.userId')
    // this.apiService.postDatawithoutToken(link, data).subscribe((response: any) => {

    //   if (response.status == "success") {
    //     this.getMarkDataButton(response.results);

    //     // // console.log("next_button_access true", response);
    //     this.progressSpinner = {
    //       mode: 'indeterminate',
    //       loading: false,
    //       bookingStatus: 'Sending request'
    //     };
    //   }
    // });

  }

}



@Component({
  selector: 'lessonquiz',
  templateUrl: './lesson_pece_quiz.html'
})
export class LessonQuizPeceModalComponent {
  public quizData: any = '';
  public CheckedAnswer: any = [];
  public lessonData: any;
  public quizVal: any = '';
  public correctQuizVal: any = [];
  public resultVal: any;
  public resultStatus: any = 'Failed';
  public indexVal: any = 1;
  public progressSpinner: any = {
    mode: 'indeterminate',
    loading: true,
    bookingStatus: 'Sending request'
  }
  constructor(public dialogRef: MatDialogRef<LessonQuizPeceModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public snakBar: MatSnackBar, public apiService: ApiService, public router: Router) {
    // // // // console.log(data, 'data')
    this.quizData = data.quiz_data[0];
    this.lessonData = data.lesson_data;
    this.indexVal = 1;
    // // // // // console.log(this.quizData, '++')
  }
  closedModal() {
    this.data.flag = 'no';
    this.dialogRef.close(this.data.flag);

    if (this.data.quiz_data.length > 0) {
      this.snakBar.open(' Your Lesson Quiz is Incomplete..!', 'OK', {
        duration: 5000
      })
    }

  }



  //next quiz
  nextQuizRecord(val: any) {
    this.indexVal = this.indexVal + 1;
    // // // // // console.log(this.CheckedAnswer, 'CheckedAnswer', this.quizVal)
    if (this.quizVal != '') {
      this.CheckedAnswer.push(this.quizVal)
      this.quizVal = '';
    }

    let ind: any = 0;

    for (let i in this.data.quiz_data) {
      if (this.data.quiz_data[i]._id == val._id) {
        ind = (parseInt(i) + 1);
        if (this.data.quiz_data[ind] != null && typeof (this.data.quiz_data[ind]) != 'undefined') {
          this.quizData = this.data.quiz_data[ind];
          // this.indexVal = ind;

        } else {
          this.quizData = '';

          // // // // // console.log(this.CheckedAnswer, '++== else ')
          if (this.CheckedAnswer.length > 0) {
            for (let i in this.CheckedAnswer) {
              if (this.CheckedAnswer[i].isCorrect == 1) {
                // // // // // console.log(this.CheckedAnswer[i], '????chk')
                this.correctQuizVal.push(this.CheckedAnswer[i]);
              }
            }
          }

          if (this.correctQuizVal.length > 0) {
            var result = (this.correctQuizVal.length / this.data.quiz_data.length) * 100
            this.resultVal = parseFloat(result.toFixed(2));
            if (this.resultVal >= this.data.lesson_data.test_percentage) {
              this.resultStatus = 'Success';
            } else {
              this.resultStatus = 'Failed';
            }
          } else {
            this.resultVal = 0;
            this.resultStatus = 'Failed';
          }
        }
      }
    }
  }

  saveQuizRecord(val) {
    // // // // // console.log(this.resultVal, 'resultVal')
    this.progressSpinner.loading = true;
    let link = this.data.server_url + '';
    let user_result: any = {
      resultVal: this.resultVal,
      CheckedAnswer: this.CheckedAnswer,
      resultStatus: this.resultStatus,
      target_percentage: this.data.lesson_data.test_percentage,
      user_id: this.data.user_id,
      lesson_id: this.lessonData._id
    }

    user_result.QuizReportData = {
      total_question: this.data.quiz_data.length,
      attempt_question: this.CheckedAnswer.length,
      correct_answer: this.correctQuizVal.length,
      target_percentage: this.data.lesson_data.test_percentage,
      score: this.resultVal
    }

    // // // console.log(user_result, 'user_result')
    this.apiService.postDatawithoutToken(link, user_result).subscribe(res => {
      let result: any = res;
      if (result.status == 'success') {
        this.data.flag = 'yes';

        this.progressSpinner.loading = false;
        this.dialogRef.close(this.data.flag);
        this.snakBar.open('Successfully Completed Your Lesson Quiz..!', 'OK', {
          duration: 5000
        })
      }
    })
  }

  startQuizAgain(val) {
    this.CheckedAnswer = [];
    this.correctQuizVal = [];
    this.resultVal = 0
    this.resultStatus = 'Failed';
    this.quizData = '';
    this.quizData = this.data.quiz_data[0];
    this.indexVal = 1;
  }
}