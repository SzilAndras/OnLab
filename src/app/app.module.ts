import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { InformationsComponent } from './home/informations/informations.component';
import { NewsComponent } from './home/news/news.component';
import { ReservationComponent } from './reservation/reservation.component';
import { VehicleSettingComponent } from './reservation/vehicle-setting/vehicle-setting.component';
import { AppointmentComponent } from './reservation/appointment/appointment.component';
import { OverviewComponent } from './reservation/overview/overview.component';
import { ReservationHeaderComponent } from './reservation/reservation-header/reservation-header.component';
import {RouterModule, Routes} from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { NewsItemComponent } from './home/news/news-item/news-item.component';
import { ContactComponent } from './home/informations/contact/contact.component';
import { AddressComponent } from './home/informations/address/address.component';
import { CompanyInformationComponent } from './home/informations/company-information/company-information.component';
import { FullNewsComponent } from './home/full-news/full-news.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgDatepickerModule} from 'ng2-datepicker';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import { ActualReservationsComponent } from './actual-reservations/actual-reservations.component';
import { ReservationListComponent } from './actual-reservations/reservation-list/reservation-list.component';
import { ReservationDetailsComponent } from './actual-reservations/reservation-details/reservation-details.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import {AuthInterceptor} from './services/http/auth-interceptor';
import { AdminReservationComponent } from './admin-reservation/admin-reservation.component';
import { AdminReservationActualComponent } from './admin-reservation/admin-reservation-actual/admin-reservation-actual.component';
import {MustMatchDirective} from './auth/signup/must-match.directive';
import { AdminReservationEditComponent } from './admin-reservation/admin-reservation-edit/admin-reservation-edit.component';
import { ReservationFilterComponent } from './shared/reservation/reservation-filter/reservation-filter.component';
import { TimeTableComponent } from './shared/time-table/time-table.component';
import { CreateRatingComponent } from './rating/create-rating/create-rating.component';
import {RatingListComponent} from './rating/rating-list/rating-list.component';
import {RatingItemComponent} from './rating/rating-item/rating-item.component';
import { ReservationItemComponent } from './shared/reservation/reservation-item/reservation-item.component';

const appRouts: Routes = [
  {path: 'home', component: HomeComponent,
    children: [
      {path: 'news', component: NewsComponent},
      {path: 'rating', component: CreateRatingComponent},
      {path: 'news/:id', component: FullNewsComponent}
    ]},
  {path: 'reservation', component: ReservationComponent,
    children: [
      {path: 'vehicle', component: VehicleSettingComponent},
      {path: 'appointment', component: AppointmentComponent},
      {path: 'overview', component: OverviewComponent}
    ]},
  {path: 'profile', component: ProfileComponent},
  {path: 'actual-reservations', component: ActualReservationsComponent},
  {path: 'admin-reservations', component: AdminReservationComponent, children: [
      {path: 'isEdited/:id', component: AdminReservationEditComponent},
      {path: 'list', component: AdminReservationActualComponent}
    ]},
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    InformationsComponent,
    NewsComponent,
    ReservationComponent,
    VehicleSettingComponent,
    AppointmentComponent,
    OverviewComponent,
    ReservationHeaderComponent,
    ProfileComponent,
    NewsItemComponent,
    ContactComponent,
    AddressComponent,
    CompanyInformationComponent,
    FullNewsComponent,
    ActualReservationsComponent,
    ReservationListComponent,
    ReservationDetailsComponent,
    SigninComponent,
    SignupComponent,
    AdminReservationComponent,
    AdminReservationActualComponent,
    MustMatchDirective,
    AdminReservationEditComponent,
    ReservationFilterComponent,
    TimeTableComponent,
    CreateRatingComponent,
    RatingListComponent,
    RatingItemComponent,
    ReservationItemComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRouts),
    FormsModule,
    NgDatepickerModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
