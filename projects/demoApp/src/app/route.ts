
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AddEditLessionsComponent } from '../app/manage-lessions/add-edit-lessions/add-edit-lessions.component';
import { AddEditTrainingComponent } from './manage-training/add-edit-training/add-edit-training.component';
import { AddEditCenterComponent } from './training-center/add-edit-center/add-edit-center.component';
import { ListingTrainingComponent } from './manage-training/listing-training/listing-training.component';
import { ResolveService } from './service/resolve.service';
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

const appRoutes: Routes = [

    //for dna
    {
        path: 'training-center-dna/:associated_training/:_id', component: TrainingCenterDnaComponent,
        resolve: { trainingdata: ResolveService },
        data: { requestcondition: { source: '', condition: {} }, endpoint: 'gettrainingcenterlist' }
    },
    {
        path: 'training-center-dna/:associated_training', component: TrainingCenterDnaComponent,
        resolve: { trainingdata: ResolveService },
        data: { requestcondition: { source: '', condition: {} }, endpoint: 'gettrainingcenterlist' }
    },

    // for beto paredes

    {
        path: 'training-center-beto-paredes/:associated_training/:_id', component: TrainingCentreBetoParedesComponent,
        resolve: { trainingdata: ResolveService },
        data: { requestcondition: { source: '', condition: {} }, endpoint: 'gettrainingcenterlist' }
    },
    {
        path: 'training-center-beto-paredes/:associated_training', component: TrainingCentreBetoParedesComponent,
        resolve: { trainingdata: ResolveService },
        data: { requestcondition: { source: '', condition: {} }, endpoint: 'gettrainingcenterlist' }
    },

    {
        path: 'lesson-plan-material/:associated_training/:lesson_id_object', component: LessonPlanMaterialComponent,
        resolve: { lessonplandata: ResolveService },
        data: { requestcondition: { source: 'manage_quiz_question', condition: { status: 1 } }, endpoint: 'datalist' }
    },

    {
        path: 'lesson-plan-material/:associated_training/:lesson_id_object/:_id', component: LessonPlanMaterialComponent,
        resolve: { lessonplandata: ResolveService },
        data: { requestcondition: { source: 'manage_quiz_question', condition: { status: 1 } }, endpoint: 'datalist' }

    },
    //for pece 
    {
        path: 'training-center-pece/:associated_training/:_id', component: TraingCenterPeceComponent,
        resolve: { trainingdata: ResolveService },
        data: { requestcondition: { source: '', condition: {} }, endpoint: 'gettrainingcenterdatalist' }
    },
    {
        path: 'training-center-pece/:associated_training', component: TraingCenterPeceComponent,
        resolve: { trainingdata: ResolveService },
        data: { requestcondition: { source: '', condition: {} }, endpoint: 'gettrainingcenterdatalist' }
    },



    { path: 'home', component: AppComponent },
    {
        path: 'training-login', component: LoginfortrainingComponent
    },
    { path: 'home/:id', component: AppComponent },
    /**Lession Management **/
    { path: 'manage-lesson/add', component: AddEditLessionsComponent },

    {
        path: 'manage-lesson/list', component: ListLessionComponent,
        resolve: { lessionData: ResolveService },
        data: { requestcondition: { source: 'manage_lession_view', condition: { 'is_trash': { $ne: 1 } } }, endpoint: 'getlessonlist' }
    },

    { path: 'manage-lesson/edit/:id', component: AddEditLessionsComponent },

    /**Training Management**/
    { path: 'manage-training/add', component: AddEditTrainingComponent },
    {
        path: 'manage-training/list', component: ListingTrainingComponent,
        resolve: { trainingdata: ResolveService },
        data: { requestcondition: { source: 'training_category_management_view', condition: { 'is_trash': { $ne: 1 } } }, endpoint: 'getalltrainingdata' }
    },

    { path: 'manage-training/edit/:id', component: AddEditTrainingComponent },
    /**Training center**/
    {
        path: 'training-center/list/:associated_training', component: ListComponent,
        resolve: { trainingdata: ResolveService },
        data: { requestcondition: { source: '', condition: {} }, endpoint: 'gettrainingcenterlist' }
    },
    { path: 'manage-center/add', component: AddEditCenterComponent },
    { path: 'manage-center/edit/:id', component: AddEditCenterComponent },
    /**Quiz Management**/

    {
        path: 'manage-quiz/list/:lesson_id', component: ManageQuizComponent,
        resolve: { trainingdata: ResolveService },
        data: { requestcondition: { source: 'manage_quiz_question', condition: {} }, endpoint: 'getlessonquestiondata' }
    },
    {
        path: 'manage-quiz/add/:id', component: AddEditComponent
    },
    {
        path: 'manage-quiz/edit/:_id/:lesson_id', component: AddEditComponent,
        resolve: { quizQuestionData: ResolveService },
        data: { requestcondition: { source: 'manage_quiz_question', condition: {} }, endpoint: 'datalistwithouttoken' }
    },


    // {
    //     path: 'quiz/edit/:id/:lesson_id_object', component: AddUpdateAnswerComponent
    // },


    //new quiz section
    {
        path: 'quiz/list/:lesson_id', component: ListQuizComponent,
        resolve: { quizData: ResolveService },
        data: { requestcondition: { source: 'manage_quiz', condition: {} }, endpoint: 'getlessonquestiondata' }
    },
    // lesson_id_object for dna quiz  
    {
        path: 'quiz/add/:lesson_id', component: AddEditQuizComponent
    },

    {
        path: 'quiz/edit/:_id/:lesson_id', component: AddEditQuizComponent,
        resolve: { quizData: ResolveService },
        data: { requestcondition: { source: 'manage_quiz', condition: {} }, endpoint: 'getlessonquestiondatabyid' }
    },


    {
        path: 'quiz/add-answer/:id/:lessonid', component: AddUpdateAnswerComponent
    },

    {
        path: 'quiz/edit-answer/:_id/:lessonid', component: AddUpdateAnswerComponent,
        resolve: { quizQuestionData: ResolveService },
        data: { requestcondition: { source: 'quiz_answer', condition: {} }, endpoint: 'addorupdatelessonanswer' }
    },

    {
        path: 'quiz/update-answer/:questionId/:lessonid', component: UpdateAnswerComponent,
        resolve: { quizQuestionData: ResolveService },
        data: { requestcondition: { source: 'quiz_answer_view', condition: {} }, endpoint: 'getlessonanswerdata' }
    },


    /**training-report**/
    {
        path: 'training-report', component: TrainingreportComponent,
        resolve: { trainingReportData: ResolveService },
        data: { requestcondition: { source: '', sort_val: 'name', sort_type: 'desc', condition: { "skip": 0, "limit": 50, "search": {} } }, endpoint: 'gettrainingreportdata' }
    },
    {
        path: 'category-wise-report-view/:user_id', component: CategoryWiseReportComponent,
        resolve: { trainingReportData: ResolveService },
        data: { requestcondition: { source: '', sort_val: 'training_name', sort_type: 'desc', condition: { "skip": 0, "limit": 50, "search": {} } }, endpoint: 'getcategorywisereportdata' }
    },
    // {
    //     path: 'manage-appointment/mentee/book-appointment/:user_parent_id/:lesson_id_object/:associated_training',
    //     component: AddUpdateAnswerComponent,
    //     // canActivate: [AuthGuard],
    //     // resolve: { eventdayarrData: CalendarServiceService },
    //     // data: {
    //     //   requestcondition: {
    //     //     source: 'events_eventdayarr_view',
    //     //     condition: {}
    //     //   },
    //     //   endpoint: 'view-event-eventdayarr-mentee'
    //     // }
    //   },



]

export const appRoutingProviders: any[] = [
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: false });


