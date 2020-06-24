import { Component, OnInit, ViewChild, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar } from "@angular/material";

import { ApiService } from '../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { MatCarouselSlide, MatCarouselSlideComponent } from '@ngmodule/material-carousel';
import { count } from 'rxjs/operators';
import { MatProgressBarModule, MatRadioModule, MatSliderModule } from '@angular/material'
// import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
import { Pipe, PipeTransform } from '@angular/core';




export interface DialogData {
  data: any;
  lesson_session_data: any;
  flag: any;
  product_data: any;
}


export interface DialogData1 {
  data: any;
  user_mentor_name: any;
  flag: any;
  // product_data: any;
}

export interface DialogData2 {
  data: any;
  user_mentor_name: any;
  flag: any;
  // product_data: any;
}

@Component({
  selector: 'lib-training-center-dna',
  templateUrl: './training-center-dna.component.html',
  styleUrls: ['./training-center-dna.component.css']
})
export class TrainingCenterDnaComponent implements OnInit {
  public progressLoader: boolean = false;
  public trainingCategoryList: any = [];
  public allLessonData: any = [];
  public serverDetailsVal: any;
  public formSourceVal: any;
  public lessonData: any = [];
  public panelOpenState = false;
  public dialogRef: any;
  public quizQuestionSource: any;
  public quizQuestion: any;
  public quizAnswers: any = [];
  public questionId: any;
  public questionArray: any = [];
  public currentQuestionIndex: any;
  public allCookiesData: any;
  public cookiesData: any;
  public userId: any;
  public questionindex: any = 0;
  public currentlesson: any = '';
  public paramsId: any;
  public trainingCenterRoute: any;
  public isDisabled: boolean = true;
  public trainingCategoryName: any;
  public percentageprogressLoader: boolean = true;
  public totalData: any;
  public reportPercentage: any;
  public dividend: any;
  public divisor: any;
  public parentPercentage: any;
  public doneLessonByCatByUser: any;
  public uniquedonetrainingarray: any = [];
  public paramsTrainingId: any;
  public lesson_title: any;
  public trainingLessonCount: any;
  public lesson_done: any;
  public userName: any;
  public adminlessoncount: any;
  public salesreplessoncount: any;
  public userlessoncount: any;
  public lessonplanmaterialroute: any;
  public lessonDataList: any = [];
  public allLessonDataList: any = [];
  public nextdata: number = 0;
  public nextlessondata: any;

  public userType: any;
  public Index: number;
  public flag: any = 0;
  public lastIndex: number;
  public firstIndex: number;
  public currentLesson: any;
  public completedLessons: any = [];
  public lesson_content: any;
  public lesson_data: any;
  public progress_bar = 0;
  public training_cat_name: any;
  public training_header_text: any = 'ADVANCED MENTOR COURSE CERTIFICATION';
  public paramslessonId: any;
  public lesson_id_flag: any;
  public flag_id: any;
  public mentee_banner_text: any = 'Buy Now';
  public user_parent_id: any;
  public product_data: any = '';
  public dnaServerUrl: any;
  public googlescheduleroute: any;
  public schedule_data: any;
  public orders_data: any;
  public orders_button: any = true;
  public preview_button: any = false;
  public schedule_button: any = false;
  public user_mentor_name: any;





  @Input()
  set lessonplanmaterialRoute(route: any) {
    this.lessonplanmaterialroute = route;
  }
  @Input()
  set googleScheduleRoute(route: any) {
    this.googlescheduleroute = route;
  }
  @Input()
  set TrainingCategoryList(val: any) {
    let results: any = (val) || '<no name set>';
    let parentdone: any;
    let parentcount: any;
    this.trainingCategoryList = results.trainingcenterlist;



    for (let i in this.trainingCategoryList) {

      parentdone = this.trainingCategoryList[i].done;
      parentcount = this.trainingCategoryList[i].count;
      if (this.trainingCategoryList[i].done != null && this.trainingCategoryList[i].count != null) {
        this.trainingCategoryList[i].percentage = Math.floor((this.trainingCategoryList[i].done / this.trainingCategoryList[i].count) * 100);
        // console.log('this.trainingCategoryList[i].percentage',this.trainingCategoryList[i].percentage,this.trainingCategoryList[i],i,this.trainingCategoryList[i].done,this.trainingCategoryList[i].count);

      }

    }

    this.allLessonData = results.lessondata;
    this.trainingCategoryName = results.trainingname;

    console.log(results, '.....>')
    if (this.userType == 'mentee') {
      this.orders_data = results.orders_data;
      this.schedule_data = results.schedule_data;

      console.log('schedule_data>>>', this.schedule_data, this.schedule_button)
      console.log('orders_data>>>++', this.orders_data, this.orders_button)
      console.log('lesson_ids>>>++', results.lesson_ids[0].lesson_ids, this.preview_button)
      console.log('lesson_data id >>>++', results.lessondata[0].id)
      console.log('lesson_content id >>>++', results.lesson_content[0]._id)




      setTimeout(() => {
        this.addMarkedData(this.lesson_content.id, this.paramsId, this.nextdata, this.lesson_content.lession_title, this.nextlessondata);
      }, 1000)


      if (this.orders_data != null && this.orders_data != '') {

            this.orders_button = true;
            this.preview_button = false;
            this.schedule_button = false;

        console.log('all_button  1>>>', this.orders_button, this.preview_button, this.schedule_button)
        for (let i in this.orders_data) {

          if (this.orders_data[i].lesson_id == results.lesson_content[0]._id) {
            // console.log('orders_data hit', this.orders_data[i].lesson_id, this.activatedRoute.snapshot.params._id, results.lessondata[0]._id)
            this.orders_button = false;
            if (this.orders_button == false && this.schedule_button == false && this.preview_button == false) {
              this.preview_button = true;
            }
            console.log('all_button 2>>>', this.orders_button, this.preview_button, this.schedule_button)
            // if(this.orders_button == false && this.preview_button == false){
            // }
          }
        }

        for (let id in results.lesson_ids[0].lesson_ids) {

          if (results.lesson_content[0]._id == results.lesson_ids[0].lesson_ids[id]) {
            this.lesson_id_flag = results.lesson_ids[0].lesson_ids[id];
            this.orders_button = false;
            this.preview_button = false;

            if (this.orders_button == false && this.preview_button == false && this.schedule_button == false) {
              this.schedule_button = true;
            }

            console.log('all_button 3>>>', this.orders_button, this.preview_button, this.schedule_button)

            // console.log(this.lesson_id_flag,'flag--->',this.orders_button,this.preview_button,results.lesson_ids[0].lesson_ids[id])

            // if(this.schedule_data != null && this.schedule_data != ''){
            // }
          }
        }

        if (this.orders_button == false && this.preview_button == false && this.schedule_button == true && results.lesson_ids[0].lesson_ids != null) {

          for (let j in this.schedule_data) {
            if (this.schedule_data[j].lesson_id == results.lesson_content[0]._id) {
              this.orders_button = false;
              this.preview_button = false;
              this.schedule_button = false;

              console.log('all_button 4>>>', this.orders_button, this.preview_button, this.schedule_button)

            }
          }
        }
      }


      if (this.orders_button == false && this.preview_button == true && this.schedule_button == false) {
        setTimeout(() => {
          this.getReviewLessonPlanModal()
        }, 500)
      }

      if (this.orders_button == false && this.preview_button == false && this.schedule_button == true) {
        setTimeout(() => {
          this.getScheduleModal()
        }, 500)
      }


    }





  }
  @Input()
  set TotalData(data: {}) {
    this.totalData = (data) || '<no name set>';
    this.trainingLessonCount = this.totalData.training_lesson_count;
    this.doneLessonByCatByUser = this.totalData.done_lesson_by_cat_by_user;
    this.adminlessoncount = this.totalData.total_lesson[0].count;
    // this.salesreplessoncount=this.totalData.total_lesson_salesrep[0].count;
    // this.userlessoncount=this.totalData.total_lesson_user[0].count;
    let done_lesson_by_cat_by_user: any = this.totalData.done_lesson_by_cat_by_user.length;
    // this.divisor=lesson; 
    let userPercentage: any = 0;

    for (let n in this.trainingCategoryList) {
      for (let tc in this.trainingLessonCount) {
        if (this.trainingCategoryList[n]._id.toString() == this.trainingLessonCount[tc]._id.associated_training.toString()) {
          this.trainingCategoryList[n].count = this.trainingLessonCount[tc].lessons;
          // this.salesrepLessonCount = this.salesrepLessonCount + this.trainingLessonCount[tc].lessons;
        }


      }

      if (this.trainingCategoryList[n].count == null)
        this.trainingCategoryList[n].count = 0;
      if (this.trainingCategoryList[n].done == null)
        this.trainingCategoryList[n].done = 0;

      if (this.trainingCategoryList[n].childid != null && this.trainingCategoryList[n].childid.length > 0) {

        for (let p in this.trainingCategoryList[n].childid) {


          for (let tc in this.trainingLessonCount) {

            if (this.trainingLessonCount[tc]._id.associated_training.toString() == this.trainingCategoryList[n].childid[p].toString()) {
              this.trainingCategoryList[n].childcount[p] = this.trainingLessonCount[tc].lessons;
              // this.salesrepLessonCount = this.salesrepLessonCount + this.trainingLessonCount[tc].lessons;
            }
          }
          if (this.trainingCategoryList[n].childcount[p] == null)
            this.trainingCategoryList[n].childcount[p] = 0;
          if (this.trainingCategoryList[n].childdone == null)
            this.trainingCategoryList[n].childdone = [];
          if (this.trainingCategoryList[n].childpercentage == null)
            this.trainingCategoryList[n].childpercentage = [];

          if (this.trainingCategoryList[n].childdone[p] == null)
            this.trainingCategoryList[n].childdone[p] = 0;
          if (this.trainingCategoryList[n].childpercentage[p] == null)
            this.trainingCategoryList[n].childpercentage[p] = 0;
          for (let c in this.doneLessonByCatByUser) {

            if (this.doneLessonByCatByUser[c].associated_training.toString() == this.trainingCategoryList[n].childid[p].toString()) {

              this.trainingCategoryList[n].childdone[p] = this.doneLessonByCatByUser[c].lessonsdone;
              this.trainingCategoryList[n].childpercentage[p] = Math.floor((this.doneLessonByCatByUser[c].lessonsdone) / (this.trainingCategoryList[n].childcount[p]) * 100);

            }
          }
        }

      }
    }
    if (this.totalData.done_lesson_by_user != null && this.totalData.done_lesson_by_user[0] != null) {
      userPercentage = this.totalData.done_lesson_by_user[0].lessonsdone;
      this.dividend = userPercentage;
      // this.reportPercentage=Math.floor(userPercentage/this.adminlessoncount*100);
    }
    if (done_lesson_by_cat_by_user == 0) {
      this.dividend = 0;
    }
    // this.divisor = this.salesrepLessonCount;
  }
  @Input()
  set TrainingCeneterData(data: any) {

    this.progress_bar = 0;
    // if (this.progress_bar == 0) {
    //   window.scrollTo({
    //     top: 200,
    //     left: 0,
    //     behavior: 'smooth'
    //   });
    // }
    // console.log(this.progress_bar,'>>>+++',this.training_header_text)
    // this.training_cat_name=this.training_header_text;
    let results: any = (data) || '<no name set>';
    // console.log("souresh testing++++++++++",results);
    this.lesson_content = results.results.lesson_content[0];
    // console.log(this.lesson_content, 'lesson dada>>>>')

    //  this.addMarkedData(this.lesson_content.id, this.paramsId, this.nextdata, this.lessonDataList[this.Index].lession_title, this.nextlessondata);

    this.uniquedonetrainingarray = results.uniquedonetrainingarray;
    this.lessonDataList = results.rdata;
    // for (const i in this.lessonDataList) {
    for (var i = 0; i < this.lessonDataList.length; i++) {
      // console.log(this.lessonDataList.length-1, i)
      if (this.lessonDataList[i].expanded == true) {
        this.currentLesson = this.lessonDataList[i]._id;

        // console.log(">>>>><<<<<++", typeof(this.lessonDataList[i + 1]), this.lessonDataList[i],this.lessonDataList.length,this.currentLesson)
        if (this.lessonDataList[i + 1] != null) {
          // console.log("if >>>>><<<<<++this.lessonDataList[i+1],this.lessonDataList[i]",i,this.lessonDataList.length - 1);
          this.nextlessondata = {
            next_lesson_id: this.lessonDataList[i + 1]._id,
            next_lesson_title: this.lessonDataList[i + 1].lession_title
          }

        } else {
          this.nextlessondata = {
            next_lesson_id: '',
            next_lesson_title: ''
          }
          // console.log("else >>>>><<<<<++this.lessonDataList[i+1],this.lessonDataList[i]")
        }
      }

    }

    for (const i in this.lessonDataList) {
      if (this.lessonDataList[i].expanded == false) {

        this.completedLessons.push(this.lessonDataList[i]._id);
      }
    }
    // console.log("completed lessons", this.lessonDataList, this.nextlessondata);

    this.allLessonDataList = results.results.lessondata;
    // console.log(">>>>", this.allLessonDataList)
    setTimeout(() => {
      this.paramsTrainingId = this.activatedRoute.snapshot.params.associated_training;
      this.paramslessonId = this.activatedRoute.snapshot.params._id;

      // console.log(this.paramsTrainingId, '>>>>', this.paramslessonId)

      if (this.activatedRoute.snapshot.params._id == null) {
        this.paramslessonId = results.results.lessondata[0]._id;
        // this.lesson_content=results.results.lesson_content[0];
        // console.log(this.lesson_content, '+++++++++>>>>', this.paramslessonId)

      }
    }, 200);

    for (let i in results.results.trainingcenterlist) {
      if (this.activatedRoute.snapshot.params.associated_training == results.results.trainingcenterlist[i]._id) {
        this.training_cat_name = results.results.trainingcenterlist[i].catagory_name;
      }
    }


    // console.log('less ids>>',results.results.lesson_ids[0].lesson_ids,this.activatedRoute.snapshot.params._id)
    for (let id in results.results.lesson_ids[0].lesson_ids) {
      if (this.activatedRoute.snapshot.params._id == results.results.lesson_ids[0].lesson_ids[id] ||
        this.allLessonDataList[0]._id == results.results.lesson_ids[0].lesson_ids[id]) {
        this.lesson_id_flag = results.results.lesson_ids[0].lesson_ids[id];
        // console.log(this.lesson_id_flag,'flag--->')

      }
    }

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
  set ParamsId(id: any) {
    this.paramsId = (id) || '<no name set>';
  }
  @Input()
  set TrainingCenterRoute(id: any) {
    this.trainingCenterRoute = (id) || '<no name set>';
  }
  @Input()
  set DnaServerUrl(val: any) {
    this.dnaServerUrl = (val) || '<no name set>';
  }
  constructor(public dialog: MatDialog, public apiService: ApiService, public router: Router,
    public cookieService: CookieService, public snakBar: MatSnackBar, public activatedRoute: ActivatedRoute) {

    this.userId = JSON.parse(this.cookieService.get('userid'));
    this.userType = JSON.parse(this.cookieService.get('type'));



    // this.userType = "mentee";
    setTimeout(() => {
      this.paramsTrainingId = activatedRoute.snapshot.params.associated_training;
      // console.log(this.paramsTrainingId, '>>>>')
    }, 200);
  }

  ngOnInit() {

    if (this.userType == 'mentee' && this.cookieService.get('parentid') != null && this.cookieService.get('parentid') != '') {
      this.user_parent_id = JSON.parse(this.cookieService.get('parentid'));

      // console.log(this.dnaServerUrl,'+++++')

      let endpoint = this.dnaServerUrl + 'api1/usergetone';

      let data: any;
      data = {
        id: this.user_parent_id
      }
      // console.log('cardData-->', cardData);
      this.apiService.postDatawithoutToken(endpoint, data).subscribe((response: any) => {
        if (response.status == "success") {

          this.user_mentor_name = response.result[0].firstname + ' ' + response.result[0].lastname;
          console.log(this.dnaServerUrl, '+++++', this.user_mentor_name, response)

        } else {
          this.snakBar.open('Error Occured..!', 'Try Again', {
            duration: 3000
          });
        }
      })

    }

    this.divisor = this.adminlessoncount;
    this.reportPercentage = Math.floor(this.dividend / this.divisor * 100);
    // console.log("curreentLesson ++++++", this.currentLesson);
    for (const key in this.lessonDataList) {
      if (this.lessonDataList[key].expanded == true) {
        this.Index = this.lessonDataList.indexOf(this.lessonDataList[key]);
        // console.log(this.Index, '>>>>>');
      }
    }
    this.lastIndex = this.lessonDataList.length - 1;
    // console.log(this.lastIndex)

    // switch (this.cookiesData.type) {
    //   case 'admin':
    //     this.divisor = this.adminlessoncount;
    //     break;
    //   case 'salesrep':
    //     this.divisor = this.salesreplessoncount;
    //     break;
    //   case 'user':
    //     this.divisor = this.userlessoncount;
    //     break ;

    // }

  }


  lessonplanpageroute(id) {
    this.router.navigateByUrl(this.lessonplanmaterialroute + this.paramsTrainingId + '/' + id);
  }
  questionDetails(id: any, i: any, lesson_title: any) {
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
          this.addMarkedData(this.currentlesson, this.paramsId, id, this.lesson_title, this.nextlessondata);
          this.questionArray.expanded = true;
        }
        if (i < this.allLessonData.length) {
          if (i < this.allLessonData.length) {

            if (this.allLessonData[i + 1] != null) {
              this.allLessonData[i].expanded = false;
              this.allLessonData[i + 1].expanded = true;
              this.allLessonData[i + 1].is_done = true;
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

  // openquestionmodal(id:any,lesson_title){

  //   this.quizQuestion = this.questionArray[this.questionindex];
  //   this.openDialog(this.quizQuestion,id,lesson_title);

  //   for (const i in this.questionArray) {
  //     this.quizQuestion = this.questionArray[i].question;
  //     for (const loop in this.quizQuestion.answers) {
  //       this.currentQuestionIndex = this.quizQuestion.answers[loop].answer;

  //     }
  //   }
  // }
  // openDialog(x: any,id:any,lesson_title:any): void {
  //   this.dialogRef = this.dialog.open(Dialogtest, {
  //     width: '550px',
  //     data: { data: x } 
  //   });
  //   this.dialogRef.afterClosed().subscribe(result => {
  //     if(result==true) {
  //       if((this.questionindex+1) == this.questionArray.length){
  //         this.addMarkedData(this.currentlesson,this.paramsId,id,this.lesson_title);
  //       }else{
  //       this.questionindex++;
  //       this.openquestionmodal(id,lesson_title);
  //       }
  //     }
  //   });
  // }

  addMarkedData(lessonId: any, associated_training: any, i: any, lession_title: any, nextlessondata: any) {
    const link = this.serverDetailsVal.serverUrl + this.formSourceVal.addMarkendpoint;
    // if(this.trainingCategoryName==null || this.trainingCategoryName==''){}
    let data: any = {
      "data": {
        "user_id": this.userId,
        "lesson_id": this.paramslessonId,
        "associated_training": this.paramsTrainingId,
        "lastlessonname": lession_title,
        "lasttrainingname": this.trainingCategoryName,
        'nextlessondata': nextlessondata
      },
      "sourceobj": ["user_id", "lesson_id", "associated_training"],
      "token": this.serverDetailsVal.jwttoken
    }

    // console.log('post data',data);

    this.apiService.postData(link, data).subscribe((response: any) => {
      if (response.status = "success") {
        const link = this.serverDetailsVal.serverUrl + this.formSourceVal.getUpdatedTrainingPercentageByUserEndpoint;
        let data: any = {
          "user_id": this.userId
        }
        // this.apiService.postDatawithoutToken(link, data).subscribe((response: any) => {
        //   let divisor: any;
        //   let dividend: any;
        //   let percentageResult: any;
        //   let data: any = response.results.totalpercentage[0].lessonsdone;
        //   this.dividend = data;
        //   divisor = response.results.totallesson[0].count;
        //   dividend = response.results.totalpercentage[0].lessonsdone;
        //   percentageResult = Math.floor(dividend / divisor * 100);
        //   this.reportPercentage = percentageResult;
        //   // if(this.reportPercentage === 100){

        //   //  const link = this.serverDetailsVal.serverUrl + this.formSourceVal.trainingCompletEmailEndpoint;
        //   //  let data:any={
        //   //      "user_id":this.userId,
        //   //      "user_email":this.cookiesData.email,
        //   //      "user_name":this.userName,
        //   //      "user_type":this.cookiesData.type
        //   //  }
        //   //  this.apiService.postDatawithoutToken(link,data).subscribe((response:any)=>{

        //   //  });
        //   // }
        // })



        // if(i<this.allLessonData.length){

        //   if(this.allLessonData[i+1]!=null){
        //   this.allLessonData[i].expanded=false;
        //   this.allLessonData[i+1].expanded=true;
        //   this.allLessonData[i+1].is_done=true;

        //   }else{

        //     const link = this.serverDetailsVal.serverUrl + this.formSourceVal.trainingcatcompletemailendpoint;
        //     let data:any={
        //       "email":this.cookiesData.email,
        //       "user_name":this.userName,
        //       "cat_name":this.trainingCategoryName,
        //       "user_type":this.cookiesData.type
        //   }

        //   this.apiService.postDatawithoutToken(link,data).subscribe((response:any)=>{

        //   });

        //     let message :any="You Have Successfully Completed The Training";
        //     let action : any="Ok";
        //     this.snakBar.open(message,action,{
        //       duration:3000
        //     });
        //     setTimeout(() => {

        //     }, 4000);

        //   }
        //   }

      }

    })
  }

  // lastOpenDialog(x: any): void {
  //   this.dialogRef = this.dialog.open(Dialogtest, {
  //     panelClass: 'successModal',
  //     width: '550px',
  //     data: { data: x ,trainingdata:this.trainingCategoryList,currentTrainingId:this.paramsTrainingId ,trainingCenterRoute:this.trainingCenterRoute} 
  //   });
  //   this.dialogRef.afterClosed().subscribe(result => {

  //   });
  // }


  videoended(item: any, i: any, j) {
    if (item.test_associate_training == 'Yes') {
      this.questionDetails(item._id, i, j);
    } else {
      this.addMarkedData(item._id, this.paramsId, i, this.lesson_title, this.nextlessondata);
    }
  }

  audioended(item: any, i: any, j) {
    if (item.test_associate_training == 'Yes') {
      this.questionDetails(item._id, i, j);
    } else {
      this.addMarkedData(item._id, this.paramsId, i, this.lesson_title, this.nextlessondata);
    }
  }


  childcatclick(childId: any, catName: any) {
    this.trainingCategoryName = catName;
    this.router.navigateByUrl(this.trainingCenterRoute + childId);

  }

  nochildclick(val: any) {
    console.log(this.lesson_content, '___++++', val)
    if (val.is_done != null && val.is_done == true || (val.prerequisite_lession == this.paramslessonId)) {

      setTimeout(() => {
        this.progress_bar = 1;
      }, 100);

      // let flag:any;
      // let value:any='next';
      // this.nextbutton(value,flag)

      this.router.navigateByUrl(this.trainingCenterRoute + this.paramsTrainingId + '/' + val._id);


      // this.addMarkedData(this.lesson_content.id, this.paramsId, this.nextdata, this.lessonDataList[this.Index].lession_title, this.nextlessondata);

      // setTimeout(() => {
      //   document.getElementById("lessonContentData").scrollIntoView();
      // }, 1000);

    } else {
      this.snakBar.open('You Can Not Access This Lesson Until Done...!', 'OK', {
        duration: 3000
      });
    }

    if (this.lesson_data != null)
      this.lesson_content = this.lesson_data.results.lesson_content[0];
    // console.log(this.lesson_content,'___++++')



  }


  clicktrcataining(id: any, catagory_name: any) {

    setTimeout(() => {
      this.progress_bar = 1;
    }, 100);

    // console.log(id, '++++++++++', catagory_name)

    this.router.navigateByUrl(this.trainingCenterRoute + id);
    // if( this.progress_bar == 0){
    this.training_header_text = catagory_name;
    // }

    // setTimeout(() => {
    //   if(this.progress_bar == 0){
    //     window.scrollTo({ 
    //       top: 200, 
    //       left: 0, 
    //       behavior: 'smooth' 
    //     });
    //   }
    // }, 500);
    setTimeout(() => {
      document.getElementById("lessonData").scrollIntoView();
    }, 1000);


  }

  activatedclass(item) {
    item.active = !item.active;
  }

  // activatedclasslesson(items){
  //   items.active1=!items.active1;
  // }

  getTrainingCenterlistFunction(associated_training: any, type: any, user_id: any) {
    const link = this.serverDetailsVal.serverUrl + "gettrainingcenterlist";
    let data: any = {
      "condition": {
        "associated_training": associated_training
      },
      "user_id": user_id,
      "type": type,
      "associated_training": associated_training
    }
    this.apiService.postDatawithoutToken(link, data).subscribe((response: any) => {
      this.lesson_data = response;
      // console.log("response", response);
      this.trainingCategoryList = response.results.trainingcenterlist;
      this.lessonDataList = response.rdata;
      this.dividend = response.results.done_lesson_by_user[0].lessonsdone;
      this.divisor = response.results.total_lesson[0].count;
      this.reportPercentage = Math.floor(this.dividend / this.divisor * 100);
      this.lesson_content = this.lesson_data.results.lesson_content[0];
      // console.log(this.lesson_data, '+++++>>>')

      if (this.lesson_data.status == 'success') {
        console.log(this.lesson_data, '+++++>>>', this.lesson_data.status)


        this.progress_bar = 0;
        // console.log(this.progress_bar, '>>>>>>>>>>', this.lesson_data.status)

      }


    });


  }

  //next prev button work

  nextbutton(value: any, bottomval: any) {

    switch (value) {
      case 'next':

        // console.log(this.lessonDataList[this.Index], '>>>>>>>>>>>>')
        // if(this.Index<this.lessonDataList.length){
        this.addMarkedData(this.lessonDataList[0]._id, this.paramsId, this.nextdata, this.lessonDataList[this.Index].lession_title, this.nextlessondata);
        let ind: any = 0;
        setTimeout(() => {
          // if(this.Index<this.lessonDataList.length){
          for (let b in this.lessonDataList) {
            if (this.lessonDataList[b]._id == this.lesson_content._id)
              ind = (parseInt(b) + 1);
          }
          // console.log('ind',ind);
          if (this.lessonDataList[ind] != null) {

            // setTimeout(() => {
            //   this.getTrainingCenterlistFunction(this.paramsId, this.userType, this.userId);                   
            // },500)            

            // console.log('>>>+++',this.lessonDataList[ind])

            setTimeout(() => {

              if (this.lessonDataList[ind].is_done == true || (this.lessonDataList[ind].prerequisite_lession == this.paramslessonId)) {
                // console.log('>>>+++>>>',this.lessonDataList[ind])

                this.nochildclick(this.lessonDataList[ind]);
              }
            }, 1000)

            this.progressLoader = true;
          } else {

            for (var n = 0; n < this.trainingCategoryList.length; n++) {
              // console.log('++>>>>',this.trainingCategoryList[n],this.trainingCategoryList[n+1],this.trainingCategoryList[0]._id)
              if (this.paramsTrainingId == this.trainingCategoryList[n]._id && this.trainingCategoryList[n + 1] != null) {
                // console.log('-->>>>',this.trainingCategoryList[n+1])

                this.router.navigateByUrl(this.trainingCenterRoute + this.trainingCategoryList[n + 1]._id);
              }
              else {
                // console.log('++>>>>',this.trainingCategoryList[n]._id,this.trainingCategoryList[n+1]._id,
                // '>>>',this.trainingCategoryList[0]._id)
                this.progressLoader = false;
                this.router.navigateByUrl(this.trainingCenterRoute + this.trainingCategoryList[0]._id);

              }
            }

          }
        }, 500);

        // this.Index++;
        // this.lessonDataList[this.Index];

        // if (bottomval != "" && bottomval == "bottomNext") {
        //   window.scroll({
        //     top: 0,
        //     left: 0,
        //     behavior: 'smooth'
        //   });
        // }

        // console.log("souresh test",this.nextdata);
        // }
        break;
      case 'prev':
        // console.log(this.lessonDataList[this.Index], '>>>>>>>>>>>>')
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

          this.nochildclick(this.lessonDataList[ind1]);

          this.progressLoader = true;
        }, 500);
        // console.log(this.lessonDataList[ind1])
        // this.flag = 1;
        // let index: any = this.Index - 1;
        // this.firstIndex = index;
        // this.lessonDataList = [this.lessonDataList[index]];

        // if (bottomval != "" && bottomval == "bottomPrev") {
        //   window.scroll({
        //     top: 0,
        //     left: 0,
        //     behavior: 'smooth'
        //   });
        // }

        break;
    }
  }

  // button for purchase ,schedule ,submit lesson

  menteeLessonReviewButton(flag: any) {
    console.log('>>>>', this.cookieService.get('parentid'))
    // console.log('ls--->>', this.paramslessonId, 'tc-->', this.paramsId, 'user-->', this.userId, 'parent-id-->', this.user_parent_id, flag);
    // console.log('mentee_banner_text-->', this.mentee_banner_text)


    if (this.user_parent_id != null && flag == 'buy' && this.user_parent_id != "") {
      // console.log('parent-id-->', this.user_parent_id);


      //product data by category id start
      let product_data: any;
      let endpointa = this.serverDetailsVal.serverUrl + 'getproductsbycatid'
      product_data = {
        category: '5eddd5401acf66000738be19'
      }
      this.apiService.postDatawithoutToken(endpointa, product_data).subscribe((response: any) => {
        // console.log('>>>>>', response)
        this.product_data = response.results;
        // console.log('>>>>> ++', this.product_data)
        if (response.status == 'success') {
          const dialogRef = this.dialog.open(PurchaseModalComponent, {
            panelClass: 'blogdetail_videomodal',
            data: { 'data': this.dialog, 'product_data': this.product_data }
          });

          dialogRef.afterClosed().subscribe((result: any) => {
            // console.log('>>>', result);

            if (result.flag == 'yes') {

              // console.log('yes');
              let cardData: any;
              let endpoint = this.dnaServerUrl + 'api/cart';
              cardData = {
                product: {
                  free_shipping:1,
                  id: result.lesson_session_data._id,
                  name: result.lesson_session_data.productname,
                  price: result.lesson_session_data.price,
                  quantity: 1,
                  image: result.lesson_session_data.image
                },
                training_id: this.paramsId,
                lesson_id: this.paramslessonId,
                userid: this.userId
              }
              // console.log('cardData-->', cardData);
              this.apiService.postDatawithoutToken(endpoint, cardData).subscribe((response: any) => {
                if (response.status == "success") {
                  this.getTrainingCenterlistFunction(this.paramsId, this.userType, this.userId)
                  this.snakBar.open('Product Successfully Added Into Your Cart.', 'OK', {
                    duration: 3000
                  });
                  this.router.navigateByUrl('cart/' + response.result._id)
                } else {
                  this.snakBar.open('Error Occured..!', 'Try Again', {
                    duration: 2000
                  });
                }
              })
            }
          });
        }

      })

    }
    if (this.user_parent_id == null || this.user_parent_id == "") {
      this.router.navigateByUrl('/mentors/' + this.paramsTrainingId + '/' + this.paramslessonId)
      console.log('>>++', this.cookieService.get('parentid'))
      // this.snakBar.open('choose mentor', 'OK', {
      //   duration: 3000
      // });
    }

    if (this.user_parent_id != null && flag == 'lesson_plan' && this.user_parent_id != "") {
      this.router.navigateByUrl(this.lessonplanmaterialroute + this.paramsTrainingId + '/' + this.paramslessonId);
    }

    if (this.user_parent_id != null && flag == 'schedule' && this.user_parent_id != "") {

      // console.log('manage-appointment/mentee/book-appointment/:user_parent_id/:lesson_id_object/:associated_training', this.googlescheduleroute + this.user_parent_id +'/'+this.paramslessonId +'/'+ this.paramsTrainingId)

      // console.log('>>>',this.schedule_data)
      // console.log('>>>++',this.orders_data)

      this.router.navigateByUrl(this.googlescheduleroute + this.user_parent_id + '/' + this.paramslessonId + '/' + this.paramsTrainingId);
    }
  }


  //review lesson plan modal open

  getReviewLessonPlanModal() {
    // console.log('>>>',this.lesson_content)
    const dialogRef = this.dialog.open(ReviewLessonPlanComponent, {
      panelClass: 'lesson_modal',
      data: { 'data': this.lesson_content, 'user_mentor_name': this.user_mentor_name }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      if (result.flag == 'yes') {
        this.router.navigateByUrl('/lesson-plan-material/' + this.paramsId + '/' + this.paramslessonId);
      }
    })
  }



  // Schedule modal open

  getScheduleModal() {
    // console.log('>>>',this.lesson_content)
    const dialogRef = this.dialog.open(ScheduleModalComponent, {
      panelClass: 'schedule_modal',
      data: { 'data': this.lesson_content, 'user_mentor_name': this.user_mentor_name }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      if (result.flag == 'yes') {
        this.router.navigateByUrl(this.googlescheduleroute + this.user_parent_id + '/' + this.paramslessonId + '/' + this.paramsTrainingId);
      }
    })
  }

}




//purchase modal

@Component({
  selector: 'PurchaseModal',
  templateUrl: './PurchaseModal.html'
})
export class PurchaseModalComponent {
  public message: any;
  public session_id: any;
  // public lesson_session_id:any='';
  constructor(public dialogRef: MatDialogRef<PurchaseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public snakBar: MatSnackBar, public apiService: ApiService) {


  }
  submitLession(val: any, flag: string) {
    // console.log(val, flag);
    this.data.lesson_session_data = val;
    this.data.flag = flag;
    if (val != null && val !== '') {
      this.dialogRef.close(this.data);
      // this.snakBar.open('Submited Successfully ..!', 'OK', {
      //   duration: 3000
      // })
    }
    else {
      this.message = 'Please Choose Lesson Session';
    }
  }
  // ngOnChanges(event: any) {
  //   console.log(event.value)
  //   if (event.value != '') {
  //     this.message = ''
  //   }
  // }
}








//review lesson plan reminder modal

@Component({
  selector: 'ReviewLessonPlan',
  templateUrl: './ReviewLessonPlan.html'
})
export class ReviewLessonPlanComponent {
  public message: any;
  public session_id: any;
  // public lesson_session_id:any='';
  constructor(public dialogRef: MatDialogRef<ReviewLessonPlanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData1, public snakBar: MatSnackBar, public apiService: ApiService, public router: Router) {


  }
  submitLesson(val: any, flag: string) {
    this.data.flag = flag;
    console.log(val, flag);
    this.dialogRef.close(this.data);
    // this.snakBar.open('Submited Successfully ..!', 'OK', {
    //   duration: 3000
    // })
  }
}





//schedule reminder modal

@Component({
  selector: 'Schedule',
  templateUrl: './Schedule.html'
})
export class ScheduleModalComponent {
  public message: any;
  public session_id: any;
  // public lesson_session_id:any='';
  constructor(public dialogRef: MatDialogRef<ScheduleModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData2, public snakBar: MatSnackBar, public apiService: ApiService, public router: Router) {


  }

  submitSchedule(val: any, flag: string) {
    this.data.flag = flag;
    console.log(val, flag);
    this.dialogRef.close(this.data);
    // this.snakBar.open('Submited Successfully ..!', 'OK', {
    //   duration: 3000
    // })
  }
}
