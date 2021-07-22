import { Component, Inject, Input, OnInit, Output, EventEmitter, AfterViewChecked, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../api.service';
export interface DialogData7 {
  data: any;
  lesson_id: any;
  training_id: any;
  flag: any;
}
export interface DialogData8 {
  data: any;
}
export interface DialogData4 {
  data: any;
  safe_url: any;
  lesson_id: any;
  training_id: any;
  endpoint: any;
  user_id: any;
  flag: any;
  video_url: any;
}
export interface DialogData6 {
  data: any;
  flag: any;
}
export interface DialogData5 {
  data: any;
  flag: any;
  quiz_data: any;
  lesson_data: any;
  server_url: any;
  user_id: any;
}
@Component({
  selector: 'lib-training-centre-beto-paredes',
  templateUrl: './training-centre-beto-paredes.component.html',
  styleUrls: ['./training-centre-beto-paredes.component.css']
})
export class TrainingCentreBetoParedesComponent implements OnInit {
  public progressSpinner: any = {
    mode: 'indeterminate',
    loading: false,
    bookingStatus: 'Sending request'
  };
  public count = 0;
  public shwmoreflg: boolean = false;
  public shwmorefileflg: boolean = false;
  public shwmorevideoflg: boolean = false;
  public lessonplanmaterialroute: any;
  public googlescheduleroute: any;
  public serverDetailsVal: any;
  public trainingCategoryName: any;
  public formSourceVal: any;
  public quizQuestionSource: any;
  public paramsId: any;
  public trainingCenterRoute: any;
  public trainingCentreData: any;
  public trainingCategoryData: any = [];
  public trainingLessonData: any = [];
  public progress_bar = 0;
  public training_header_text: any;
  public video_base_url: any = 'https://www.youtube.com/embed/';
  public trainingcatParamid: any;
  public lessonParamId: any;
  public access_flag: any = false;
  public paramsTrainingId: any;
  public paramslessonId: any;
  public training_cat_name: any;
  public lesson_content: any = [];
  public lessonDataList: any = [];
  public progressLoader: boolean = false;
  public nextdata: number = 0;
  public nextlessondata: any;
  public userId: any;
  public trainingCategoryList: any = [];
  public AllTrainingData: any = [];
  public previewimages: any;
  public bucket_url: any = 'https://beto-paredes-training-centre.s3.amazonaws.com/lesson-files/'
  public userType: any;
  public done_lesson: any;
  public lession_atachment_dataarray: any = [];
  public lessonContentData: any;
  public dividend: any = 0;
  public divisor: any = 0;
  public reportPercentage: any;
  public is_done: any = [];
  public lessondone_count = 0
  public percentageprogressLoader: boolean = true;
  public video_data: any = [];
  public next_button_access: any = false;
  public quizflag: boolean = false;
  public complete_fileflag: any = [];
  public complete_audioflag: any = [];
  public complete_videoflag: any = [];
  public audio_duration: any = [];
  public audio_currenttime: any = [];
  public newaudio_currenttime: any = [];
  public audio_progress: any = [];
  public modelval: any = [];
  public disabled = [];
  public audio_end_time: any = [];
  public audio_time: any = [];
  public play_flag: any = [];
  public pause_flag: any = [];
  public lesson_title: any;
  public questionId: any;
  public questionindex: any = 0;
  public questionArray: any = [];
  public quizQuestion: any;
  public audio_data: any = [];
  public files_data: any = [];
  public fileComplete: any = [];
  public audiocomplete: any = [];
  public videocomplete: any = [];
  public incompleteTraining: any = [];
  public completeTraining: any = [];
  public lessionFileEndpoint: any = {};
  public lessonquizendpoint: any;
  public percentage: any;
  public traingupdateendpoint: any;
  public quizReportflag: boolean = false;
  public completeQuizData: any = [];
  public complete_data: any;

  @Output() trainingDataListener = new EventEmitter<any>();



  @Input()
  set lessonplanmaterialRoute(route: any) {
    this.lessonplanmaterialroute = route;
  }

  @Input()
  set googleScheduleRoute(route: any) {
    this.googlescheduleroute = route;
  }
  @Input()
  set LessionFileEndpoint(val: any) {
    this.lessionFileEndpoint = val;
    // // // console.log(this.lessionFileEndpoint, 'lessionFileEndpoint')
  }


  @Input()
  set serverDetails(serverDetails: {}) {
    this.serverDetailsVal = (serverDetails) || '<no name set>';
  }

  @Input()
  set TrainingName(name: any) {
    this.trainingCategoryName = (name) || '<no name set>';
  }

  @Input()
  set formSource(formSource: any) {
    this.formSourceVal = (formSource) || '<no name set>';
    console.log(this.formSourceVal.complete_traing_data);
  }

  @Input()
  set QuizQuestionSource(val: any) {
    this.quizQuestionSource = (val) || '<no name set>';
  }
  @Input()
  set LessonQuizEndpoint(val: any) {
    this.lessonquizendpoint = (val)
  }

  @Input()
  set TrainingCenterRoute(id: any) {
    this.trainingCenterRoute = (id) || '<no name set>';
  }
  @Input()
  set TrainingcatParamid(train_id: any) {
    this.trainingcatParamid = (train_id) || '<no name set>';
    // // // // console.log(this.trainingcatParamid, 'trainingcatParamid')
  }
  @Input()
  set TraingUpdateEndpoint(val: any) {
    this.traingupdateendpoint = (val);
    console.log(this.traingupdateendpoint);
  }
  @Input()
  set LessonParamId(lessid: any) {
    this.lessonParamId = (lessid) || '<no name set>';
    // // // // console.log(this.lessonParamId, 'lessionParamId1111111')
    if (this.activatedRoute.snapshot.params._id != null) {
      this.paramslessonId = this.activatedRoute.snapshot.params._id
    } else {
      this.paramslessonId = this.lessonParamId;

    }
    // // // // console.log(this.paramslessonId,'???????????????????')
  }
  @Input()
  set TrainingCentreData(val) {

    this.complete_data = val.done_lesson_by_cat_by_user;
    this.paramsTrainingId = this.activatedRoute.snapshot.params.associated_training;

    this.audio_data = [];
    this.files_data = [];
    this.video_data = [];
    this.next_button_access = false;
    this.quizflag = false;
    this.quizReportflag = false;
    this.trainingCentreData = val;
    // // // // // console.log(this.trainingCentreData.lesson_content[0].lesson_attachements, 'librery')
    this.trainingCategoryData = val.trainingcenterlist;
    this.trainingLessonData = this.trainingCentreData.alllessondata;

    // console.log(this.trainingLessonData)


    if (this.activatedRoute.snapshot.params._id != null) {
      this.paramslessonId = this.activatedRoute.snapshot.params._id
    } else {
      if (typeof (val.lesson_content) != 'undefined' && val.lesson_content.length > 0) {
        this.paramslessonId = val.lesson_content[0]._id;
      }
    }
    // // // console.log(this.paramslessonId, '_______________')

    this.lessonDataList = val.alllessondata
    if (this.trainingCentreData != null && typeof (this.trainingCentreData) != 'undefined' && this.trainingCentreData.lesson_content != null && typeof (this.trainingCentreData.lesson_content) != 'undefined' && this.trainingCentreData.lesson_content.length > 0) {
      console.log(this.trainingCentreData.lesson_content)
      this.lessonContentData = this.trainingCentreData.lesson_content[0];
    }

    // this.lession_atachment_dataarray=this.trainingCentreData.lesson_content[0].lesson_attachements;
    for (const key in this.trainingCategoryData) {
      for (const d of val.done_lesson_by_cat_by_user) {
        //
        if (this.trainingCategoryData[key]._id == d.associated_training) {
          this.trainingCategoryData[key].done = d.lessonsdone;
          this.trainingCategoryData[key].percentage = Math.floor((this.trainingCategoryData[key].done / this.trainingCategoryData[key].count) * 100);
          this.percentage = this.trainingCategoryData[key].percentage
        }
      }

      if (this.trainingCategoryData[key].done == null) {
        this.trainingCategoryData[key].done = 0;
      }
    }

    // console.log(this.percentage, ' this.percentage__________________')

    for (let i in this.trainingCategoryData) {
      if (this.paramsTrainingId == this.trainingCategoryData[i]._id) {
        // // // // // console.log(this.trainingCategoryData[i]._id, 'this.trainingCentreData[i]._id')
        this.training_cat_name = this.trainingCategoryData[i].catagory_name;
      }
    }
    // // console.log(this.userId, 'this.userId')
    if (val.done_lesson_by_user && val.done_lesson_by_user.length != 0 && typeof (val.done_lesson_by_user[0].lessonsdone) != 'undefined') {

      this.dividend = val.done_lesson_by_user[0].lessonsdone;
    }
    this.divisor = val.total_lesson;

    this.reportPercentage = Math.floor(this.dividend / this.divisor * 100);
    for (const key in this.trainingCategoryData) {
      this.percentage = (this.trainingCategoryData[key].done / this.trainingCategoryData[key].count) * 100
    }

    // console.log(this.percentage, 'percentage')

    for (const key in this.trainingLessonData) {
      // // // // // console.log(this.trainingLessonData[key], 'raju')
      for (const iterator of this.trainingCentreData.donetraininglessondata) {
        // // // // // console.log(iterator)
        // // // // // console.log(iterator, 'this.trainingCategoryData[key]._id',this.trainingLessonData[key]._id)
        if (iterator.lesson_id == this.trainingLessonData[key]._id) {
          // // console.log()
          // this.is_done[iterator.lesson_id] = true;
          this.trainingLessonData[key].is_done = true;
        }
        // else {
        //   this.trainingLessonData[key].is_done = false;
        // }
      }
    }

    // console.log(this.trainingCategoryData, 'kkkkkkkkkkkk')



    this.getMarkDataButton(val);

    if (typeof (this.lessonContentData) != 'undefined' && this.lessonContentData.legth > 0 && this.lessonContentData.lesson_attachements != null && this.lessonContentData.lesson_attachements.length > 0 && this.trainingCentreData.complete_lesson_videos.length > 0 && this.quizflag == false) {
      for (const key in this.lessonContentData.lesson_attachements) {
        for (const iterator of this.trainingCentreData.complete_lesson_videos) {
          if (this.lessonContentData.lesson_attachements[key].type == 'video' && this.lessonContentData.lesson_attachements[key].video_skippable == false && this.lessonContentData.lesson_attachements[key].video_url == iterator.video_id) {
            this.complete_videoflag[iterator.video_id] = true
          }
        }
      }
    }
    if (typeof (this.lessonContentData) != 'undefined' && this.lessonContentData.legth > 0 && this.lessonContentData.lesson_attachements != null && this.lessonContentData.lesson_attachements.length > 0 && this.trainingCentreData.complete_lesson_files.length > 0 && this.quizflag == false) {
      for (const key in this.lessonContentData.lesson_attachements) {
        for (const iterator of this.trainingCentreData.complete_lesson_files) {
          if (this.lessonContentData.lesson_attachements[key].type == 'file' && this.lessonContentData.lesson_attachements[key].file_skippable == false && this.lessonContentData.lesson_attachements[key].file._id == iterator.file_id) {
            this.complete_fileflag[iterator.file_id] = true;
          }
        }
      }
    }
    if (typeof (this.lessonContentData) != 'undefined' && this.lessonContentData.legth > 0 && this.lessonContentData.lesson_attachements != null && this.lessonContentData.lesson_attachements.length > 0 && this.trainingCentreData.complete_lesson_audio.length > 0 && this.quizflag == false) {
      for (const key in this.lessonContentData.lesson_attachements) {
        for (const iterator of this.trainingCentreData.complete_lesson_audio) {
          if (this.lessonContentData.lesson_attachements[key].type == 'audio' && this.lessonContentData.lesson_attachements[key].audio_skippable == false && this.lessonContentData.lesson_attachements[key].audio._id == iterator.audio_id) {
            this.complete_audioflag[iterator.audio_id] = true;
          }
        }
      }
    }
    this.trainingupdate();
    this.progressSpinner = {
      mode: 'indeterminate',
      loading: false,
      bookingStatus: 'Sending request'
    };

  }


  constructor(public router: Router, public snakBar: MatSnackBar, public activatedRoute: ActivatedRoute, public apiService: ApiService, public cookieService: CookieService, public dialog: MatDialog, public sanitizer: DomSanitizer) {
    this.userId = JSON.parse(this.cookieService.get('userid'));
    this.userType = JSON.parse(this.cookieService.get('type'));


  }

  ngOnInit() {
    if (this.trainingCategoryData[0].count == this.trainingCategoryData[0].done && this.trainingCentreData.calendar_booking_data.length == 0 && JSON.parse(this.cookieService.get('gameplancall')) == 1) {
      this.gamePlanModal(this.paramslessonId, this.paramsTrainingId);
    }
  }


  clicktrcataining(val, catagory_name: any) {
    // console.log(catagory_name, '++--------+', val)
    this.progressSpinner.loading = true;
    // // // console.log(this.trainingCategoryData[0], 'trainingCategoryData')
    let training_access_flag: boolean = false;
    if ((this.trainingCategoryData[0].done == this.trainingCategoryData[0].count || this.trainingCategoryData[0]._id == val)) {
      setTimeout(() => {
        this.progress_bar = 1;
      }, 100);
      training_access_flag = true;
      // this.router.navigateByUrl(this.trainingCenterRoute + val);
      // this.training_cat_name = catagory_name;
      setTimeout(() => {
        document.getElementById("lessonData").scrollIntoView();
        this.progress_bar = 0;
      }, 1000);
    }

    if (training_access_flag == true || this.trainingCategoryData[0]._id == val || JSON.parse(this.cookieService.get("type")) == 'distributor' || JSON.parse(this.cookieService.get("type")) == 'admin') {
      // console.log(JSON.parse(this.cookieService.get("type")));

      this.router.navigateByUrl(this.trainingCenterRoute + val);


      this.training_cat_name = catagory_name;
    } else {
      this.progressSpinner.loading = false;

      this.snakBar.open("Sorry, You cannot access this training unless you complete the" + this.trainingCategoryData[0].catagory_name, 'Ok', {
        duration: 4000
      });
    }

  }

  nochildclick(val: any, flag) {
    // // // // console.log(val, 'nochiuld')
    this.router.navigateByUrl(this.trainingCenterRoute + this.paramsTrainingId + '/' + val._id);

  }

  playbtn(val: any, flag: any) {
    // // // // console.log(val, '000000796e++', flag)
    let audioId: any = document.getElementById("audioPlayer_" + val);
    this.play_flag[val] = false;
    this.pause_flag[val] = true;
    audioId.play();
    // // // // console.log(audioId, 'audioId')
  }

  pausebtn(val: any, flag: any) {
    let audioId: any = document.getElementById("audioPlayer_" + val);
    audioId.pause();
    this.play_flag[val] = true;
    this.pause_flag[val] = false;
    // // // // console.log(audioId, '+++++++++++++')
  }

  replay(val) {
    var audioId: any = document.getElementById("audioPlayer_" + val);

    audioId.currentTime = 0;
    this.audio_currenttime[val] = audioId.currentTime;
    var sec_num = parseInt(audioId.currentTime, 10);
    var hours: any = Math.floor(sec_num / 3600);
    var minutes: any = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds: any = sec_num - (hours * 3600) - (minutes * 60);
    this.audio_time[val] = hours + ':' + minutes + ':' + seconds;
    this.audio_progress[val] = Math.floor((this.audio_currenttime[val] / this.audio_duration[val]) * 100);
    // // // // console.log(this.audio_currenttime[val], 'audioId.currentTime')
  }
  //skip ten sec (next and previous)
  skipTensec(val, item, flag) {
    // // // // console.log(item, '+++++++++++====', flag)
    if (item.audio_skippable == false) {
      this.snakBar.open("You can't skip this audio", 'Ok', {
        duration: 1000
      });
    }
    else {
      if (flag == 'previos') {
        var audioId: any = document.getElementById("audioPlayer_" + val);
        audioId.currentTime = audioId.currentTime - Math.floor(10);
        // // // // console.log(audioId.currentTime, 'previos')

      }
      if (flag == 'next') {
        var audioId: any = document.getElementById("audioPlayer_" + val);
        audioId.currentTime = audioId.currentTime + 10;
        // // // // console.log(audioId.currentTime, 'next')

      }
    }


  }

  
  progressbtn(val, fullval) {

    if (fullval.audio_skippable == true) {

      this.audio_progress[val] = this.modelval[val];

      this.audio_currenttime[val] = (this.modelval[val] * this.audio_duration[val]) / 100;

      var sec_num = parseInt(this.audio_currenttime[val], 10);
      var hours: any = Math.floor(sec_num / 3600);
      var minutes: any = Math.floor((sec_num - (hours * 3600)) / 60);
      var seconds: any = sec_num - (hours * 3600) - (minutes * 60);
      this.audio_time[val] = hours + ':' + minutes + ':' + seconds;
      // // // // console.log(this.audio_currenttime[val], 'audio_currenttime');
      let audioId: any = document.getElementById("audioPlayer_" + val);
      audioId.currentTime = this.audio_currenttime[val];

      // // // // console.log(this.audio_currenttime, 'audio_currenttime progressbtn fst__--------')
      // // // // console.log(this.audio_progress[val], 'audio_progress progressbtn fst__--------')
    }
    else {
      this.snakBar.open("You can't skip this audio", 'Ok', {
        duration: 1000
      });
    }
    // this.audio_progress[id]=5
  }

  // game Plan Modal
  gamePlanModal(lessonid, trainingid,) {


    if (JSON.parse(this.cookieService.get('type')) == 'technological-consultant' && JSON.parse(this.cookieService.get('gameplancall')) == 1) {
      console.log('hhiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');

      const dialogRef = this.dialog.open(GameplanModalComponent, {
        panelClass: 'schedule_modal',
        width: '900px',
        height: 'auto',
        data: { data: this.trainingCategoryData, lesson_id: lessonid, training_id: trainingid }
      });
      dialogRef.disableClose = true;
      dialogRef.afterClosed().subscribe((result: any) => {
        // // // console.log(result, 'result')
        if (result.flag != null && result.flag == true) {
          // // // console.log(result, 'gyyyyyyyyyyygygyg', this.googlescheduleroute + result.training_id + '/' + result.lesson_id);
          this.router.navigateByUrl(this.googlescheduleroute + result.training_id + '/' + result.lesson_id);
        }

      })
    }

  }
  nextbutton(value: any) {
    // // console.log(value, 'value', this.lessonDataList)
    this.progressSpinner = {
      mode: 'indeterminate',
      loading: true,
      bookingStatus: 'Sending request'
    };

    switch (value) {
      case 'next':
        // this.lessonDataList[this.Index].lession_title
        // // // // // console.log(this.lesson_content, 'this.lesson_content', this.lessonDataList[0])
        // if (this.lesson_content.is_done == null && this.lesson_content.has_lessonplan == 0) {
        //   // // // // // console.log(this.lesson_content.has_lessonplan, 'has_lessonplan')
        // }
        this.addMarkedData(this.lessonDataList);

        let ind: any = 0;
        setTimeout(() => {
          for (let b in this.lessonDataList) {
            if (this.lessonDataList[b]._id == this.lessonContentData._id)
              ind = (parseInt(b) + 1);
          }
          // // // // // console.log('ind', ind);
          if (this.lessonDataList[ind] != null) {

            setTimeout(() => {
              this.nochildclick(this.lessonDataList[ind], 'next');

            }, 500)

            this.progressLoader = true;
          } else {

            for (var n = 0; n < this.trainingCategoryData.length; n++) {
              // // // // // console.log('++>>>>', this.trainingCategoryList[n], this.trainingCategoryList[n + 1], this.trainingCategoryList[0]._id)
              if (this.paramsTrainingId == this.trainingCategoryData[n]._id && this.trainingCategoryData[n + 1] != null) {
                // // // // // console.log('-->>>>', this.trainingCategoryList[n + 1])

                this.router.navigateByUrl(this.trainingCenterRoute + this.trainingCategoryData[n + 1]._id);
                this.progressSpinner = {
                  mode: 'indeterminate',
                  loading: false,
                  bookingStatus: 'Sending request'
                };
              }
              else {
                // // // // // console.log('++>>>>', this.trainingCategoryList[n]._id, this.trainingCategoryList[n + 1]._id,)
                // '>>>',this.trainingCategoryList[0]._id)
                this.progressLoader = false;
                this.router.navigateByUrl(this.trainingCenterRoute + this.trainingCategoryData[0]._id);

              }
            }

          }
        }, 500);
        // // // // // console.log("souresh test", this.nextdata);
        // }
        break;
      case 'prev':
        // // // // // console.log(this.lessonDataList[this.Index], '>>>>>>>>>>>>')
        let ind1: number = 0;
        setTimeout(() => {
          // if(this.Index<this.lessonDataList.length){
          for (let b in this.lessonDataList) {
            if (this.lessonDataList[b]._id == this.lesson_content._id)
              ind1 = parseInt(b) - 1;
          }

          // if(this.lessonDataList[ind].is_done == true ){
          //   this.nochildclick(this.lessonDataList[ind]);
          //   }

          this.nochildclick(this.lessonDataList[ind1], 'prev');

          this.progressLoader = true;
        }, 500);

        break;
    }
  }


  addMarkedData(value) {

    console.log(value);


    let ind;

    let data: any = {}

    data = {
      "data": {
        user_id: this.userId,

        current_lesson_id: '',
        current_lesson_name: '',

        associated_training: this.paramsTrainingId,
        lesson_id: this.paramslessonId,

        next_lesson_name: '',
        next_lesson_id: '',

        previous_lesson_name: '',
        previous_lesson_id: '',
        // productid:,
        use_type: JSON.parse(this.cookieService.get('type'))

      },
      "sourceobj": ["user_id", "lesson_id", "associated_training"],
      "token": this.serverDetailsVal.jwttoken
    }

    if (this.trainingCategoryData && this.trainingCategoryData != null && typeof (this.trainingCategoryData) != 'undefined' && this.trainingCategoryData.length > 0) {
      for (const key in this.trainingCategoryData) {
        if (this.paramsTrainingId == this.trainingCategoryData[key]._id) {
          console.log(this.trainingCategoryData[key].product_id);
          if (this.trainingCategoryData[key].product_id && this.trainingCategoryData[key].product_id != null && typeof (this.trainingCategoryData[key].product_id) != 'undefined' && this.trainingCategoryData[key].product_id != '') {
            data.data.product_id = this.trainingCategoryData[key].product_id;

          }
        }
      }

    }
    if (value != null && typeof (value) != 'undefined' && value.length > 0) {
      for (let i in value) {
        ind = parseInt(i)
        if (value[i]._id == this.paramslessonId) {

          // // console.log(value[ind].lession_title, '__________________+++++++++++++++++++++')

          if (value[ind + 1] != null && typeof (value[ind + 1]) != 'undefined') {
            data.data.current_lesson_name = value[ind + 1].lession_title;
            data.data.current_lesson_id = value[ind + 1]._id;
          }

          if (value[ind] != null && typeof (value[ind]) != 'undefined') {
            data.data.previous_lesson_name = value[ind].lession_title;
            data.data.previous_lesson_id = value[ind]._id;
          }

          if (value[ind + 2] != null && typeof (value[ind + 2]) != 'undefined') {
            data.data.next_lesson_name = value[ind + 2].lession_title;
            data.data.next_lesson_id = value[ind + 2]._id;
          }
        }

        // // console.log(data, '+++++++++++++')
      }
    }

    console.log(data);

    let link = this.serverDetailsVal.serverUrl + this.formSourceVal.addMarkendpoint;

    this.apiService.postData(link, data).subscribe((response: any) => {
      console.log(response, 'respoese453')
      if (response.status == "success") {

        let link1 = this.serverDetailsVal.serverUrl + this.traingupdateendpoint;
        const data1 = {
          "user_id": JSON.parse(this.cookieService.get('userid'))
        }

        this.apiService.postDatawithoutToken(link1, data1).subscribe((response: any) => {
          // console.log(response, 'respoese453')

        })
        let associated_id;
        let completeassociated_id;
        for (const key of this.trainingCategoryData) {
          for (const it in this.complete_data) {
            console.log(this.trainingCategoryData)
            if (key._id == this.complete_data[it].associated_training) {
              if (key.count == key.done) {
                // this.reloadComponent()
                console.log(this.complete_data[this.complete_data.length - 1].associated_training, 'complete_data', this.complete_data.length - 1);
                associated_id = this.complete_data[this.complete_data.length - 1].associated_training;
                let data2: any = {
                  "user_id": this.userId,
                }
                let link2 = this.serverDetailsVal.serverUrl + this.traingupdateendpoint;

                this.apiService.postDatawithoutToken(link2, data2).subscribe((response: any) => {
                  // console.log(response, 'respoese453')

                })
              }

            }
          }

        }
        let userfullname = JSON.parse(this.cookieService.get('firstname')) + ' ' + JSON.parse(this.cookieService.get('lastname'));
        let data2: any = {
          "user_id": this.userId,
          "user_name": userfullname,
          "associated_id": associated_id,
          "user_email": JSON.parse(this.cookieService.get('useremail'))

        }
        let link2 = this.serverDetailsVal.serverUrl + this.formSourceVal.complete_traing_data;

        this.apiService.postDatawithoutToken(link2, data2).subscribe((response: any) => {
          // console.log(response, 'respoese453')

        })
        // console.log(associated_id, 'associated_id');


      }
    })


  }

  lessonQuiz(val: any) {
    // // // console.log(val, 'kkkkkkkkkkkkkkbeto')
    if (val != null && typeof (val.quiz_data) != 'undefined') {
      // // // // // console.log(val, '++', this.AllTrainingData.quiz_data)
      var server_url: any = this.serverDetailsVal.serverUrl + this.lessonquizendpoint;

      const dialogRef = this.dialog.open(LessonQuizBetoparedesModalComponent, {
        panelClass: 'schedule_modal',
        height: 'auto',
        data: { quiz_data: val.quiz_data, lesson_data: this.lessonContentData, user_id: this.userId, server_url: server_url }
      });
      // dialogRef.disableClose = true;
      dialogRef.afterClosed().subscribe((result: any) => {
        // console.log(result, 'result')
        if (result == 'yes') {
          this.next_button_access = true;
          this.quizflag = false;
          // console.log("next_button_access true++++",this.quizflag)


          // if (this.lesson_content.is_done == null) {
          // 
          // }
          if (this.quizflag == false) {
            this.next_button_access = true;
            // // // console.log("next_button_access true")
          }
          else {
            this.next_button_access = false;
            // // // console.log("next_button_access false")
          }
          this.getTrainingCenterlistFunctionwithLessonId(this.paramsId, this.userType, this.userId, this.paramslessonId)

          this.progressSpinner.loading = false;
        }
      }
      )
    }
  }



  onprocess(val, fullval) {

    var audioId: any = document.getElementById("audioPlayer_" + val); // audio id

    this.audio_duration[val] = audioId.duration; //audio duration


    this.audio_currenttime[val] = audioId.currentTime;
    this.audio_progress[val] = (this.audio_currenttime[val] / this.audio_duration[val]) * 100; // audio progress based on current time

    this.modelval[val] = 0;
    this.modelval[val] = this.audio_progress[val];

    this.audio_currenttime[val] = (this.modelval[val] * this.audio_duration[val]) / 100; // audio current val
    this.newaudio_currenttime[val] = this.audio_currenttime[val]


    if (fullval.audio_skippable == false) {
      // // // // console.log('true')
      this.disabled[val] = true;
    }
    // this.startEndTimeCalculation(val);
    //start time calculation

    var sec_num = parseInt(this.audio_currenttime[val], 10);
    var hours: any = Math.floor(sec_num / 3600);
    var minutes: any = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds: any = sec_num - (hours * 3600) - (minutes * 60);
    this.audio_time[val] = hours + ':' + minutes + ':' + seconds;

    //end time calculation
    var sec_duration_num = parseInt(this.audio_duration[val], 10);
    var duration_hours: any = Math.floor(sec_duration_num / 3600);
    var duration_minutes: any = Math.floor((sec_duration_num - (duration_hours * 3600)) / 60);
    var duration_seconds: any = sec_duration_num - (duration_hours * 3600) - (duration_minutes * 60);
    // // // // console.log(val, 'audio_duration')
    this.audio_end_time[val] = duration_hours + ':' + duration_minutes + ':' + duration_seconds;

  }

  //load to start the audio
  loadstart(fullval, val) {
    setTimeout(() => {
      // audioId.duration find audio duration
      var audioId: any = document.getElementById("audioPlayer_" + val);
      if (audioId.duration != null && audioId.duration != '') {
        this.audio_duration[val] = audioId.duration;
      }
      //audioId.currentTime for current audio time
      this.audio_currenttime[val] = audioId.currentTime;
      this.audio_progress[val] = Math.floor((this.audio_currenttime[val] / this.audio_duration[val]) * 100);

      //start time calculation
      var sec_num = parseInt(this.audio_currenttime[val], 10);
      var hours: any = Math.floor(sec_num / 3600);
      var minutes: any = Math.floor((sec_num - (hours * 3600)) / 60);
      var seconds: any = sec_num - (hours * 3600) - (minutes * 60);
      // convert start time to hours minutes sec format
      this.audio_time[val] = hours + ':' + minutes + ':' + seconds;

      //end time calculation
      var sec_duration_num = parseInt(this.audio_duration[val], 10);
      var duration_hours: any = Math.floor(sec_duration_num / 3600);
      var duration_minutes: any = Math.floor((sec_duration_num - (duration_hours * 3600)) / 60);
      var duration_seconds: any = sec_duration_num - (duration_hours * 3600) - (duration_minutes * 60);
      // convert end time to min hour sec format
      this.audio_end_time[val] = duration_hours + ':' + duration_minutes + ':' + duration_seconds;
      this.play_flag[val] = true;
      this.pause_flag[val] = false;

      if (fullval.audio_skippable == false) {
        // // // // console.log('true')
        this.disabled[val] = true
      }

      this.modelval[val] = 0;
      // // // // console.log(this.modelval[val], 'ghjgh+++++++++');
      this.modelval[val] = this.audio_progress[val];

      this.audio_currenttime[val] = (this.modelval[val] * this.audio_duration[val]) / 100;
      this.newaudio_currenttime[val] = this.audio_currenttime[val]

      // // // // console.log(this.audio_duration[val], 'audio_currenttime')


    }, 1500);

  }
  audioended(item: any, i: any, j) {
    // // // console.log(item, 'dcnjmkxdcvf')
    if (item.test_associate_training == 'Yes') {
      this.questionDetails(item._id, i, j);
    } else {

    }
    if (j == 1) {
      setTimeout(() => {
        this.getTrainingCenterlistFunctionwithLessonId(this.paramsId, this.userType, this.userId, this.paramslessonId)
      }, 500);

      let audioendpoint = this.serverDetailsVal.serverUrl + this.lessionFileEndpoint.audio_endpoint

      let audio_data = {
        user_id: this.userId,
        training_id: this.paramsTrainingId,
        lesson_id: this.paramslessonId,
        audio_type: item.audio.file_type,
        audio_id: item.audio._id,
        audio_name: item.audio.fileservername,
      }
      if (item.audio_skippable != true) {
        this.apiService.postDatawithoutToken(audioendpoint, audio_data).subscribe(res => {
          // // // console.log(res)
          let result: any = res;

          // // // // console.log(result, '+++++++')
          if (result.status == 'success') {
            // // // console.log(item, 'dcnjmkxdcvf')
            this.complete_audioflag[item.audio._id] = true;

            // if (this.complete_audioflag[item.audio._id] == true) {
            //   this.next_button_access=true;
            // }

            this.snakBar.open('Successfully Completed This Lesson Audio', 'ok', {
              duration: 3000
            });
          }
        })
      }



    }
  }
  questionDetails(id: any, i: any, lesson_title: any) {
    // // // // console.log(this.allLessonDataList.length, 'this.allLessonDataList.length', i)
    this.lesson_title = lesson_title
    this.progressLoader = true;
    this.questionId = id;
    this.questionindex = 0;
    const link = this.serverDetailsVal.serverUrl + this.formSourceVal.showEndpoint;
    let data: any = {
      source: this.quizQuestionSource.questionSourceName,
      // token:this.serverDetailsVal.jwttoken,
      condition: {
        lesson_id: id
      }
    }
    this.apiService.getData(link, data)
      .subscribe((response): any => {
        let result: any = response;
        this.questionArray = result.results.questionanswerlist;
        if (this.questionArray.length == 0) {
          this.questionArray.expanded = true;
        }

        if (i < this.trainingLessonData.length) {
          if (i < this.trainingLessonData.length) {

            if (this.trainingLessonData[i + 1] != null) {
              this.trainingLessonData[i].expanded = false;
              this.trainingLessonData[i + 1].expanded = true;
              this.trainingLessonData[i + 1].is_done = true;
            } else {
              let message: any = "You Have Successfully Completed The Training";
              let action: any = "Ok";
              this.snakBar.open(message, action, {
                duration: 3000
              });
              setTimeout(() => {
                // this.lastOpenDialog('lessoncompletedmoal');
              }, 4000);

            }

          }
        }
        if (this.questionArray.length > 0) {
          this.progressLoader = false;
          let lesson_name: any = lesson_title;
          this.quizQuestion = this.questionArray[this.questionindex];
          // this.openDialog(this.quizQuestion,i,this.lesson_title);
        } else {
          this.progressLoader = false;
          let message: any = "This Lesson Doesn't Have Any Questions";
          let action: any = "Ok";
          this.snakBar.open(message, action, {
            duration: 3000
          })
        }

      });
  }


  trainingupdate() {
    let link = this.serverDetailsVal.serverUrl + this.formSourceVal.traingupdateendpoint;

    let ind;

    let data: any = {}

    let value = this.trainingLessonData;

    data = {
      "data": {
        user_id: this.userId,

        current_lesson_id: '',
        current_lesson_name: '',

        associated_training: this.paramsTrainingId,

        next_lesson_name: '',
        next_lesson_id: '',

        previous_lesson_name: '',
        previous_lesson_id: '',

        reportPercentage: this.reportPercentage
      },
      "sourceobj": ["user_id", "lesson_id", "associated_training"],
      "token": this.serverDetailsVal.jwttoken
    }


    if (value != null && typeof (value) != 'undefined' && value.length > 0 && value.length > 0) {
      for (let i in value) {
        ind = parseInt(i)
        if (value[i]._id == this.paramslessonId) {

          // // console.log(value[ind].lession_title, '__________________+++++++++++++++++++++')

          if (value[ind] != null && typeof (value[ind]) != 'undefined') {
            data.data.current_lesson_name = value[ind].lession_title;
            data.data.current_lesson_id = value[ind]._id;
          }

          if (value[ind - 1] != null && typeof (value[ind - 1]) != 'undefined') {
            data.data.previous_lesson_name = value[ind - 1].lession_title;
            data.data.previous_lesson_id = value[ind - 1]._id;
          }

          if (value[ind + 1] != null && typeof (value[ind + 1]) != 'undefined') {
            data.data.next_lesson_name = value[ind + 1].lession_title;
            data.data.next_lesson_id = value[ind + 1]._id;
          }
        }

        // // console.log(this.trainingCategoryData, '++======+++++++++++++')
      }
    }
    let t_percent: any = {}
    t_percent.associated_training = this.paramsTrainingId;
    if (this.trainingCategoryData[0].done != null && this.trainingCategoryData[0].done != '') {
      t_percent.percentage = ((this.trainingCategoryData[0].done / this.trainingCategoryData[0].count) * 100);
    }

    this.apiService.postDatawithoutToken(link, data).subscribe(res => {
      // console.log(res, 'trainingupdate');
      for (const key in this.trainingCategoryData) {
        if (this.trainingCategoryData[key]._id == this.paramsTrainingId && ((this.trainingCategoryData[key].done / this.trainingCategoryData[key].count) * 100) == 100) {
          this.trainingDataListener.emit({ action: 'update-success', result: data, training_percentage: t_percent })
        }
      }


    })
  }
  previewpdf(val, flag) {
    // // // console.log(val, 'val');
    if (flag == 'img') {
      this.previewimages = val
    }
    if (flag == 'pdf') {
      this.previewimages = val.images.converted_array;
      // // // // // console.log(this.previewimages, 'PreviewContentDialog')

    }
    // this.previewimages = val.images.converted_array;
    // // // // // console.log(this.previewimages, 'PreviewContentDialog')

    const dialogRef = this.dialog.open(PreviewContentDialogBeto, {
      panelClass: 'lesson_pdfmodal',
      width: 'auto',
      data: { data: val, flag: flag }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
      // // // // // console.log(result, '>>>>>>>>>>');
    });
  }
  downloadPdf(file: any, i) {
    // // // // // console.log(file.file_type, 'fvgbnjkmgbh')
    let fileendpoint: any;

    // // // // // console.log(this.serverDetailsVal.serverUrl, 'serverDetailsVal')
    fileendpoint = this.serverDetailsVal.serverUrl + this.lessionFileEndpoint.file_endpoint
    let file_data = {
      user_id: this.userId,
      training_id: this.paramsTrainingId,
      lesson_id: this.paramslessonId,
      file_type: file.file.file_type,
      file_id: file.file._id,
      file_servername: file.file.fileservername

    }

    if (file.file_skippable != true) {
      this.apiService.postDatawithoutToken(fileendpoint, file_data).subscribe(res => {
        // // // // console.log(res, 'res')
        let result: any = res;
        this.complete_fileflag[file.file._id] = false;

        // // // // // console.log(this.complete_fileflag[file.file._id], '+++++++_______________')
        if (result.status == 'success') {
          this.complete_fileflag[file.file._id] = true
          // // // // // console.log(this.complete_fileflag[file.file._id], '+++++++666______________')
          // this.next_button_access = true;
          let checked_status = 'success';
          let pdf_url = this.bucket_url + file.file.fileservername;
          let externalWindow = window.open(
            pdf_url
          );
          this.snakBar.open("You completed this file", 'Ok', {
            duration: 1000
          })
        }
      })
    }
    setTimeout(() => {
      this.getTrainingCenterlistFunctionwithLessonId(this.paramsId, this.userType, this.userId, this.paramslessonId)
    }, 500);
    if (file.file_skippable == true) {
      let pdf_url = this.bucket_url + file.file.fileservername;
      let externalWindow = window.open(
        pdf_url
      );
    }
  }

  getTrainingCenterlistFunctionwithLessonId(associated_training: any, type: any, user_id: any, _id: any) {
    // // // // // console.log('associated_training', associated_training, 'type', type, 'user_id', user_id, '_id', _id)
    // console.log("mahitosh")
    const link = this.serverDetailsVal.serverUrl + this.formSourceVal.gettrainingcenterlistendpoint;
    let data: any = {
      "condition": {
        "associated_training": this.paramsTrainingId,
        "_id": _id,
        lessionId: this.paramslessonId
      },
      "user_id": this.userId,
      "type": type,
      "associated_training": associated_training
    }
    this.progressSpinner.loading = true
    // // // // console.log(this.userId, 'this.userId')
    this.apiService.postDatawithoutToken(link, data).subscribe((response: any) => {

      if (response.status == "success") {
        this.getMarkDataButton(response.results);

        // console.log("next_button_access true", response);
        this.progressSpinner = {
          mode: 'indeterminate',
          loading: false,
          bookingStatus: 'Sending request'
        };
      }
    });

  }


  getMarkDataButton(val) {
    // console.log(val, '+++bgggggggggggggggggg++++++');
    this.next_button_access = false;
    this.quizReportflag = false;
    this.quizflag = false;
    let mandetoryLessonFile = [];
    let completeLessonFile = [];
    this.completeQuizData = [];

    this.audio_data = [];
    this.files_data = [];
    this.video_data = [];
    this.trainingCentreData = val;

    if (typeof (val.lesson_content) != 'undefined' && val.lesson_content.length > 0 && val.lesson_content[0].lesson_attachements != null && val.lesson_content[0].lesson_attachements.length > 0) {
      this.next_button_access = false;
      // // console.log("if____block  1")
      for (const key in val.lesson_content[0].lesson_attachements) {
        if (val.lesson_content[0].lesson_attachements[key].file_skippable == false || val.lesson_content[0].lesson_attachements[key].audio_skippable == false || val.lesson_content[0].lesson_attachements[key].video_skippable == false) {
          mandetoryLessonFile.push(val.lesson_content[0].lesson_attachements[key])
        }

      }

      completeLessonFile = completeLessonFile.concat(val.complete_lesson_files, val.complete_lesson_audio, val.complete_lesson_videos);

      // // console.log(completeLessonFile, 'completeLessonFile')
      if (mandetoryLessonFile.length == completeLessonFile.length) {
        this.next_button_access = true;
        if (val.quiz_data.length > 0) {
          this.quizflag = true;
          this.next_button_access = false;
          // // console.log('complete file')

          if (val.complete_lesson_quiz != null && val.complete_lesson_quiz.length > 0) {
            // // console.log('complete quiz')
            this.next_button_access = true;
            this.quizflag = false;
            this.quizReportflag = true;
            this.completeQuizData = val.complete_lesson_quiz[0];
          }
          else {
            this.next_button_access = false;
          }
        }

      } else {
        this.next_button_access = false;
      }

    }
    else {
      this.next_button_access = true;
    }
    // console.log(mandetoryLessonFile, 'mandetoryLessonFile')
    if (mandetoryLessonFile.length == 0 && val.quiz_data && val.quiz_data.length != 0) {
      this.quizflag = true;
      this.next_button_access = false;
    }
    if (val.complete_lesson_quiz != null && val.complete_lesson_quiz.length > 0) {
      for (const key in val.quiz_data) {
        for (const i in val.complete_lesson_quiz) {
          if (val.complete_lesson_quiz[i].lesson_id == val.quiz_data[key].lesson_id) {
            this.quizflag = false;
            this.next_button_access = true;
            // console.log(this.quizflag,'keyVal')

          }
        }
      }

    }

    let gamePlanFlag: boolean = false;

    // // console.log(this.reportPercentage, 'this.next_button_access===')

    if (val.trainingcenterlist != null && typeof (val.trainingcenterlist) != 'undefined' && val.trainingcenterlist.length > 0 && val.trainingcenterlist[0].done == val.alllessondata.length) {
      gamePlanFlag = true;
    }

    if (val.calendar_booking_data != null) {
      gamePlanFlag = false;
    }

    // // console.log(gamePlanFlag, 'gamePlanFlag======++++++')

    // if (gamePlanFlag == true) {
    //   this.gamePlanModal(this.paramslessonId, this.paramsTrainingId);
    // }
    // console.log(mandetoryLessonFile, 'hgftvy', completeLessonFile, 'lllllllllll',this.quizflag)

  }


  viewQuizResult(val) {
    // // console.log(val, 'completeQuizData')
    const dialogRef = this.dialog.open(QuizReportmodal, {
      panelClass: 'quiz_resultcls',
      width: '900px',
      height: 'auto',
      data: { data: val }
    });
  }



  openLessonVideo(val: any) {
    // // // // console.log(val)
    var url = this.video_base_url + val.video_url + '?modestbranding=1&autohide=0&showinfo=0&controls=0&listType=playlist&rel=0';
    var server_url = this.serverDetailsVal.serverUrl + this.lessionFileEndpoint.video_endpoint

    const safe_url = this.sanitizer.bypassSecurityTrustResourceUrl(url);

    if (val.video_skippable == true) {
      var video_url = val.video_url + '?rel=0&modestbranding=1&autoplay=1&showinfo=0&controls=1&listType=playlist';
    } else {
      var video_url = val.video_url + '?rel=0&modestbranding=1&autoplay=1&showinfo=0&controls=0&listType=playlist';
    }
    const dialogRef = this.dialog.open(BetoparedesLessonVideoModalComponent, {
      panelClass: 'lesson_videomodal',
      width: '900px',
      height: 'auto',
      data: { 'safe_url': safe_url, data: val, training_id: this.paramsId, lesson_id: this.paramslessonId, endpoint: server_url, user_id: this.userId, video_url: video_url }
    });
    dialogRef.afterClosed().subscribe((result: any) => {

      // // // // console.log(result, 'result********************', val)
      if (result != null && result == 'yes') {
        // // // // // console.log()
        this.getTrainingCenterlistFunctionwithLessonId(this.paramsId, this.userType, this.userId, this.paramslessonId);


        setTimeout(() => {
          if (this.trainingCentreData.complete_lesson_videos.length != null &&
            this.trainingCentreData.complete_lesson_videos.length == this.video_data.length) {

            if (this.trainingCentreData.quiz_data.length != 0) {
              this.quizflag = true;
              // this.next_button_access = false;
              // // // console.log("next_button_access false")

            }

            if (this.trainingCentreData.complete_lesson_quiz != null && this.trainingCentreData.complete_lesson_quiz[0] != null && this.trainingCentreData.lesson_content.length > 0) {
              if (this.trainingCentreData.complete_lesson_quiz[0].lesson_id == this.trainingCentreData.lesson_content[0]._id) {
                // this.next_button_access = true;
                // // // console.log("next_button_access true")

                // this.quizflag = false;
              }
            }
            this.complete_videoflag[val.video_url] = true

          }
        }, 2000);

      }
    })

  }
  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

}


@Component({
  selector: 'preview-content-dialog',
  templateUrl: 'preview-content-dialog.html',
  styleUrls: ['preview-content-dialog.css']

})
export class PreviewContentDialogBeto {
  public previewImg: any = [];
  public image: any = '';
  public indeximg = 0;
  public page = 1;
  public bucket_url: any = 'https://beto-paredes-training-centre.s3.amazonaws.com/lesson-files/';
  public nextflg: any = 'disabled';
  public prevflag: any = 'disabled';
  public pos: any;
  public image1: any

  constructor(public dialogRef: MatDialogRef<PreviewContentDialogBeto>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData6, public snakBar: MatSnackBar, public apiService: ApiService, public router: Router) {
    // // // // // console.log(data, 'data',)
    if (data.flag == 'pdf' && typeof (data.data.images.converted_array) != undefined) {

      this.previewImg = data.data.images.converted_array;
      this.image = this.bucket_url + data.data.images.converted_array[this.indeximg].name //set image for pdf
      this.pos = data.data.images.numberOfPages;
      // // // // // console.log(this.previewImg[this.indeximg])

    }
    if (data.flag == 'img') {
      this.image1 = this.bucket_url + data.data.file.fileservername; //set img for imagefile
    }
    // // // // // // console.log(this.quizData, '++')
  }
  close(val) {                 //FOR MODAL CLOSE
    this.snakBar.open(' Your Lesson  is Complete After Download This File ..!', 'OK', {
      duration: 5000
    })
  }
  //next previos btn
  nextprevbtn(flag) {
    // // // // // console.log(flag, 'nextbtn',)
    switch (flag) {
      case 'prev': // for prevous case
        if (this.indeximg == 0 || this.indeximg < 0) {
          // // // // // console.log(flag, '++++++++++++ if')

        } else {
          // // // // // console.log(flag, '++++++++++++ else')
          this.indeximg = this.indeximg - 1;
          this.image = this.bucket_url + this.previewImg[this.indeximg].name
          this.page = this.previewImg[this.indeximg].page
          // // // // // console.log('index+++++++', this.indeximg, this.previewImg.length)
        }
        break;
      case 'next': // for next case

        if (this.previewImg.length == this.indeximg + 1) {
          // // // // // console.log(flag, '++++++++++++ if')
        }
        else {

          // // // // // console.log(flag, '++++++++++++ else')
          this.indeximg = this.indeximg + 1;
          this.image = this.bucket_url + this.previewImg[this.indeximg].name
          this.page = this.previewImg[this.indeximg].page
          // // // // // console.log('index+++++++', this.indeximg + 1, this.previewImg.length)
        }
        break;
    }

    // // // // // // console.log(flag, '++++++++++++', index)
  };

}
@Component({
  selector: 'BetoLessonVideo',
  templateUrl: 'preview-video-content-dialog.html',
  styleUrls: ['preview-video-content-dialog.css']

})
export class BetoparedesLessonVideoModalComponent {

  playerVars = {
    cc_lang_pref: 'en'
  };
  public video_time: any;

  public video_Count_time: any;

  constructor(public dialogRef: MatDialogRef<BetoparedesLessonVideoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData4, public snakBar: MatSnackBar, public apiService: ApiService, public router: Router, public activatedRoute: ActivatedRoute) {
    // // // console.log(data, 'data_video')
  }
  savePlayer(event) {
    // // // // console.log(event, 'save', this.playerVars)
  }
  closedModals() {
    // // // // console.log()
    this.snakBar.open('Video Lesson Has Not Been Completed ...!', 'OK', {
      duration: 4000
    })
    this.dialogRef.close()
  }

  onStateChange(event) {
    // // // // console.log(this.data.data.video_skippable, 'data_video')

    // // // console.log(event, 'state chn',)
    // // // console.log(event.target.playerInfo.duration, '/\/\/\)', event.target.playerInfo.currentTime)

    //duration calculation
    var sec_num = parseInt(event.target.playerInfo.duration, 10);
    var hours: any = Math.floor(sec_num / 3600);
    var minutes: any = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds: any = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    // // // // console.log(hours + ':' + minutes + ':' + seconds);
    this.video_time = hours + ':' + minutes + ':' + seconds;

    // this.startTimer(event.target.playerInfo.duration);

    // // // // console.log(event.target.playerInfo, 'change 1', event.data)
    if (event.data == 0 && event.target.playerInfo.duration >= event.target.playerInfo.currentTime) {

      // // // // console.log(event.data, 'data 0', event.target.playerInfo)

      var endpoint = this.data.endpoint;
      var video_data: any = {
        user_id: this.data.user_id,
        training_id: this.data.training_id,
        lesson_id: this.data.lesson_id,
        video_id: event.target.playerInfo.videoData.video_id,
        video_url: event.target.playerInfo.videoUrl,
        flag: 1,
      }
      // // // // console.log(video_data, 'data===++')
      if (this.data.data.video_skippable != true) {

        this.apiService.postDatawithoutToken(endpoint, video_data).subscribe(res => {
          // // // console.log(res, 'frghjk++++++++++', event.target.playerInfo.videoData.video_id)
          let result: any = res;
          if (result.status == 'success') {
            // getTrainingCenterlistFunctionwithLessonId(associated_training: any, type: any, user_id: any, _id: any)
            this.data.flag = 'yes';
            this.dialogRef.close(this.data.flag);
            this.snakBar.open('Successfully Completed The Lesson Video..!', 'OK', {
              duration: 5000
            })

          }
        })
      }

    }

  }
}
@Component({
  selector: 'lessonquiz',
  templateUrl: './lesson_betoparedes_quiz.html'
})
export class LessonQuizBetoparedesModalComponent {
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
  constructor(public dialogRef: MatDialogRef<LessonQuizBetoparedesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData5, public snakBar: MatSnackBar, public apiService: ApiService, public router: Router) {
    // // // console.log(data, 'data')
    this.quizData = data.quiz_data[0];
    this.lessonData = data.lesson_data;
    this.indexVal = 1;
    // // // // console.log(this.quizData, '++')
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
    // // // // console.log(this.CheckedAnswer, 'CheckedAnswer', this.quizVal)
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

          // // // // console.log(this.CheckedAnswer, '++== else ')
          if (this.CheckedAnswer.length > 0) {
            for (let i in this.CheckedAnswer) {
              if (this.CheckedAnswer[i].isCorrect == 1) {
                // // // // console.log(this.CheckedAnswer[i], '????chk')
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
    // // // // console.log(this.resultVal, 'resultVal')
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

    // // console.log(user_result, 'user_result')
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

@Component({
  selector: 'game-plan-dialog',
  templateUrl: 'game-plan-dialog.html',
  styleUrls: ['game-plan-dialog.css']

})
export class GameplanModalComponent {
  public traingname: any;
  constructor(public dialogRef: MatDialogRef<GameplanModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData7, public snakBar: MatSnackBar, public apiService: ApiService, public router: Router) {
    this.traingname = data.data[0].catagory_name
    // // // console.log(data, this.traingname)

  }
  onNoClick(): void {
    this.data.flag = false;
    this.dialogRef.close(this.data);
    this.snakBar.open(' Your Game Plan Meeting Booking is not Done', 'OK', {
      duration: 5000
    })
  }
  gameplay(val) {
    this.data.flag = true;
    this.dialogRef.close(this.data);
  }
}
@Component({
  selector: 'quiz-report-dialog',
  templateUrl: 'quiz-report-dialog.html',

})
export class QuizReportmodal {
  public progressSpinner = {
    mode: 'indeterminate',
    loading: false,
    bookingStatus: 'Sending request'
  }
  public traingname: any;
  constructor(public dialogRef: MatDialogRef<QuizReportmodal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData8, public snakBar: MatSnackBar, public apiService: ApiService, public router: Router) {
    // // console.log(data)
    // // // console.log(data, this.traingname)
  }
  closedModals() {
    this.dialogRef.close()
  }
}
