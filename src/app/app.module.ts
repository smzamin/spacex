import { DataService } from './services/data.service';
import { LoaderInterceptor } from './services/loader.interceptors';
import { LoaderService } from 'src/app/services/loader.service';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ErrorPageComponent } from './Error-Page/Error-Page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderComponent } from './loader/loader.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorPageComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule, RouterModule, AppRoutingModule, HttpClientModule
  ],
  providers: [
    LoaderService, DataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
