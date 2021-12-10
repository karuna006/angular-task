import { Injectable } from '@angular/core';
import { TaskService } from "./task.service";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  tasks: Task[] = [];
  LoadPagedata!:number;
  data:any;
  constructor(private taskservice : TaskService){  }

  
}
