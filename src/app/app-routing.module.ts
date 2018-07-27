import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component'
import { DetailComponent } from 'src/app/detail/detail.component';
import { UserComponent } from 'src/app/user/user.component';
import { PostsComponent } from 'src/app/posts/posts.component';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin.dashboard/admin.dashboard.component';


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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
