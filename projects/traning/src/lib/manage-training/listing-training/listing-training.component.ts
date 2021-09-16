import { Component, OnInit, ViewChild, Input, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar } from "@angular/material";
import { ApiService } from '../../api.service';
import { DialogBoxComponent } from '../../common/dialog-box/dialog-box.component';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormControl } from '@angular/forms';


export interface PeriodicElement {
  _id: string;
  select: string;
  no: number;
  catagory_name: string;
  description: string;
  priority: string;
  parent_catagory: string;
  status: string;
  deleteRecord: any;
}
const ALLDATA: PeriodicElement[] = [];
export interface DialogData {
  message: string;
}

@Component({
  selector: 'lib-listing-training',
  templateUrl: './listing-training.component.html',
  styleUrls: ['./listing-training.component.css']
})

export class ListingTrainingComponent implements OnInit {
  displayedColumns: string[] = ['select', 'no', 'parent_catagory', 'catagory_name', 'description', 'priority', 'product_name', 'type',
    'status', 'deleteRecord'];

  public progressSpinner: any = {
    mode: 'indeterminate',
    loading: false,
    bookingStatus: 'Sending request'
  };

  public dataSource: any;
  public listingData: any = [];
  public dialogRef: any;
  public deleteId: any;
  public deleteIndex: any;
  public serverDetailsVal: any;
  public formSourceVal: any;
  public editPageRoute: any;
  public addPageRoute: any;
  public searchSourceName: any;
  public additionalinfo: any;
  public searchResults: any = [];
  public trainingTitle: any;
  public parentCategory: any;
  public status: any
  public idArray: any = [];
  public allTrashData: any = [];
  public trashFlag: any = 0;
  public status_search_regex: any = '';
  public product_name_serach: any = [];
  public trashButtonText: any = "View Deleted";
  public productEndpoint: any;
  public category_search: any = [];
  public parent_catagory_search: any = [];
  public myControl = new FormControl();
  public myControl1 = new FormControl();
  public uniqueCardArr: any = [];
  public trainingCounts: any = {
    "activatedtrainingcount": "",
    "activatedlessoncount": "",
    "trashedtrainingcount": "",
    "trashedlessoncount": "",
    "totaltrainingcount": " ",
    "totallessoncount": " "
  };
  public searchjson: any = {
    "catagory_name_search_regex": "",
    "parent_catagory_search_regex": ""
  }
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  selection = new SelectionModel<PeriodicElement>(true, []);
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.no + 1}`;
  }

  @Input()           //getting all data from application
  set allDataList(val: any) {
    this.listingData = (val) || '<no name set>';
    this.listingData = val;
    // console.log(this.listingData);
    this.dataSource = new MatTableDataSource(this.listingData);
    // this.dataSource.paginator = this.paginator;
  }
  @Input()
  set serverDetails(serverDetails: {}) {
    this.serverDetailsVal = (serverDetails) || '<no name set>';
  }
  @Input()
  set formSource(formSource: any) {
    this.formSourceVal = (formSource) || '<no name set>';
    // console.log("formsourceval", this.formSourceVal);
  }
  @Input()
  set EditPageRoute(val: any) {
    this.editPageRoute = (val) || '<no name set>';
  }

  @Input()
  set AddPageRoute(val: any) {
    this.addPageRoute = (val) || '<no name set>';
  }

  @Input()
  set SearchSourceName(val: any) {
    this.searchSourceName = (val) || '<no name set>';
  }
  @Input()
  set ProductnameEndpoint(val: any) {
    this.productEndpoint = val
  }

  constructor(public dialog: MatDialog, public apiService: ApiService, public router: Router, public snakBar: MatSnackBar, public cookiesService: CookieService) {
    setTimeout(() => {
      this.trainingCount();
    }, 500);



  }

  ngOnInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      if (this.formSourceVal.hideproduct != true) {
        this.productListData();
      }
    }, 100);
    console.log(this.displayedColumns, 'displayedColumns', this.formSourceVal);
    if (this.formSourceVal.hideproduct == true) {
      const index = this.displayedColumns.indexOf('product_name');
      if (index > -1) {
        this.displayedColumns.splice(index, 1);
      }
    }

  }
  trainingCount() {
    let link = this.serverDetailsVal.serverUrl + this.formSourceVal.trainingCountEndpoint;
    this.apiService.postDatawithoutTokenReportCount(link).subscribe((response: any) => {
      this.trainingCounts.activatedtrainingcount = response.results.activatedtrainingcount;
      this.trainingCounts.activatedlessoncount = response.results.activatedlessoncount;
      this.trainingCounts.trashedtrainingcount = response.results.trashedtrainingcount;
      this.trainingCounts.trashedlessoncount = response.results.trashedlessoncount;
      this.trainingCounts.totaltrainingcount = response.results.totaltraining;
      this.trainingCounts.totallessoncount = response.results.totallesson;
    })
  }

  deleteRecord(id: any, index: any) {
    this.deleteId = id;
    this.deleteIndex = index;
    let modalData: any = {
      panelClass: 'delete-dialog',
      data: {
        header: "Are you want to delete these record ?",
        message: "",
        button1: { text: "No" },
        button2: { text: "Yes" },
      }
    }
    this.dialogRef = this.dialog.open(DialogBoxComponent, modalData);
    this.dialogRef.afterClosed().subscribe(result => {

      switch (result) {
        case "No":
          break;
        case "Yes":
          this.deleteFunction(id, index);
          break;
      }
    });

  }

  deleteFunction(recordId: any, index: number) {
    // // console.log("single delete fUNCTION", recordId, index);

    let link = this.serverDetailsVal.serverUrl + this.formSourceVal.endpoint;
    let data: any = {
      "source": this.formSourceVal.source,
      "id": recordId,
      "token": this.serverDetailsVal.jwttoken,
      "associated_training": recordId
    }
    // // console.log("singledel link and data", data, link);

    this.apiService.postData(link, data).subscribe((res: any) => {
      // // console.log("delete response", res);
      if (res.status = "success") {
        this.listingData.splice(index, 1);
        let allData: PeriodicElement[] = this.listingData;
        this.dataSource = new MatTableDataSource(allData);
      }
    })

  }

  productListData() {
    let link = this.serverDetailsVal.serverUrl + this.productEndpoint;
    let data: any = {
      source: "training_category_management",
      condition: {
        "is_trash": {
          "$ne": 1
        }
      },
      token: this.serverDetailsVal.jwttoken,
    }
    // // console.log("singledel link and data", data, link);

    this.apiService.postData(link, data).subscribe((res: any) => {
      // console.log("delete response", res);
      if (res.status = "success") {
        this.product_name_serach = res.res;

        // for (const iterator of res.res) {
        //   this.product_name_serach=iterator.productname
        // console.log(this.product_name_serach, 'product_name_serach')
        // }

      }

    })

  }
  routerFunction(paramId: any) {
    this.router.navigateByUrl(this.editPageRoute + paramId);
  }
  addButton() {
    this.router.navigateByUrl(this.addPageRoute);

  }

  filterByTrainingName() {
    // // console.log(this.searchjson);
    let searchval: any = {};
    this.progressSpinner.loading = true;
    console.log(this.status_search_regex, 'this.status_search_regex')

    if (typeof (this.status_search_regex) != undefined && this.status_search_regex != null) {
      searchval["status_search"] = this.status_search_regex;
    } else {
      searchval["status_search"] = 1;
    }

    console.log(this.searchjson, 'this.status_search_regex')
    if (this.searchjson.catagory_name_search_regex != null && typeof (this.searchjson.catagory_name_search_regex != 'undefined')) {
      searchval["catagory_name_search"] = { $regex: this.searchjson.catagory_name_search_regex.toLowerCase() }
    }
    if (this.searchjson.parent_catagory_search_regex != null && typeof (this.searchjson.parent_catagory_search_regex != 'undefined')) {
      searchval["parent_catagory_search"] = { $regex: this.searchjson.parent_catagory_search_regex.toLowerCase() }
    }
    if (this.searchjson.product_name_serach != null && typeof (this.searchjson.product_name_serach != 'undefined')) {
      searchval["product_name_serach"] = { $regex: this.searchjson.product_name_serach.toLowerCase() }

    }
    console.log(searchval, 'searchval')
    if (searchval.catagory_name_search.$regex == '') {

      delete searchval.catagory_name_search;
    }
    if (searchval.parent_catagory_search.$regex == '') {

      delete searchval.parent_catagory_search;
    }
    console.log(searchval.status_search, 'searchval458963')

    if (this.status_search_regex == '' && this.status_search_regex != 0) {

      delete searchval.status_search;
    }
    console.log(searchval.status_search, 'searchval458963')

    let link = this.serverDetailsVal.serverUrl + this.formSourceVal.searchEndpoint;
    var data = {
      "source": this.searchSourceName,
      "condition": searchval,
      "token": this.serverDetailsVal.jwttoken
    }
    if (this.trashFlag == 1) {
      data.condition['is_trash'] = { $eq: 1 }
    } else {
      data.condition['is_trash'] = { $ne: 1 }
    }
    this.apiService.postData(link, data).subscribe(response => {
      this.progressSpinner.loading = false;

      let result: any = response;
      this.dataSource = result.res;
      let allData: PeriodicElement[] = this.dataSource;
      this.dataSource = new MatTableDataSource(allData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });


  }
  resetSearch() {
    this.status_search_regex = '';
    this.searchjson = {
      "catagory_name_search_regex": "",
      "parent_catagory_search_regex": ""
    }
    this.dataSource = new MatTableDataSource(this.listingData);

  }
  onKeypressEvent(event: any, val) {
    // console.log(event, 'traing', val);
    let link1 = this.serverDetailsVal.serverUrl + this.formSourceVal.searchEndpoint;
    if (val == 'training') {
      let data = {
        token: this.serverDetailsVal.jwttoken,
        source: this.formSourceVal.source,
        condition: {
          catagory_name_search: { $regex: event.target.value.trim() },
        }
      }
      this.apiService.postData(link1, data).subscribe((res: any) => {
        if (res.status = "success") {
          // console.log(res)
          // this.category_search
          this.category_search = [];

          for (const iterator of res.res) {
            // console.log(iterator.catagory_name_search)
            this.category_search.push({ catagory_name_search: iterator.catagory_name_search })
          }
        }
      })

    }
    if (val == 'parent_catagory') {
      let data2 = {
        token: this.serverDetailsVal.jwttoken,
        source: this.formSourceVal.source,
        condition: {
          parent_catagory_search: { $regex: event.target.value.trim() },
        }
      }
      let arr = []
      this.apiService.postData(link1, data2).subscribe((res: any) => {
        if (res.status = "success") {
          // console.log(res)
          // this.category_search
          this.parent_catagory_search = [];
          for (const iter in res.res) {
            // console.log(res.res[iter].parent_catagory_search)
            this.parent_catagory_search.push({ parent_catagory_search: res.res[iter].parent_catagory_search });
            // console.log(this.parent_catagory_search)
            arr.push(res.res[iter].parent_catagory_search)

          }
          this.uniqueCardArr = arr.filter(function (item, pos) {
            return arr.indexOf(item) == pos;
          });
          // console.log(this.uniqueCardArr, 'uniqueCardArr', arr)

        }
      })

    }
  }
  statusUpdateModal(id: any, index: any) {
    let modalData: any = {
      panelClass: 'dialog',
      data: {
        header: "You are about to change status of these record(s)",
        message: "",
        button1: { text: "Inactive" },
        button2: { text: "Active" },
      }
    }
    this.dialogRef = this.dialog.open(DialogBoxComponent, modalData);
    this.dialogRef.afterClosed().subscribe((result: any) => {
      let currentStatus: any;
      if (result == 'Inactive') {
        currentStatus = 0;
      } else {
        currentStatus = 1
      }
      switch (result) {
        case "Inactive":
          this.statusChange(id, index, currentStatus);
          break;
        case "Active":
          this.statusChange(id, index, currentStatus);
          break;
      }
    });

  }
  statusChange(id: any, index: any, statusval: any) {
    let link = this.serverDetailsVal.serverUrl + this.formSourceVal.statusUpdateEndpoint;
    let data: any = {
      "source": this.formSourceVal.statusUpdateSourceName,
      "_id": id,
      "status": statusval

    }
    this.apiService.postDatawithoutToken(link, data).subscribe((response: any) => {
      if (response.status = true) {
        if (this.listingData[index].status == 1) {
          this.listingData[index].status = 0
        } else {
          this.listingData[index].status = 1

        }

        let allData: PeriodicElement[] = this.listingData;
        this.dataSource = new MatTableDataSource(allData);
      }

    })
  }
  deleteAllRecordModalFunction() {

    let modalData: any = {
      panelClass: 'delete-dialog',
      data: {
        header: "Are you want to delete these all record ?",
        message: "",
        button1: { text: "No" },
        button2: { text: "Yes" },
      }
    }
    this.dialogRef = this.dialog.open(DialogBoxComponent, modalData);
    this.dialogRef.afterClosed().subscribe(result => {

      switch (result) {
        case "No":
          break;
        case "Yes":
          this.deleteAllRecords();
          break;
      }
    });

  }



  deleteAllRecords() {

    for (let c in this.selection.selected) {
      this.idArray.push(this.selection.selected[c]._id);
    }
    let temparr: any = [];
    let link = this.serverDetailsVal.serverUrl + this.formSourceVal.deleteManyEndpoint;
    let source: any = this.formSourceVal.source;
    let token: any = this.serverDetailsVal.jwttoken
    for (let val in this.listingData) {
      if (this.idArray.includes(this.listingData[val]._id) == true) {
        temparr.push(val);

      }
    }

    this.apiService.deteteManyTrainingData(link, this.idArray, token, source).subscribe((res: any) => {

      // res.data.ids;
      if (res.status == "success") {
        setTimeout(() => {
          for (let i in temparr) {
            let tval: any = temparr[i] - parseInt(i);
            this.listingData.splice(tval, 1);
          }
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.selection.clear();
          let allData: PeriodicElement[] = this.listingData;
          this.dataSource = new MatTableDataSource(allData);
        }, 1000);
      }


    })

  }


  statusUpdateAllRecords() {
    for (let c in this.selection.selected) {
      this.idArray.push(this.selection.selected[c]._id);
    }
    let ids: any = this.idArray;
    let modalData: any = {
      panelClass: 'statusupdate-dialog',
      data: {
        header: "You are about to change status of these record(s)",
        message: "",
        button1: { text: "Inactive" },
        button2: { text: "Active" },
      }
    }
    this.dialogRef = this.dialog.open(DialogBoxComponent, modalData);
    this.dialogRef.afterClosed().subscribe(result => {
      // // console.log('>>', result)

      var resval = result;
      if (result == "Active") {
        result = 1;
      }
      if (result == "Inactive") {
        result = 0;
      }

      let link = this.serverDetailsVal.serverUrl + this.formSourceVal.statusUpdateManyEndpoint;
      let source: any = this.formSourceVal.source;
      let token: any = this.serverDetailsVal.jwttoken;

      this.apiService.togglestatusmany(link, ids, result, token, source).subscribe((response: any) => {
        if (response.status == "success") {
          let message: any = "Status Updated Successfully";

          let action: any = "Ok";
          this.snakBar.open(message, action, {
            duration: 3000
          })

          for (let c in this.selection.selected) {
            for (let b in this.listingData) {
              if (this.selection.selected[c]._id == this.listingData[b]._id) {
                // // console.log(this.selection.selected[c],result, '>>', this.listingData[b])

                if (result == 1) {
                  this.listingData[b].status = 1;
                  // // console.log(this.listingData[b].status, '??')
                }
                if (result == 0) {
                  this.listingData[b].status = 0;
                  // // console.log(this.listingData[b].status, '?_?')

                }
              }
            }
          }
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.selection.clear();
          let allData: PeriodicElement[] = this.listingData;
          this.dataSource = new MatTableDataSource(allData);

        }

      })

    });

  }
  viewTrash() {
    this.progressSpinner.loading = true;
    switch (this.trashButtonText) {
      case 'View Deleted':
        this.trashFlag = 1 - this.trashFlag;
        let link = this.serverDetailsVal.serverUrl + this.formSourceVal.searchEndpoint;
        let data: any = {
          "source": this.formSourceVal.trashDataSource,
          "token": this.serverDetailsVal.jwttoken,
          "condition": {
            is_trash: { $eq: 1 }
          }
        }
        this.apiService.postData(link, data).subscribe((response: any) => {
          this.progressSpinner.loading = false;

          this.trashButtonText = "Return to Active list";
          this.trashFlag = 1 - this.trashFlag;
          this.allTrashData = response.res;
          this.dataSource = new MatTableDataSource(this.allTrashData);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

        })
        break;
      case 'Return to Active list':
        this.trashButtonText = "View Deleted";
        this.progressSpinner.loading = false;

        this.dataSource = new MatTableDataSource(this.listingData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        break;
    }
  }
  restoreTrashData(trashId: any, index: any) {
    let link = this.serverDetailsVal.serverUrl + this.formSourceVal.retriveTrashDataEndpoint;
    let data: any = {
      "source": this.formSourceVal.retriveTrashDataSourceName,
      "token": this.serverDetailsVal.jwttoken,
      "id": trashId,
      "associated_training": trashId
    }
    this.apiService.postData(link, data).subscribe((response: any) => {
      if (response.status == "success") {
        this.allTrashData.splice(index, 1);
        let allTrashData: PeriodicElement[] = this.allTrashData;
        this.dataSource = new MatTableDataSource(allTrashData);
        let message: any = "Successfully Restored This Record";
        let action: any = "Ok";
        this.snakBar.open(message, action, {
          duration: 3000
        })
      }

    })
  }
}

