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
    ReservationHeaderComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
