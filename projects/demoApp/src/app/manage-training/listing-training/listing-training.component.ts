import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-listing-training',
  templateUrl: './listing-training.component.html',
  styleUrls: ['./listing-training.component.css']
})
export class ListingTrainingComponent implements OnInit {
  public jwtToken: any;
  public manageTrainingList: any = [];
  public editPageRoute: any = "/manage-training/edit/";
  public addPageRoute: any = "/manage-training/add";
  public searchSourceName: any = "training_category_management_view";
  public serverDetails: any = {
    "serverUrl": "https://wfr9bu9th2.execute-api.us-east-1.amazonaws.com/dev/api8/",
    "jwttoken": ""
  };
  public formSource: Object = {
    "source": 'training_category_management',
    "endpoint": "trainingcatdelete",
    "deleteManyEndpoint": "trainingcatdeletemany",
    "searchEndpoint": "getlisttraining",
    "statusUpdateEndpoint": "trainingcatstatusupdate",
    "statusUpdateManyEndpoint": "trainingcatstatusupdate",
    "statusUpdateSourceName": "training_category_management",
    "trashDataSource": "training_category_management_view",
    "retriveTrashDataEndpoint": "trainingcatrestoredata",
    "retriveTrashDataSourceName": "training_category_management",
    "trainingCountEndpoint": "trainingcounts",
    hideproduct: true
  }
  public productlistEndpoint = 'productlist'
  constructor(public activatedRoute: ActivatedRoute, public cookie: CookieService) {
    this.jwtToken = cookie.get('jwtToken');
    this.serverDetails.jwttoken = this.jwtToken;
  }

  ngOnInit() {
    this.activatedRoute.data.forEach(data => {
      console.log(data);
      let result: any;
      result = data.trainingdata.res;
      this.manageTrainingList = result;

    })
  }

}
