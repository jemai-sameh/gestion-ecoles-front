import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SafeUrlPipe } from './pipe/safeUrl.pipe';
import { ToastrModule } from 'ngx-toastr';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthIntercepterService } from './services/interceptor/authInterceptor.service';
@NgModule({
  declarations: [
    AppComponent,
    SafeUrlPipe
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 3000 // 3 seconds
      
    }),
    Ng2SearchPipeModule,
    Ng2OrderModule,
    NgxPaginationModule
  ],
  providers: [{provide :HTTP_INTERCEPTORS, useClass:AuthIntercepterService,multi :true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
