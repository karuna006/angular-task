import { Component, OnInit } from '@angular/core';
import { TaskService } from "../../services/task.service";
import { Task } from "../../Task";


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  
  tasks: Task[] = [];
  PageSize = this.taskService.getPageSize();
  pagelist:any;
  task:any
  constructor(private taskService:TaskService) { }

  ngOnInit(): void {
    
    this.taskService.getTasks().subscribe(
      (tasks)=>
      {
        this.tasks = tasks.slice(0, this.PageSize);        
      }
    ); 
       
  }

  DeleteTask(task: Task)
  {
    this.taskService.deleteTask(task).subscribe(()=>(this.tasks=this.tasks.filter(t => t.id !== task.id)));
  }

  LoadData(taskdata: any)
  {
    this.tasks = taskdata;
  }
  
  ToggleReminder(task: Task)
  {
    task.reminder = !task.reminder;    
    this.taskService.updateTaskReminder(task).subscribe();
  }

  addTask(task: Task)
  {
    this.taskService.addTask(task).subscribe(
      (task)=>
      {
        // this.ngOnInit();
        // this.tasks.push(task);
        // console.log(this.pagelist);
      }
    );
  } 
}