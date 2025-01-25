import { Component, Input, OnInit } from '@angular/core';
import { ErrorMessage } from 'app/models/error-message';

@Component({
  selector: 'app-danger-alert',
  templateUrl: './danger-alert.component.html',
  styleUrls: ['./danger-alert.component.css']
})
export class DangerAlertComponent implements OnInit {

  @Input() error: ErrorMessage | undefined;
  
  constructor() { }

  ngOnInit(): void {
  }

}
