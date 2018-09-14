import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { DetailComponent } from './detail/detail.component';
import { PostsComponent } from './posts/posts.component';
import { HttpClientModule } from '@angular/common/http'
import { HttpModule } from '@angular/http'
//import { PopupModule } from 'ng2-opd-popup';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminDashboardComponent } from './admin.dashboard/admin.dashboard.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from "@angular/forms";
import { AuthorizationService } from './sharedServices/authorization.service';
import { RegisterComponent } from './register/register.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { HeaderComponent } from './header/header.component';
import { RegistercandidateComponent } from './registercandidate/registercandidate.component';
import { FooterComponent } from './footer/footer.component';
import { CandidateloginComponent } from './candidatelogin/candidatelogin.component';
import { DynamoDBService } from './sharedServices/dynamoDbService';
import { CandidatedashboardComponent } from './candidatedashboard/candidatedashboard.component'
import { CandidateServiceModule } from './candidate-service/candidate-service.module';
import { AddquestionsComponent } from './addquestions/addquestions.component';
import { QuestionpooldashboardComponent } from './questionpooldashboard/questionpooldashboard.component'
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SelectQuestionComponent } from './select-question/select-question.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { CriteriaComponent } from './criteria/criteria.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatNativeDateModule, MatSelectModule} from '@angular/material';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material';
import {MatSliderModule} from '@angular/material/slider';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material';
import { CountdownModule } from 'ngx-countdown';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    DetailComponent,
    PostsComponent,
    LoginComponent,
    AdminDashboardComponent,
    RegisterComponent,
    ForgotpasswordComponent,
    HeaderComponent,
    RegistercandidateComponent,
    FooterComponent,
    CandidateloginComponent,
    CandidatedashboardComponent,
    AddquestionsComponent,
    QuestionpooldashboardComponent,
    SelectQuestionComponent,
    CriteriaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpModule,
    FormsModule,
    NgxPaginationModule,
    AngularMultiSelectModule,
    MatRadioModule,
    MatNativeDateModule,
    MatSelectModule,
    MatPaginatorModule,
    MatInputModule,
    MatSliderModule,
    MatTabsModule,
    MatButtonModule,
    CountdownModule
    ],
  providers: [AuthorizationService, DynamoDBService, CandidateServiceModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
