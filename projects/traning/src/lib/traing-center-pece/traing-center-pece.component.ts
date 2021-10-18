import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, EventEmitter, HostListener, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
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

export interface DialogData2 {
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
  public lessonid: any;
  public categoryid: any;
  public done_quiz_data: any = [];
  public complete_videoflag: any = [];
  public complete_lesson_videos: any = [];
  public complete_lesson_audio: any = [];
  public complete_lesson_files: any = [];
  public complete_audioflag: any = [];
  public reportpercent: any = 0;
  public cmpltlesson: boolean = false;
  public audio_duration: any = [];
  public audio_currenttime: any = [];
  public audio_progress: any = [];
  public modelval: any = [];
  public newaudio_currenttime: any = [];
  public audio_time: any = [];
  public audio_end_time: any = [];
  public disabled = [];
  public bucket_url: any;
  public play_flag: any = [];
  public pause_flag: any = [];
  // public complete_audioflag: any = [];
  public shwmoreflg: boolean = false;
  public previewimages: any;
  public shwmorefileflg: boolean = false;
  public complete_fileflag: any = [];
  public windowScrolled: boolean = false;



  @Output() trainingDataListener = new EventEmitter<any>();







  @HostListener('window:scroll')
  onWindowScroll() {
    // console.log(document.documentElement['classlessonongoing'])
  
  }

  @Input()
  set formSource(val: any) {
    this.formSourcedata = val;
    this.serverDetailsVal = this.formSourcedata.serverurl;
    this.bucket_url = this.formSourcedata.bucket_url;
    //console.log(val);

  }
  //all traing category data
  @Input()
  set TrainingCentreData(val) {
    this.trainingCategoryData = val.trainingcenterlist;
    this.paramsTrainingId = this.activatedRoute.snapshot.params.associated_training;
    this.trainingLessonData = val.alllessondata;
    this.lesson_content_data = val.lesson_content;
    this.divisor = val.total_lesson;
    this.done_quiz_data = val.done_quiz_data;
    this.complete_lesson_videos = val.complete_lesson_videos;
    this.complete_lesson_audio = val.complete_lesson_audio;
    this.complete_lesson_files = val.complete_lesson_files;
    this.quizflag = false;
    if (this.activatedRoute.snapshot.params._id != null && typeof this.activatedRoute.snapshot.params._id != 'undefined' && this.activatedRoute.snapshot.params._id) {
      this.paramslessonId = this.activatedRoute.snapshot.params._id;

    }
    if (this.trainingCategoryData.length > 0) {
      for (const key in this.trainingCategoryData) {
        if (this.trainingCategoryData[key]._id == this.paramsTrainingId) {
          //console.log(this.trainingCategoryData[key].catagory_name);
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
        //console.log(res);
        this.quizdata = res;
        if (res.status == 'success' && res.quiz_data.length > 0) {
          if (this.done_quiz_data.length > 0) {
            console.log('llllllllllllllllllllllllll');

            this.quizflag = false;
            this.next_button_access = true;
          }
          else {
            console.log('pPPPPPPPPPPPPPPPPPPPPPPPPP');

            this.quizflag = true;

            if (this.quizdata.quiz_data.length > 0) {
              this.next_button_access = false;
            }
          }

        }
        this.addmrakdata(val);
        this.trainingDataListener.emit({ action: 'update-success', result: val });

      })

    }
    console.log(this.paramslessonId, 'paramslessonId');
    if (this.paramslessonId && this.paramslessonId != null && typeof this.paramslessonId != 'undefined' && this.paramslessonId != '') {

      setTimeout(() => {
        document.getElementById(this.paramslessonId + "classlessonongoing").scrollIntoView({ behavior: "smooth" });
      }, 1000);
    }



    this.complete_video();
    this.complete_audio();
    this.complete_file();

    this.reportpercent = Math.floor(this.allDonedata / this.divisor) * 100;


    if (val.done_lesson_cat_user.length > 0 && val.done_lesson_cat_user[0].percent >= 100) {
      this.cmpltlesson = true;

    }




  }

  @Input()
  set TrainingCenterRoute(id: any) {
    this.trainingCenterRoute = (id) || '<no name set>';
  }


  constructor(public router: Router, public snakBar: MatSnackBar, public activatedRoute: ActivatedRoute, public apiService: ApiService, public cookieService: CookieService, public dialog: MatDialog, public sanitizer: DomSanitizer) {
    //console.log(this.donedata);
    if (this.cookieService.get('user_details') && JSON.parse(this.cookieService.get('user_details')) != null && typeof JSON.parse(this.cookieService.get('user_details')) != undefined && JSON.parse(this.cookieService.get('user_details')) != '') {
      //console.log(JSON.parse(this.cookieService.get('user_details')));

      this.userId = JSON.parse(this.cookieService.get('user_details'))._id;
      this.userType = JSON.parse(this.cookieService.get('user_details')).user_type;

    }
    //console.log(router, 'router', activatedRoute.snapshot.params, 'activatedRoute');
    this.categoryid = activatedRoute.snapshot.params.associated_training;
    if (activatedRoute.snapshot.params._id && activatedRoute.snapshot.params._id != null && typeof activatedRoute.snapshot.params._id != undefined && activatedRoute.snapshot.params._id != '') {
      this.lessonid = activatedRoute.snapshot.params._id;

    }


  }

  ngOnInit() {
    let id;
    //console.log(this.activatedRoute.snapshot.params,'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk', this.donedata    );
    if (this.donedata && this.donedata.length > 0) {
      for (const key in this.donedata) {
        if (this.activatedRoute.snapshot.params.associated_training == this.donedata[key].associated_training) {
          for (const keys in this.trainingLessonData) {
            if (this.trainingLessonData[keys]._id == this.donedata[key].lesson_id) {
              this.trainingLessonData[keys].is_done = true;
              id = this.trainingLessonData[keys]._id;
            }

          }
        }
      }
    }

  }

  // for traing click
  clicktrcataining(val, fistlesson_id: any, i) {
    this.training_cat_name = this.trainingCategoryData[i].catagory_name;
    let flag1: boolean = false;
    let flag2: boolean = false;
    let current_lesson_id: any;
    console.log(val, i);
    if (this.done_cat_data.length > 0) {
      for (const key in this.done_cat_data) {
        if (this.done_cat_data[key].associated_training == val && this.done_cat_data[key].percent < 100) {
          flag1 = true;
          current_lesson_id = this.done_cat_data[key].current_lesson_id;
        }
      }

    } else {

      this.router.navigateByUrl(this.trainingCenterRoute + val + '/' + fistlesson_id);
    }
    console.log(flag1,flag2);
    
    if (flag1) {
      this.router.navigateByUrl(this.trainingCenterRoute + val + '/' +current_lesson_id );

    }
    if (!flag1) {
      this.router.navigateByUrl(this.trainingCenterRoute + val + '/' + fistlesson_id);
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


    if (fullval.skippeble == false) {
      // // // // // console.log('true')
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
    // // // // // console.log(val, 'audio_duration')
    this.audio_end_time[val] = duration_hours + ':' + duration_minutes + ':' + duration_seconds;

  }
  // for openinglesson
  openlesson(item, flag, i) {
    if (flag == 'click') {
      //console.log(item);
      this.router.navigateByUrl(this.trainingCenterRoute + item.associated_training_id + '/' + item._id);
    }
  }

  // for mark as done

  nextbutton(val, flag, i) {
    let ind = 0;
    let ind2 = 0;
    if (flag == 'mark') {
      this.progressSpinner.loading = true;
      //console.log(this.trainingLessonData[i], i);

      //console.log(i + 1, this.trainingLessonData[i + 1]);
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
          "user_type": userdata.user_type
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
                data.data['next_traing_id'] = this.trainingCategoryData[ind2]._id;


              }

            }
          }
        }
      }
      console.log(data);

      let link1 = this.formSourcedata.serverurl + this.formSourcedata.addMarkendpoint
      console.log(data);

      this.apiService.postDatawithoutToken(link1, data).subscribe((res: any) => {
        //console.log(res);
        if (i + 1 >= this.trainingLessonData.length) {

          if (this.trainingCategoryData.length > 0) {
            for (const key in this.trainingCategoryData) {
              if (this.trainingCategoryData[key]._id == val.associated_training_id) {
                //console.log(key, typeof key);
                ind = (parseInt(key) + 1);
                //console.log(ind);
                if (ind && this.trainingCategoryData[ind] && this.trainingCategoryData[ind]._id != null && typeof this.trainingCategoryData[ind]._id != 'undefined' && this.trainingCategoryData[ind]._id != '') {
                  this.router.navigateByUrl(this.trainingCenterRoute + this.trainingCategoryData[ind]._id + '/' + data.data.current_lesson_id);

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
    if (flag == 'next') {
      //console.log(val, i);
      if (i + 1 >= this.trainingLessonData.length) {

        if (this.trainingCategoryData.length > 0) {
          for (const key in this.trainingCategoryData) {
            if (this.trainingCategoryData[key]._id == val.associated_training_id) {
              //console.log(key, typeof key);
              ind = (parseInt(key) + 1);
              //console.log(ind);
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
    }
  }

  // for video open modal
  openLessonVideo(val: any) {
    //console.log(val);
    var url = this.video_base_url + val.video_url + '?modestbranding=1&autohide=0&showinfo=0&controls=0&listType=playlist&rel=0';
    var server_url = this.formSourcedata.serverurl + this.formSourcedata.video_endpoint

    const safe_url = this.sanitizer.bypassSecurityTrustResourceUrl(url);

    if (val.video_skippable == true) {
      var video_url = val.video_url + '?rel=0&modestbranding=1&autoplay=1&showinfo=0&controls=1&listType=playlist';
    } else {
      var video_url = val.video_url + '?rel=0&modestbranding=1&autoplay=1&showinfo=0&controls=0&listType=playlist';
    }
    const dialogRef = this.dialog.open(peceLessonVideoModalComponent, {
      panelClass: 'lesson_videomodal',
      width: '900px',
      height: 'auto',
      data: { 'safe_url': safe_url, data: val, lesson_id: this.paramslessonId, endpoint: server_url, user_id: this.userId, video_url: video_url }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      //console.log(result);
      if (result == 'yes') {
        this.getTrainingCenterlistFunctionwithLessonId(this.categoryid, this.userType, this.userId, this.lessonid)
        this.complete_videoflag[val.video_url] = true;
      }


    })
  }

  // for lesson quiz modal  
  lessonQuiz() {

    var server_url: any = this.formSourcedata.serverurl + this.formSourcedata.addlessonquizdataendpoint;

    const dialogRef = this.dialog.open(LessonQuizPeceModalComponent, {
      panelClass: 'schedule_modal',
      height: 'auto',
      data: { quiz_data: this.quizdata.quiz_data, lesson_data: this.lesson_content_data, user_id: this.userId, server_url: server_url }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe((result: any) => {
      // // //console.log(result, 'result')
      if (result == 'yes') {

        this.getTrainingCenterlistFunctionwithLessonId(this.categoryid, this.userType, this.userId, this.lessonid)

        this.progressSpinner.loading = false;
      }
    }
    )

  }


  // for gettrainingcenterdatalist endpoint call 
  getTrainingCenterlistFunctionwithLessonId(associated_training, type: any, user_id: any, _id: any) {
    // // // // // // //console.log('associated_training', associated_training, 'type', type, 'user_id', user_id, '_id', _id)
    // // //console.log("mahitosh")
    const link = this.formSourcedata.serverurl + this.formSourcedata.gettrainingcenterdatalist;
    let data: any = {
      "condition": {
        "associated_training": associated_training,
        "_id": _id,
        lessionId: _id,
      },
      "user_id": user_id,
      "type": type,
      "associated_training": associated_training
    };
    this.progressSpinner.loading = true;
    this.apiService.postDatawithoutToken(link, data).subscribe((response: any) => {

      if (response.status == "success") {
        console.log('ppppppppppppppppppppppppppppppppppppppppppppppp');


        this.progressSpinner.loading = false;
        this.addmrakdata(response.results);
      };

    });

  }

  // for complete video Data
  complete_video() {
    if (this.complete_lesson_videos != null && this.complete_lesson_videos.length > 0) {
      for (const key in this.complete_lesson_videos) {
        if (this.lesson_content_data.length > 0) {
          for (const i in this.lesson_content_data[0].lesson_attachements) {
            //console.log(this.complete_lesson_videos[key].video_url, 'this.lesson_content_data[0].lesson_attachements', this.lesson_content_data[0].lesson_attachements[i].video_url);

            if (this.lesson_content_data[0].lesson_attachements && this.lesson_content_data[0].lesson_attachements[i].type == 'video' && this.lesson_content_data[0].lesson_attachements[i].video_url == this.complete_lesson_videos[key].video_id) {
              //console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@');

              this.complete_videoflag[this.lesson_content_data[0].lesson_attachements[i].video_url] = true;
            }

          }
        }
      }
    }
  }

  // for complete Audio Data
  complete_audio() {
    if (this.complete_lesson_audio != null && this.complete_lesson_audio.length > 0) {
      for (const key in this.complete_lesson_audio) {
        if (this.lesson_content_data.length > 0) {
          for (const i in this.lesson_content_data[0].lesson_attachements) {
            //console.log(this.complete_lesson_videos[key].video_url, 'this.lesson_content_data[0].lesson_attachements', this.lesson_content_data[0].lesson_attachements[i].video_url);

            if (this.lesson_content_data[0].lesson_attachements && this.lesson_content_data[0].lesson_attachements[i].type == 'audio' && this.lesson_content_data[0].lesson_attachements[i].screenshots.fileservername == this.complete_lesson_audio[key].audio_id) {
              console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@');


              this.complete_audioflag[this.lesson_content_data[0].lesson_attachements[i].screenshots.fileservername] = true;
            }

          }
        }
      }
    }
  }
  complete_file() {
    if (this.complete_lesson_files != null && this.complete_lesson_files.length > 0) {
      for (const key in this.complete_lesson_files) {
        if (this.lesson_content_data.length > 0) {
          for (const i in this.lesson_content_data[0].lesson_attachements) {
            //console.log(this.complete_lesson_videos[key].video_url, 'this.lesson_content_data[0].lesson_attachements', this.lesson_content_data[0].lesson_attachements[i].video_url);

            if (this.lesson_content_data[0].lesson_attachements && this.lesson_content_data[0].lesson_attachements[i].type == 'png' && this.lesson_content_data[0].lesson_attachements[i].screenshots.fileservername == this.complete_lesson_files[key].file_id) {
              console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@');


              this.complete_fileflag[this.lesson_content_data[0].lesson_attachements[i].screenshots.fileservername] = true;
            }
            if (this.lesson_content_data[0].lesson_attachements && (this.lesson_content_data[0].lesson_attachements[i].type == 'pdf' || this.lesson_content_data[0].lesson_attachements[i].type == 'doc' || this.lesson_content_data[0].lesson_attachements[i].type == 'ppt' || this.lesson_content_data[0].lesson_attachements[i].type == 'pptx' || this.lesson_content_data[0].lesson_attachements[i].type == 'msword' || this.lesson_content_data[0].lesson_attachements[i].type == 'xlsx' || this.lesson_content_data[0].lesson_attachements[i].type == 'ods' || this.lesson_content_data[0].lesson_attachements[i].type == 'docx' || this.lesson_content_data[0].lesson_attachements[i].type == 'ppt') && this.lesson_content_data[0].lesson_attachements[i].screenshots.fileservername == this.complete_lesson_files[key].file_id) {
              console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@');
              this.complete_fileflag[this.lesson_content_data[0].lesson_attachements[i].screenshots.fileservername] = true;
            }

          }
        }
      }
    }
  }

  // using for mark as done shown of not 
  addmrakdata(val) {
    this.next_button_access = false;

    let mandetoryLessonfile: any = [];
    let completeLessonFile = [];
    console.log(val, 'this.quizflag', this.quizdata.quiz_data.length);
    if (val.done_quiz_data.length > 0) {
      console.log('pppppppppppppppppppppppppppp');

      // this.next_button_access = true;
      this.quizflag = false;
    } else if (this.quizdata.quiz_data.length > 0) {
      this.next_button_access = false;
      this.quizflag = true;
    }
    if (val.lesson_content[0].video_array.length > 0) {
      for (const key in val.lesson_content[0].video_array) {
        if (val.lesson_content[0].video_array[key].video_skippable == false) {
          mandetoryLessonfile.push(val.lesson_content[0].video_array[key])
        }
      }
      // console.log(mandetoryLessonVideo);

    }
    if (val.lesson_content[0].audio_array.length > 0) {
      for (const key in val.lesson_content[0].audio_array) {
        if (val.lesson_content[0].audio_array[key].skippeble == false) {
          mandetoryLessonfile.push(val.lesson_content[0].audio_array[key])
        }
      }
    }
    if (val.lesson_content[0].file_array.length > 0) {
      for (const key in val.lesson_content[0].file_array) {
        if (val.lesson_content[0].file_array[key].skippeble == false) {
          mandetoryLessonfile.push(val.lesson_content[0].file_array[key])
        }
      }
    }


    completeLessonFile = completeLessonFile.concat(val.complete_lesson_files, val.complete_lesson_audio, val.complete_lesson_videos);
    console.log(this.quizdata.quiz_data.length, val.done_quiz_data.length);
    console.log(completeLessonFile.length, 'completeLessonFile.length', mandetoryLessonfile.length);

    if (completeLessonFile.length == mandetoryLessonfile.length) {

      this.next_button_access = true;
      if (this.quizdata.quiz_data.length > 0) {
        this.next_button_access = false;
        if (this.quizdata.quiz_data.length && val.done_quiz_data.length) {
          this.next_button_access = true;

        }

      }

    }

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

      if (fullval.skippeble == false) {
        // // // // // console.log('true')
        this.disabled[val] = true
      }

      this.modelval[val] = 0;
      // // // // // console.log(this.modelval[val], 'ghjgh+++++++++');
      this.modelval[val] = this.audio_progress[val];

      this.audio_currenttime[val] = (this.modelval[val] * this.audio_duration[val]) / 100;
      this.newaudio_currenttime[val] = this.audio_currenttime[val]

      // // // // // console.log(this.audio_duration[val], 'audio_currenttime')


    }, 1500);

  }


  audioended(item: any, i: any, j) {
    // // // // console.log(item, 'dcnjmkxdcvf')

    if (j == 1) {


      let audioendpoint = this.serverDetailsVal + this.formSourcedata.audio_endpoint;

      let audio_data = {
        user_id: this.userId,
        training_id: this.paramsTrainingId,
        lesson_id: this.paramslessonId,
        audio_type: item.type,
        audio_id: item.screenshots.fileservername,
        audio_name: item.screenshots.name,
      }
      if (item.skippeble != true) {
        this.apiService.postDatawithoutToken(audioendpoint, audio_data).subscribe(res => {
          // // // // console.log(res)
          let result: any = res;

          // // // // // console.log(result, '+++++++')
          if (result.status == 'success') {
            // // // // console.log(item, 'dcnjmkxdcvf')
            this.complete_audioflag[item.screenshots.fileservername] = true;


            this.snakBar.open('Successfully Completed This Lesson Audio', 'ok', {
              duration: 3000
            });
            setTimeout(() => {
              this.getTrainingCenterlistFunctionwithLessonId(this.categoryid, this.userType, this.userId, this.lessonid)
            }, 500);
          }
        })
      }



    }
  }
  skipTensec(val, item, flag) {
    // // // // // console.log(item, '+++++++++++====', flag)
    if (item.skippeble == false) {
      this.snakBar.open("You can't skip this audio", 'Ok', {
        duration: 1000
      });
    }
    else {
      if (flag == 'previos') {
        var audioId: any = document.getElementById("audioPlayer_" + val);
        audioId.currentTime = audioId.currentTime - Math.floor(10);
        // // // // // console.log(audioId.currentTime, 'previos')

      }
      if (flag == 'next') {
        var audioId: any = document.getElementById("audioPlayer_" + val);
        audioId.currentTime = audioId.currentTime + 10;
        // // // // // console.log(audioId.currentTime, 'next')

      }
    }


  }
  playbtn(val: any, flag: any) {
    // // // // // console.log(val, '000000796e++', flag)
    let audioId: any = document.getElementById("audioPlayer_" + val);
    this.play_flag[val] = false;
    this.pause_flag[val] = true;
    audioId.play();
    // // // // // console.log(audioId, 'audioId')
  }

  pausebtn(val: any, flag: any) {
    let audioId: any = document.getElementById("audioPlayer_" + val);
    audioId.pause();
    this.play_flag[val] = true;
    this.pause_flag[val] = false;
    // // // // // console.log(audioId, '+++++++++++++')
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
    // // // // // console.log(this.audio_currenttime[val], 'audioId.currentTime')
  }
  progressbtn(val, fullval) {

    if (fullval.skippeble == true) {

      this.audio_progress[val] = this.modelval[val];

      this.audio_currenttime[val] = (this.modelval[val] * this.audio_duration[val]) / 100;

      var sec_num = parseInt(this.audio_currenttime[val], 10);
      var hours: any = Math.floor(sec_num / 3600);
      var minutes: any = Math.floor((sec_num - (hours * 3600)) / 60);
      var seconds: any = sec_num - (hours * 3600) - (minutes * 60);
      this.audio_time[val] = hours + ':' + minutes + ':' + seconds;
      // // // // // console.log(this.audio_currenttime[val], 'audio_currenttime');
      let audioId: any = document.getElementById("audioPlayer_" + val);
      audioId.currentTime = this.audio_currenttime[val];

      // // // // // console.log(this.audio_currenttime, 'audio_currenttime progressbtn fst__--------')
      // // // // // console.log(this.audio_progress[val], 'audio_progress progressbtn fst__--------')
    }
    else {
      this.snakBar.open("You can't skip this audio", 'Ok', {
        duration: 1000
      });
    }
    // this.audio_progress[id]=5
  }

  previewpdf(val, flag) {
    // // // // console.log(val, 'val');
    if (flag == 'img') {
      this.previewimages = val
    }
    // if (flag == 'pdf') {
    //   this.previewimages = val.images.converted_array;
    //   // // // // // // console.log(this.previewimages, 'PreviewContentDialog')

    // }
    // this.previewimages = val.images.converted_array;
    // // // // // // console.log(this.previewimages, 'PreviewContentDialog')

    const dialogRef = this.dialog.open(PreviewContentDialogpece, {
      panelClass: 'lesson_pdfmodal',
      width: 'auto',
      data: { data: val, flag: flag }
    });
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(result => {
      // // // // // // console.log(result, '>>>>>>>>>>');
    });
  }

  downloadPdf(file: any, i) {
    // // // // // // console.log(file.file_type, 'fvgbnjkmgbh')
    let fileendpoint: any;

    // // // // // // console.log(this.serverDetailsVal.serverUrl, 'serverDetailsVal')
    fileendpoint = this.serverDetailsVal + this.formSourcedata.file_endpoint;
    let file_data = {
      user_id: this.userId,
      training_id: this.paramsTrainingId,
      lesson_id: this.paramslessonId,
      file_type: file.type,
      file_id: file.screenshots.fileservername,
      file_name: file.screenshots.name

    }

    if (file.skippeble != true) {
      this.apiService.postDatawithoutToken(fileendpoint, file_data).subscribe(res => {
        // // // // // console.log(res, 'res')
        let result: any = res;
        this.complete_fileflag[file.screenshots.fileservername] = false;

        // // // // // // console.log(this.complete_fileflag[file.file._id], '+++++++_______________')
        if (result.status == 'success') {
          this.complete_fileflag[file.screenshots.fileservername] = true

          let checked_status = 'success';
          let pdf_url = this.bucket_url + file.screenshots.fileservername;
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
      this.getTrainingCenterlistFunctionwithLessonId(this.categoryid, this.userType, this.userId, this.lessonid)
    }, 500);
    if (file.skippeble == true) {
      let pdf_url = this.bucket_url + file.screenshots.fileservername;
      let externalWindow = window.open(
        pdf_url
      );
    }
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
    //console.log(data, 'data@@@@@@@@@@@@@@@@@@@@@@@@@')
    this.quizData = data.quiz_data[0];
    this.lessonData = data.lesson_data;
    this.indexVal = 1;
    // // // // // //console.log(this.quizData, '++')
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
    // // // // // //console.log(this.CheckedAnswer, 'CheckedAnswer', this.quizVal)
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

          // // // // // //console.log(this.CheckedAnswer, '++== else ')
          if (this.CheckedAnswer.length > 0) {
            for (let i in this.CheckedAnswer) {
              if (this.CheckedAnswer[i].isCorrect == 1) {
                // // // // // //console.log(this.CheckedAnswer[i], '????chk')
                this.correctQuizVal.push(this.CheckedAnswer[i]);
              }
            }
          }

          if (this.correctQuizVal.length > 0) {
            var result = (this.correctQuizVal.length / this.data.quiz_data.length) * 100
            this.resultVal = parseFloat(result.toFixed(2));
            if (this.resultVal >= this.data.lesson_data[0].test_percentage) {
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
    //console.log(this.data, 'resultVal')
    this.progressSpinner.loading = true;
    let link = this.data.server_url;
    let user_result: any = {
      resultVal: this.resultVal,
      CheckedAnswer: this.CheckedAnswer,
      resultStatus: this.resultStatus,
      target_percentage: this.data.lesson_data[0].test_percentage,
      user_id: this.data.user_id,
      lesson_id: this.lessonData[0]._id
    }

    user_result.QuizReportData = {
      total_question: this.data.quiz_data.length,
      attempt_question: this.CheckedAnswer.length,
      correct_answer: this.correctQuizVal.length,
      target_percentage: this.data.lesson_data[0].test_percentage,
      score: this.resultVal
    }

    //console.log(user_result, 'user_result')
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
  selector: 'peceLessonVideo',
  templateUrl: 'preview-lesson-video.html',

})

export class peceLessonVideoModalComponent {

  playerVars = {
    cc_lang_pref: 'en'
  };
  public video_time: any;

  public video_Count_time: any;
  public video_current_time: any;
  public percent: any = 0;
  constructor(public dialogRef: MatDialogRef<peceLessonVideoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData2, public snakBar: MatSnackBar, public apiService: ApiService, public router: Router, public activatedRoute: ActivatedRoute) {
    console.log(data, 'data_video')
  }
  ngOnInit() {

  }

  savePlayer(event) {
    console.log(event, 'save', this.playerVars)
  }
  closedModals() {
    // // // // // //console.log()
    this.snakBar.open('Video Lesson Has Not Been Completed ...!', 'OK', {
      duration: 4000
    })
    this.dialogRef.close()
  }

  onStateChange(event) {
    // this.percent = 0;
    event.target.playerInfo.currentTime += 1;

    // // // // // //console.log(this.data.data.video_skippable, 'data_video')
    console.log(event.target.playerInfo.currentTime);

    setInterval(() => {
      if (event.data == 1 && event.data != 0 && event.target.playerInfo.currentTime <= event.target.playerInfo.duration) {
        // console.log(event.target.playerInfo.currentTime, 'state chn')
        var sec_num1 = parseInt(event.target.playerInfo.currentTime, 10);

        var hours1: any = Math.floor(sec_num1 / 3600);
        var minutes1: any = Math.floor((sec_num1 - (hours1 * 3600)) / 60);
        var second1: any = sec_num1 - (hours1 * 3600) - (minutes1 * 60);
        if (hours1 < 10) { hours = "0" + hours; }
        if (minutes1 < 10) { minutes = "0" + minutes; }
        if (second1 < 10) { seconds = "0" + seconds; }
        this.video_current_time = hours1 + ':' + minutes1 + ':' + second1;

        var sec_num = parseInt(event.target.playerInfo.duration, 10);
        var hours: any = Math.floor(sec_num / 3600);
        var minutes: any = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds: any = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }
        // // // // // //console.log(hours + ':' + minutes + ':' + seconds);
        this.video_time = hours + ':' + minutes + ':' + seconds;
        this.percent = (event.target.playerInfo.currentTime / event.target.playerInfo.duration) * 100
        this.percent = Math.round(this.percent)
        console.log(this.video_current_time, 'video_current_time', this.video_time, 'percent', this.percent);
      }
    }, 500);



    console.log(event, 'state chn')
    let ytplayer;
    // ytplayer = document.getElementById("player");
    // ytplayer.getCurrentTime();
    // // // // //console.log(event.target.playerInfo.duration, '/\/\/\)', event.target.playerInfo.currentTime)

    //duration calculation


    // this.startTimer(event.target.playerInfo.duration);

    //console.log(event.data, 'data 0', this.data)

    if (event.data == 0) {


      var endpoint = this.data.endpoint;
      var video_data: any = {
        user_id: this.data.user_id,

        training_id: this.data.training_id,
        lesson_id: this.data.lesson_id,
        video_id: event.target.playerInfo.videoData.video_id,
        video_url: event.target.playerInfo.videoUrl,
        flag: 1,
      }
      // // // // // //console.log(video_data, 'data===++')
      if (this.data.data.video_skippable != true) {

        this.apiService.postDatawithoutToken(endpoint, video_data).subscribe(res => {
          // // // // //console.log(res, 'frghjk++++++++++', event.target.playerInfo.videoData.video_id)
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
      } if (this.data.data.video_skippable == true) {
        this.dialogRef.close(this.data.flag);
      }

    }

  }
}



@Component({
  selector: 'preview-content-dialog',
  templateUrl: 'preview-content-dialog.html',
  styleUrls: ['preview-content-dialog.css']

})
export class PreviewContentDialogpece {
  public previewImg: any = [];
  public image: any = '';
  public indeximg = 0;
  public page = 1;
  public bucket_url: any = 'https://pece-training-files.s3.amazonaws.com/training/';
  public nextflg: any = 'disabled';
  public prevflag: any = 'disabled';
  public pos: any;
  public image1: any

  constructor(public dialogRef: MatDialogRef<PreviewContentDialogpece>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData6, public snakBar: MatSnackBar, public apiService: ApiService, public router: Router) {
    console.log(data, 'data')
    if (data.flag == 'pdf' && typeof (data.data.images.converted_array) != undefined) {

      this.previewImg = data.data.images.converted_array;
      this.image = this.bucket_url + data.data.images.converted_array[this.indeximg].name //set image for pdf
      this.pos = data.data.images.numberOfPages;
      // // // // // // console.log(this.previewImg[this.indeximg])

    }
    if (data.flag == 'img') {
      this.image1 = this.bucket_url + data.data.screenshots.fileservername; //set img for imagefile
    }
    // // // // // // // console.log(this.quizData, '++')
  }
  close(val) {                 //FOR MODAL CLOSE
    this.snakBar.open(' Your Lesson  is Complete After Download This File ..!', 'OK', {
      duration: 5000
    })
  }
  //next previos btn
  nextprevbtn(flag) {
    // // // // // // console.log(flag, 'nextbtn',)
    switch (flag) {
      case 'prev': // for prevous case
        if (this.indeximg == 0 || this.indeximg < 0) {
          // // // // // // console.log(flag, '++++++++++++ if')

        } else {
          // // // // // // console.log(flag, '++++++++++++ else')
          this.indeximg = this.indeximg - 1;
          this.image = this.bucket_url + this.previewImg[this.indeximg].name
          this.page = this.previewImg[this.indeximg].page
          // // // // // // console.log('index+++++++', this.indeximg, this.previewImg.length)
        }
        break;
      case 'next': // for next case

        if (this.previewImg.length == this.indeximg + 1) {
          // // // // // // console.log(flag, '++++++++++++ if')
        }
        else {

          // // // // // // console.log(flag, '++++++++++++ else')
          this.indeximg = this.indeximg + 1;
          this.image = this.bucket_url + this.previewImg[this.indeximg].name
          this.page = this.previewImg[this.indeximg].page
          // // // // // // console.log('index+++++++', this.indeximg + 1, this.previewImg.length)
        }
        break;
    }

    // // // // // // // console.log(flag, '++++++++++++', index)
  };

}