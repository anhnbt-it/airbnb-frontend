import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {RoomDetailsComponent} from './components/room-details/room-details.component';
import {CreatePostComponent} from './components/create-post/create-post.component';
import {BookingDetailsComponent} from './components/booking-details/booking-details.component';
import {ReviewComponent} from './components/review/review.component';
import {LoginComponent} from './components/layout-login/login/login.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'review', component: ReviewComponent},
  {path: 'rooms/:id', component: RoomDetailsComponent},
  {path: 'create-post', component: CreatePostComponent},
  {path: 'booking-detail/:id', component: BookingDetailsComponent},
  {path: 'profile', component: UserProfileComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
