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
  @Input() 
    public set taskcount(val: string) {      
      this.getTaskData();
    }
  @Output() onLoadNewTask:EventEmitter<any> = new EventEmitter();
  PageSize = this.taskService.getPageSize();
  pre:number=1;
  nxt:number=2;
  totalPages:number = 0;
  page_data: Task[] = [];
  tasks: Task[] = [];
  pageNocontent:string = '';
  pagelist:any;  
  initpage = 1;
  getpagelist:any = [];
  private apiurl = 'http://localhost:5000/tasks';

  constructor(private http:HttpClient,private taskService:TaskService,private taskscomponent:TasksComponent) { }

  ngOnInit(): void {    
  } 

  getTaskData(){
    this.http.get<any>(this.apiurl).subscribe(
      response =>{        
        this.totalPages = Math.ceil((response.length)/this.PageSize);          
        this.pagelist = this.loadData(1);
        // console.log(this.pagelist);
        this.loadData(1);
      }
    )
    return this.totalPages;
  } 

  loadData(Cpage:any)
  { 
    if(Cpage != '...')
    {
      this.http.get<any>(this.apiurl).subscribe(
        response =>{
          this.tasks = response.slice((Cpage - 1) * this.PageSize, Cpage * this.PageSize);        
          this.onLoadNewTask.emit(this.tasks);        
        }
      )
      // console.log('totalPages:',Cpage);
      this.pagelist = this.Getpagelist(Cpage);
      return this.Getpagelist(Cpage);
    }
  }

  Getpagelist(Cpage:any)
  {    
    this.getpagelist = [];
    if(this.totalPages <= 6)
    {
        for (let i = 1; i <= this.totalPages; i++)
        {
          this.getpagelist.push(i);            
        }
    }
    else
    {
        // Always print first page button
        this.getpagelist.push(1);        

        // Print "..." only if currentPage is > 3
        if (Cpage > 3)
        {
          this.getpagelist.push('...');            
        }

        // special case where last page is selected...
        if (Cpage == this.totalPages)
        {
          this.getpagelist.push(Cpage - 2);            
        }

        // Print previous number button if Cpage > 2
        if (Cpage > 2)
        {
          this.getpagelist.push(Cpage - 1);          
        }

        //Print current page number button as long as it not the first or last page
        if (Cpage != 1 && Cpage != this.totalPages)
        {          
          this.getpagelist.push(Cpage);
        }

        //print next number button if Cpage < lastPage - 1
        if (Cpage < this.totalPages - 1)
        {            
            this.getpagelist.push(Cpage + 1);
        }

        // special case where first page is selected...
        if (Cpage == 1)
        {            
            this.getpagelist.push(Cpage + 2);
        }

        //print "..." if Cpage is < lastPage -2
        if (Cpage < this.totalPages - 2)
        {          
          this.getpagelist.push('...');
        } 

        //Always print last page button if there is more than 1 page        
        this.getpagelist.push(this.totalPages);
    }
    
    return this.getpagelist;    
  }
}