import { Component, OnInit,Input ,Output,EventEmitter} from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { TaskService } from "../../services/task.service";
import { Task } from "../../Task";
import { TasksComponent } from "../tasks/tasks.component";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() pagecount:any;
  @Output() onLoadNewTask:EventEmitter<any> = new EventEmitter();
  PageSize = this.taskService.getPageSize();
  pre:number=1;
  nxt:number=2;
  totalPages:number = 0;
  page_data: Task[] = [];
  tasks: Task[] = [];
  pageNocontent:string = '';
  pagelist:any;
  private apiurl = 'http://localhost:5000/tasks';

  constructor(private http:HttpClient,private taskService:TaskService,private taskscomponent:TasksComponent) { }

  ngOnInit(): void {
    this.getTaskData();
    console.log('page:',this.taskscomponent.pagelist);
  }

  getTaskData(){
    this.http.get<any>(this.apiurl).subscribe(
      response =>{        
        this.totalPages = Math.ceil((response.length)/this.PageSize);
        this.pagelist = new Array();
        if(this.totalPages>1)
        {
          this.pagelist = new Array(this.totalPages);
        }        
        // console.log(this.pagelist);
      }
    )
  } 

  loadData(Cpage:number)
  {
    this.http.get<any>(this.apiurl).subscribe(
      response =>{
        this.tasks = response.slice((Cpage - 1) * this.PageSize, Cpage * this.PageSize);        
        this.onLoadNewTask.emit(this.tasks);        
      }
    )
  }
}