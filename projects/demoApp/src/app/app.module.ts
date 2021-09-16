import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import { AppComponent } from './app.component';
import { TraningModule } from 'projects/traning/src/public-api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from './material-module';
import { routing } from './route';
import { AddEditTrainingComponent } from './manage-training/add-edit-training/add-edit-training.component';
import { AddEditLessionsComponent } from './manage-lessions/add-edit-lessions/add-edit-lessions.component';
import { AddEditCenterComponent } from './training-center/add-edit-center/add-edit-center.component';
import { ListingTrainingComponent } from './manage-training/listing-training/listing-training.component';
import { ListLessionComponent } from './manage-lessions/list-lession/list-lession.component';
import { ListComponent } from './training-center/list/list.component';
import { ManageQuizComponent } from './manage-quiz/manage-quiz.component';
import { AddEditComponent } from './manage-quiz/add-edit/add-edit.component';
import { AddUpdateAnswerComponent } from './manage-quiz/add-update-answer/add-update-answer.component';
import { UpdateAnswerComponent } from './manage-quiz/update-answer/update-answer.component';
import { LoginfortrainingComponent } from './loginfortraining/loginfortraining.component';
import { TrainingreportComponent } from './trainingreport/trainingreport.component';
import { CategoryWiseReportComponent } from './category-wise-report/category-wise-report.component';
import { TrainingCenterDnaComponent } from './training-center-dna/training-center-dna.component';
import { LessonPlanMaterialComponent } from './lesson-plan-material/lesson-plan-material.component';
import { ListQuizComponent } from './manage-quiz/list-quiz/list-quiz.component';
import { AddEditQuizComponent } from './manage-quiz/add-edit-quiz/add-edit-quiz.component';
import { TrainingCentreBetoParedesComponent } from './training-centre-beto-paredes/training-centre-beto-paredes.component';
import { TraingCenterPeceComponent } from './traing-center-pece/traing-center-pece.component';


@NgModule({
  declarations: [
    AppComponent,
    AddEditTrainingComponent,
    AddEditLessionsComponent,
    AddEditCenterComponent,
    ListingTrainingComponent,
    ListLessionComponent,
    ListComponent,
    ManageQuizComponent,
    AddEditComponent,
    AddUpdateAnswerComponent,
    UpdateAnswerComponent,
    LoginfortrainingComponent,
    TrainingreportComponent,
    CategoryWiseReportComponent,
    TrainingCenterDnaComponent,
    LessonPlanMaterialComponent,
    ListQuizComponent,
    AddEditQuizComponent,
    TrainingCentreBetoParedesComponent,
    TraingCenterPeceComponent
  ],
  imports: [
    routing,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    CommonModule,
    TraningModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RouterModule.forRoot([]),
    DemoMaterialModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
