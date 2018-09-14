import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component'
import { DetailComponent } from 'src/app/detail/detail.component';
import { UserComponent } from 'src/app/user/user.component';
import { PostsComponent } from 'src/app/posts/posts.component';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin.dashboard/admin.dashboard.component';
import { RegisterComponent } from './register/register.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { RegistercandidateComponent } from './registercandidate/registercandidate.component';
import { CandidateloginComponent } from './candidatelogin/candidatelogin.component';
import { CandidatedashboardComponent } from './candidatedashboard/candidatedashboard.component';
import { QuestionpooldashboardComponent } from './questionpooldashboard/questionpooldashboard.component';
import { AddquestionsComponent } from './addquestions/addquestions.component';
import { SelectQuestionComponent } from './select-question/select-question.component';
import { CriteriaComponent } from './criteria/criteria.component';


const routes: Routes = [
 
  {
    path: 'users-dashboard/posts',
    component: PostsComponent
  },
  {
    path: 'users-dashboard/details/:id',
    component: DetailComponent
  },
  {
    path: 'users-dashboard/users',
    component: UserComponent
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path:"admin-dashboard",
    component: AdminDashboardComponent
  },
  {
    path: 'users-dashboard',
    component: DashboardComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: "forget-password",
    component: ForgotpasswordComponent
  },
  {
    path: "users-dashboard/register-candidate",
    component: RegistercandidateComponent
  },
  {
    path: 'candidate-login',
    component: CandidateloginComponent
  },
  {
    path: 'candidate-login/candidate-dashboard/:email',
    component: CandidatedashboardComponent
  },
  {
    path: 'users-dashboard/question-pool',
    component: QuestionpooldashboardComponent
  },
  {
    path: 'users-dashboard/add-questions',
    component: AddquestionsComponent
  },
  {
    path: 'select-questions',
    component: SelectQuestionComponent
  },
  {
    path: 'criteria/:candidateemail',
    component: CriteriaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
