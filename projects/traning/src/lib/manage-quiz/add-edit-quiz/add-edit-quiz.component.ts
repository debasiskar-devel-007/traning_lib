import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'lib-add-edit-quiz',
  templateUrl: './add-edit-quiz.component.html',
  styleUrls: ['./add-edit-quiz.component.css']
})
export class AddEditQuizComponent implements OnInit {

  public manageQuizForm: FormGroup;
  public serverDetailsVal: any;
  public formSourceVal: any;
  public listingPageRoute: any;
  public paramId: any;
  public listingData: any = [];
  public headerText: any = "Add Question";
  public buttonText: any = "Submit"
  public lessonId: any;
  public statuschecked: boolean = true;
  public skippablechecked: boolean = false;
  public lessonidineditForm: any;
  public imageConfigData: any = '';
  public img_var: any;
  public image_name: any;
  public image_type: any;
  public images_array: any = [];
  public images_array_edit: any = [];
  public img_flag: boolean = false;
  public editorconfig: any = {};


  public questionTypeVal: any;
  public textAreaTypeVal: any;
  @Input()
  set imageUpload(getConfig: any) {
    this.imageConfigData = getConfig;
  }
  @Input()
  set serverDetails(serverDetails: {}) {
    this.serverDetailsVal = (serverDetails) || '<no name set>';
  }
  @Input()
  set lessonIdInedit(id: any) {

    this.lessonidineditForm = id;
  }
  @Input()           //getting data for edit from application
  set DataList(val: any) {
    this.listingData = (val) || 'no name set';
    this.listingData = val;
    if (this.paramId) {
      this.img_flag = true;
      this.manageQuizForm.controls['question_type'].patchValue(val[0].question_type);
      this.manageQuizForm.controls['question'].patchValue(val[0].question);
      this.manageQuizForm.controls['priority'].patchValue(val[0].priority);
      this.manageQuizForm.controls['status'].patchValue(val[0].status);
      this.manageQuizForm.controls['description'].patchValue(val[0].description);
    }
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
  set LessonId(id: any) {
    this.lessonId = (id) || '<no name set>';
  }


  constructor(public apiService: ApiService, public fb: FormBuilder, public router: Router, public activatedRoute: ActivatedRoute) {

    this.manageQuizForm = this.fb.group({
      lesson_id: [''],
      question_type: ['radio_button'],
      question: ["", Validators.required],
      priority: ["", Validators.required],
      status: [""],
      description: ['', Validators.required]
    })
    this.paramId = activatedRoute.snapshot.params._id;
    if (this.paramId) {
      this.headerText = "Edit Question";
      this.buttonText = "Update";
    }

    this.editorconfig.extraAllowedContent = '*[class](*),span;ul;li;table;td;style;*[id];*(*);*{*}';
  }

  ngOnInit() {
  }

  ManageQuizFormSubmit() {


    // console.log("soursh test",this.manageQuizForm.value);
    // return;
    for (let x in this.manageQuizForm.controls) {
      this.manageQuizForm.controls[x].markAsTouched();
    }
    if (this.manageQuizForm.valid) {
      this.manageQuizForm.controls['lesson_id'].patchValue(this.lessonId);

      if (this.manageQuizForm.value.status)
        this.manageQuizForm.value.status = parseInt("1");
      else
        this.manageQuizForm.value.status = parseInt("0");


      if (this.manageQuizForm.value.priority) {
        this.manageQuizForm.value.priority = Number(this.manageQuizForm.value.priority);

      }

      const link = this.serverDetailsVal.serverUrl + this.formSourceVal.endpoint;
      var data;
      if (this.paramId) {
        data = {
          "source": this.formSourceVal.source,
          "token": this.serverDetailsVal.jwttoken,
          "data": {
            "id": this.paramId,
            'question_type': this.manageQuizForm.value.question_type,
            'question': this.manageQuizForm.value.question,
            'priority': this.manageQuizForm.value.priority,
            'status': this.manageQuizForm.value.status,
            'description': this.manageQuizForm.value.description

          },
          "sourceobj": ["lesson_id"],
        }
      } else {
        data = {
          "source": this.formSourceVal.source,
          "token": this.serverDetailsVal.jwttoken,
          "data": this.manageQuizForm.value,
          "sourceobj": ["lesson_id"],
        }
      }
      console.log(data);
      
      this.apiService.postData(link, data).subscribe((res: any) => {
        if (res.status = "success") {
          if (this.paramId) {
            this.router.navigateByUrl(this.listingPageRoute + this.lessonidineditForm);

          } else {
            this.router.navigateByUrl(this.listingPageRoute + this.lessonId);
          }

        }
      })
    }
  }


  cancelRoute() {
    this.router.navigateByUrl(this.listingPageRoute + this.lessonId);

  }

  inputUntouch(form: any, val: any) {
    form.controls[val].markAsUntouched();
  }

}
