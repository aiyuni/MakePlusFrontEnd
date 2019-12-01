import { Component, OnInit,Input } from '@angular/core';
import { EmployeeSalary } from 'src/app/classes/employeeSalary';
import { Project } from 'src/app/classes/project';
import { Observable, Subject } from 'rxjs';

/** The salary component in LOW level view. */
@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent implements OnInit {
  eventsSubscription: any
  eventsSubject: Subject<void> = new Subject<void>();

  /** indicator if this page is read only or not. */
  @Input() readMode:boolean;
  /** each employee in this project */
  @Input() employeeSalaryArr:EmployeeSalary[];
  /** current project */
  @Input() project:Project;
  /** reciever of phased changed event from other module. */
  @Input() phaseChangedEvent: Observable<void>;

  /** may not in used. TODO: need to be confirmed. */
  budgetArr:number    // not in used.

  constructor() { }

  /** Initialize the directive/component. */
  ngOnInit() {
    this.eventsSubscription = this.phaseChangedEvent.subscribe(() => this.passEventToIndividualSalaryChildren());
  }

  /** pass event to individual salary compononets */
  passEventToIndividualSalaryChildren(){
    this.eventsSubject.next()
  }

}
