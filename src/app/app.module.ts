import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ArtistElementComponent } from './artist/artist/artist-element.component';
import { ArtistListComponent } from './artist/artist-list/artist-list.component';
import { ArtistFormComponent } from './artist/artist-form/artist-form.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { ArtistDetailComponent } from './artist/artist-detail/artist-detail.component';
import { ToastrModule } from "ngx-toastr";
import { ErrorInterceptor } from "./error.interceptor";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'artists',
    pathMatch: 'full'
  },
  {
    path: 'artists',
    component: ArtistListComponent
  },
  {
    path: 'artists/:artistId',
    component: ArtistDetailComponent
  },
  {
    path: "artists/edit/:artistId",
    component: ArtistFormComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    ArtistElementComponent,
    ArtistListComponent,
    ArtistFormComponent,
    ArtistDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {}),
    TooltipModule.forRoot(),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
