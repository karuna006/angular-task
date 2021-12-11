import { Component, OnInit,Input,Output,EventEmitter} from '@angular/core';
import { Task } from "../../Task";
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tasks-item',
  templateUrl: './tasks-item.component.html',
  styleUrls: ['./tasks-item.component.css']
})
export class TasksItemComponent implements OnInit  {
  @Input() task!: Task;
  @Input() Minheight!: any;
  @Output() onDeleteTask:EventEmitter<Task> = new EventEmitter();
  @Output() onToggleReminder:EventEmitter<Task> = new EventEmitter();

  faTimes = faTimes;

  constructor() { } 

  ngOnInit(): void {
    // console.log(this.tasks);
  }

  onDelete(task: any)
  {
    this.onDeleteTask.emit(task);
  }

  onToggle(task: any)
  {
    this.onToggleReminder.emit(task);
  }
}
