import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceuilComponent } from './pages/acceuil/acceuil.component';
import { PageAdminComponent } from './pages/admin/page-admin/page-admin.component';
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
import { AuthGaurdService } from './services/guard/auth-gaurd.service';

const routes: Routes = [
  {path:"acc",component:AcceuilComponent ,children:[
  {path :"home",component:HomeComponent,canActivate : [AuthGaurdService]}, 
  
  {path:"menu",component:MenuComponent,canActivate : [AuthGaurdService] },
  {path:"Sections",component:PageSectionComponent,canActivate : [AuthGaurdService]},
  {path:"Subjects",component:PageSubjectComponent,canActivate : [AuthGaurdService]},
  {path:"schools",component:SchoolsComponent,canActivate : [AuthGaurdService]},
 
  {path :"Classroom",component:ClassroomsComponent,canActivate : [AuthGaurdService] },
  {path :"classes",component:PageClassComponent,canActivate : [AuthGaurdService] },
  {path :"admins",component:PageAdminComponent,canActivate : [AuthGaurdService] },
  {path :"teachers",component:PageTeacherComponent,canActivate : [AuthGaurdService] },
  {path :"students",component:PageStudentComponent,canActivate : [AuthGaurdService] },
  {path :"absences",component:PageAbsenceComponent,canActivate : [AuthGaurdService] },
  {path :"plannings",component:PagePlanningComponent,canActivate : [AuthGaurdService] },
  {path:"header",component:HeaderComponent},
  {path:"footer",component:FooterComponent}
]},
{path:"",component:LoginComponent},
{path:"login",component:LoginComponent},
{path :"register",component:RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
