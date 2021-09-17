import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormControl } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
// import { DomSanitizer } from '@angular/platform-browser';
import { CookieService } from "ngx-cookie-service";
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
declare var moment: any;
declare var $: any;
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';

import { duration } from 'moment';
import { resolve } from 'url';

export interface DialogData {
  data: any;
  safe_url: any;
}


export interface DialogData1 {
  data: any;
  configFileUpload: any;
  flag: any;
  dataObj: any;
  heading: any;
  type_flag: any;
  videoFields: any;
  audioFields: any;
  fileFields: any;
  buttonName: any;
  keyVal: any;
  bucket_url: any;
}

@Component({
  selector: 'lib-traning',
  templateUrl: './traning.component.html',
  styleUrls: ['./traning.component.css']
})
export class TraningComponent implements OnInit {
  public chkboxval: any;
  public progressLoader: boolean = false;
  public formdataval: any = [];
  public serverDetailsVal: any;
  public formgroup: FormBuilder;
  public dataForm: FormGroup;
  public percentageis: any = [];
  public lengthis: any = [];
  public nameis: any = [];
  public issubmit = 0;
  public isedit: number = 0;
  public start_time: any;
  public end_time: any;
  public submitval: any = 1;
  public usertype: any;
  public jsonLinkVal: any;
  public formSourceVal: any;
  public menuval: string = '';
  public recid: any;
  public listingPageRoute: any;
  public buttonText: any = "Submit";
  public headerText: any;
  public objectId: any;
  public pageFlag: any;
  public mediaTypeValue: any;
  public editorconfig: any = {};
  public uploadConfigData: any = '';
  public cancelBtnRoute: any;
  public htmType: any = '';
  public title: any;
  public description: any;
  public images_array: any = [];
  public checked: boolean = true;
  public allLessonData: any = [];
  public imagePath: any = '';
  public fileArray: any;
  public audioVideoFlag: boolean = true;
  public hasLessonVal: any;
  public dnaFlag: any;
  public betoparedesFlag: any;
  public lessonplanValue: any;
  public has_test_lesson: any = false;
  public video_array: any = [];
  public file_array: any = [];
  public audio_array: any = [];
  public video_base_url: any = 'https://www.youtube.com/embed/';
  public vid_url: any = '';
  public vid_tit: any = '';
  public vid_desc: any = '';
  public lesson_attachment_flag_val: any;
  public test_percentage: any = 80;
  public imgflag: boolean = false;
  public type: any;
  public videoflag: boolean = false;
  public fileflag: boolean = false;
  public audioflag: boolean = false;
  public htmlflag: boolean = false;
  public showfieldflag: boolean = true;
  public priority: any;
  public traingtypeflag: any = false;
  public trainingacessable: any;
  public bucket_url: any;//  = 'https://training-centre-bucket.s3.amazonaws.com/lesson-files/';
  public trainingAccessData: any = [];
  public from_type: any;

  @Input()
  set formdata(formdata: string) {
    this.formdataval = (formdata) || '<no name set>';
  }
  @Input()
  set PageName(val: {}) {
    this.pageFlag = (val) || '<no name set>';
  }

  @Input()
  set serverDetails(serverDetails: {}) {
    this.serverDetailsVal = (serverDetails) || '<no name set>';

  }

  @Input()
  set formSource(formSource: any) {
    this.formSourceVal = (formSource) || '<no name set>';

  }
  @Input()
  set ListingPageRoute(val: any) {
    this.listingPageRoute = (val) || '<no name set>';
  }
  @Input()
  set ObjectId(val: any) {
    this.objectId = (val) || '<no name set>';
  }

  @Input()
  set FileUpload(getConfig: any) {
    this.uploadConfigData = getConfig;
  }
  @Input()
  set IsItDna(val: any) {
    // // console.log(val);
    this.dnaFlag = val;
  }
  @Input()
  set IsitBetoparedes(val: any) {
    this.betoparedesFlag = val;
    // console.log(this.betoparedesFlag);

  }
  @Input()
  set TraingAccessFlag(val: any) {
    this.traingtypeflag = val;
  }

  @Input()
  set TrainingAccessable(val: any) {
    this.trainingacessable = val;
  }
  @Input()
  set BuketUrl(BuketUrl: any) {
    this.bucket_url = (BuketUrl) || '<no name set>';
    this.bucket_url = this.bucket_url.url;
  }
  @Input()
  set Lesson_attachment_flag(val: any) {
    this.lesson_attachment_flag_val = (val) || '<no name set>';
    this.lesson_attachment_flag_val = val;
  }
  @Input()
  set Showfields(val: boolean) {
    this.showfieldflag = (val);
  }
  @Input()
  set FromType(val: any) {
    this.from_type = val;
  }


  constructor(formgroup: FormBuilder, public cookeiservice: CookieService, public sanitizer: DomSanitizer, public route: ActivatedRoute, public router: Router, public apiService: ApiService, public _http: HttpClient, public dialog: MatDialog, public snackBar: MatSnackBar) {
    this.formgroup = formgroup;

    this.editorconfig.extraAllowedContent = '*[class](*),span;ul;li;table;td;style;*[id];*(*);*{*}';
  }

  ngOnInit() {



    this.headerText = this.formSourceVal.AddheaderText;
    this.route.params.subscribe(params => {
      this.recid = params['id'];
      if (this.recid != null && this.recid != '' && this.recid != undefined) {
        this.headerText = this.formSourceVal.EditheaderText;
        this.buttonText = "Update";
        this.geteditdata();
      }
    });


    let formgrp: any = [];
    for (let c in this.formdataval) {
      if ((this.formdataval[c].isaddonly == null && this.formdataval[c].isaddonly != true)) {
        this.start_time = '';
        this.end_time = '';
        if (this.formdataval[c].inputtype == 'checkbox') {
          formgrp[this.formdataval[c].name] = [false];
        }
        else if (this.formdataval[c].inputtype == 'dateis') {
          // Validators.required
          formgrp[this.formdataval[c].name] = [moment().format('MM-DD-YY')];
        }
        else {
          let tempdefault = '';


          if (this.formdataval[c].validationrule != null && this.formdataval[c].validationrule.required) {
            // Validators.required
            formgrp[this.formdataval[c].name] = [tempdefault];
          }
          if (this.formdataval[c].validationrule != null && this.formdataval[c].validationrule.email) {
            formgrp[this.formdataval[c].name] = [tempdefault, Validators.compose([Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')])];
          }
          if (this.formdataval[c].validationrule != null && this.formdataval[c].validationrule.confirmpass) {
            formgrp[this.formdataval[c].name] = [tempdefault, Validators.compose([Validators.required, this.equalToPass('password')])];
          }
          if (this.formdataval[c].validationrule != null && !this.formdataval[c].validationrule && this.formdataval[c].value == null) {
            formgrp[this.formdataval[c].name] = [tempdefault];
          }
          if (this.formdataval[c].validationrule == null && !this.formdataval[c].validationrule && this.formdataval[c].value == null) {
            formgrp[this.formdataval[c].name] = [tempdefault];
          }
          if (this.formdataval[c].validationrule == null && !this.formdataval[c].validationrule && this.formdataval[c].value != null) {
            formgrp[this.formdataval[c].name] = [this.formdataval[c].value];
          }
          if (this.formdataval[c].validationrule != null && this.formdataval[c].validationrule.url) {
            formgrp[this.formdataval[c].name] = [tempdefault, Validators.compose([Validators.required, Validators.pattern('^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?|^((http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$')])];
          }
          if (this.formdataval[c].inputtype == 'select') {

            this.getselectdata(this.formdataval[c].sourceview, this.formdataval[c].endpoint, c);
          }
          if (this.formdataval[c].inputtype == 'button') {
            // this.formdataval[c].sourceval = this.formdataval[c].sourceview 
            this.getButtonData(this.formdataval[c].sourceview, c);
          }
        }

        if (this.formdataval[c].role != null) {
          if (this.formdataval[c].role.indexOf(this.usertype) == -1) {
            this.formdataval[c].inputtype = 'hidden';
            setTimeout(() => {
              this.dataForm.controls[this.formdataval[c].name].patchValue(this.cookeiservice.get(this.formdataval[c].defaultval));
            }, 1000);
          }
        }
      }
    }
    this.dataForm = this.formgroup.group(formgrp);


  }


  formsubmit() {
    console.log("data value", this.test_percentage);

    this.issubmit = 1;
    for (let y in this.dataForm.controls) {
      this.dataForm.controls[y].markAsTouched();
    }


    if (this.lesson_attachment_flag_val == true) {

      // // console.log(this.video_array, "video_array", this.videoflag);
      // // // console.log(this.audio_array, "audioarray", this.audioflag);
      // // // console.log(this.file_array, "filearray", this.fileflag);

      if (this.videoflag == true || this.videoflag == false) {
        this.dataForm.value.videoflag = this.videoflag;
        this.dataForm.value.type = this.type;
        this.dataForm.value.video_array = this.video_array;
      }
      if (this.audioflag == true || this.audioflag == false) {
        this.dataForm.value.audioflag = this.audioflag;
        this.dataForm.value.audio_array = this.audio_array;

      }
      if (this.fileflag == true || this.fileflag == false) {
        this.dataForm.value.fileflag = this.fileflag;
        this.dataForm.value.file_array = this.file_array;

      }

      if (this.file_array.length == 0) {
        this.dataForm.value.fileflag = false;
      }

      if (this.video_array.length == 0) {
        this.dataForm.value.videoflag = false;
      }

      if (this.audio_array.length == 0) {
        this.dataForm.value.audioflag = false;
      }

      this.dataForm.value.lesson_attachements = [];


      if (this.file_array.length > 0) {
        for (let i in this.file_array) {
          this.dataForm.value.lesson_attachements.push(this.file_array[i])
        }
      }
      if (this.audio_array.length > 0) {
        for (let i in this.audio_array) {
          this.dataForm.value.lesson_attachements.push(this.audio_array[i])
        }
      }
      if (this.video_array.length > 0) {
        for (let i in this.video_array) {
          this.dataForm.value.lesson_attachements.push(this.video_array[i])
        }
      }

    }


    if (this.dataForm.valid && this.submitval == 1) {
      if (this.dataForm.value.status)
        this.dataForm.value.status = parseInt("1");
      else
        this.dataForm.value.status = parseInt("0");

      const link = this.serverDetailsVal.serverUrl + this.formSourceVal.endpoint;

      let data: any = {
        source: this.formSourceVal.source,
        data: this.dataForm.value,
        sourceobj: [this.objectId.objectId, this.objectId.objectId2],
        token: this.serverDetailsVal.jwttoken
      }


      if (this.dnaFlag == true) {
        if (this.hasLessonVal == true) {
          data.data['has_lessonplan'] = 1;
          data.data['lessonplan_value'] = this.lessonplanValue;
        }
        else
          data.data['has_lessonplan'] = 0;

        if (this.hasLessonVal == 0) {
          delete this.dataForm.value.lessonplan_value;
        }

        if (this.has_test_lesson == true) {
          data.data['has_test_lesson'] = 1;
          data.data['test_percentage'] = this.test_percentage;
        } else {
          data.data['has_test_lesson'] = 0;
        }
      }
      // for betoparedes backend quiz 
      if (this.betoparedesFlag == true) {
        if (this.has_test_lesson == true) {
          data.data['has_test_lesson'] = 1;
          data.data.test_percentage = this.test_percentage;
        } else {
          data.data['has_test_lesson'] = 0;
        }

      }
      // // // console.log(this.dnaFlag, 'dnaFlag+++++++++++++++gvhbkjnlk')

      // if (this.route.snapshot.url[0].path == "manage-lesson" ) {

      if (this.htmType != null && this.htmType != '') {
        data.data['typeHtml'] = this.htmType;
      }

      data.data.id = this.recid;

      data.data.priority = this.priority;


      if (this.traingtypeflag != null && this.traingtypeflag == true) {

        for (const it in this.trainingacessable) {
          if (this.trainingacessable[it].completed == true) {
            this.trainingAccessData.push(this.trainingacessable[it].val)
            // // console.log(this.trainingacessable[it], 'trainingacessabletrainingacessable===');
          }
        }
        data.data.type = this.trainingAccessData
      }

      if (this.showfieldflag == false) {
        delete data.data.typeHtml;
        delete data.data.lessonplan_value;
        delete data.data.has_lessonplan;
        delete data.data.test_percentage;
        delete data.data.has_test_lesson;
      }
      
      if (data.data['has_test_lesson'] == 1) {
        console.log(data, 'data++')
      }

      this.apiService.postData(link, data).subscribe((res: any) => {

        if (res.status = "success") {
          this.router.navigateByUrl(this.listingPageRoute);
        }
      })
    }
  }

  checkCheckBoxvalue(event: any, value) {
    // // console.log(value, 'subtask', event)

    if (value.val == 'all' && value.completed == true) {
      for (const it in this.trainingacessable) {
        if (this.trainingacessable[it].val != 'all') {
          this.trainingacessable[it].completed = false;
        }
      }
      // // console.log(this.trainingacessable, 'trainingacessable')

    }

    if (value.val != 'all') {
      for (const it in this.trainingacessable) {
        if (this.trainingacessable[it].val == 'all') {
          this.trainingacessable[it].completed = false;
        }
      }
      // // console.log(this.trainingacessable, 'trainingacessable')

    }

  }


  equalToPass(fieldname): ValidatorFn {                                 //password match custom function
    return (control: AbstractControl): { [key: string]: any } => {      ///abstractcontrol function call here with key string any type

      let input = control.value;      //class create here
      let isValid = control.root.value[fieldname] == input;       //value valid or not
      if (!isValid)
        return {
          equalTo: true            //this value will be called
        };
    };
  }

  getselectdata(source: any, endpoint: string, c: any) {
    if (this.formdataval[c].sourcetype == null || this.formdataval[c].sourcetype != 'static') {
      const link = this.serverDetailsVal.serverUrl + endpoint;
      let data: any = {
        source: source,
        condition: { 'is_trash': { $ne: 1 } },
        token: this.serverDetailsVal.jwttoken,
      }


      this.apiService.getData(link, data)
        .subscribe((res: any) => {
          // // // console.log("souresh test", res);
          let result;
          result = res.res;
          // // // console.log("drop down", result);
          if (res.status == 'error') {
            // this.router.navigate(['/']);
          } else {
            this.formdataval[c].sourceval = result;

            // this.formdataval[c].sourceval = "";
          }
        }, error => {
          this.formdataval[c].sourceval = '';
        });
    } else {

      this.apiService.localJsonSate(source)
        .subscribe((res: any) => {
          this.formdataval[c].sourceval = res;
        }, error => {
          this.formdataval[c].sourceval = '';
        });
    }

  }
  getMediaTypeVal(value: any, name: any) {
    this.imagePath = null;
    if (name == 'mediaType') {
      this.mediaTypeValue = value;
    }
    if (name == 'associated_training') {
      this.progressLoader = true;
      let link = this.serverDetailsVal.serverUrl + this.formSourceVal.lessonDataEndpoint;
      let data: any = {
        condition: {
          "associated_training_id": value,
          'is_trash': { $ne: 1 }
        }
      }
      this.apiService.postDatawithoutToken(link, data).subscribe((response: any) => {
        this.progressLoader = false;
        this.allLessonData = response.lesson_list;
        for (let key in this.formdataval) {
          if (this.formdataval[key].name == 'prerequisite_lession') {
            this.formdataval[key].sourceval = this.allLessonData;
          }
        }
      })
    }
  }
  cancelButton() {
    this.router.navigateByUrl(this.listingPageRoute);
  }
  clear() {
    this.imagePath = '';
    this.audioVideoFlag = false;
  }

  getButtonData(source, c) {
    this.apiService.localJsonSate(source)
      .subscribe((res: any) => {
        this.formdataval[c].sourceval = res;
      })
  }

  openTrainingType(val) {
    // // console.log(val, '++++++++++++++++')
    this.mediaTypeValue = val.selectname;
    // val.flagButton = true;
    // let index = 0;
    switch (val.selectname) {
      case 'video':
        this.videoflag = true;
        this.addVideo('add', 0, 'item');
        break;
      case 'file':
        this.fileflag = true;
        this.addflie('add', 0, 'item');
        break;
      case 'audio':
        this.audioflag = true;
        this.addAudio('add', 0, 'item');
        break;
    }

    // if (val.selectname == 'image') {
    //   this.mediaTypeValue = val.selectname;
    // }
    // if (val.selectname == '"audio"') {

    // }
  }


  addVideo(key, i, item) {
    let buttonName = '';
    let heading = '';
    let type_flag = 'video';
    let dataObj: any = {};

    if (key == 'add') {
      dataObj = {
        video_url: '',
        video_title: '',
        video_description: '',
        priority: '',
        video_skippable: false,
      }
      heading = 'Add Lesson Video';
      buttonName = 'Add'
    }
    if (key == 'edit') {
      dataObj = item;
      heading = 'Edit Lesson Video';
      buttonName = 'Update'
    }
    dataObj.type = 'video';

    // // console.log(dataObj, 'dataObj')

    const dialogRef = this.dialog.open(AddAudioVideoFileDialogComponent, {
      panelClass: 'lesson_videomodal',
      width: '900px',
      data: { 'dataObj': dataObj, 'heading': heading, 'type_flag': type_flag, 'buttonName': buttonName, 'keyVal': key }
    });

    //for disable modal
    dialogRef.disableClose = true;

    //for subscribe modal data
    dialogRef.afterClosed().subscribe(result => {
      // // console.log(result, '++++sub')

      if (result.flag == 'yes') {
        // this.video_array[i] = result.videoFields

        if (key == 'add') {
          this.video_array.push(result.videoFields);
        }
        if (key == 'edit') {
          // this.file_array.splice(i, 1);
          // this.file_array.push(result.fileFields);
          this.video_array[i] = result.videoFields;
        }
      }

      // // console.log(this.video_array, 'video_array')

    })

  }


  addflie(key, i, item) {

    // // console.log(key, i, item)
    // this.file_array.push({
    //   file: {},
    //   file_description: '',
    //   file_title: '',
    //   file_priority: '',
    //   file_skippable: false
    // });
    let dataObj: any = {};
    let heading = '';
    let buttonName = '';
    let type_flag = 'file';

    if (key == 'add') {
      dataObj = {
        file: {},
        file_title: '',
        file_description: '',
        priority: '',
        file_skippable: false,

      }
      heading = 'Add Lesson File';
      buttonName = 'Add ';
    }


    if (key == 'edit') {
      dataObj = item;
      heading = 'Edit Lesson File';
      buttonName = 'Update';
    }
    dataObj.type = 'file';

    // // console.log(dataObj, 'dataObj')



    const dialogRef = this.dialog.open(AddAudioVideoFileDialogComponent, {
      panelClass: 'lesson_videomodal',
      width: '900px',
      data: { 'configFileUpload': this.uploadConfigData, 'dataObj': dataObj, 'heading': heading, 'type_flag': type_flag, 'buttonName': buttonName, 'keyVal': key, bucket_url: this.bucket_url }
    });

    //for disable modal
    dialogRef.disableClose = true;

    //for subscribe modal data
    dialogRef.afterClosed().subscribe(result => {
      // // console.log(result, '=>>>>>', i, key);
      if (result.flag == 'yes') {

        if (key == 'add') {
          this.file_array.push(result.fileFields);
        }
        if (key == 'edit') {
          // this.file_array.splice(i, 1);
          // this.file_array.push(result.fileFields);
          this.file_array[i] = result.fileFields
        }
        // // console.log(this.file_array, 'this.file_array')
      }
    })

  }


  addAudio(key, i, item) {
    let dataObj: any = {};
    let heading = '';
    let type_flag = 'audio';
    let buttonName = '';
    if (key == 'add') {
      dataObj = {
        audio: {},
        audio_title: '',
        audio_description: '',
        priority: '',
        audio_skippable: false,
      }
      heading = 'Add Lesson Audio';
      buttonName = 'Add'
    }
    if (key == 'edit') {
      dataObj = item,
        heading = 'Edit Lesson Audio',
        buttonName = 'Update '
    }
    dataObj.type = 'audio';

    const dialogRef = this.dialog.open(AddAudioVideoFileDialogComponent, {
      panelClass: 'lesson_videomodal',
      width: '900px',
      data: { 'configFileUpload': this.uploadConfigData, 'dataObj': dataObj, 'heading': heading, 'type_flag': type_flag, 'buttonName': buttonName, 'keyVal': key, bucket_url: this.bucket_url }
    });

    //for disable modal
    dialogRef.disableClose = true;

    //for subscribe modal data
    dialogRef.afterClosed().subscribe(result => {
      // // console.log(result, '++++++++++.>>>>>>>>')
      if (result.flag == 'yes') {
        // this.audio_array[i] = result.audioFields

        if (result.dataObj.audio != null && key == 'add' && result.dataObj.audio != '') {
          this.audio_array.push(result.audioFields);
          // // console.log(this.audio_array, 'audio_array')
        }

        if (key == 'edit') {
          // this.file_array.splice(i, 1);
          // this.file_array.push(result.fileFields);
          this.audio_array[i] = result.audioFields
        }
      }
    })
  }


  doneFileUpload(arrayName, index) {
    // // console.log(arrayName, index)
    // // // console.log(this.uploadConfigData.files[0].upload.data.data, 'this.uploadConfigData.files');

    var errormsg = '';
    if (this.uploadConfigData.files != null && this.uploadConfigData.files[0] != null) {
      if (arrayName == 'file_array') {



        var file_name_str = this.uploadConfigData.files[0].upload.data.data.filelocalname;

        var str_no = file_name_str.lastIndexOf('.') + 1;

        // var st = str.slice(0, str_no)

        file_name_str = file_name_str.substring(file_name_str.indexOf(file_name_str) + str_no);

        // // // console.log(str_no, 'type++', file_name_str)

        this.uploadConfigData.files[0].upload.data.data.file_type = file_name_str;

        this.file_array[index].file = this.uploadConfigData.files[0].upload.data.data;
      }

      // // console.log(this.file_array, 'file_array')
    } else {
      this.snackBar.open('Please Upload Single file ...!', 'OK', {
        duration: 3000
      })
    }

  }



  doneAudioupload(arrayName, index) {
    // // console.log(arrayName, index)
    // // // console.log(this.uploadConfigData.files[0].upload.data.data, 'this.uploadConfigData.files');    
    if (arrayName == 'audio_array') {
      this.audio_array[index].audio = this.uploadConfigData.files[0].upload.data.data;
    }
    // // console.log(this.audio_array, 'audio_array')

  }




  // clear_file(arrayName, index) {

  //   if (arrayName == 'file_array') {
  //     this.file_array[index].file = {};
  //   }
  //   if (arrayName == 'audio_array') {
  //     this.audio_array[index].audio = {};
  //   }
  //   // // console.log(this.file_array, 'file_array')
  // }



  removevideo(index) {
    this.video_array.splice(index, 1);
    if (this.video_array.length == 0) {
      this.videoflag = false;
    }
    // // console.log(this.videoflag, 'this.videoflag')
  }


  removefile(index) {
    this.file_array.splice(index, 1);
    if (this.file_array.length == 0) {
      this.fileflag = false;
    }
    // // console.log(this.fileflag, 'this.fileflag')

  }

  removeaudio(index) {
    // // console.log(index, 'removeaudio')
    // // console.log(this.audio_array, 'audioarray')

    this.audio_array.splice(index, 1);
    if (this.audio_array.length == 0) {
      this.audioflag = false;
    }
    // // console.log(this.audioflag, 'audioflag')

  }

  trackByFn(index) {
    return index;
  }

  preview_video(val) {
    if (val != null && val != '') {
      var url = this.video_base_url + val + '?rel=0&modestbranding=1&autoplay=1';

      const safe_url = this.sanitizer.bypassSecurityTrustResourceUrl(url);


      // // console.log(safe_url, '>>>>', val)

      // // console.log('???===>', url)


      const dialogRef = this.dialog.open(videoDialogComponent, {
        panelClass: 'lesson_videomodal',
        width: '800px',
        data: { 'safe_url': safe_url }
      });
    } else {
      this.snackBar.open('Please Enter Video ID', 'OK', {
        duration: 3000
      })
    }
  }





  geteditdata() {

    const link = this.serverDetailsVal.serverUrl + this.formSourceVal.showEndpoint;
    let data: any = {
      source: this.formSourceVal.source,
      token: this.serverDetailsVal.jwttoken,
      condition: {
        _id: this.recid
      }
    }

    this.apiService.getData(link, data).subscribe((res: any) => {
      if (res.status == 'error') {

      } else {
        // // console.log("edited data", res);
        if (this.from_type != null && this.from_type == 'lesson') {
          this.getMediaTypeVal(res.res[0].associated_training, 'associated_training');
          // this.getMediaTypeVal(res.res[0].mediaType, 'mediaType');
          let imageBasepath: any;
          let fileserverName: any;
          this.fileArray = res.res[0].fileType;
          // // // console.log("dingle data", res.res[0]);
          if (res.res[0].typeHtml != null && res.res[0].typeHtml != '') {

            this.htmType = res.res[0].typeHtml;
          }
          // this.hasLessonVal=res.res[0].has_lessonplan;
          this.chkboxval = res.res[0].has_lessonplan;

          if (res.res[0] != null && res.res[0].has_test_lesson != null && res.res[0].has_test_lesson != 'undefined') {
            // // // console.log(res.res[0].has_test_lesson, 'res.res[0].has_test_lesson')
            this.has_test_lesson = res.res[0].has_test_lesson;
            this.test_percentage = res.res[0].test_percentage
          }

          if (res.res[0].videoflag != null && typeof (res.res[0].videoflag) != 'undefined') {
            this.videoflag = true;
            this.video_array = res.res[0].video_array;
          }
          if (res.res[0].audioflag != null && typeof (res.res[0].audioflag) != 'undefined') {
            this.audioflag = true;
            this.audio_array = res.res[0].audio_array;
          }
          if (res.res[0].fileflag != null && typeof (res.res[0].fileflag) != 'undefined') {
            this.fileflag = true;
            this.file_array = res.res[0].file_array;
            // // // console.log(this.file_array, 'zesdxfghjwaesr')
          }
          // // console.log(this.audioflag, "audio")
          // // console.log(this.videoflag, "video")
          // // console.log(this.fileflag, "file")

          this.getchkboxval(this.chkboxval);
          this.lessonplanValue = res.res[0].lessonplan_value;
          // // console.log(this.trainingacessable, '7777')

        }
        if (res.res[0].priority != null && typeof (res.res[0].priority) != 'undefined') {
          this.priority = res.res[0].priority;
        }
        if (this.from_type != null && this.from_type == 'training') {
          if (this.trainingacessable.length > 0) {
            for (const key in this.trainingacessable) {
              for (const i in res.res[0].type) {
                if (this.trainingacessable[key].val == res.res[0].type[i]) {
                  // // console.log(res.res[0].type[i], 'type', this.trainingacessable[key].val)
                  this.trainingacessable[key].completed = true;

                }
              }
            }
          }
        }


        let folder: any = '';

        for (let c in this.dataForm.controls) {
          // // console.log(this.dataForm.controls, 'trash', res)
          this.dataForm.controls[c].patchValue(res.res[0][c]);
          for (let j in this.formdataval) {

            if (this.formdataval[j].name == c && this.formdataval[j].inputtype == 'checkbox') {
              let checkval = res.res[0][c];
              if (res.res[0][c] == 1) checkval = true;
              else checkval = false;
              this.dataForm.controls[c].patchValue(checkval);
            }

          }
        }
        // Validators.required
        this.dataForm.addControl('id', new FormControl(this.recid));
        if (this.route.snapshot.url[0].path == "manage-lesson") {
          if (this.route.snapshot.url[1].path == "edit") {
            // Validators.required
            this.dataForm.addControl('has_lessonplan', new FormControl(this.hasLessonVal));
            // Validators.required
            this.dataForm.addControl('lessonplan_value', new FormControl(this.lessonplanValue));
          }
        }
      }
    }, error => {
      // this.datalist = [];
    });
  }

  getchkboxval(val: any) {
    this.hasLessonVal = val;
    if (this.hasLessonVal == false) {
      this.lessonplanValue = "";
    }
  }

}

//preview lesson videos
@Component({
  selector: 'AddAudioVideoFileDialog',
  templateUrl: 'AddAudioVideoFileDialog.html',
  styleUrls: ['./AddAudioVideoFileDialog.css']

})
export class AddAudioVideoFileDialogComponent {

  public uploadConfigData: any = {
  };
  public video_array: any = [];
  public video_base_url: any = 'https://www.youtube.com/embed/';
  public videoflag;
  public videoFields: any = {};
  public audioFields: any = {};
  public fileFields: any = {};
  public bucket_url: any;
  // = 'https://training-centre-bucket.s3.amazonaws.com/lesson-files/';

  constructor(
    public dialogRef: MatDialogRef<AddAudioVideoFileDialogComponent>, public sanitizer: DomSanitizer, public snackBar: MatSnackBar, public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData1) {
    // // console.log(this.data.keyVal, 'jhgkj')

    if (this.data.type_flag == 'audio' || this.data.type_flag == 'file') {
      this.uploadConfigData = data.configFileUpload;
      this.bucket_url = data.bucket_url;
    }

    // // // console.log(data, 'data++')

    if (this.data.type_flag == 'video') {
      // // console.log(data, 'data++ cond')

      this.videoFields = this.data.dataObj;
    }

    if (this.data.type_flag == 'audio') {
      this.audioFields = this.data.dataObj;
    }
    if (this.data.type_flag == 'file') {
      this.fileFields = this.data.dataObj;

      // // console.log(data, '>++++++', this.fileFields, ">============")
    }

  }

  onNoClick(): void {
    this.data.flag = 'no';
    this.dialogRef.close(this.data);
  }


  // add dialog file
  addvideo(arrayName) {
    this.data.flag = 'yes';
    this.data.videoFields = this.videoFields;
    // // // console.log(this.uploadConfigData, 'this.uploadConfigData++', arrayName)
    // // console.log(this.videoFields, 'videoFields')
    this.dialogRef.close(this.data);

  }

  addaudio(arrayName, name) {

    // // // console.log(arrayName, 'arrayName 11++++==', name)

    var checkCond = false;

    if (this.uploadConfigData.files != null && this.uploadConfigData.files[0] != null && this.data.keyVal == 'add') {
      checkCond = true;
    }
    if (this.data.keyVal == 'edit') {
      checkCond = true;
    }


    if (checkCond == true) {
      if (arrayName == 'audio_array' && this.uploadConfigData.files != null) {

        // // // console.log(arrayName, 'arrayName 22++')
        // // console.log(this.uploadConfigData, 'drftgyujikl')

        var file_name_str = this.uploadConfigData.files[0].upload.data.data.filelocalname;

        var str_no = file_name_str.lastIndexOf('.') + 1;

        // var st = str.slice(0, str_no)

        file_name_str = file_name_str.substring(file_name_str.indexOf(file_name_str) + str_no);

        // // console.log(str_no, 'type++', file_name_str)

        this.uploadConfigData.files[0].upload.data.data.file_type = file_name_str;

        this.audioFields.audio = this.uploadConfigData.files[0].upload.data.data;
      }

      // // console.log(this.audioFields, 'audio_array ++')
      this.data.flag = 'yes';
      this.data.audioFields = this.audioFields;
      // // // console.log(this.uploadConfigData, 'this.uploadConfigData++', arrayName)
      // // console.log(this.audioFields, 'audiofields')
      this.dialogRef.close(this.data);

    }
    else {
      this.snackBar.open("please fill up all the fields ", 'Ok', {
        duration: 1000
      });

    }



  }

  addfile(arrayName) {
    if (this.uploadConfigData.files != null && this.uploadConfigData.files[0] != null) {
      if (arrayName == 'file_array') {
        var file_name_str = this.uploadConfigData.files[0].upload.data.data.filelocalname;

        var str_no = file_name_str.lastIndexOf('.') + 1;

        // var st = str.slice(0, str_no)

        file_name_str = file_name_str.substring(file_name_str.indexOf(file_name_str) + str_no);

        // // // console.log(str_no, 'type++', file_name_str)

        this.uploadConfigData.files[0].upload.data.data.file_type = file_name_str;

        this.fileFields.file = this.uploadConfigData.files[0].upload.data.data;
      }

      // // console.log(this.fileFields, 'file_array')
    }


    this.data.flag = 'yes';
    this.data.fileFields = this.fileFields;
    // // console.log(this.fileFields, 'filefields++++++')
    this.dialogRef.close(this.data);
  }


  clear_file(flag) {

    switch (flag) {
      case 'file':
        this.fileFields.file = {};
        break;
      case 'audio':
        this.audioFields.audio = {};
        break;
    }
  }

}
//preview lesson videos
@Component({
  selector: 'videodialog',
  templateUrl: 'LessonPreviewVideoDialog.html'
})
export class videoDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<videoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    // // // console.log(data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}