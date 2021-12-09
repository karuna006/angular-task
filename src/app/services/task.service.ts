import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable, ObservableInput} from "rxjs";
import { Task } from "../Task";
import { NotiService } from './noti.service';


const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  PageSize = 2;
  private apiurl = 'http://localhost:5000/tasks';
  constructor(private http:HttpClient,private notifyService : NotiService) {}

  getTasks() : Observable<Task[]>
  {
    // const tasks = of(TASKS);
    // return tasks;
    // console.log(this.http.get<Task[]>(this.apiurl));
    return this.http.get<Task[]>(this.apiurl);
  }

  deleteTask(task:Task):Observable<Task>
  {
    const url = `${this.apiurl}/${task.id}`;
    this.notifyService.showSuccess("Task Deleted !!", "Success");
    return this.http.delete<Task>(url);
  }

  updateTaskReminder(task:Task):Observable<Task>
  {
    const url = `${this.apiurl}/${task.id}`;
    this.notifyService.showSuccess("Task reminder Updated !!", "Success");
    return this.http.put<Task>(url,task,httpOptions);
  }

  addTask(task: Task):Observable<Task>
  {
    this.notifyService.showSuccess("New Task Addedd !!", "Success");
    return this.http.post<Task>(this.apiurl,task,httpOptions);
  }

  getPageSize()
  {    
    return this.PageSize;
  }
}
