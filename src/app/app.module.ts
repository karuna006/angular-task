import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgxPaginationModule} from 'ngx-pagination';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { RouterModule,Routes } from "@angular/router";

import { AppComponent } from './app.component';
import { HeaderComponent } from './componets/header/header.component';
import { ButtonComponent } from './componets/button/button.component';
import { TasksComponent } from './componets/tasks/tasks.component';
import { TasksItemComponent } from './componets/tasks-item/tasks-item.component';
import { AddTaskComponent } from './componets/add-task/add-task.component';
import { AboutComponent } from './componets/about/about.component';
import { FooterComponent } from './componets/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

const appRoutes: Routes = [
  {
    path: '',
    component:TasksComponent
  },
  {
    path: 'about',
    component:AboutComponent
  }

]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,
    TasksComponent,
    TasksItemComponent,
    AddTaskComponent,
    AboutComponent,
    FooterComponent    
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    NgxPaginationModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes , {enableTracing:true}),
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule],
  
})
export class AppModule { }
