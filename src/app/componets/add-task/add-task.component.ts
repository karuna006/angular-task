import { Component, OnInit ,Output,EventEmitter} from '@angular/core';
import { UiService } from "../../services/ui.service";
import { Subscription } from "rxjs";
import { Task } from "../../Task";
import { NotiService } from '../../services/noti.service'

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  
  text!:string;
  day!:string;
  reminder: boolean = false;
  showAddTask!: boolean;
  subscription!: Subscription;

  constructor(private uiservice:UiService,private notifyService : NotiService) { 
    this.subscription = this.uiservice.onToggle().subscribe((value) => (this.showAddTask=value))
   }

  ngOnInit(): void {
  }

  onSubmit()
  {
    if(!this.text)
    {
      this.notifyService.showWarning("Please add a task !!", "Warning");
      // alert('Please add a task!');
      return;
    }

    if(!this.day)
    {
      this.notifyService.showWarning("Please add a day !!", "Warning");
      // alert('Please add a Day!');
      return;
    }

    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder,
    }

    this.onAddTask.emit(newTask);

    this.text = '';
    this.day = '';
    this.reminder = false;
  }
}
