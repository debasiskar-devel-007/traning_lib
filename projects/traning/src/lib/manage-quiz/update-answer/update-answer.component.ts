import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { DialogBoxComponent } from '../../common/dialog-box/dialog-box.component';
import { MatDialog, MatDialogRef, MatSort, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';


export interface PeriodicElement {
  position: string;
  checked: string,
  deleteAction: string,
}
export interface DialogData {
  isCorrect: any;
  flag: any;
}
@Component({
  selector: 'lib-update-answer',
  templateUrl: './update-answer.component.html',
  styleUrls: ['./update-answer.component.css']
})

export class UpdateAnswerComponent implements OnInit {
  public quizAnswerData: any = [];
  myModel: boolean = true;
  public deleteId: any;
  public deleteIndex: any;
  public dialogRef: any;
  public serverDetailsVal: any;
  public formSourceVal: any;
  public listingPageRoute: any;
  public lessonId: any;
  public ansapdateendpoint: any;

  displayedColumns: string[] = ['No', 'answers', 'Correct', 'action'];
  dataSource: MatTableDataSource<PeriodicElement>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @Input()
  set serverDetails(serverDetails: {}) {
    this.serverDetailsVal = (serverDetails) || '<no name set>';
  }

  @Input()
  set formSource(formSource: any) {
    this.formSourceVal = (formSource) || '<no name set>';
  }
  @Input()
  set DataList(val: any) {
    this.quizAnswerData = (val) || '<no name set>';
    // this.dataSource = this.quizAnswerData;
    this.dataSource = new MatTableDataSource(this.quizAnswerData);
console.log(val,'val')
  }
  @Input()
  set ListingPageRoute(val: any) {
    this.listingPageRoute = (val) || '<no name set>';
  }
  @Input()
  set LessonId(val: any) {
    this.lessonId = (val) || '<no name set>';
  }
  @Input()
  set AnsUpdateEndpoint(val: any) {
    this.ansapdateendpoint = val
  }

  constructor(public dialog: MatDialog, public apiService: ApiService, public router: Router) {

  }

  ngOnInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 200);
  }



  isCorrect(val, i) {
    console.log(val.isCorrect, 'kkkkk', i);
    let link = this.serverDetailsVal.serverUrl + this.ansapdateendpoint;

    if (i == 0) {
      val.isCorrect = 1
      let dataquiz: any = {
        _id: val._id,
        token: this.serverDetailsVal.jwttoken,
        isCorrect: val.isCorrect
      }
      this.apiService.postData(link, dataquiz).subscribe((res: any) => {
        if (res.status == 'success') {
          console.log('pppppppppppppppppppppppppp');
          
          let currentUrl = this.router.url;
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([currentUrl]);
        }
      })
    } if (i == 1) {
      val.isCorrect = 0;
      let dataquiz: any = {
        _id: val._id,
        token: this.serverDetailsVal.jwttoken,
        isCorrect: val.isCorrect
      }
      this.apiService.postData(link, dataquiz).subscribe((res: any) => {
        if (res.status == 'success') {
          console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbb');

          let currentUrl = this.router.url;
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([currentUrl]);
        }
      })
    }

  }


  goToquizList() {
    console.log(this.listingPageRoute + this.lessonId, '++==')
    this.router.navigateByUrl(this.listingPageRoute + this.lessonId);
  }

  // addButton() {
  // this.router.navigateByUrl(this.addPageRoute + this.lessonId);
  // }

  delete(id: any, index) {
    this.deleteId = id;
    this.deleteIndex = index;
    let modalData: any = {
      panelClass: 'delete-dialog',
      data: {
        header: "Are you want to delete these record ?",
        // message: "Are you want to delete these record ?",
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


  deleteFunction(id: any, index: any) {
    let link = this.serverDetailsVal.serverUrl + this.formSourceVal.deleteendpoint;
    let data: any = {
      "source": this.formSourceVal.source,
      "token": this.serverDetailsVal.jwttoken,
      "id": id
    }

    this.apiService.postData(link, data).subscribe((res: any) => {
      if (res.status = "success") {
        this.quizAnswerData.splice(index, 1);
        let allData: PeriodicElement[] = this.quizAnswerData;
        this.dataSource = new MatTableDataSource(allData);
      }
    })
  }

  edit(id: any) {
    // this.router.navigateByUrl(this.editUrl);
  }

}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'answer-changecon-from-dialog.html',
})
export class AnswerchangeconfromDialog {
  public alldata: any;
  constructor(
    public dialogRef: MatDialogRef<AnswerchangeconfromDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public apiService: ApiService) {
    console.log(data)
    this.alldata = data;
  }

  onNoClick(): void {
    this.data.flag = false;

    this.dialogRef.close(this.data);
  }


  changeans(flag) {
    if (flag == 1) {
      this.data.isCorrect = 1;
    } else {
      this.data.isCorrect = 0;
    }

    this.data.flag = true;
    console.log('cdata+++', this.data)
    this.dialogRef.close(this.data);
  }

}
