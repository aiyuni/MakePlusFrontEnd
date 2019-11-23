import { Component, OnInit,Input } from '@angular/core';
import { EmployeeSalary } from 'src/app/classes/employeeSalary';
import { Project } from 'src/app/classes/project';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent implements OnInit {
  eventsSubscription: any
  eventsSubject: Subject<void> = new Subject<void>();

  @Input() readMode:boolean;
  @Input() employeeSalaryArr:EmployeeSalary[];
  @Input() project:Project;
  @Input() phaseChangedEvent: Observable<void>;


  budgetArr:number

  constructor() { }

  ngOnInit() {
    this.eventsSubscription = this.phaseChangedEvent.subscribe(() => this.passEventToIndividualSalaryChildren());
  }

  passEventToIndividualSalaryChildren(){
    this.eventsSubject.next()
  }

}
