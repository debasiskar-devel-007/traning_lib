import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-add-edit-training',
  templateUrl: './add-edit-training.component.html',
  styleUrls: ['./add-edit-training.component.css']
})
export class AddEditTrainingComponent implements OnInit {
  title = 'demoApp';
  public jwtToken: any;
  public isDna: any = "no"
  public formdataval: any;
  public recid: any;
  public listingPageRoute: any = "/manage-training/list";
  public showfieldflag: boolean = false;
  public isitbetoparedesflag:boolean =true;
  public traingaccessflag:boolean =false;
  public from_type:any='training';


  public trainingaccessable :any=[ {name: 'Admin',val:'admin', completed: false, },
  {name: 'sales',val:'sales-person', completed: false, },
  {name: 'All', val:'all',completed: false, }]                    
  
  public serverDetails: any = {
    "serverUrl": "https://z2oo2a8oq9.execute-api.us-east-1.amazonaws.com/dev/api1/",
    "jwttoken": ""
  };
  public formSource: any = {
    "source": 'training_category_management',
    "endpoint": "add-edit-training",
    "showEndpoint": "getonetraining",
    "AddheaderText": "Add Training",
    "EditheaderText": "Edit Training",
    "formTitleName": 'Training'
  }
  public additionalData: any = {
    "objectId": "parent_catagory"
  };
  constructor(public route: ActivatedRoute, public cookie: CookieService) {
    this.jwtToken = cookie.get('jwtToken');
    this.serverDetails.jwttoken = this.jwtToken;
  }
  public lesson_attachment_flag:boolean=false;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.recid = params['id'];
      // console.log(params['id'],'//////')
      if (this.recid != null && this.recid != '' && this.recid != undefined) {
        // this.geteditdata()
      }
    });


    this.formdataval = [
      { inputtype: 'text', name: 'catagory_name', label: 'Training Title', placeholder: 'Enter Training Title', validationrule: { required: true }, validationerrormsg: 'is required' },

      { inputtype: 'textarea', name: 'description', label: 'Description', placeholder: 'Enter Description' },

      // { inputtype: 'text', name: 'priority', label: 'Priority', placeholder: 'Enter Priority', validationrule: { required: true }, validationerrormsg: 'is required' },
      // {inputtype:'radio',name:'type',value:["Mentor","Mentee","All"],valuelabel:'',label:"Training accessible to",placeholder:"",validationrule:{required:true},validationerrormsg:'', class:'radioclass'},

      { inputtype: 'select', name: 'type', label: 'Select Role',defaultchoice: 'Select Role', sourceview: 'assets/user_type.json', multiple: true, sourcetype: 'static', selectvalue: 'name', selectid: 'val', validationrule: { required: true }, validationerrormsg: 'is required' },

      // { inputtype: 'text', name: 'catagoryname', label: 'Catagory Name ', placeholder: 'Enter Catagory Name', validationrule: { required: true }, validationerrormsg: 'is required' },

      { inputtype: 'select', name: 'parent_catagory', label: 'Parent Category', defaultchoice: 'Select a Parent Category', sourceview: 'training_category_management', endpoint: 'gettrainingcategorydata', selectvalue: 'catagory_name', selectid: '_id' },

      // {inputtype:'select',name:'state',label:'State/Region',defaultchoice:'Select a State/region',sourceview:'assets/states.json',multiple:true, sourcetype:'static',selectvalue:'name',selectid:'abbreviation',validationrule:{required:true},validationerrormsg:'is required'},
      { inputtype: 'checkbox', name: 'status', label: 'Active', placeholder: 'Enter Status', validationrule: { required: true }, validationerrormsg: 'is required' },
    ];


  }

}
