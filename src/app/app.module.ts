import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AcceuilComponent } from './pages/acceuil/acceuil.component';
import { PageClassComponent } from './pages/classes/page-class/page-class.component';
import { ClassroomsComponent } from './pages/classrooms/classrooms/classrooms.component';
import { FooterComponent } from './pages/footer/footer.component';
import { HeaderComponent } from './pages/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { PageAbsenceComponent } from './pages/page-absence/page-absence.component';
import { LoginComponent } from './pages/page-securite/login/login.component';
import { RegisterComponent } from './pages/page-securite/register/register.component';
import { PageStudentComponent } from './pages/page-student/page-student.component';
import { PageTeacherComponent } from './pages/page-teacher/page-teacher.component';
import { PagePlanningComponent } from './pages/plannings/page-planning/page-planning.component';
import { SchoolsComponent } from './pages/schools/schools.component';
import { PageSectionComponent } from './pages/sections/page-section/page-section.component';
import { PageSubjectComponent } from './pages/subjects/page-subject/page-subject.component';
import { SafeUrlPipe } from './pipe/safeUrl.pipe';
import { ToastrModule } from 'ngx-toastr';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthIntercepterService } from './services/interceptor/authInterceptor.service';
import { PageAdminComponent } from './pages/admin/page-admin/page-admin.component';
@NgModule({
  declarations: [
    AppComponent,
    SafeUrlPipe,
    
    PageAdminComponent,
    ClassroomsComponent,
    PageClassComponent,

    PageSectionComponent,
    PageSubjectComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    SchoolsComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    PageTeacherComponent,
    SafeUrlPipe,
    PageStudentComponent,
    AcceuilComponent,
    PageAbsenceComponent,
    PagePlanningComponent,
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
