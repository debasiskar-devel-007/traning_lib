import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-traing-center-pece',
  templateUrl: './traing-center-pece.component.html',
  styleUrls: ['./traing-center-pece.component.css']
})
export class TraingCenterPeceComponent implements OnInit {
  public TrainingCentreData = [];
  public trainingCenterRoute: any = "/training-center-pece/";

  public formSource: any = {
    "addMarkendpoint": "mark-as-done",
    serverurl: "https://wfr9bu9th2.execute-api.us-east-1.amazonaws.com/dev/api8/",
    quizdataendpoint: 'quiz_data',
    addlessonquizdataendpoint:'addlessonquizdata',
    gettrainingcenterdatalist:'gettrainingcenterdatalist',
    file_endpoint: 'updateusercompletelessonfiles',
    video_endpoint: 'updateusercompletelessonvideo',
    audio_endpoint: 'updateusercompletelessonaudio'
  }
  constructor(public activatedRoute: ActivatedRoute) {
    console.log('lllllllllllllllllllllllllllllll');

  }

  ngOnInit() {
    this.activatedRoute.data.forEach(data => {
      console.log(data, 'data')
      this.TrainingCentreData = data.trainingdata.results;
    })

  }

}
