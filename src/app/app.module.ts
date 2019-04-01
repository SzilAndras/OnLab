import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { InformationsComponent } from './home/informations/informations.component';
import { NewsComponent } from './home/news/news.component';
import { RatingListComponent } from './home/rating-list/rating-list.component';
import { RatingItemComponent } from './home/rating-list/rating-item/rating-item.component';
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
import {FormsModule} from '@angular/forms';
import {NgDatepickerModule} from 'ng2-datepicker';
import {HttpClientModule} from '@angular/common/http';
import {DatePipe} from '@angular/common';

const appRouts: Routes = [
  {path: 'home', component: HomeComponent, children: [
      {path: '', component: NewsComponent},
      {path: 'news/:id', component: FullNewsComponent}
    ]},
  {path: 'reservation', component: ReservationComponent, children: [
      {path: 'vehicle', component: VehicleSettingComponent},
      {path: 'appointment', component: AppointmentComponent},
      {path: 'overview', component: OverviewComponent}
    ]},
  {path: 'profile', component: ProfileComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    InformationsComponent,
    NewsComponent,
    RatingListComponent,
    RatingItemComponent,
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
    FullNewsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRouts),
    FormsModule,
    NgDatepickerModule,
    HttpClientModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
