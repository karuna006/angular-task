import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  return_data!: number;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  hadRoute1()
  {    
    if(this.router.url == '/')
    {
      this.return_data = 1;
    }
    else
    {
      this.return_data = 2;
    }
    return this.return_data;
  }
}
