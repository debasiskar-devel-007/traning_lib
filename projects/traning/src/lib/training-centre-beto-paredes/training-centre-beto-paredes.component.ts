import { Component, Inject, Input, OnInit } from '@angular/core';
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
    console.log(this.lessionFileEndpoint, 'lessionFileEndpoint')
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
  }

  @Input()
  set QuizQuestionSource(val: any) {
    this.quizQuestionSource = (val) || '<no name set>';
  }

  @Input()
  set TrainingCenterRoute(id: any) {
    this.trainingCenterRoute = (id) || '<no name set>';
  }
  @Input()
  set TrainingcatParamid(train_id: any) {
    this.trainingcatParamid = (train_id) || '<no name set>';
    // console.log(this.trainingcatParamid, 'trainingcatParamid')
  }
  @Input()
  set LessonParamId(lessid: any) {
    this.lessonParamId = (lessid) || '<no name set>';
    // console.log(this.lessonParamId, 'lessionParamId1111111')
    if (this.activatedRoute.snapshot.params._id != null) {
      this.paramslessonId = this.activatedRoute.snapshot.params._id
    } else {
      this.paramslessonId = this.lessonParamId;

    }
    // console.log(this.paramslessonId,'???????????????????')
  }
  @Input()
  set TrainingCentreData(val) {
    console.log(val, 'val', this.lessionFileEndpoint)
    this.paramsTrainingId = this.activatedRoute.snapshot.params.associated_training;

    this.audio_data = [];
    this.files_data = [];
    this.video_data = [];
    this.next_button_access = false;
    this.trainingCentreData = val;
    // // console.log(this.trainingCentreData.lesson_content[0].lesson_attachements, 'librery')
    this.trainingCategoryData = this.trainingCentreData.trainingcenterlist;
    this.trainingLessonData = this.trainingCentreData.alllessondata;

    if (this.activatedRoute.snapshot.params._id != null) {
      this.paramslessonId = this.activatedRoute.snapshot.params._id
    } else {
      this.paramslessonId = val.lesson_content[0]._id;

    }
    console.log(this.paramslessonId, '_______________')

    this.lessonDataList = val.alllessondata

    this.lessonContentData = this.trainingCentreData.lesson_content[0];
    // this.lession_atachment_dataarray=this.trainingCentreData.lesson_content[0].lesson_attachements;

    // console.log(this.lession_atachment_dataarray)
    for (let i in this.trainingCategoryData) {
      if (this.paramsTrainingId == this.trainingCategoryData[i]._id) {
        // // console.log(this.trainingCategoryData[i]._id, 'this.trainingCentreData[i]._id')
        this.training_cat_name = this.trainingCategoryData[i].catagory_name;
      }
    }
    // console.log(this.userId, 'this.userId')
    if (val.done_lesson_by_user.length != 0 && val.done_lesson_by_user[0].lessonsdone != '' && typeof (val.done_lesson_by_user[0].lessonsdone) != 'undefined') {
      this.dividend = val.done_lesson_by_user[0].lessonsdone;
    }
    this.divisor = val.total_lesson;

    this.reportPercentage = Math.floor(this.dividend / this.divisor * 100);

    for (const key in this.trainingLessonData) {
      // // console.log(this.trainingLessonData[key], 'raju')
      for (const iterator of this.trainingCentreData.donetraininglessondata) {
        // // console.log(iterator)
        // // console.log(iterator, 'this.trainingCategoryData[key]._id',this.trainingLessonData[key]._id)
        if (iterator.lesson_id == this.trainingLessonData[key]._id) {

          // this.is_done[iterator.lesson_id] = true;
          this.trainingLessonData[key].is_done = true;

        }


      }
    }

    // console.log(this.trainingLessonData,'kkkkkkkkkkkk',this.trainingCentreData.donetraininglessondata)

    for (const key in this.trainingCategoryData) {
      for (const d of val.done_lesson_by_cat_by_user) {
        // 
        if (this.trainingCategoryData[key]._id == d.associated_training) {

          this.trainingCategoryData[key].done = d.lessonsdone;
          this.trainingCategoryData[key].percentage = Math.floor((this.trainingCategoryData[key].done / this.trainingCategoryData[key].count) * 100);

        }

      }



      if (this.trainingCategoryData[key].done == null) {
        this.trainingCategoryData[key].done = 0;
      }
    }
    if (this.lessonContentData.has_test_lesson != null && this.lessonContentData.has_test_lesson != 1) {
      this.quizflag = false;
      this.next_button_access = true;
      console.log("next_button_access true")

    }
    for (const key in this.trainingLessonData.complete_lesson_quiz) {
      if (this.lessonContentData.has_test_lesson != null && this.lessonContentData.has_test_lesson == 1 && this.lessonContentData._id != this.trainingLessonData.complete_lesson_quiz[key].lesson_id) {
        this.quizflag = true;
        this.next_button_access = false;
        console.log('quizflag', 'true')
        console.log("next_button_access false")

      }

      if (this.lessonContentData._id == this.trainingLessonData.complete_lesson_quiz[key].lesson_id) {
        this.quizflag = false;
        this.next_button_access = true;
        console.log("next_button_access true")

      }
    }
    if (this.lessonContentData.lesson_attachements != null && this.lessonContentData.lesson_attachements.length == 0 && this.quizflag == false) {
      this.next_button_access = true;
    }
    if (this.lessonContentData.lesson_attachements != null && this.lessonContentData.lesson_attachements.length > 0 && this.quizflag == false) {
      for (const key in this.lessonContentData.lesson_attachements) {
        if (this.lessonContentData.lesson_attachements[key].type == 'video' && this.lessonContentData.lesson_attachements[key].video_skippable == true) {
          this.next_button_access = true;
        }
        if (this.lessonContentData.lesson_attachements[key].type == 'audio' && this.lessonContentData.lesson_attachements[key].audio_skippable == true) {
          this.next_button_access = true;
        }
        if (this.lessonContentData.lesson_attachements[key].type == 'file' && this.lessonContentData.lesson_attachements[key].file_skippable == true) {
          this.next_button_access = true;
        }
      }
    }
    if (this.lessonContentData.lesson_attachements != null && this.lessonContentData.lesson_attachements.length > 0 && this.trainingCentreData.complete_lesson_videos.length > 0 && this.quizflag == false) {
      for (const key in this.lessonContentData.lesson_attachements) {
        for (const iterator of this.trainingCentreData.complete_lesson_videos) {
          if (this.lessonContentData.lesson_attachements[key].type == 'video' && this.lessonContentData.lesson_attachements[key].video_skippable == false && this.lessonContentData.lesson_attachements[key].video_url == iterator.video_id) {
            this.next_button_access = true;
            this.complete_videoflag[iterator.video_id] = true
          }
        }
      }
    }
    if (this.lessonContentData.lesson_attachements != null && this.lessonContentData.lesson_attachements.length > 0 && this.trainingCentreData.complete_lesson_files.length > 0 && this.quizflag == false) {
      for (const key in this.lessonContentData.lesson_attachements) {
        for (const iterator of this.trainingCentreData.complete_lesson_files) {
          if (this.lessonContentData.lesson_attachements[key].type == 'file' && this.lessonContentData.lesson_attachements[key].file_skippable == false && this.lessonContentData.lesson_attachements[key].file._id == iterator.file_id) {
            this.next_button_access = true;
            this.complete_fileflag[iterator.file_id] = true;
          }
        }
      }
    }
    if (this.lessonContentData.lesson_attachements != null && this.lessonContentData.lesson_attachements.length > 0 && this.trainingCentreData.complete_lesson_audio.length > 0 && this.quizflag == false) {
      for (const key in this.lessonContentData.lesson_attachements) {
        for (const iterator of this.trainingCentreData.complete_lesson_audio) {
          if (this.lessonContentData.lesson_attachements[key].type == 'audio' && this.lessonContentData.lesson_attachements[key].audio_skippable == false && this.lessonContentData.lesson_attachements[key].audio._id == iterator.audio_id) {
            this.next_button_access = true;
            this.complete_audioflag[iterator.audio_id] = true;
          }
        }
      }
    }
    if (val.complete_lesson_files != null && typeof (val.complete_lesson_files.length) != undefined && val.complete_lesson_audio.length != null && val.complete_lesson_videos.length != null) {

      if (this.files_data.length != val.complete_lesson_files.length && this.audio_data.length == val.complete_lesson_audio.length && this.video_data.length == val.complete_lesson_videos.length) {
        this.next_button_access = false;
        // console.log('xxxxxxxxxxxxx')
      }
      if (this.video_data.length != val.complete_lesson_videos.length && this.audio_data.length == val.complete_lesson_audio.length && this.files_data.length == val.complete_lesson_files.length) {
        this.next_button_access = false;
        // console.log('yyyyyyyyyy')

      }
      if (this.audio_data.length != val.complete_lesson_audio.length && this.files_data.length == val.complete_lesson_files.length && this.video_data.length == val.complete_lesson_videos.length) {
        this.next_button_access = false;
        // console.log('zzzzzzzzzzz')

      }

    }



  }

  constructor(public router: Router, public snakBar: MatSnackBar, public activatedRoute: ActivatedRoute, public apiService: ApiService, public cookieService: CookieService, public dialog: MatDialog, public sanitizer: DomSanitizer) {
    this.userId = JSON.parse(this.cookieService.get('userid'));
    this.userType = JSON.parse(this.cookieService.get('type'));

  }

  ngOnInit() {
  }
  activatedclass(val) {
  }


  clicktrcataining(val, catagory_name: any) {
    console.log(val, '+++',)
    console.log(this.trainingCategoryData[0], 'trainingCategoryData')


    if (this.trainingCategoryData[0].done == this.trainingCategoryData[0].count || this.trainingCategoryData[0]._id == val._id) {
      setTimeout(() => {
        this.progress_bar = 1;
      }, 100);
      this.router.navigateByUrl(this.trainingCenterRoute + val);
      this.training_cat_name = catagory_name;
      setTimeout(() => {
        document.getElementById("lessonData").scrollIntoView();
        this.progress_bar = 0;
      }, 1000);
    }


    else {
      this.snakBar.open("Sorry, You cannot access this training unless you complete the first training ", 'Ok', {
        duration: 1000
      });
    }

  }

  nochildclick(val: any, flag) {
    // console.log(val, 'nochiuld')
    this.router.navigateByUrl(this.trainingCenterRoute + this.paramsTrainingId + '/' + val._id);

  }

  playbtn(val: any, flag: any) {
    // console.log(val, '000000796e++', flag)
    let audioId: any = document.getElementById("audioPlayer_" + val);
    this.play_flag[val] = false;
    this.pause_flag[val] = true;
    audioId.play();
    // console.log(audioId, 'audioId')
  }

  pausebtn(val: any, flag: any) {
    let audioId: any = document.getElementById("audioPlayer_" + val);
    audioId.pause();
    this.play_flag[val] = true;
    this.pause_flag[val] = false;
    // console.log(audioId, '+++++++++++++')
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
    // console.log(this.audio_currenttime[val], 'audioId.currentTime')
  }
  //skip ten sec (next and previous)
  skipTensec(val, item, flag) {
    // console.log(item, '+++++++++++====', flag)
    if (item.audio_skippable == false) {
      this.snakBar.open("You can't skip this audio", 'Ok', {
        duration: 1000
      });
    }
    else {
      if (flag == 'previos') {
        var audioId: any = document.getElementById("audioPlayer_" + val);
        audioId.currentTime = audioId.currentTime - Math.floor(10);
        // console.log(audioId.currentTime, 'previos')

      }
      if (flag == 'next') {
        var audioId: any = document.getElementById("audioPlayer_" + val);
        audioId.currentTime = audioId.currentTime + 10;
        // console.log(audioId.currentTime, 'next')

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
      // console.log(this.audio_currenttime[val], 'audio_currenttime');
      let audioId: any = document.getElementById("audioPlayer_" + val);
      audioId.currentTime = this.audio_currenttime[val];

      // console.log(this.audio_currenttime, 'audio_currenttime progressbtn fst__--------')
      // console.log(this.audio_progress[val], 'audio_progress progressbtn fst__--------')
    }
    else {
      this.snakBar.open("You can't skip this audio", 'Ok', {
        duration: 1000
      });
    }
    // this.audio_progress[id]=5
  }

  gameplan(lessonid, trainingid,) {

    const dialogRef = this.dialog.open(GapmeplanModalComponent, {
      panelClass: 'schedule_modal',
      width: '900px',
      height: 'auto',
      data: { data: this.trainingCategoryData, lesson_id: lessonid, training_id: trainingid }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result, 'result')
      if (result.flag != null && result.flag == true) {
        console.log(result, 'gyyyyyyyyyyygygyg', this.googlescheduleroute + result.training_id + '/' + result.lesson_id);
        this.router.navigateByUrl(this.googlescheduleroute + result.training_id + '/' + result.lesson_id);
      }

    })
  }
  nextbutton(value: any) {
    // console.log(this.lessonContentData, 'value', this.lessonDataList)

    switch (value) {
      case 'next':
        // this.lessonDataList[this.Index].lession_title
        // // console.log(this.lesson_content, 'this.lesson_content', this.lessonDataList[0])
        // if (this.lesson_content.is_done == null && this.lesson_content.has_lessonplan == 0) {
        //   // // console.log(this.lesson_content.has_lessonplan, 'has_lessonplan')
        //   this.addMarkedData(this.lessonDataList[0]._id, this.paramsId, this.nextdata, this.lesson_content.lession_title, this.nextlessondata);
        // }
        this.addMarkedData(this.lessonDataList[0]._id, this.paramsId, this.nextdata, this.lessonContentData.lession_title, this.nextlessondata);

        let ind: any = 0;
        setTimeout(() => {
          for (let b in this.lessonDataList) {
            if (this.lessonDataList[b]._id == this.lessonContentData._id)
              ind = (parseInt(b) + 1);
          }
          // // console.log('ind', ind);
          if (this.lessonDataList[ind] != null) {

            setTimeout(() => {
              this.nochildclick(this.lessonDataList[ind], 'next');

            }, 500)

            this.progressLoader = true;
          } else {

            for (var n = 0; n < this.trainingCategoryData.length; n++) {
              // // console.log('++>>>>', this.trainingCategoryList[n], this.trainingCategoryList[n + 1], this.trainingCategoryList[0]._id)
              if (this.paramsTrainingId == this.trainingCategoryData[n]._id && this.trainingCategoryData[n + 1] != null) {
                // // console.log('-->>>>', this.trainingCategoryList[n + 1])

                this.router.navigateByUrl(this.trainingCenterRoute + this.trainingCategoryData[n + 1]._id);
              }
              else {
                // // console.log('++>>>>', this.trainingCategoryList[n]._id, this.trainingCategoryList[n + 1]._id,)
                // '>>>',this.trainingCategoryList[0]._id)
                this.progressLoader = false;
                this.router.navigateByUrl(this.trainingCenterRoute + this.trainingCategoryData[0]._id);

              }
            }

          }
        }, 500);
        // // console.log("souresh test", this.nextdata);
        // }
        break;
      case 'prev':
        // // console.log(this.lessonDataList[this.Index], '>>>>>>>>>>>>')
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


  addMarkedData(lessonId: any, associated_training: any, i: any, lession_title: any, nextlessondata: any) {
    // for (var j = 0; j < this.trainingLessonData.length; j++) {
    //   if (this.trainingLessonData[j]._id === lessonId) {
    //     console.log(this.trainingLessonData[j + 1])
    //   }
    // }
    let ind, currentlessonname, nextlessonname;
    if (this.trainingLessonData.lenth > 0) {
      for (const i in this.trainingLessonData) {
        ind = parseInt(i)
        console.log(ind)
        if (this.trainingLessonData[i]._id == this.paramslessonId) {
          console.log(this.trainingLessonData[ind + 1])
          currentlessonname = this.trainingLessonData[ind + 1].lession_title;
          nextlessonname = this.trainingLessonData[ind + 2].lession_title
          console.log(this.trainingLessonData[ind + 2])

        }
      }
    }


    const link = this.serverDetailsVal.serverUrl + this.formSourceVal.addMarkendpoint;
    if (this.trainingCategoryName == null || this.trainingCategoryName == '') { }
    let data: any = {
      "data": {
        user_id: this.userId,
        lesson_id: this.paramslessonId,
        associated_training: this.paramsTrainingId,
        lastlessonname: lession_title,
        nextlessonname: nextlessonname,
        currentlessonname: currentlessonname,
        nextlessondata: nextlessondata
      },
      "sourceobj": ["user_id", "lesson_id", "associated_training"],
      "token": this.serverDetailsVal.jwttoken
    }


    this.apiService.postData(link, data).subscribe((response: any) => {
      // // console.log(response, 'respoese453')
      if (response.status = "success") {
        const link = this.serverDetailsVal.serverUrl + this.formSourceVal.getUpdatedTrainingPercentageByUserEndpoint;
        let data: any = {
          "user_id": this.userId
        }

      }
    })



  }
  lessonQuiz(val: any) {
    console.log(val, 'kkkkkkkkkkkkkkbeto')
    if (val != null && typeof (val.quiz_data) != 'undefined') {
      // // console.log(val, '++', this.AllTrainingData.quiz_data)
      var server_url: any = this.serverDetailsVal.serverUrl + 'addlessonquizdata';

      const dialogRef = this.dialog.open(LessonQuizBetoparedesModalComponent, {
        panelClass: 'schedule_modal',
        width: '900px',
        height: 'auto',
        data: { quiz_data: val.quiz_data, lesson_data: this.lessonContentData, user_id: this.userId, server_url: server_url }
      });
      // dialogRef.disableClose = true;
      dialogRef.afterClosed().subscribe((result: any) => {
        // // console.log(result, 'result')
        if (result == 'yes') {
          this.next_button_access = true;
          console.log("next_button_access true")


          // if (this.lesson_content.is_done == null) {
          //   this.addMarkedData(this.lessonDataList[0]._id, this.paramsId, this.nextdata, this.lesson_content.lession_title, this.nextlessondata);
          // }
          this.getTrainingCenterlistFunctionwithLessonId(this.paramsId, this.userType, this.userId, this.paramslessonId)
          this.quizflag = false;
          if (this.quizflag == false) {
            this.next_button_access = true;
            console.log("next_button_access true")

          }
          else {
            this.next_button_access = false;
            console.log("next_button_access false")
          }
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
      // console.log('true')
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
    // console.log(val, 'audio_duration')
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
        // console.log('true')
        this.disabled[val] = true
      }

      this.modelval[val] = 0;
      // console.log(this.modelval[val], 'ghjgh+++++++++');
      this.modelval[val] = this.audio_progress[val];

      this.audio_currenttime[val] = (this.modelval[val] * this.audio_duration[val]) / 100;
      this.newaudio_currenttime[val] = this.audio_currenttime[val]

      // console.log(this.audio_duration[val], 'audio_currenttime')


    }, 1500);

  }
  audioended(item: any, i: any, j) {
    console.log(item, 'dcnjmkxdcvf')
    if (item.test_associate_training == 'Yes') {
      this.questionDetails(item._id, i, j);
    } else {
      // this.addMarkedData(item._id, this.paramsId, i, this.lesson_title, this.nextlessondata);
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
          console.log(res)
          let result: any = res;

          // console.log(result, '+++++++')
          if (result.status == 'success') {
            console.log(item, 'dcnjmkxdcvf')
            this.complete_audioflag[item.audio._id] = true;
            // this.next_button_access=true;
            this.snakBar.open('Successfully Completed This Lesson Audio', 'ok', {
              duration: 3000
            });
          }
        })
      }



    }
  }
  questionDetails(id: any, i: any, lesson_title: any) {
    // console.log(this.allLessonDataList.length, 'this.allLessonDataList.length', i)
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
          // this.addMarkedData(this.currentlesson, this.paramsId, id, this.lesson_title, this.nextlessondata);
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
  previewpdf(val, flag) {
    console.log(val, 'val');
    if (flag == 'img') {
      this.previewimages = val
    }
    if (flag == 'pdf') {
      this.previewimages = val.images.converted_array;
      // // console.log(this.previewimages, 'PreviewContentDialog')

    }
    // this.previewimages = val.images.converted_array;
    // // console.log(this.previewimages, 'PreviewContentDialog')

    const dialogRef = this.dialog.open(PreviewContentDialogBeto, {
      panelClass: 'lesson_pdfmodal',
      width: 'auto',
      data: { data: val, flag: flag }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
      // // console.log(result, '>>>>>>>>>>');
    });
  }
  downloadPdf(file: any, i) {
    // // console.log(file.file_type, 'fvgbnjkmgbh')
    let fileendpoint: any;

    // // console.log(this.serverDetailsVal.serverUrl, 'serverDetailsVal')
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
        // console.log(res, 'res')
        let result: any = res;
        this.complete_fileflag[file.file._id] = false;

        // // console.log(this.complete_fileflag[file.file._id], '+++++++_______________')
        if (result.status == 'success') {
          this.complete_fileflag[file.file._id] = true
          // // console.log(this.complete_fileflag[file.file._id], '+++++++666______________')
          this.next_button_access = true
          let checked_status = 'success';
          let pdf_url = this.bucket_url + file.file.fileservername;
          let externalWindow = window.open(
            pdf_url
          );
          this.snakBar.open("You completed this file", 'Ok', {
            duration: 1000
          });


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
    // // console.log('associated_training', associated_training, 'type', type, 'user_id', user_id, '_id', _id)
    const link = this.serverDetailsVal.serverUrl + this.formSourceVal.gettrainingcenterlistendpoint;
    let data: any = {
      "condition": {
        "associated_training": associated_training,
        "_id": _id
      },
      "user_id": this.userId,
      "type": type,
      "associated_training": associated_training
    }
    // console.log(this.userId, 'this.userId')
    this.apiService.postDatawithoutToken(link, data).subscribe((response: any) => {


    });

  }
  openLessonVideo(val: any) {
    // console.log(val)
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

      // console.log(result, 'result********************', val)
      if (result != null && result == 'yes') {
        // // console.log()
        this.getTrainingCenterlistFunctionwithLessonId(this.paramsId, this.userType, this.userId, this.paramslessonId);

        // setTimeout(() => {
        //   // // console.log(this.AllTrainingData.complete_lesson_video, 'AllTrainingData', this.lesson_content.video_array)

        // }, 2000);

        setTimeout(() => {
          if (this.trainingCentreData.complete_lesson_videos.length != null &&
            this.trainingCentreData.complete_lesson_videos.length == this.video_data.length) {
            // // console.log(this.AllTrainingData.complete_lesson_video, 'has_lessonplan ++')
            this.next_button_access = true;
            console.log("next_button_access true")


            if (this.trainingCentreData.quiz_data.length != 0) {
              this.quizflag = true;
              this.next_button_access = false;
              console.log("next_button_access false")

            }

            if (this.trainingCentreData.complete_lesson_quiz != null && this.trainingCentreData.complete_lesson_quiz[0] != null) {
              if (this.trainingCentreData.complete_lesson_quiz[0].lesson_id == this.trainingCentreData.lesson_content[0]._id) {
                this.next_button_access = true;
                console.log("next_button_access true")

                this.quizflag = false;
              }
            }
            this.complete_videoflag[val.video_url] = true
            // if (this.lesson_content.is_done == null) {
            //   // // console.log(this.lesson_content.has_lessonplan, 'has_lessonplan')
            //   // this.addMarkedData(this.lessonDataList[0]._id, this.paramsId, this.nextdata, this.lesson_content.lession_title, this.nextlessondata);
            // }
          }
        }, 2000);

      }
    })

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
    // // console.log(data, 'data',)
    if (data.flag == 'pdf' && typeof (data.data.images.converted_array) != undefined) {

      this.previewImg = data.data.images.converted_array;
      this.image = this.bucket_url + data.data.images.converted_array[this.indeximg].name //set image for pdf
      this.pos = data.data.images.numberOfPages;
      // // console.log(this.previewImg[this.indeximg])

    }
    if (data.flag == 'img') {
      this.image1 = this.bucket_url + data.data.file.fileservername; //set img for imagefile
    }
    // // // console.log(this.quizData, '++')
  }
  close(val) {                 //FOR MODAL CLOSE 
    this.snakBar.open(' Your Lesson  is Complete After Download This File ..!', 'OK', {
      duration: 5000
    })
  }
  //next previos btn
  nextprevbtn(flag) {
    // // console.log(flag, 'nextbtn',)
    switch (flag) {
      case 'prev': // for prevous case 
        if (this.indeximg == 0 || this.indeximg < 0) {
          // // console.log(flag, '++++++++++++ if')

        } else {
          // // console.log(flag, '++++++++++++ else')
          this.indeximg = this.indeximg - 1;
          this.image = this.bucket_url + this.previewImg[this.indeximg].name
          this.page = this.previewImg[this.indeximg].page
          // // console.log('index+++++++', this.indeximg, this.previewImg.length)
        }
        break;
      case 'next': // for next case 

        if (this.previewImg.length == this.indeximg + 1) {
          // // console.log(flag, '++++++++++++ if')
        }
        else {

          // // console.log(flag, '++++++++++++ else')
          this.indeximg = this.indeximg + 1;
          this.image = this.bucket_url + this.previewImg[this.indeximg].name
          this.page = this.previewImg[this.indeximg].page
          // // console.log('index+++++++', this.indeximg + 1, this.previewImg.length)
        }
        break;
    }

    // // // console.log(flag, '++++++++++++', index)
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
    console.log(data, 'data_video')
  }
  savePlayer(event) {
    // console.log(event, 'save', this.playerVars)
  }
  closedModals() {
    // console.log()
    this.snakBar.open('Video Lesson Has Not Been Completed ...!', 'OK', {
      duration: 4000
    })
    this.dialogRef.close()
  }

  onStateChange(event) {
    // console.log(this.data.data.video_skippable, 'data_video')

    console.log(event, 'state chn',)
    console.log(event.target.playerInfo.duration, '/\/\/\)', event.target.playerInfo.currentTime)

    //duration calculation
    var sec_num = parseInt(event.target.playerInfo.duration, 10);
    var hours: any = Math.floor(sec_num / 3600);
    var minutes: any = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds: any = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    // console.log(hours + ':' + minutes + ':' + seconds);
    this.video_time = hours + ':' + minutes + ':' + seconds;

    // this.startTimer(event.target.playerInfo.duration);

    // console.log(event.target.playerInfo, 'change 1', event.data)
    if (event.data == 0 && event.target.playerInfo.duration >= event.target.playerInfo.currentTime) {

      // console.log(event.data, 'data 0', event.target.playerInfo)

      var endpoint = this.data.endpoint;
      var video_data: any = {
        user_id: this.data.user_id,
        training_id: this.data.training_id,
        lesson_id: this.data.lesson_id,
        video_id: event.target.playerInfo.videoData.video_id,
        video_url: event.target.playerInfo.videoUrl,
        flag: 1,
      }
      // console.log(video_data, 'data===++')
      if (this.data.data.video_skippable != true) {

        this.apiService.postDatawithoutToken(endpoint, video_data).subscribe(res => {
          console.log(res, 'frghjk++++++++++', event.target.playerInfo.videoData.video_id)
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

  constructor(public dialogRef: MatDialogRef<LessonQuizBetoparedesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData5, public snakBar: MatSnackBar, public apiService: ApiService, public router: Router) {
    console.log(data, 'data')
    this.quizData = data.quiz_data[0];
    this.lessonData = data.lesson_data;
    this.indexVal = 1;
    // console.log(this.quizData, '++')
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
    // console.log(this.CheckedAnswer, 'CheckedAnswer', this.quizVal)
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

          // console.log(this.CheckedAnswer, '++== else ')
          if (this.CheckedAnswer.length > 0) {
            for (let i in this.CheckedAnswer) {
              if (this.CheckedAnswer[i].isCorrect == 1) {
                // console.log(this.CheckedAnswer[i], '????chk')
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
    // console.log(this.resultVal, 'resultVal')

    let user_result: any = {
      resultVal: this.resultVal,
      CheckedAnswer: this.CheckedAnswer,
      resultStatus: this.resultStatus,
      target_percentage: this.data.lesson_data.test_percentage,
      user_id: this.data.user_id,
      lesson_id: this.lessonData._id
    }
    // console.log(user_result, 'user_result')
    this.apiService.postDatawithoutToken(this.data.server_url, user_result).subscribe(res => {
      let result: any = res;
      if (result.status == 'success') {
        this.data.flag = 'yes';
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
export class GapmeplanModalComponent {
  public traingname: any;
  constructor(public dialogRef: MatDialogRef<GapmeplanModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData7, public snakBar: MatSnackBar, public apiService: ApiService, public router: Router) {
    this.traingname = data.data[0].catagory_name
    console.log(data, this.traingname)

  }
  onNoClick(): void {
    this.data.flag = false;
    this.dialogRef.close(this.data);
  }
  gameplay(val) {
    this.data.flag = true;
    this.dialogRef.close(this.data);
  }
}