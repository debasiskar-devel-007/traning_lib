import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
// 

@Component({
  selector: 'app-add-edit-training',
  templateUrl: './add-edit-training.component.html',
  styleUrls: ['./add-edit-training.component.css']
})
export class AddEditTrainingComponent implements OnInit {
  title = '';
  public jwtToken: any;
  public isitDna: any = false;
  public formdataval: any;
  public recid: any;
  public showfieldflag: boolean = false;
  public from_type: any = 'training';
  public isitbetoparedesflag: any = true;
  public listingPageRoute: any = "/traning/category/list";
  public serverDetails: any = {
    "serverUrl": "https://z2oo2a8oq9.execute-api.us-east-1.amazonaws.com/dev/",
    "jwttoken": ""
  };
  public formSource: any = {
    "source": 'training_category_management',
    "endpoint": "api1/addorupdatetrainingcategory",
    "showEndpoint": "api1/gettrainingdatabyid",
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
  public lesson_attachment_flag: boolean = false;
  public traingaccessflag: boolean = true;
  public trainingaccessable: any = [{ name: 'Admin', val: 'admin', completed: false, },
  { name: 'Sales', val: 'sales-person', completed: false, },
  { name: 'Distributor', val: 'distributor', completed: false, }, { name: 'Technological Consultant', val: 'technological-consultant', completed: false, }, { name: 'Lead', val: 'lead', completed: false, }, { name: 'Contract Manager', val: 'contract-manager', completed: false, },
  { name: 'All', val: 'all', completed: false, }]

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.recid = params['id'];
      // // console.log(params['id'],'//////')
      if (this.recid != null && this.recid != '' && this.recid != undefined) {
        // this.geteditdata()
      }
    });

    this.formdataval = [
      { inputtype: 'text', name: 'catagory_name', label: 'Training Title', placeholder: 'Enter Training Title', validationrule: { required: true }, validationerrormsg: 'is required' },

      { inputtype: 'textarea', name: 'description', label: 'Description', placeholder: 'Enter Description' },

      // { inputtype: 'text', name: 'priority', label: 'Priority', placeholder: 'Enter Priority', validationrule: { required: true }, validationerrormsg: 'is required' },
      // { inputtype: 'checkbox', name: 'type', value: ['Distributor', 'Sales Maneger', 'Tech Consultant', 'Contract Person', 'All'], valuelabel: '', label: 'Training accessible to', placeholder: '', validationrule: { required: true }, validationerrormsg: '', class: 'radioclass' },


      // { inputtype: 'text', name: 'catagoryname', label: 'Catagory Name ', placeholder: 'Enter Catagory Name', validationrule: { required: true }, validationerrormsg: 'is required' },

      { inputtype: 'select', name: 'parent_catagory', label: 'Parent Category', defaultchoice: 'Select a Parent Category', sourceview: 'training_category_management', endpoint: 'api1/getalltrainingdata', selectvalue: 'catagory_name', selectid: '_id' },
      { inputtype: 'select', name: 'product_id', multiple: true, label: 'Product ', defaultchoice: 'Select a product ', sourceview: 'training_category_management', endpoint: 'api1/productlist', selectvalue: 'productname', selectid: '_id' },

      // {inputtype:'select',name:'state',label:'State/Region',defaultchoice:'Select a State/region',sourceview:'assets/states.json',multiple:true, sourcetype:'static',selectvalue:'name',selectid:'abbreviation',validationrule:{required:true},validationerrormsg:'is required'},
      { inputtype: 'checkbox', name: 'status', label: 'Active', placeholder: 'Enter Status', validationrule: { required: true }, validationerrormsg: 'is required' },
    ];


  }

}
